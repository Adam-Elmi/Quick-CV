import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();
interface CustomPDFPreviewProps {
    url: string | null;
}
export default function CustomPDFPreview({ url }: CustomPDFPreviewProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [containerWidth, setContainerWidth] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries && entries.length > 0) {
                const { width } = entries[0].contentRect;
                setContainerWidth(width);
            }
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => resizeObserver.disconnect();
    }, []);
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
        setPageNumber(1);
    }
    const changePage = (offset: number) => {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    };
    const previousPage = () => changePage(-1);
    const nextPage = () => changePage(1);
    const zoomIn = () => setScale(scale + 0.1);
    const zoomOut = () => setScale(Math.max(0.5, scale - 0.1));
    if (!url) {
        return (
            <div className="flex items-center justify-center h-full text-slate-500">
                No PDF to display
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center w-full h-full overflow-hidden bg-slate-50 border-b border-slate-200 rounded-t-xl">
            {}
            <div className="w-full flex justify-between items-center px-4 py-2 bg-white border-b border-slate-200 shadow-sm z-10">
                {}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors"
                        title="Previous Page"
                    >
                        <i className="fa-solid fa-chevron-left text-xs"></i>
                    </button>
                    <span className="text-sm font-medium text-slate-600 min-w-[3rem] text-center select-none">
                        Page {pageNumber} of {numPages || '-'}
                    </span>
                    <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition-colors"
                        title="Next Page"
                    >
                        <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                </div>
                {}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={zoomOut}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                        title="Zoom Out"
                    >
                        <i className="fa-solid fa-minus text-xs"></i>
                    </button>
                    <span className="text-sm font-medium text-slate-600 w-12 text-center select-none">
                        {Math.round(scale * 100)}%
                    </span>
                    <button
                        type="button"
                        onClick={zoomIn}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                        title="Zoom In"
                    >
                        <i className="fa-solid fa-plus text-xs"></i>
                    </button>
                </div>
            </div>
            {}
            <div
                ref={containerRef}
                className="flex-1 w-full overflow-auto flex justify-center p-6 bg-slate-100/50"
            >
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex flex-col items-center shadow-xl transition-transform duration-200 origin-top"
                    loading={
                        <div className="flex flex-col items-center justify-center pt-10 animate-pulse space-y-8 w-full max-w-[595px] aspect-[1/1.41] bg-white rounded shadow-sm mx-auto p-8 opacity-50">
                            {}
                            <div className="flex w-full space-x-6">
                                <div className="w-24 h-24 bg-slate-200 rounded-full flex-shrink-0"></div>
                                <div className="space-y-3 flex-1 py-2">
                                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                                </div>
                            </div>
                            {}
                            <div className="w-full space-y-4">
                                <div className="h-4 bg-slate-200 rounded w-full"></div>
                                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                                <div className="h-4 bg-slate-200 rounded w-4/6"></div>
                            </div>
                            <div className="w-full space-y-4 pt-4">
                                <div className="h-6 bg-slate-200 rounded w-1/3 mb-2"></div>
                                <div className="space-y-2">
                                    <div className="flex gap-4">
                                        <div className="h-20 w-1 bg-slate-200 rounded"></div>
                                        <div className="flex flex-col gap-2 flex-1">
                                            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                                            <div className="h-3 bg-slate-200 rounded w-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 mt-6 font-medium text-sm">
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                Generating PDF...
                            </div>
                        </div>
                    }
                    error={
                        <div className="flex flex-col items-center gap-2 mt-20 text-red-500">
                            <i className="fa-solid fa-circle-exclamation text-2xl"></i>
                            <span className="text-sm font-medium">Failed to load PDF</span>
                        </div>
                    }
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        width={containerWidth ? Math.min(containerWidth - 64, 800) : undefined}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="bg-white"
                    />
                </Document>
            </div>
        </div>
    );
}
