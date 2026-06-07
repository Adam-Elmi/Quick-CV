import { useState, useRef, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface CustomPDFPreviewProps {
    url: string | null;
    onLoad?: (numPages: number) => void;
}

export default function CustomPDFPreview({ url, onLoad }: CustomPDFPreviewProps) {
    const [numPages, setNumPages] = useState<number>(0);
    
    // Initialize scale from localStorage if it exists
    const [scale, setScale] = useState<number>(() => {
        const savedZoom = localStorage.getItem("cv_zoom_level");
        return savedZoom ? parseFloat(savedZoom) : 0.8;
    });

    const [containerWidth, setContainerWidth] = useState<number | null>(null);
    const [isRendering, setIsRendering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track if the user has manually adjusted the zoom
    const [isManualZoom, setIsManualZoom] = useState(() => {
        return !!localStorage.getItem("cv_zoom_level");
    });

    const [cvNames, setCvNames] = useState({
        first: localStorage.getItem("First-Name") || "",
        last: localStorage.getItem("Last-Name") || "",
        manual: localStorage.getItem("cv_filename") || ""
    });

    const refreshNames = useCallback(() => {
        setCvNames({
            first: localStorage.getItem("First-Name") || "",
            last: localStorage.getItem("Last-Name") || "",
            manual: localStorage.getItem("cv_filename") || ""
        });
    }, []);

    useEffect(() => {
        window.addEventListener('cv-data-change', refreshNames);
        window.addEventListener('storage', refreshNames);
        return () => {
            window.removeEventListener('cv-data-change', refreshNames);
            window.removeEventListener('storage', refreshNames);
        };
    }, [refreshNames]);

    const [bufferedUrl, setBufferedUrl] = useState<string | null>(url);

    useEffect(() => {
        if (url) {
            setIsRendering(true);
            setBufferedUrl(url);
        }
    }, [url]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries && entries.length > 0) {
                const { width } = entries[0].contentRect;
                setContainerWidth(width);
                
                // Only auto-scale if the user hasn't set a manual zoom preference
                if (!isManualZoom) {
                    const isMobile = width < 640;
                    const targetWidth = isMobile ? 550 : 850;
                    const calculatedScale = (width - 48) / targetWidth;
                    const newScale = Math.max(0.4, Math.min(calculatedScale, 1.1));
                    setScale(newScale);
                }
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => resizeObserver.disconnect();
    }, [isManualZoom]);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
        setIsRendering(false);
        if (onLoad) onLoad(numPages);
    }

    const handleFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        localStorage.setItem("cv_filename", newName);
        refreshNames();
        window.dispatchEvent(new Event('cv-data-change'));
    };

    const updateScale = (newScale: number) => {
        const cappedScale = Math.max(0.3, Math.min(newScale, 2.0));
        setScale(cappedScale);
        setIsManualZoom(true);
        localStorage.setItem("cv_zoom_level", cappedScale.toString());
    };

    const zoomIn = () => updateScale(scale + 0.1);
    const zoomOut = () => updateScale(scale - 0.1);

    const getDisplayName = () => {
        if (cvNames.manual) return cvNames.manual;
        if (cvNames.first || cvNames.last) {
            return `${cvNames.first}_${cvNames.last}_CV`.replace(/^_+|_+$/g, '');
        }
        return "My_CV";
    };

    const displayName = getDisplayName();

    if (!bufferedUrl) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50 gap-4">
                <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin"></div>
                <span className="text-sm font-bold uppercase tracking-widest">Preparing Document...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full h-full overflow-hidden bg-slate-200 shadow-inner rounded-xl border border-slate-300">
            <div className="w-full flex flex-wrap gap-y-3 justify-between items-center px-6 py-3 bg-white/90 backdrop-blur-md border-b border-slate-300 shadow-sm z-20 sticky top-0">
                <div className="flex items-center gap-3 flex-1">
                    <div className="relative group flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 hover:border-indigo-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all w-full max-w-xs">
                        <i className="fa-solid fa-file-pdf text-red-600 text-xs mr-2"></i>
                        <input
                            type="text"
                            placeholder="File name (e.g. My_CV)"
                            value={displayName}
                            onChange={handleFilenameChange}
                            className="bg-transparent border-none outline-none text-xs font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-normal w-full"
                        />
                        <span className="text-[10px] font-bold text-slate-300 ml-1">.pdf</span>
                        {numPages > 0 && (
                            <div className="ml-4 pl-4 border-l border-slate-200 flex items-center gap-1.5">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Pages:</span>
                                <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md min-w-[1.5rem] text-center">{numPages}</span>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-xl border border-slate-200 ml-4">
                    <button
                        onClick={zoomOut}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:text-indigo-600 text-slate-500 transition-all active:scale-90"
                        title="Zoom Out"
                    >
                        <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                    <span 
                        className="text-[11px] font-extrabold text-slate-700 min-w-[3rem] text-center select-none tracking-tighter cursor-pointer hover:text-indigo-600"
                        title="Reset to Auto-scale"
                        onClick={() => {
                            localStorage.removeItem("cv_zoom_level");
                            setIsManualZoom(false);
                        }}
                    >
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        onClick={zoomIn}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:text-indigo-600 text-slate-500 transition-all active:scale-90"
                        title="Zoom In"
                    >
                        <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex-1 w-full overflow-auto flex flex-col items-center gap-8 p-8 scroll-smooth scrollbar-thin scrollbar-thumb-slate-400"
            >
                <Document
                    file={bufferedUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex flex-col items-center gap-10"
                    loading={null}
                >
                    {Array.from(new Array(numPages), (_, index) => (
                        <div key={`page_${index + 1}`} className="shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-sm overflow-hidden bg-white ring-1 ring-slate-300 transition-transform duration-300 hover:scale-[1.01]">
                            <Page
                                pageNumber={index + 1}
                                scale={scale}
                                devicePixelRatio={Math.max(window.devicePixelRatio || 1, 2)}
                                renderTextLayer={true}
                                renderAnnotationLayer={false}
                            />
                        </div>
                    ))}
                </Document>
            </div>
        </div>
    );
}
