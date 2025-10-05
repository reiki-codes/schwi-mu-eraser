import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Detection {
  box: [number, number, number, number];
  score: number;
  label: string;
}

interface PersonSelectorProps {
  imageUrl: string;
  onPersonRemoved: (resultUrl: string) => void;
  onBack: () => void;
}

export const PersonSelector = ({ imageUrl, onPersonRemoved, onBack }: PersonSelectorProps) => {
  const [detecting, setDetecting] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    detectPeople();
  }, []);

  const detectPeople = async () => {
    setDetecting(true);
    try {
      const { data, error } = await supabase.functions.invoke('detect-people', {
        body: { imageUrl }
      });

      if (error) throw error;

      const peopleDetections = data.detections.filter((d: Detection) => 
        d.label === 'person' && d.score > 0.5
      );
      
      setDetections(peopleDetections);
      
      if (peopleDetections.length === 0) {
        toast({
          title: "No people detected",
          description: "We couldn't detect any people in this image.",
          variant: "destructive",
        });
      } else {
        toast({
          title: `Found ${peopleDetections.length} ${peopleDetections.length === 1 ? 'person' : 'people'}`,
          description: "Click on a bounding box to select who to remove.",
        });
        drawDetections(peopleDetections);
      }
    } catch (error) {
      console.error('Detection error:', error);
      toast({
        title: "Detection failed",
        description: "Could not detect people. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDetecting(false);
    }
  };

  const drawDetections = (dets: Detection[]) => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    ctx.drawImage(img, 0, 0);
    
    dets.forEach((det, idx) => {
      const [x1, y1, x2, y2] = det.box;
      
      ctx.strokeStyle = selectedBox === idx ? '#10b981' : '#ef4444';
      ctx.lineWidth = 4;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
      
      ctx.fillStyle = selectedBox === idx ? '#10b981' : '#ef4444';
      ctx.fillRect(x1, y1 - 30, 100, 30);
      ctx.fillStyle = '#ffffff';
      ctx.font = '16px sans-serif';
      ctx.fillText(`Person ${idx + 1}`, x1 + 5, y1 - 8);
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    let clicked = -1;
    detections.forEach((det, idx) => {
      const [x1, y1, x2, y2] = det.box;
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        clicked = idx;
      }
    });

    if (clicked !== -1) {
      setSelectedBox(clicked);
      drawDetections(detections);
    }
  };

  const handleRemovePerson = async () => {
    if (selectedBox === null) {
      toast({
        title: "No selection",
        description: "Please select a person to remove.",
        variant: "destructive",
      });
      return;
    }

    setRemoving(true);
    try {
      // Create mask for the selected person
      const det = detections[selectedBox];
      const maskCanvas = document.createElement('canvas');
      const img = imgRef.current;
      if (!img) throw new Error('Image not loaded');

      maskCanvas.width = img.naturalWidth;
      maskCanvas.height = img.naturalHeight;
      const maskCtx = maskCanvas.getContext('2d');
      if (!maskCtx) throw new Error('Could not get mask context');

      maskCtx.fillStyle = 'black';
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      maskCtx.fillStyle = 'white';
      const [x1, y1, x2, y2] = det.box;
      maskCtx.fillRect(x1, y1, x2 - x1, y2 - y1);

      const maskDataUrl = maskCanvas.toDataURL('image/png');

      const { data, error } = await supabase.functions.invoke('remove-person', {
        body: { 
          imageUrl,
          maskUrl: maskDataUrl
        }
      });

      if (error) throw error;

      onPersonRemoved(data.result);
      
      toast({
        title: "Person removed! ✨",
        description: "The selected person has been erased from your photo.",
      });
    } catch (error) {
      console.error('Removal error:', error);
      toast({
        title: "Removal failed",
        description: "Could not remove person. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRemoving(false);
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3">Select Person to Remove</h2>
          <p className="text-muted-foreground">
            {detecting 
              ? "Detecting people in your photo..."
              : "Click on a person to select them, then click 'Remove Selected Person'"}
          </p>
        </div>

        <div className="relative mb-8">
          <img 
            ref={imgRef}
            src={imageUrl} 
            alt="Source" 
            className="hidden"
            crossOrigin="anonymous"
            onLoad={() => drawDetections(detections)}
          />
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-auto rounded-xl shadow-card cursor-crosshair"
            style={{ maxHeight: '70vh', objectFit: 'contain' }}
          />
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onBack}
            className="rounded-full"
          >
            <X className="w-5 h-5 mr-2" />
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={handleRemovePerson}
            disabled={detecting || removing || selectedBox === null}
            className="rounded-full px-8"
          >
            {removing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                Remove Selected Person
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};
