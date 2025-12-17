import { SEO } from "@/components/SEO";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Mail, TrendingUp, Target, BarChart3, Zap, CheckCircle2, Users } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  firstName: z.string().trim().min(1, { message: "First name is required" }).max(100, { message: "First name must be less than 100 characters" }),
});

const Newsletter = () => {
  const title = "Free Marketing Newsletter Australia | Weekly SEO & Ads Tips | Flowryse";
  const description = "Get free weekly marketing tips on Facebook Ads, Google Ads, SEO, and ROI tracking for Australian local businesses. Join 1000+ business owners learning to grow profitably.";
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate inputs
      const validatedData = newsletterSchema.parse({
        email,
        firstName,
      });

      const webhookUrl = "https://services.leadconnectorhq.com/hooks/fqJAm5GrUy4CKIP9hjiy/webhook-trigger/e3626d21-bf36-455f-b6cb-70134702f8d4";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: validatedData.email,
          firstName: validatedData.firstName,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been added to our newsletter.",
        });
        setEmail("");
        setFirstName("");
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Marketing Newsletter for Australian Businesses",
      description: "Free weekly marketing newsletter with Facebook Ads, Google Ads, SEO tips and ROI tracking strategies for Australian local businesses.",
      url: typeof window !== 'undefined' ? `${window.location.origin}/newsletter` : undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "NewsletterService",
      name: "Flowryse Marketing Newsletter",
      description: "Weekly data-driven marketing tips for Australian local businesses",
      provider: {
        "@type": "Organization",
        name: "Flowryse"
      }
    }
  ];

  return (
    <>
      <SEO title={title} description={description} structuredData={structuredData} />
      
      {/* Hero Section */}
      <section className="container py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-enter">
              <Mail className="w-4 h-4" />
              Free Marketing Newsletter
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight tracking-tight">
              Get <span className="gradient-accent-text">Marketing Tips</span> That Actually Work
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Join 1,000+ Australian business owners learning to run profitable Facebook Ads, Google Ads, and SEO campaigns. No fluff, just results.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 mb-16 animate-fade-in">
            <div className="tech-card p-6 rounded-xl text-center hover-scale">
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-[hsl(var(--brand-cyan))]" />
              </div>
              <div className="text-3xl font-bold gradient-accent-text mb-1">1,000+</div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div className="tech-card p-6 rounded-xl text-center hover-scale">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-[hsl(var(--brand-purple))]" />
              </div>
              <div className="text-3xl font-bold gradient-accent-text mb-1">Weekly</div>
              <div className="text-sm text-muted-foreground">Insights</div>
            </div>
            <div className="tech-card p-6 rounded-xl text-center hover-scale">
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-8 h-8 text-[hsl(var(--brand-magenta))]" />
              </div>
              <div className="text-3xl font-bold gradient-accent-text mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Free</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Benefits Section */}
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">What You'll Learn Every Week</h2>
              
              <div className="tech-card p-5 rounded-xl hover-scale group">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(var(--brand-purple)/0.1)] border border-[hsl(var(--brand-purple)/0.3)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Target className="w-6 h-6 text-[hsl(var(--brand-purple))]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Facebook & Instagram Ads</h3>
                    <p className="text-sm text-muted-foreground">Stop wasting money on Boost Posts. Learn targeting strategies that convert.</p>
                  </div>
                </div>
              </div>

              <div className="tech-card p-5 rounded-xl hover-scale group">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(var(--brand-cyan)/0.1)] border border-[hsl(var(--brand-cyan)/0.3)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6 text-[hsl(var(--brand-cyan))]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Google Ads & Local SEO</h3>
                    <p className="text-sm text-muted-foreground">Rank higher in local searches and capture high-intent customers actively searching for your services.</p>
                  </div>
                </div>
              </div>

              <div className="tech-card p-5 rounded-xl hover-scale group">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(var(--brand-magenta)/0.1)] border border-[hsl(var(--brand-magenta)/0.3)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-6 h-6 text-[hsl(var(--brand-magenta))]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">ROI Tracking & Analytics</h3>
                    <p className="text-sm text-muted-foreground">Track every dollar spent and know exactly what's making you money (and what's not).</p>
                  </div>
                </div>
              </div>

              <div className="tech-card p-5 rounded-xl hover-scale group">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-[hsl(var(--brand-purple)/0.1)] border border-[hsl(var(--brand-purple)/0.3)] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-[hsl(var(--brand-purple))]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Automation & Systems</h3>
                    <p className="text-sm text-muted-foreground">Build marketing systems that work 24/7 without increasing your workload.</p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Trusted by Australian Business Owners</p>
                    <p className="text-xs text-muted-foreground">From tradies to retailers, café owners to coaches — real businesses getting real results.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <div className="animate-fade-in">
              <div className="tech-card p-8 rounded-xl border-2 border-primary/20 shadow-brand sticky top-24">
                <div className="mb-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[hsl(var(--brand-purple))] to-[hsl(var(--brand-magenta))] flex items-center justify-center">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Start Learning Today</h3>
                  <p className="text-sm text-muted-foreground">Join free. Unsubscribe anytime.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium flex items-center gap-2">
                      First Name
                      <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      Email Address
                      <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold"
                    variant="hero"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Subscribing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Get Weekly Tips (Free)
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground pt-2">
                    We respect your privacy. Unsubscribe anytime with one click.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;