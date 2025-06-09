export type ImageFile = {
  id: string;
  file: File;
  preview: string;
  newName: string;
};

export type FileType = ".jpg" | ".png" | ".jpeg" | ".gif" | ".bmp" | ".webp";

export type RenameConfig = {
  prefix: string;
  startNumber: number;
  fileType: FileType;
};
