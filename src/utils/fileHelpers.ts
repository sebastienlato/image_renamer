import { saveAs } from "file-saver";
import JSZip from "jszip";
import { ImageFile, RenameConfig } from "../types";

export const isImageFile = (file: File): boolean => {
  const imageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
  ];
  return imageTypes.includes(file.type);
};

export const generatePreview = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // For large batches, create smaller previews to save memory
      if (file.size > 1024 * 1024) {
        // If larger than 1MB
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d")!;

          // Scale down the image
          const maxSize = 200;
          const scale = Math.min(maxSize / img.width, maxSize / img.height);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.src = reader.result as string;
      } else {
        resolve(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  });
};

export const generateNewFileName = (
  index: number,
  config: RenameConfig
): string => {
  const paddedNumber = String(config.startNumber + index).padStart(3, "0");
  return `${config.prefix}${paddedNumber}${config.fileType}`;
};

export const downloadZip = async (images: ImageFile[]): Promise<void> => {
  const zip = new JSZip();
  const total = images.length;

  // Create a folder if there are many images
  const folder = total > 10 ? zip.folder("renamed-images") : zip;

  images.forEach((image) => {
    folder!.file(image.newName, image.file);
  });

  const content = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: {
      level: 6,
    },
  });

  saveAs(content, "renamed-images.zip");
};
