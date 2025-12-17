import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import blogImage from "@/assets/blog-leads-rot-5-minutes-automation.jpg";

const LeadsRotAutomation = () => {
  const title = "Leads Rot in 5 Minutes: Why Automation is the Real Sales Team";
  const description = "Harvard proved it - contact a lead within 5 minutes and you're 9x more likely to convert. Most businesses let leads rot because their 'sales process' is hoping someone checks the inbox.";

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: typeof window !== 'undefined' ? `${window.location.origin}${blogImage}` : undefined,
    author: {
      "@type": "Organization",
      name: "Flowryse"
    },
    publisher: {
      "@type": "Organization", 
      name: "Flowryse"
    },
    datePublished: "2024-12-13",
    dateModified: "2024-12-13"
  };

  return (
    <>
      <SEO title={title} description={description} image={blogImage} structuredData={blogStructuredData} />
      
      <article className="container py-8 animate-fade-in">
        <nav className="mb-6">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              Sales Systems
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              6 min read
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-6 leading-tight">
            {title}
          </h1>
          
          <img 
            src={blogImage} 
            alt="Modern automation dashboard showing instant lead response system with SMS and email notifications"
            className="w-full h-64 md:h-80 object-cover rounded-lg mb-8"
          />
        </header>

        <div className="prose prose-lg max-w-none">
          <h2>The Harsh Truth About "Bad Leads"</h2>
          <p>Every business owner loves to complain: "The leads were bad."</p>
          
          <p><strong>Wrong. 99% of the time, the leads weren't bad. You were slow.</strong></p>
          
          <p>Leads are like fresh bread. Hot, irresistible, valuable — for a moment. Leave them sitting, and they rot. And most businesses let them rot because their "sales process" is just hoping someone checks the inbox.</p>
          
          <p>Here's the hard truth: if you're not on a lead within 5 minutes, you've already lost. Harvard proved it — contact a lead within 5 minutes and you're 9x more likely to convert. Contact them after 30 minutes? Forget it.</p>
          
          <p>So when you say "the leads were bad", what you're really saying is "we didn't have a system."</p>

          <h2>The 5-Minute Rule</h2>
          <p>Let's get real.</p>
          
          <ul>
            <li>A family is browsing restaurants for dinner tonight. They message three venues. <strong>The first one to reply gets the booking.</strong> The others? Forgotten.</li>
            <li>A homeowner asks for a solar quote. They fill in two forms. <strong>The first company to call gets the contract.</strong> The second? Left begging.</li>
          </ul>
          
          <p>The first business didn't have better ads. They didn't have better offers. They simply replied first. Speed won.</p>
          
          <p>Now ask yourself: is your business built to respond in 5 minutes or less? If not, you're bleeding revenue.</p>

          <h2>Why Humans Fail</h2>
          <p>This is where most businesses get exposed. Humans can't compete with the speed the market demands.</p>
          
          <ul>
            <li>Staff go home at 6pm.</li>
            <li>Phones get ignored during rush hour.</li>
            <li>Emails sit unread until "someone gets around to it."</li>
          </ul>
          
          <p>Meanwhile, your leads are talking to competitors who reply instantly.</p>
          
          <p>It's not that your staff are lazy. It's that manual follow-up is dead. Humans are inconsistent. They forget. They delay. They get tired. And in business, inconsistency = bankruptcy.</p>

          <h2>The Automation Edge</h2>
          <p>This is where the game changes. Automation is not a luxury. It's survival.</p>
          
          <p>Imagine this system:</p>
          <ol>
            <li>A lead fills out your form.</li>
            <li>Within 10 seconds, they get a personalised SMS.</li>
            <li>Within 60 seconds, an email lands in their inbox.</li>
            <li>Within 5 minutes, an AI voice drop reminds them to book a call.</li>
            <li>Every step is tracked in a CRM, so nothing slips through.</li>
          </ol>
          
          <p>No staff required. No excuses. No missed opportunities.</p>
          
          <p>This isn't "tech for tech's sake." It's the difference between:</p>
          <ul>
            <li><strong>Business A:</strong> 100 leads, 20 answered → 5 sales.</li>
            <li><strong>Business B:</strong> 100 leads, 100 answered instantly → 25 sales.</li>
          </ul>
          
          <p>Same leads. Same ads. Same spend. Different outcome.</p>

          <h2>The Death of "Just Leads" Agencies</h2>
          <p>Here's where most agencies get exposed.</p>
          
          <p>They brag: "We got you 100 leads."</p>
          <p><strong>Translation:</strong> "We threw names into your inbox and hoped for the best."</p>
          
          <p>No funnel. No CRM. No follow-up. No accountability.</p>
          
          <p>So you're left blaming the leads, thinking ads don't work, while they laugh their way to the bank collecting flat retainers.</p>
          
          <p>This is why Flowryse is hated by generic agencies. We don't stop at "leads." We build systems. Because we know the truth: <strong>leads don't pay bills. Systems do.</strong></p>

          <h2>Proof From the Field</h2>
          <p>Let's make this real:</p>
          
          <ul>
            <li><strong>Hospitality Example:</strong> A restaurant went from 20 to 70 weekly bookings just by setting up instant SMS confirmations. No new ads. Just automation.</li>
            <li><strong>Solar Example:</strong> A solar firm doubled closes by adding AI follow-ups after hours. Customers got replies at 8pm when competitors were asleep.</li>
            <li><strong>Trades Example:</strong> A plumber cut lead waste by 50% with automated reminders. Jobs booked themselves without staff chasing.</li>
          </ul>
          
          <p>Notice something? These wins didn't come from more leads. They came from better systems.</p>

          <h2>The Future Belongs to the Automated</h2>
          <p>The world has changed. Speed is non-negotiable. Attention spans are gone. Customers don't wait.</p>
          
          <p>You either build systems that respond instantly…</p>
          <p><strong>Or you stay stuck blaming "bad leads" while your competitors scale.</strong></p>
          
          <p>There's no middle ground anymore. Manual follow-up is dead. Businesses relying on humans alone are dead.</p>
          
          <p>The winners? They're not the ones with the biggest budgets. They're the ones with the fastest systems.</p>

          <h2>Stop Blaming Leads. Start Fixing Systems.</h2>
          <p>The next time you hear yourself or your team say "the leads were bad," stop. Ask: "Were we fast enough?"</p>
          
          <p>Because here's the reality:</p>
          <ul>
            <li>Leads rot in 5 minutes.</li>
            <li>Automation never sleeps.</li>
            <li>And businesses that systemise follow-up will always crush those that don't.</li>
          </ul>
          
          <p><strong>The future isn't about who gets the most leads. It's about who converts the ones they already have. And in that game, automation is the real sales team.</strong></p>
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Build Automation That Never Sleeps?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Stop losing leads to slow follow-up. Get instant automation systems that respond in seconds, not hours.
          </p>
          <Button size="lg" asChild className="btn-hero">
            <Link to="/book-a-call">Book Your Free Strategy Session</Link>
          </Button>
        </div>

        <nav className="mt-8 pt-8 border-t">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
          </Button>
        </nav>
      </article>
    </>
  );
};

export default LeadsRotAutomation;