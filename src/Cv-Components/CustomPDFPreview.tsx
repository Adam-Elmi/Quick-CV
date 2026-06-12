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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageRefs = useRef<Map<number, Element>>(new Map());
    
    // Initialize scale from localStorage if it exists
    const [scale, setScale] = useState<number>(() => {
        const savedZoom = localStorage.getItem("cv_zoom_level");
        if (savedZoom) return parseFloat(savedZoom);
        return window.innerWidth < 640 ? 0.45 : 0.8;
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
        setCurrentPage(1);
        setIsRendering(false);
        if (onLoad) onLoad(numPages);
    }

    useEffect(() => {
        if (numPages === 0) return;
        const ratios = new Map<number, number>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    const page = Number(entry.target.getAttribute('data-page'));
                    ratios.set(page, entry.intersectionRatio);
                });
                let best = 1, bestRatio = -1;
                ratios.forEach((ratio, page) => {
                    if (ratio > bestRatio) { bestRatio = ratio; best = page; }
                });
                setCurrentPage(best);
            },
            { root: containerRef.current, threshold: [0, 0.25, 0.5, 0.75, 1] }
        );
        pageRefs.current.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [numPages]);

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
            <div className="flex flex-col items-center justify-center h-full gap-4 bg-[#0f0f17]">
                <div className="w-10 h-10 border-2 border-[#2a2a38] border-t-indigo-500 rounded-full animate-spin"></div>
                <span className="mono text-[#8b8fa8] text-xs uppercase tracking-widest">Preparing document…</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full h-full overflow-hidden bg-[#0f0f17]">
            <div className="w-full flex flex-wrap gap-y-2 justify-between items-center px-4 py-2.5 bg-[#13131A] border-b border-[#2a2a38] z-20 sticky top-0">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="relative flex items-center bg-[#1a1a27] border border-[#2a2a38] focus-within:border-indigo-500/60 rounded px-3 py-1.5 transition-colors w-full max-w-xs">
                        <i className="fa-solid fa-file-pdf text-rose-400 text-xs mr-2 shrink-0"></i>
                        <input
                            type="text"
                            placeholder="File name"
                            value={displayName}
                            onChange={handleFilenameChange}
                            className="bg-transparent border-none outline-none text-xs font-medium text-[#c9cbd8] placeholder-[#8b8fa8] w-full"
                        />
                        <span className="mono text-[10px] text-[#3d3f52] ml-1 shrink-0">.pdf</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 bg-[#1a1a27] border border-[#2a2a38] rounded p-0.5 ml-3 shrink-0">
                    <button
                        onClick={zoomOut}
                        className="w-7 h-7 flex items-center justify-center rounded text-[#8b8fa8] hover:text-white hover:bg-white/5 transition-colors active:scale-90"
                        title="Zoom Out"
                    >
                        <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                    <span
                        className="mono text-xs text-[#8b8fa8] min-w-[3rem] text-center select-none cursor-pointer hover:text-white transition-colors"
                        title="Reset to auto-scale"
                        onClick={() => {
                            localStorage.removeItem("cv_zoom_level");
                            setIsManualZoom(false);
                        }}
                    >
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        onClick={zoomIn}
                        className="w-7 h-7 flex items-center justify-center rounded text-[#8b8fa8] hover:text-white hover:bg-white/5 transition-colors active:scale-90"
                        title="Zoom In"
                    >
                        <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                </div>
            </div>

            {numPages > 1 && (
                <div className="w-full flex justify-center px-4 py-1.5 bg-[#13131A] border-b border-[#2a2a38]">
                    <span className="mono text-[10px] text-[#8b8fa8]">Page {currentPage} / {numPages}</span>
                </div>
            )}

            <div
                ref={containerRef}
                className="flex-1 w-full overflow-auto flex flex-col items-center gap-6 p-6"
            >
                <Document
                    file={bufferedUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex flex-col items-center gap-6"
                    loading={null}
                >
                    {Array.from(new Array(numPages), (_, index) => (
                        <div
                            key={`page_${index + 1}`}
                            data-page={index + 1}
                            ref={el => { if (el) pageRefs.current.set(index + 1, el); else pageRefs.current.delete(index + 1); }}
                            className="shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden bg-white ring-1 ring-white/10"
                        >
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
