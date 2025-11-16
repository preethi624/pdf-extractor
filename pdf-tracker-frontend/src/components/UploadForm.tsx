/*import { useState } from "react";

import { fileUploadRepositry } from "../repositories/fileUploadRepository";
import PdfViewer from "./PdfViewer";

const UploadForm = () => {
  const [file, setFile] = useState<File|null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const [fileUrl,setFileUrl]=useState("")

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;
     const fileName = selectedFile.name.toLowerCase();

    //Validation to check if it is pdf
    if (!fileName.endsWith(".pdf")) {
      setError("Please upload a valid PDF file.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };
 
  

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file before uploading.");
      return;
    }

    try {
      setUploadStatus("Uploading...");
      const formData = new FormData();
      formData.append("file", file);

      // 🔗 change URL if your backend runs on a different port
      const response = await fileUploadRepositry.fileUpload(formData)

      setUploadStatus("File uploaded successfully!");
      console.log("Upload response:", response);
      
     

      setFileUrl(response.response.data.fileData.filePath.url)

    } catch (err) {
      console.error(err);
      setUploadStatus("");
      setError("Failed to upload file. Please try again.");
    }
  };
  console.log("url",fileUrl);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  {fileUrl && (
    <div className="w-full max-w-3xl h-[500px]">
      <PdfViewer fileUrl={fileUrl} />
    </div>
  )}



      <form
        onSubmit={handleUpload}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Upload a PDF File</h2>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full border border-gray-300 rounded-lg p-2 mb-4"
        />

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Upload
        </button>

        {uploadStatus && <p className="text-green-600 mt-4">{uploadStatus}</p>}
      </form>
    </div>
  );
  
};

export default UploadForm;*/

import { useState } from "react";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { fileUploadRepositry } from "../repositories/fileUploadRepository";
import PdfViewer from "./PdfViewer";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;
    const fileName = selectedFile.name.toLowerCase();

    if (!fileName.endsWith(".pdf")) {
      setError("Please upload a valid PDF file.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file before uploading.");
      return;
    }

    try {
      setUploadStatus("Uploading...");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fileUploadRepositry.fileUpload(formData);

      setUploadStatus("File uploaded successfully!");
      console.log("Upload response:", response);

      setFileUrl(response.response.data.fileData.filePath.url);
    } catch (err) {
      console.error(err);
      setUploadStatus("");
      setError("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
     
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">PDF Manager</h1>
          <p className="text-gray-600">Upload and manage your PDF documents with ease</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
         
          <div className="bg-white shadow-xl rounded-3xl p-8 lg:p-12 border border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">
              Upload PDF File
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select PDF File
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl p-6 transition-all hover:border-blue-400"
                  />
                </div>
              </div>

              {file && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium truncate">
                    {file.name}
                  </span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-sm text-red-800">{error}</span>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!file || uploadStatus === "Uploading..."}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {uploadStatus === "Uploading..." ? "Uploading..." : "Upload File"}
              </button>

              {uploadStatus && uploadStatus !== "Uploading..." && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">
                    {uploadStatus}
                  </span>
                </div>
              )}
            </div>
          </div>

          
          <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
            {fileUrl ? (
              <PdfViewer fileUrl={fileUrl} />
            ) : (
              <div className="h-full min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gray-100 p-6 rounded-full inline-block mb-4">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No PDF Loaded
                  </h3>
                  <p className="text-gray-500">
                    Upload a PDF file to view it here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
