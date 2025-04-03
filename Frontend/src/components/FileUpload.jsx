import { useState } from "react";
import getBaseUrl from "../utils/baseUrl";
import { useParams } from "react-router";

export default function FileUpload({ onUploadSuccess, initialFilePath }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedFilePath, setUploadedFilePath] = useState(initialFilePath || null);
    const {courseId} = useParams(); // Get courseId 

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
        setUploadError("Please select a file to upload");
        return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("courseId", courseId); // Pass courseId

        const uploadUrl = `${getBaseUrl()}/api/uploads/upload`;

        const response = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Upload failed with status: ${response.status}`);
        }

        const data = await response.json();
        setUploadedFilePath(data.filePath);

        if (onUploadSuccess) {
            onUploadSuccess(data.filePath);
        }
    } catch (err) {
        console.error("Upload error:", err);
        setUploadError(err.message || "Upload failed. Please try again.");
    } finally {
        setIsUploading(false);
    }
};


  return (
    <div className="mb-4">
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 border rounded-md w-full"
          disabled={isUploading}
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`px-4 py-2 rounded-md ${
            !file || isUploading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } transition-all`}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {uploadError && (
        <p className="text-red-500 text-sm mt-1">{uploadError}</p>
      )}

      {uploadedFilePath && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-700">
            File uploaded successfully!
          </p>
          <p className="text-xs text-gray-500 truncate">
            Path: {uploadedFilePath}
          </p>
        </div>
      )}
    </div>
  );
}