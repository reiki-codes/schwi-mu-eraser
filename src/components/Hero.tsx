import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";

export const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-soft -z-10" />
      
      <div className="max-w-4xl mx-auto text-center space-y-8 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Eraser className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Photo Editing</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-hero bg-clip-text text-transparent">
            One Click,
          </span>
          <br />
          <span className="text-foreground">Family Peace Restored</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Remove anyone from your family photos with AI magic. 
          No drama, just results. ✨
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="text-lg px-8 py-6 rounded-full shadow-soft hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Try Free Now
          </Button>
          <p className="text-sm text-muted-foreground">
            First photo is free • No credit card required
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">AI-Powered</div>
            <div className="text-sm text-muted-foreground">Smart Detection</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">Instant</div>
            <div className="text-sm text-muted-foreground">Results in Seconds</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">€0.09</div>
            <div className="text-sm text-muted-foreground">Per Photo</div>
          </div>
        </div>
      </div>
    </section>
  );
};
