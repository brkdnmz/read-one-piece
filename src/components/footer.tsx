import { Credits } from "./credits";
import { NavigationDescription } from "./navigation-description";

export function Footer() {
  return (
    <footer className="pb-2">
      <NavigationDescription />

      <Credits />
    </footer>
  );
}
