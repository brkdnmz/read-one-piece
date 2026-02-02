import LogoLeftPart from "/read-one-piece-font.png";
import LogoRightPart from "/one-piece-logo.webp";

export function Header() {
  return (
    <div className="flex items-center justify-center py-2">
      <img src={LogoLeftPart} className="-mt-0.5 h-16" />
      <img src={LogoRightPart} className="h-20" />
    </div>
  );
}
