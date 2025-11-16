

/*import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";


import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";
import { fileUploadRepositry } from "../repositories/fileUploadRepository";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer = ({ fileUrl }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const onDocumentLoadSuccess = (pdf: { numPages: number }) => {
    setNumPages(pdf.numPages);
  };

  const togglePageSelection = (pageNumber: number) => {
    if (selectedPages.includes(pageNumber)) {
      setSelectedPages(selectedPages.filter((p) => p !== pageNumber));
    } else {
      setSelectedPages([...selectedPages, pageNumber]);
    }
  };

  const createNewPDF = async () => {
    if (selectedPages.length === 0) {
      alert("Please select pages first!");
      return;
    }

   
    try {
      const response=await fileUploadRepositry.createNewPdf(fileUrl,selectedPages);
      const blob = new Blob([response], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    
    setDownloadUrl(url)
      
    } catch (error) {
       console.error(error);
    alert("Error creating PDF. Please try again.")
    }
  };

  return (
    <div className="border rounded-lg overflow-auto h-[80vh] p-2">
     
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }, (_, index) => (
          <div
            key={`page_${index + 1}`}
            style={{
              marginBottom: "10px",
              border: selectedPages.includes(index + 1)
                ? "2px solid blue"
                : "1px solid #ddd",
              cursor: "pointer",
            }}
            onClick={() => togglePageSelection(index + 1)}
          >
            <Page pageNumber={index + 1} width={600} />
            <p style={{ textAlign: "center" }}>Page {index + 1}</p>
          </div>
        ))}
      </Document>

      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        onClick={createNewPDF}
      >
        Create New PDF with Selected Pages
      </button>
      {downloadUrl && (
  <a
    href={downloadUrl}
    download="selected_pages.pdf"
    className="mt-2 p-2 bg-green-500 text-white rounded inline-block"
  >
    Download New PDF
  </a>
)}
    </div>
  );
};

export default PdfViewer;*/
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download, FileCheck, Loader2, X } from "lucide-react";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";
import { fileUploadRepositry } from "../repositories/fileUploadRepository";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer = ({ fileUrl }: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [isCreating, setIsCreating] = useState(false);

  const onDocumentLoadSuccess = (pdf: { numPages: number }) => {
    setNumPages(pdf.numPages);
  };

  const togglePageSelection = (pageNumber: number) => {
    if (selectedPages.includes(pageNumber)) {
      setSelectedPages(selectedPages.filter((p) => p !== pageNumber));
    } else {
      setSelectedPages([...selectedPages, pageNumber].sort((a, b) => a - b));
    }
  };

  const createNewPDF = async () => {
    if (selectedPages.length === 0) {
      alert("Please select pages first!");
      return;
    }

    setIsCreating(true);
    try {
      const response = await fileUploadRepositry.createNewPdf(fileUrl, selectedPages);
      const blob = new Blob([response], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
    } catch (error) {
      console.error(error);
      alert("Error creating PDF. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with Controls */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-6 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">PDF Preview</h3>
            <p className="text-blue-100 text-sm">
              {numPages > 0 ? `${numPages} pages loaded` : "Loading..."}
            </p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-white font-semibold">
              {selectedPages.length} selected
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={createNewPDF}
            disabled={selectedPages.length === 0 || isCreating}
            className="flex items-center gap-2 bg-white text-blue-600 py-2.5 px-5 rounded-lg font-semibold hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <FileCheck className="w-4 h-4" />
                Create PDF
              </>
            )}
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download="selected_pages.pdf"
              className="flex items-center gap-2 bg-green-500 text-white py-2.5 px-5 rounded-lg font-semibold hover:bg-green-600 transition-all shadow-lg"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
          )}

          {selectedPages.length > 0 && (
            <button
              onClick={() => setSelectedPages([])}
              className="flex items-center gap-2 bg-red-500 text-white py-2.5 px-5 rounded-lg font-semibold hover:bg-red-600 transition-all shadow-lg"
            >
              <X className="w-4 h-4" />
              Clear Selection
            </button>
          )}
        </div>
      </div>

      {/* PDF Document Viewer - Horizontal Scroll */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden bg-gray-50 rounded-2xl p-6">
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <div className="flex gap-6 pb-4">
            {Array.from({ length: numPages }, (_, index) => {
              const pageNum = index + 1;
              const isSelected = selectedPages.includes(pageNum);

              return (
                <div
                  key={`page_${pageNum}`}
                  className="flex-shrink-0 relative"
                >
                  {/* Checkbox Container with Background */}
                  <div className="absolute top-4 left-4 z-10 bg-white rounded-md p-1 shadow-lg">
                    <input
                      type="checkbox"
                      id={`page-checkbox-${pageNum}`}
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        togglePageSelection(pageNum);
                      }}
                      className="w-5 h-5 cursor-pointer accent-blue-600 rounded"
                    />
                  </div>

                  {/* Page Number Badge */}
                  <div className="absolute top-4 right-4 z-10 bg-gray-800 bg-opacity-90 text-white px-3 py-1.5 rounded-full font-semibold text-sm shadow-lg">
                    Page {pageNum}
                  </div>

                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-lg flex items-center gap-2">
                      <FileCheck className="w-4 h-4" />
                      Selected
                    </div>
                  )}

                  {/* PDF Page */}
                  <div
                    onClick={() => togglePageSelection(pageNum)}
                    className={`
                      relative transition-all duration-200 cursor-pointer
                      ${isSelected
                        ? "ring-4 ring-blue-500 shadow-2xl"
                        : "ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-300 shadow-lg hover:shadow-xl"
                      }
                      rounded-xl overflow-hidden bg-white
                    `}
                  >
                    <div className="p-4">
                      <Page
                        pageNumber={pageNum}
                        height={400}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;