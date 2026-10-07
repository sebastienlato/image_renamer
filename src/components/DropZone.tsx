import React from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Folder } from "lucide-react";
import { isImageFile, generatePreview } from "../utils/fileHelpers";
import { ImageFile } from "../types";

interface DropZoneProps {
  onFilesAccepted: (files: ImageFile[]) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFilesAccepted }) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const processFiles = async (files: File[]): Promise<ImageFile[]> => {
    const imageFiles = files.filter(isImageFile);
    const total = imageFiles.length;
    const processed: ImageFile[] = [];

    for (let i = 0; i < total; i++) {
      const file = imageFiles[i];
      const preview = await generatePreview(file);
      processed.push({
        id: crypto.randomUUID(),
        file,
        preview,
        newName: file.name,
      });
      setProgress(Math.round(((i + 1) / total) * 100));
    }

    return processed;
  };

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      setIsProcessing(true);
      setProgress(0);

      try {
        const processedFiles = await processFiles(acceptedFiles);
        onFilesAccepted(processedFiles);
      } finally {
        setIsProcessing(false);
        setProgress(0);
      }
    },
    [onFilesAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"],
    },
    noClick: isProcessing,
    noKeyboard: isProcessing,
    noDrag: isProcessing,
  });

  return (
    <div
      {...getRootProps()}
      className={`cyber-card p-8 border-2 border-dashed cursor-pointer transition-all duration-300
        ${
          isDragActive
            ? "border-cyber-blue bg-cyber-blue/5 shadow-lg shadow-cyber-blue/20"
            : "border-cyber-blue/20 hover:border-cyber-blue/50 hover:shadow-lg hover:shadow-cyber-blue/10"
        }
        ${isProcessing ? "cursor-wait" : ""}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center text-gray-300">
        {isProcessing ? (
          <>
            <div className="w-16 h-16 mb-4 relative">
              <div className="absolute inset-0 border-4 border-cyber-blue/20 rounded-full" />
              <div
                className="absolute inset-0 border-4 border-cyber-blue rounded-full"
                style={{
                  clipPath: `polygon(0 0, 100% 0, 100% ${progress}%, 0 ${progress}%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium">{progress}%</span>
              </div>
            </div>
            <p className="text-xl font-medium text-cyber-blue">
              Processing images...
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Upload
                className={`w-12 h-12 transition-colors duration-300 ${
                  isDragActive ? "text-cyber-blue" : "text-cyber-blue/50"
                }`}
              />
              <Folder
                className={`w-16 h-16 transition-colors duration-300 ${
                  isDragActive ? "text-cyber-blue" : "text-cyber-blue/50"
                }`}
              />
            </div>
            <p className="text-xl font-medium bg-linear-to-r from-cyber-blue to-cyber-indigo text-transparent bg-clip-text">
              {isDragActive
                ? "Drop your folder or images here..."
                : "Drag & drop a folder or images here"}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Supports folders and multiple images (JPG, PNG, GIF, BMP, WEBP)
            </p>
          </>
        )}
      </div>
    </div>
  );
};
