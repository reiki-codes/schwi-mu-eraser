import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

export const Pricing = () => {
  return (
    <section className="py-20 px-4 bg-gradient-soft">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Simple, Honest Pricing</h2>
          <p className="text-xl text-muted-foreground">
            Try it free, then pay only for what you use
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Trial */}
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <h3 className="text-2xl font-bold mb-2">Free Trial</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">€0</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Perfect for testing the magic
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>1 free photo removal</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>Full quality export</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>No credit card needed</span>
              </li>
            </ul>
            <Button variant="secondary" size="lg" className="w-full rounded-full">
              Start Free
            </Button>
          </div>

          {/* Pay Per Photo */}
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
            <h3 className="text-2xl font-bold mb-2">Pay as You Go</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">€0.09</span>
              <span className="text-muted-foreground">/photo</span>
            </div>
            <p className="text-muted-foreground mb-6">
              Only pay for what you edit
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>No subscription needed</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>High quality results</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>Credits never expire</span>
              </li>
            </ul>
            <Button variant="outline" size="lg" className="w-full rounded-full">
              Buy Credits
            </Button>
          </div>

          {/* Pro Subscription */}
          <div className="bg-gradient-hero rounded-2xl p-8 shadow-soft border-2 border-primary relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Popular
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-2 text-primary-foreground">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-foreground">€5</span>
              <span className="text-primary-foreground/80">/month</span>
            </div>
            <p className="text-primary-foreground/90 mb-6">
              For serious photo editors
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary-foreground mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground">Unlimited photo removals</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary-foreground mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground">Priority processing</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary-foreground mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground">Advanced editing tools</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary-foreground mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground">No watermarks</span>
              </li>
            </ul>
            <Button 
              size="lg" 
              className="w-full rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Go Pro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
