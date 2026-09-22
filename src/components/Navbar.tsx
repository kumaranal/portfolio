import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import ScrollProgress from "@/components/ScrollProgress";

const navLinks = [
  { name: "Metrics", href: "#metrics" },
  { name: "Companies", href: "#companies" },
  { name: "Projects", href: "#projects" },
  { name: "Toolkit", href: "#toolkit" },
  { name: "Education", href: "#education" },
  { name: "Certifications", href: "#certifications" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-border bg-background">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-4 px-5 py-3 sm:px-8">
        <a href="#top" className="font-heading text-base font-extrabold tracking-tight">
          Anal Kumar Biswas
        </a>

        <div className="hidden md:flex items-center gap-6 ml-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
              <span className="absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </a>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="min-w-[104px] justify-start rounded-none border-2 text-xs font-semibold uppercase tracking-wide"
          >
            {theme === "dark" ? "Light" : "Dark"} mode
          </Button>
        </div>

        <button
          className="md:hidden ml-auto p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t-2 border-border bg-background">
          <div className="flex flex-col gap-1 px-5 py-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </a>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="mt-2 w-fit justify-start rounded-none border-2 text-xs font-semibold uppercase tracking-wide"
            >
              {theme === "dark" ? "Light" : "Dark"} mode
            </Button>
          </div>
        </div>
      )}

      <ScrollProgress />
    </nav>
  );
};

export default Navbar;
