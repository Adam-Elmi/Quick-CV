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

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Unsupported format. Please upload a JPG, PNG or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please select an image smaller than 2MB.");
      e.target.value = "";
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
    e.stopPropagation();
    setPreview("");
    localStorage.removeItem(dataId);
    dispatchCVDataChange();
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <span className="mono text-[10px] font-bold text-[#8b8fa8] uppercase tracking-wider block mb-2">{label}</span>

      {preview ? (
        <div className="relative flex items-center gap-4 p-4 bg-[#13131A] rounded-xl border border-[#2a2a38]">
          <img
            src={preview}
            alt="Profile"
            className="w-20 h-20 object-cover rounded-xl border border-[#2a2a38] ring-2 ring-indigo-500/20 shrink-0"
          />
          <div className="flex flex-col gap-2">
            <span className="text-sm text-[#c9cbd8] font-medium">Photo uploaded</span>
            <span className="text-xs text-[#8b8fa8]">PNG, JPG or WEBP · Max 2MB</span>
            <div className="flex items-center gap-2 mt-1">
              <label className="cursor-pointer text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#2a2a38] hover:border-indigo-500/40 hover:bg-indigo-600/5">
                <i className="fa-solid fa-arrow-up-from-bracket text-[10px]"></i>
                Replace
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
              </label>
              <button
                type="button"
                onClick={removeImage}
                className="text-xs font-medium text-[#8b8fa8] hover:text-rose-400 transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#2a2a38] hover:border-rose-500/40 hover:bg-rose-600/5"
              >
                <i className="fa-solid fa-trash text-[10px]"></i>
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <label className="cursor-pointer group block">
          <div className="flex flex-col items-center justify-center gap-3 p-8 bg-[#13131A] rounded-xl border-2 border-dashed border-[#2a2a38] hover:border-indigo-500/50 hover:bg-indigo-600/5 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-[#1a1a27] border border-[#2a2a38] flex items-center justify-center group-hover:border-indigo-500/40 transition-colors">
              <i className="fa-solid fa-camera text-xl text-[#3d3f52] group-hover:text-indigo-400 transition-colors"></i>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-[#c9cbd8] group-hover:text-white transition-colors">Click to upload photo</p>
              <p className="text-xs text-[#8b8fa8] mt-0.5">PNG, JPG or WEBP · Max 2MB</p>
            </div>
          </div>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
        </label>
      )}
    </div>
  );
}
