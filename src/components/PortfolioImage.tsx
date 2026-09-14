import { useState, ImgHTMLAttributes } from "react";

interface PortfolioImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/** Falls back to a neutral placeholder until a real photo is dropped in /public. */
const PortfolioImage = ({ src, alt, className, ...rest }: PortfolioImageProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={className}
        style={{
          ...(rest.style as object),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "hsl(var(--muted))",
          color: "hsl(var(--muted-foreground))",
          fontSize: "12px",
        }}
      >
        {alt}
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />;
};

export default PortfolioImage;
