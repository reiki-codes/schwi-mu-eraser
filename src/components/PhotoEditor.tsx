import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Sparkles, ArrowLeft } from "lucide-react";
import { removeBackground, loadImage } from "@/lib/imageProcessing";
import { useToast } from "@/hooks/use-toast";

interface PhotoEditorProps {
  photo: File;
  onBack: () => void;
}

export const PhotoEditor = ({ photo, onBack }: PhotoEditorProps) => {
  const [processing, setProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string>("");
  const { toast } = useToast();

  useState(() => {
    const url = URL.createObjectURL(photo);
    setOriginalImage(url);
    return () => URL.revokeObjectURL(url);
  });

  const handleProcess = async () => {
    setProcessing(true);
    try {
      const img = await loadImage(photo);
      const result = await removeBackground(img);
      const resultUrl = URL.createObjectURL(result);
      setProcessedImage(resultUrl);
      
      toast({
        title: "Peace restored! 😌",
        description: "Your photo has been magically edited.",
      });
    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
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
          
          <h2 className="text-3xl font-bold mb-3">AI Photo Editor</h2>
          <p className="text-muted-foreground">
            {processedImage 
              ? "Compare before and after, then download your masterpiece!"
              : "Click 'Remove Background' to let AI work its magic"}
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
              {processedImage ? "Edited ✨" : "Result"}
            </h3>
            <div className="relative rounded-xl overflow-hidden bg-muted aspect-[4/3] shadow-card">
              {processedImage ? (
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Sparkles className="w-12 h-12 mx-auto text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">Waiting for magic...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {!processedImage ? (
            <Button
              size="lg"
              onClick={handleProcess}
              disabled={processing}
              className="rounded-full px-8"
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Remove Background
                </>
              )}
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  setProcessedImage(null);
                }}
                className="rounded-full"
              >
                Try Again
              </Button>
              <Button
                size="lg"
                onClick={handleDownload}
                className="rounded-full px-8"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Result
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
