import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  onPhotoSelected: (file: File) => void;
}

export const PhotoUpload = ({ onPhotoSelected }: PhotoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onPhotoSelected(file);
    }
  }, [onPhotoSelected]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoSelected(file);
    }
  }, [onPhotoSelected]);

  return (
    <section className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">Upload Your Photo</h2>
          <p className="text-muted-foreground">
            Drop your family photo here or click to browse
          </p>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          className={cn(
            "border-2 border-dashed rounded-2xl p-12 transition-all duration-300",
            "hover:border-primary hover:bg-primary/5",
            isDragging ? "border-primary bg-primary/10 scale-105" : "border-border"
          )}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
              isDragging ? "bg-primary text-primary-foreground scale-110" : "bg-muted text-muted-foreground"
            )}>
              {isDragging ? <Upload className="w-10 h-10" /> : <ImageIcon className="w-10 h-10" />}
            </div>

            <div className="text-center space-y-2">
              <p className="text-lg font-medium">
                {isDragging ? "Drop it like it's hot! 🔥" : "Drag & drop your photo"}
              </p>
              <p className="text-sm text-muted-foreground">
                JPG, PNG up to 20MB
              </p>
            </div>

            <label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileInput}
                className="hidden"
              />
              <Button variant="secondary" size="lg" className="rounded-full" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};
