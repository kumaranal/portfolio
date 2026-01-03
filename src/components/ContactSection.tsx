import { useState } from 'react';
import { MapPin, Mail, Linkedin, Send, Loader2, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsLoading(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      value: 'West Bengal, India',
      href: null,
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'kumaranal.official@gmail.com',
      href: 'mailto:kumaranal.official@gmail.com',
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-primary/15 rounded-full blur-[150px]" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] bg-secondary/15 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Let's connect and discuss how we can work together on your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info Card */}
          <div className="lg:col-span-2 glass-card p-8 rounded-2xl animate-fade-in-up opacity-0">
            <h3 className="font-heading text-2xl font-bold gradient-text mb-8">
              Get In Touch
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Follow Me */}
            <div className="mb-8">
              <h4 className="font-semibold text-foreground mb-4">Follow Me</h4>
              <a
                href="https://www.linkedin.com/in/anal-kumar-biswas-733488356/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4 text-primary" />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>

            {/* About Me */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">About Me</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Passionate software developer with years of experience, specializing in
                JavaScript Frameworks, delivering robust, scalable, and efficient web solutions.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 glass-card p-8 rounded-2xl animate-fade-in-up opacity-0 delay-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="pl-12 h-12 bg-muted/50 border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="pl-12 h-12 bg-muted/50 border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                  Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    className="pl-12 pt-3 bg-muted/50 border-border focus:border-primary transition-colors resize-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={true}
                className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                Send Message (Coming Soon)
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
