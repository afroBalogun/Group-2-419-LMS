import { useState } from "react";
import getBaseUrl from "../utils/baseUrl";

export default function FileDownload({ filePath, fileName = "Course Material" }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  // Extract the filename from the filePath if available
  const extractedFileName = filePath ? filePath.split('/').pop() : fileName;
  
  const handleDownload = async () => {
    if (!filePath) {
      setError("No file available for download");
      return;
    }

    try {
      setIsDownloading(true);
      setError(null);
      
      // Check if the filePath is a full URL or just a path
      const fileUrl = filePath.startsWith('http') 
  ? filePath 
  : `${getBaseUrl()}${filePath}`;

      
      // Create a hidden anchor element to trigger the download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', extractedFileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (err) {
      setError("Download failed. Please try again.");
      console.error("Download error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!filePath) {
    return null;
  }

  return (
    <div className="mt-6">
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`w-full bg-[#008a63] text-white text-center font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[#00704f] hover:shadow-lg transition-all duration-200 ${
          isDownloading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isDownloading ? "Downloading..." : `Download ${fileName}`}
      </button>
      
      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
}