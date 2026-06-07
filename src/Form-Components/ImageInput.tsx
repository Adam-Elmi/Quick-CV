import React, { useState, useEffect } from "react";
import { dispatchCVDataChange, CV_DATA_CHANGE_EVENT } from "../Utilities/cvDataStore";

interface ImageInputProps {
  label: string;
  dataId: string;
  icon: string;
  className?: string;
}

export default function ImageInput({ label, dataId, icon, className }: ImageInputProps) {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const loadFromStore = () => {
      const stored = localStorage.getItem(dataId) || "";
      setPreview(stored);
    };

    loadFromStore();
    window.addEventListener(CV_DATA_CHANGE_EVENT, loadFromStore);
    window.addEventListener('storage', loadFromStore);
    return () => {
      window.removeEventListener(CV_DATA_CHANGE_EVENT, loadFromStore);
      window.removeEventListener('storage', loadFromStore);
    };
  }, [dataId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please select an image smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      localStorage.setItem(dataId, base64String);
      dispatchCVDataChange();
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop the click from hitting the <label>
    setPreview("");
    localStorage.removeItem(dataId);
    dispatchCVDataChange();
  };

  return (
    <div className={`w-full flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all duration-300 ${className || ""}`}>
      <div className="flex items-center gap-2 self-start mb-1">
        <div className="w-6 h-6 rounded bg-indigo-50 flex items-center justify-center">
          <i className={`${icon} text-indigo-600 text-xs`}></i>
        </div>
        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">{label}</span>
      </div>

      <div className="relative group w-20 h-20">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover rounded-2xl shadow-lg border-2 border-white ring-4 ring-indigo-50"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100 z-50 cursor-pointer"
              title="Remove Image"
            >
              <i className="fa-solid fa-trash-can text-xs"></i>
            </button>
          </>
        ) : (
          <div className="w-full h-full bg-white rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-200 transition-all">
            <i className="fa-solid fa-camera text-3xl"></i>
            <span className="text-[10px] font-medium uppercase">No Photo</span>
          </div>
        )}

        <label className="absolute inset-0 cursor-pointer flex items-center justify-center rounded-2xl bg-black/0 hover:bg-black/5 transition-colors z-10">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <p className="text-[10px] text-slate-400 font-medium">PNG, JPG or WEBP (Max 2MB)</p>
    </div>
  );
}
