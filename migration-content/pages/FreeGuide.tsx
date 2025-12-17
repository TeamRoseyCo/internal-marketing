import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Download, Star } from "lucide-react";
import { trackCompleteRegistration, trackLead } from "@/utils/facebook-pixel";

const benefits = [
  "Discover why Meta Ads outperform all other advertising platforms",
  "Learn the secret targeting strategies used by top marketers",
  "Get access to proven ad templates that convert",
  "Understand the psychology behind high-converting Meta Ads",
  "Master the art of audience research and segmentation"
];

export default function FreeGuide() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('free_guide_downloads')
        .insert({
          email,
          full_name: fullName,
          company: company || null
        });

      if (dbError) throw dbError;

      // Send welcome email
      const { error: emailError } = await supabase.functions.invoke('send-guide-email', {
        body: {
          email,
          fullName,
          company
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't throw here - we still want to show success even if email fails
      }

      // Add to Mailchimp
      try {
        const [firstName, lastName] = fullName.split(' ', 2);
        await supabase.functions.invoke('add-to-mailchimp', {
          body: {
            email,
            firstName,
            lastName,
            company,
            tags: ['free_guide'],
            source: 'free_guide_download'
          }
        });
      } catch (mailchimpError) {
        console.error('Mailchimp error:', mailchimpError);
        // Don't throw here - we still want to show success even if Mailchimp fails
      }

      // Notify admin about new free guide download
      try {
        await supabase.functions.invoke('notify-admin-form', {
          body: { 
            formType: 'free_guide', 
            data: { email, full_name: fullName, company },
            submissionTime: new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })
          },
        });
      } catch (adminError) {
        console.warn('Admin notification failed', adminError);
      }

      // Send webhook to LeadConnector
      try {
        await fetch('https://services.leadconnectorhq.com/hooks/fqJAm5GrUy4CKIP9hjiy/webhook-trigger/a56fb261-c32b-45a1-9dd5-f90140ee10f9', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            full_name: fullName,
            company: company || '',
            form_type: 'free_guide_download',
            timestamp: new Date().toISOString()
          })
        });
      } catch (webhookError) {
        console.warn('LeadConnector webhook failed', webhookError);
      }

      // Track Facebook Pixel conversion events
      trackLead();
      trackCompleteRegistration();
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Check your email for the free guide download link.",
      });

    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <SEO 
          title="Thank You! | Flowryse - Free Meta Ads Guide"
          description="Thank you for downloading our free guide on why Meta Ads are the greatest advertising platform. Check your email for the download link."
        />
        <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
                <p className="text-lg text-muted-foreground mb-6">
                  We've sent you an email with your free guide: "Why Meta Ads Are The Greatest"
                </p>
                <p className="text-sm text-muted-foreground">
                  Check your inbox (and spam folder) for the download link. If you don't see it within a few minutes, please contact us.
                </p>
              </div>
              
              <div className="mb-8 p-6 bg-gradient-to-br from-[hsl(var(--brand-purple))]/10 to-[hsl(var(--brand-magenta))]/10 rounded-lg border border-[hsl(var(--brand-purple))]/20">
                <h2 className="text-2xl font-bold mb-4 text-center">Want this DFY? Book a free consult today.</h2>
                <p className="text-muted-foreground text-center mb-4">
                  Ready to implement these strategies? Let's chat about how we can do it for you.
                </p>
                <Button asChild variant="hero" size="lg" className="w-full mb-4">
                  <Link to="/book-a-call">Book My Free Call</Link>
                </Button>
              </div>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/">Back to Homepage</Link>
              </Button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Free Guide: Why Meta Ads Are The Greatest | Flowryse"
        description="Download our free guide revealing why Meta Ads are the most powerful advertising platform for Australian local businesses. Get proven strategies and templates."
      />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-[hsl(var(--brand-purple))] via-[hsl(var(--brand-magenta))] to-[hsl(var(--brand-cyan))] bg-clip-text text-transparent">
                FREE GUIDE
              </h1>
              <h2 className="text-xl md:text-3xl font-bold mb-4 leading-tight">
                Why Meta Ads Are <span className="gradient-accent-text">The Greatest</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                Discover the data-driven strategies that top Australian businesses use to generate massive ROI with Meta Ads. 
                Download our comprehensive guide and transform your advertising results with precision tracking.
              </p>
            </div>

            {/* Guide Preview */}
            <div className="flex justify-center mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                {/* Front Cover */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(var(--brand-purple))] via-[hsl(var(--brand-magenta))] to-[hsl(var(--brand-cyan))] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-background rounded-lg p-2">
                    <img
                      src="/lovable-uploads/3fca0a0a-d186-4913-90c1-185d28ce03ef.png"
                      alt="4 Super Easy Ways - Free Guide Front Cover"
                      className="w-full h-auto rounded-md shadow-lg"
                    />
                  </div>
                </div>
                
                {/* Back Cover */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(var(--brand-cyan))] via-[hsl(var(--brand-magenta))] to-[hsl(var(--brand-purple))] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative bg-background rounded-lg p-2">
                    <img
                      src="/lovable-uploads/c0eb3503-8621-42ac-9d91-9ab2db8b101e.png"
                      alt="Get More Out of Your Advertising Dollar - Free Guide Back Cover"
                      className="w-full h-auto rounded-md shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-bold mb-6">What You'll Learn:</h3>
                <div className="tech-card p-6 rounded space-y-4">
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                          index % 3 === 0 ? 'bg-[hsl(var(--brand-purple))]' :
                          index % 3 === 1 ? 'bg-[hsl(var(--brand-cyan))]' :
                          'bg-[hsl(var(--brand-magenta))]'
                        }`}></span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 p-6 bg-[hsl(var(--brand-purple))]/10 rounded-lg border border-[hsl(var(--brand-purple))]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="h-5 w-5 text-[hsl(var(--brand-purple))]" />
                    <span className="font-semibold">Instant Download</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get immediate access to your guide delivered straight to your inbox.
                  </p>
                </div>
              </div>

              {/* Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Get Your Free Guide</CardTitle>
                  <CardDescription>
                    Enter your details below to download the guide instantly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter your company name"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full text-base py-4" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Download Free Guide"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}