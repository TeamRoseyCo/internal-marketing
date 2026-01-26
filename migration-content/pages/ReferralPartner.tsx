import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  DollarSign, 
  Handshake, 
  CheckCircle2, 
  Gift, 
  TrendingUp, 
  Zap,
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

const ReferralPartner = () => {
  const title = "Referral Partner Program | Flowryse";
  const description = "Earn $300 AUD for every business you refer to Flowryse. Join our referral partner program and help Australian businesses grow while earning rewards.";
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send webhook to LeadConnector for referral partner enquiry
      await fetch('https://services.leadconnectorhq.com/hooks/fqJAm5GrUy4CKIP9hjiy/webhook-trigger/f68da434-fcd2-40ef-865c-c03a9dfc4c0a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          full_name: fullName,
          phone: phone || '',
          message: message || '',
          form_type: 'referral_partner_enquiry',
          timestamp: new Date().toISOString()
        })
      });

      // Notify admin
      try {
        await supabase.functions.invoke('notify-admin-form', {
          body: { 
            formType: 'referral_partner', 
            data: { email, full_name: fullName, phone, message },
            submissionTime: new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })
          },
        });
      } catch (adminError) {
        console.warn('Admin notification failed', adminError);
      }

      toast({
        title: "Message Sent!",
        description: "We'll be in touch within 24 hours to discuss the referral program.",
      });

      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");

    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "$300 Per Referral",
      description: "Earn $300 AUD for every business you refer that signs up with us. Cash or credit—your choice."
    },
    {
      icon: Gift,
      title: "Client Discount Option",
      description: "Already a client? Choose to receive your $300 as a discount on next month's invoice instead."
    },
    {
      icon: Zap,
      title: "No Cap on Earnings",
      description: "There's no limit. Refer 10 businesses and earn $3,000. We reward loyalty without limits."
    },
    {
      icon: Handshake,
      title: "Simple Process",
      description: "Just connect us with a business owner. We handle the rest. You get paid when they sign."
    }
  ];

  const faqs = [
    {
      question: "How do I refer someone?",
      answer: "Simply fill out the contact form on this page with your details and the business you'd like to refer. Or email us directly at team@roseyco.com. We'll reach out, mention your name, and handle everything from there."
    },
    {
      question: "When do I get paid?",
      answer: "You'll receive your $300 AUD within 7 days of the referred business signing up for any of our packages. We'll notify you as soon as they're onboarded."
    },
    {
      question: "Can I refer multiple businesses?",
      answer: "Absolutely! There's no cap on referrals. Every business that signs up through your referral earns you $300. Refer as many as you like."
    },
    {
      question: "What if I'm already a Flowryse client?",
      answer: "Even better! You can choose to receive your $300 as cash, or we'll apply it as a $300 discount to your next month's invoice. Your choice."
    },
    {
      question: "What types of businesses can I refer?",
      answer: "Any Australian business that needs lead generation—tradies, gyms, restaurants, clinics, professional services, hospitality, and more. If they want more customers, we can help."
    },
    {
      question: "Do I need to be a client to refer?",
      answer: "Not at all. Anyone can participate in our referral program. If you know a business owner who'd benefit from our services, we'd love the introduction."
    }
  ];

  return (
    <>
      <SEO title={title} description={description} />
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container relative">
          {/* Stats Banner */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in">
            <div className="tech-card p-4 text-center group">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-brand-cyan group-hover:scale-110 transition-transform" />
              <p className="text-2xl font-bold gradient-accent-text">$300</p>
              <p className="text-sm text-muted-foreground">Per Referral</p>
            </div>
            <div className="tech-card p-4 text-center group">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-brand-magenta group-hover:scale-110 transition-transform" />
              <p className="text-2xl font-bold gradient-accent-text">Unlimited</p>
              <p className="text-sm text-muted-foreground">Earning Potential</p>
            </div>
            <div className="tech-card p-4 text-center group">
              <Zap className="w-6 h-6 mx-auto mb-2 text-brand-cyan group-hover:scale-110 transition-transform" />
              <p className="text-2xl font-bold gradient-accent-text">7 Days</p>
              <p className="text-sm text-muted-foreground">Fast Payout</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Heading & Copy */}
            <div className="space-y-8 lg:sticky lg:top-24">
              <div className="space-y-4">
                <Badge variant="outline" className="border-brand-cyan text-brand-cyan px-4 py-1">
                  <Handshake className="w-3 h-3 mr-2" />
                  Referral Partner Program
                </Badge>
                <h1 className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight animate-fade-in">
                  Earn <span className="gradient-accent-text">$300</span><br />
                  Per Referral
                </h1>
              </div>
              
              <div className="space-y-4 text-lg text-muted-foreground max-w-lg animate-fade-in" style={{animationDelay: '0.1s'}}>
                <p className="text-xl font-medium text-foreground">
                  Know a business that needs more customers? Refer them to us and get rewarded.
                </p>
                <p>
                  For every business you refer that signs up with Flowryse, you'll receive <span className="text-brand-cyan font-semibold">$300 AUD</span>—or a $300 discount on your own invoice if you're already a client.
                </p>
              </div>

              {/* Capacity Message */}
              <div className="tech-card p-6 bg-gradient-to-r from-brand-cyan/5 to-brand-magenta/5 animate-fade-in" style={{animationDelay: '0.15s'}}>
                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 text-brand-magenta flex-shrink-0" />
                  <div>
                    <p className="font-bold text-lg mb-1">We're Never Too Busy for Another Client</p>
                    <p className="text-sm text-muted-foreground">
                      Our team is built to scale. The more Australian businesses we can help grow, the better. Send us your referrals with confidence—we've got the capacity and the drive to deliver results.
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits Grid */}
              <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-brand-magenta" />
                  Why Partner With Us
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="tech-card p-4 group hover:border-brand-cyan transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <benefit.icon className={`w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform ${index % 2 === 0 ? 'text-brand-cyan' : 'text-brand-magenta'}`} />
                        <div>
                          <p className="font-semibold text-sm">{benefit.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{benefit.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.25s'}}>
                <h3 className="text-xl font-bold">How It Works</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 tech-card p-4 group hover:border-brand-cyan transition-all">
                    <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan font-bold text-sm group-hover:scale-110 transition-transform">1</div>
                    <p className="text-muted-foreground"><span className="text-foreground font-medium">Introduce Us</span> — Send us the business details or connect us directly</p>
                  </div>
                  <div className="flex items-center gap-4 tech-card p-4 group hover:border-brand-magenta transition-all">
                    <div className="w-8 h-8 rounded-full bg-brand-magenta/20 flex items-center justify-center text-brand-magenta font-bold text-sm group-hover:scale-110 transition-transform">2</div>
                    <p className="text-muted-foreground"><span className="text-foreground font-medium">We Handle the Rest</span> — We'll reach out, pitch, and close</p>
                  </div>
                  <div className="flex items-center gap-4 tech-card p-4 group hover:border-brand-cyan transition-all">
                    <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan font-bold text-sm group-hover:scale-110 transition-transform">3</div>
                    <p className="text-muted-foreground"><span className="text-foreground font-medium">Get Paid</span> — $300 in your pocket within 7 days of signup</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:sticky lg:top-24 space-y-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <Card className="tech-card border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-brand-cyan" />
                    Get in Touch
                  </CardTitle>
                  <CardDescription>
                    Interested in becoming a referral partner? Fill in your details and we'll reach out within 24 hours.
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
                        placeholder="Your full name"
                        className="mt-1"
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
                        placeholder="you@example.com"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="04XX XXX XXX"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message / Referral Details</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about yourself or the business you'd like to refer..."
                        className="mt-1 min-h-[100px]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="hero"
                      className="w-full text-base py-5" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : (
                        <>
                          Submit Enquiry
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      We'll respond within 24 hours.
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Direct Contact Info */}
              <div className="tech-card p-6 space-y-4">
                <h3 className="font-bold text-lg">Or Contact Us Directly</h3>
                
                <div className="space-y-3">
                  <a
                    href="mailto:team@roseyco.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-brand-cyan transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center group-hover:bg-brand-cyan/20 transition-colors">
                      <Mail className="w-5 h-5 text-brand-cyan" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">team@roseyco.com</p>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+61468047897" 
                    className="flex items-center gap-3 text-muted-foreground hover:text-brand-magenta transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-magenta/10 flex items-center justify-center group-hover:bg-brand-magenta/20 transition-colors">
                      <Phone className="w-5 h-5 text-brand-magenta" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-foreground font-medium">+61 468 047 897</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-16 border-t bg-gradient-to-b from-background to-background/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-brand-magenta text-brand-magenta mb-4">
              Got Questions?
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Referral Program <span className="gradient-accent-text">FAQs</span></h2>
            <p className="text-muted-foreground mt-3">Everything you need to know about partnering with us</p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="tech-card px-6 hover:border-brand-cyan transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 group">
                  <span className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-cyan group-hover:scale-110 transition-transform" />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container py-16">
        <div className="tech-card p-8 md:p-12 text-center bg-gradient-to-r from-brand-cyan/5 via-brand-magenta/5 to-brand-cyan/5">
          <Handshake className="w-12 h-12 mx-auto mb-4 text-brand-magenta" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="gradient-accent-text">Partner</span> With Us?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Every referral helps another Australian business grow—and puts $300 in your pocket. 
            There's no cap, no catch, and we're always ready for more.
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => document.getElementById('fullName')?.focus()}
            className="px-8"
          >
            Start Referring Today
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </>
  );
};

export default ReferralPartner;