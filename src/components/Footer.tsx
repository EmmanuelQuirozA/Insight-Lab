type FooterLink = {
  label: string
  href: string
}

type SocialLink = {
  label: string
  href: string
  icon: string
}

type FooterProps = {
  brandName: string
  brandAccent: string
  links: readonly FooterLink[]
  socialLinks: readonly SocialLink[]
  copyright: string
}

function Footer({ brandName, brandAccent, links, socialLinks, copyright }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a href="#" className="brand-name" aria-label="RevenueOS home">
          <img src="/brand/logo_minimal.png" alt="Insight Lab logo" className="footer-brand-icon" />
          <span>
            {brandName}
            <span className="accent">{brandAccent}</span>
          </span>
        </a>

        <nav className="footer-links" aria-label="Footer links">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="footer-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-socials" aria-label="Social links">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} className="social-link" aria-label={social.label}>
              <i className={`bi bi-${social.icon}`} aria-hidden="true" />
            </a>
          ))}
        </div>

        <small>{copyright}</small>
      </div>
    </footer>
  )
}

export default Footer
