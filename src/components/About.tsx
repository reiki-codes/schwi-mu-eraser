import { Heart, Sparkles, Shield } from "lucide-react";

export const About = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">About SchwieMuEraser</h2>
          <p className="text-xl text-muted-foreground">
            Created for fun, powered by AI magic ✨
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg">AI-Powered</h3>
            <p className="text-muted-foreground">
              Advanced machine learning detects and removes people naturally
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-bold text-lg">Private & Secure</h3>
            <p className="text-muted-foreground">
              Your photos are processed securely and never stored permanently
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-success" />
            </div>
            <h3 className="font-bold text-lg">Made with Love</h3>
            <p className="text-muted-foreground">
              Built to bring peace (and a bit of humor) to family photos
            </p>
          </div>
        </div>

        <div className="bg-muted rounded-2xl p-8 space-y-4">
          <h3 className="text-2xl font-bold">The Story</h3>
          <p className="text-muted-foreground leading-relaxed">
            We've all been there - a perfect family photo, except for that one person who just had to 
            photobomb or ruin the moment. SchwieMuEraser was born from the simple idea that sometimes, 
            family peace is just one AI-powered removal away.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether it's your annoying cousin, an ex, or just someone who blinked at the wrong moment, 
            we believe everyone deserves the perfect family photo. So we built this tool to make it 
            happen - quickly, easily, and with a touch of humor.
          </p>
          <p className="text-sm text-muted-foreground italic pt-4">
            P.S. - This is meant to be fun! Please use responsibly and with good intentions. 🙏
          </p>
        </div>
      </div>
    </section>
  );
};
