import { profile } from "@/data/portfolio";

const Footer = () => {
  return (
    <footer className="wrap foot">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
};

export default Footer;
