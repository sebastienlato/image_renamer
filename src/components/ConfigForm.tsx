import React from "react";
import { RenameConfig, FileType } from "../types";

interface ConfigFormProps {
  config: RenameConfig;
  onChange: (config: RenameConfig) => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ config, onChange }) => {
  const fileTypes: FileType[] = [
    ".jpg",
    ".png",
    ".jpeg",
    ".gif",
    ".bmp",
    ".webp",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({
      ...config,
      [name]: name === "startNumber" ? Number(value) : value,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="prefix"
          className="block text-sm font-medium text-gray-300"
        >
          Prefix
        </label>
        <input
          type="text"
          id="prefix"
          name="prefix"
          value={config.prefix}
          onChange={handleChange}
          className="mt-1 block w-full cyber-input"
          placeholder="image"
        />
      </div>

      <div>
        <label
          htmlFor="startNumber"
          className="block text-sm font-medium text-gray-300"
        >
          Start Number
        </label>
        <input
          type="number"
          id="startNumber"
          name="startNumber"
          value={config.startNumber}
          onChange={handleChange}
          min="0"
          className="mt-1 block w-full cyber-input"
        />
      </div>

      <div>
        <label
          htmlFor="fileType"
          className="block text-sm font-medium text-gray-300"
        >
          File Type
        </label>
        <select
          id="fileType"
          name="fileType"
          value={config.fileType}
          onChange={handleChange}
          className="mt-1 block w-full cyber-input"
        >
          {fileTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
