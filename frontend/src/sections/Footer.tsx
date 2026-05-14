import { footerLinks, contact } from "../data/siteContent";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src="/brand/smartconveyance-primary-light.png" alt="SmartConveyance by Innobridge" />
          <p>SmartConveyance by Innobridge. Technology that Speaks Legal.</p>
        </div>

        <nav className="site-footer__links" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a href={link.href} key={link.label}>{link.label}</a>
          ))}
        </nav>

        <div className="site-footer__contact">
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={contact.emailHref}>{contact.email}</a>
          <span>500 - 4th Avenue SW Suite 2500 Calgary, AB</span>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© 2026 Innobridge Consulting Inc. All rights reserved.</span>
      </div>
    </footer>
  );
}
