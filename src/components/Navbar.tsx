import { useTheme } from "@/hooks/use-theme";
import { profile } from "@/data/portfolio";
import ScrollProgress from "@/components/ScrollProgress";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience", hide: "hide-s" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills", hide: "hide-xs" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="brand" href="#top" aria-label={`${profile.name}, back to top`}>
          <span className="brand-mark" aria-hidden="true">AB</span>
          <span>{profile.name}</span>
        </a>
        <nav className="links" aria-label="Sections">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={link.hide ?? ""}>
              {link.name}
            </a>
          ))}
          <button
            className="theme-btn"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
          <a className="btn btn-p btn-s" href={profile.resumeFile} target="_blank" rel="noopener noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12" />
              <path d="m7 11 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Resume
          </a>
        </nav>
      </div>
      <ScrollProgress />
    </header>
  );
};

export default Navbar;
