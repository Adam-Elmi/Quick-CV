import React, { useState, useEffect } from "react";
import { dispatchCVDataChange } from "../Utilities/cvDataStore";
interface DynamicInputGroupProps {
    baseId: string;
    title: string;
    buttonLabel: string;
    children: (id: string, index: number) => React.ReactNode;
}
export default function DynamicInputGroup({
    baseId,
    title,
    buttonLabel,
    children,
}: DynamicInputGroupProps) {
    const [ids, setIds] = useState<string[]>([]);
    const storageKey = `${baseId}_IDs`;
    useEffect(() => {
        const storedIds = localStorage.getItem(storageKey);
        if (storedIds) {
            setIds(JSON.parse(storedIds));
        } else {
            const initialId = `${baseId}-${Date.now()}`;
            setIds([initialId]);
            localStorage.setItem(storageKey, JSON.stringify([initialId]));
            dispatchCVDataChange();
        }
    }, [baseId, storageKey]);
    const addInput = () => {
        const newId = `${baseId}-${Date.now()}`;
        const newIds = [...ids, newId];
        setIds(newIds);
        localStorage.setItem(storageKey, JSON.stringify(newIds));
        dispatchCVDataChange();
    };
    const removeInput = (idToRemove: string) => {
        const newIds = ids.filter((id) => id !== idToRemove);
        setIds(newIds);
        localStorage.setItem(storageKey, JSON.stringify(newIds));
        localStorage.removeItem(idToRemove);
        dispatchCVDataChange();
    };
    return (
        <div className="w-full flex flex-col gap-4 mt-4 mb-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">{title}</h3>
            </div>
            <div className="flex flex-col gap-3">
                {ids.map((id, index) => (
                    <div key={id} className="relative group/dynamic w-full max-w-[400px] sm:max-w-none">
                        {}
                        {children(id, index)}
                        {}
                        {ids.length > 0 && (
                            <button
                                type="button"
                                onClick={() => removeInput(id)}
                                className="absolute -right-5 top-5 -translate-y-1/2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover/dynamic:opacity-100 p-1"
                                title="Remove"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 001.5.06l.3-7.5z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={addInput}
                className="self-start text-xs font-semibold text-indigo-500 hover:text-indigo-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                {buttonLabel}
            </button>
        </div>
    );
}
