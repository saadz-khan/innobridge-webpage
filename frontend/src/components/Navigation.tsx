import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navigationLinks } from "../data/siteContent";
import { Button } from "./Button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="container site-header__inner">
        <a className="brand-link" href="#top" aria-label="SmartConveyance by Innobridge home" onClick={closeMenu}>
          <img
            src="/brand/smartconveyance-primary-light.png"
            alt="SmartConveyance by Innobridge"
            width="283"
            height="50"
            decoding="async"
          />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigationLinks.map((link) => (
            <a href={link.href} key={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="site-header__actions">
          <Button href="#demo" variant="light" icon={<ArrowRight size={17} />}>
            Book your demo
          </Button>
          <button
            className="menu-button"
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav-shell ${isOpen ? "is-open" : ""}`} id="mobile-navigation">
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigationLinks.map((link) => (
            <a href={link.href} key={link.href} onClick={closeMenu}>{link.label}</a>
          ))}
          <Button href="#demo" variant="primary" icon={<ArrowRight size={17} />} onClick={closeMenu}>
            Book your demo
          </Button>
        </nav>
      </div>
    </header>
  );
}
