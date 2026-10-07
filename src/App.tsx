import React from 'react';
import { Download } from 'lucide-react';
import { DropZone } from './components/DropZone';
import { ConfigForm } from './components/ConfigForm';
import { ImageList } from './components/ImageList';
import { ImageFile, RenameConfig, FileType } from './types';
import { generateNewFileName, downloadZip } from './utils/fileHelpers';

const createDefaultConfig = (): RenameConfig => ({
  prefix: 'image',
  startNumber: 1,
  fileType: '.jpg' as FileType,
});

function App() {
  const [images, setImages] = React.useState<ImageFile[]>([]);
  const [config, setConfig] = React.useState<RenameConfig>(createDefaultConfig);

  const handleFilesAccepted = (newFiles: ImageFile[]) => {
    setImages((prev) => {
      const combined = [...prev, ...newFiles];
      return combined.map((image, index) => ({
        ...image,
        newName: generateNewFileName(index, config),
      }));
    });
  };

  const handleConfigChange = (newConfig: RenameConfig) => {
    setConfig(newConfig);
    setImages((prev) =>
      prev.map((image, index) => ({
        ...image,
        newName: generateNewFileName(index, newConfig),
      }))
    );
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((image) => image.id !== id);
      return filtered.map((image, index) => ({
        ...image,
        newName: generateNewFileName(index, config),
      }));
    });
  };

  const handleDownload = async () => {
    if (images.length === 0) {
      return;
    }

    await downloadZip(images);
    setImages([]);
    setConfig(createDefaultConfig());
  };

  React.useEffect(() => {
    handleConfigChange(config);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-gradient">
      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <div className="absolute inset-0 bg-cyber-glow pointer-events-none" />
        <div className="space-y-8 relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-linear-to-r from-cyber-blue to-cyber-indigo text-transparent bg-clip-text">
              Image Renamer
            </h1>
            <p className="mt-2 text-gray-400">
              Drag and drop your images, configure the naming pattern, and download them as a zip file.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <DropZone onFilesAccepted={handleFilesAccepted} />
            </div>
            <div className="cyber-card p-6 space-y-6">
              <ConfigForm config={config} onChange={handleConfigChange} />
              <button
                onClick={handleDownload}
                disabled={images.length === 0}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md
                  ${images.length === 0
                    ? 'bg-cyber-gray/50 cursor-not-allowed text-gray-500'
                    : 'cyber-button'
                  }`}
              >
                <Download className="w-5 h-5" />
                Download Zip
              </button>
            </div>
          </div>

          <ImageList images={images} onRemove={handleRemoveImage} />
        </div>
      </div>
    </div>
  );
}

export default App;
