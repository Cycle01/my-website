import { Mail, Youtube, Twitter } from "lucide-react"

const socials = [
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@cycle01" },
  { icon: Twitter, label: "X / Twitter", href: "https://twitter.com/cycledadev" },
  { icon: Mail, label: "Email", href: "mailto:ciclentiu@gmail.com" },
]

export function ContactSection() {
  return (
    <section id="contact" className="relative px-6 py-32 overflow-hidden">
      {/* Section divider */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-primary/50" />

      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-primary/30" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Contact
            </span>
            <span className="h-px w-8 bg-primary/30" />
          </div>
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-5xl leading-[1.1] text-balance">
            {"Let's work together"}
          </h2>
          <p className="mb-14 text-lg leading-relaxed text-muted-foreground">
            {"Interested in collaborating, have feedback on one of my games, or just want to chat about game dev? Reach out anytime."}
          </p>

          <a
            href="mailto:ciclentiu@gmail.com"
            className="group relative mb-14 inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-primary px-10 py-4 font-mono text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_40px_rgba(180,50,20,0.3)]"
          >
            <Mail className="h-4 w-4 relative z-10" />
            <span className="relative z-10">Get in Touch</span>
            <div className="absolute inset-0 bg-accent/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
          </a>

          <div className="flex items-center justify-center gap-3 pt-14">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/50 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(180,50,20,0.1)]"
              >
                <social.icon className="h-[18px] w-[18px]" />
              </a>
            ))}
            <a
              href="https://cycle01.itch.io"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="itch.io"
              className="group flex h-11 items-center justify-center rounded-xl border border-border bg-card/50 px-4 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_20px_rgba(180,50,20,0.1)]"
            >
              <span className="font-mono text-xs font-bold tracking-wide">itch.io</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
