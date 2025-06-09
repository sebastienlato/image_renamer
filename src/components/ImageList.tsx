import React from 'react';
import { ImageFile } from '../types';
import { Image as ImageIcon, X } from 'lucide-react';

interface ImageListProps {
  images: ImageFile[];
  onRemove: (id: string) => void;
}

export const ImageList: React.FC<ImageListProps> = ({ images, onRemove }) => {
  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-gray-300">
        Selected Images ({images.length})
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="cyber-card group relative overflow-hidden"
          >
            <div className="aspect-square relative">
              {image.preview ? (
                <img
                  src={image.preview}
                  alt={image.file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-cyber-dark">
                  <ImageIcon className="w-8 h-8 text-cyber-blue/50" />
                </div>
              )}
              <button
                onClick={() => onRemove(image.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-cyber-dark/80 
                  hover:bg-cyber-dark border border-cyber-blue/20 hover:border-cyber-blue/50
                  opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <X className="w-4 h-4 text-cyber-blue" />
              </button>
            </div>
            <div className="p-3 border-t border-cyber-blue/20">
              <p className="text-sm text-gray-400 truncate" title={image.newName}>
                {image.newName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};