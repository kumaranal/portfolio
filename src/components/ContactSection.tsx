import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/20 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 animate-fade-in-up opacity-0">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted-foreground">Let's work together</span>
          </div>

          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up opacity-0 delay-200">
            Happy to{' '}
            <span className="gradient-text">collaborate</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 animate-fade-in-up opacity-0 delay-400 leading-relaxed">
            Ready to collaborate with talented professionals to create
            amazing products that make a difference.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 delay-600">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold px-8 py-6 text-base gap-2 hover-glow"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
