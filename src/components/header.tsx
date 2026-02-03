import LogoLeftPart from "/read-one-piece-font.png";
import LogoRightPart from "/one-piece-logo.webp";

export function Header() {
  const size = 40;

  return (
    <div className="flex items-center justify-center py-2">
      <img
        src={LogoLeftPart}
        style={{ height: (size * 4) / 5, marginTop: -size / 48 }}
      />
      <img src={LogoRightPart} style={{ height: size }} />
    </div>
  );
}
