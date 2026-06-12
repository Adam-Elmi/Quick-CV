import React, { useState, useEffect } from "react";
import { dispatchCVDataChange } from "../Utilities/cvDataStore";

interface DynamicInputGroupProps {
    baseId: string;
    title: string;
    buttonLabel: string;
    maxItems?: number;
    children: (id: string, index: number) => React.ReactNode;
}

export default function DynamicInputGroup({
    baseId,
    title,
    buttonLabel,
    maxItems,
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
        if (maxItems && ids.length >= maxItems) return;

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

    const isMaxReached = maxItems ? ids.length >= maxItems : false;

    return (
        <div className="w-full flex flex-col gap-4 mt-4 mb-4">
            <div className="flex items-center justify-between border-b border-[#2a2a38] pb-2">
                <h3 className="text-sm font-bold text-[#8b8fa8] uppercase tracking-wide">{title}</h3>
                {maxItems && (
                    <span className="mono text-[10px] text-[#3d3f52] font-medium">
                        {ids.length} / {maxItems}
                    </span>
                )}
            </div>
            <div className="flex flex-col">
                {ids.map((id, index) => (
                    <div key={id} className={`w-full max-w-[400px] sm:max-w-none py-4 ${index > 0 ? "border-t border-[#2a2a38]" : ""}`}>
                        {ids.length > 1 && (
                            <div className="flex items-center justify-between mb-3">
                                <span className="mono text-[10px] text-[#3d3f52] tracking-widest select-none">
                                    {index + 1} / {ids.length}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeInput(id)}
                                    className="flex items-center gap-1.5 text-xs text-[#5a5c70] hover:text-rose-400 transition-colors px-2 py-1 rounded hover:bg-rose-500/5"
                                >
                                    <i className="fa-solid fa-trash-can text-[9px]" />
                                    Remove
                                </button>
                            </div>
                        )}
                        {children(id, index)}
                    </div>
                ))}
            </div>
            {!isMaxReached && (
                <button
                    type="button"
                    onClick={addInput}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed border-[#2a2a38] hover:border-indigo-500/50 text-[#8b8fa8] hover:text-indigo-400 text-xs font-medium transition-all hover:bg-indigo-600/5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    {buttonLabel}
                </button>
            )}
        </div>
    );
}
