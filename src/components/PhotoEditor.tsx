import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, UserMinus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PersonSelector } from "./PersonSelector";

interface PhotoEditorProps {
  photo: File;
  onBack: () => void;
}

export const PhotoEditor = ({ photo, onBack }: PhotoEditorProps) => {
  const [mode, setMode] = useState<'select' | 'result'>('select');
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string>("");
  const { toast } = useToast();

  useState(() => {
    const url = URL.createObjectURL(photo);
    setOriginalImage(url);
    return () => URL.revokeObjectURL(url);
  });

  const handlePersonRemoved = (resultUrl: string) => {
    setProcessedImage(resultUrl);
    setMode('result');
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'schwiemu-eraser-result.png';
    link.click();

    toast({
      title: "Downloaded! 🎉",
      description: "Your edited photo is ready to share.",
    });
  };

  if (mode === 'select') {
    return (
      <PersonSelector 
        imageUrl={originalImage}
        onPersonRemoved={handlePersonRemoved}
        onBack={onBack}
      />
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Upload Different Photo
          </Button>
          
          <h2 className="text-3xl font-bold mb-3">Result</h2>
          <p className="text-muted-foreground">
            Compare before and after, then download your edited photo!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Original</h3>
            <div className="relative rounded-xl overflow-hidden bg-muted aspect-[4/3] shadow-card">
              <img 
                src={originalImage} 
                alt="Original" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Edited ✨
            </h3>
            <div className="relative rounded-xl overflow-hidden bg-muted aspect-[4/3] shadow-card">
              <img 
                src={processedImage!} 
                alt="Processed" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              setProcessedImage(null);
              setMode('select');
            }}
            className="rounded-full"
          >
            <UserMinus className="w-5 h-5 mr-2" />
            Remove Another Person
          </Button>
          <Button
            size="lg"
            onClick={handleDownload}
            className="rounded-full px-8"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Result
          </Button>
        </div>
      </div>
    </section>
  );
};
