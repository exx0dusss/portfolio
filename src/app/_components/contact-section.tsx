import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

import { CopyEmailButton } from "./copy-email-button";

const EMAIL = "tymurmustafaiev029@gmail.com";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/exx0dusss" },
  { label: "ExdBots org", href: "https://github.com/ExdBots" },
  { label: "Salon-Svitlo org", href: "https://github.com/Salon-Svitlo" },
  { label: "LinkedIn", href: "https://linkedin.com/in/tymur-mustafaiev-968b3724b" },
] as const;

/** Contact section: heading, copy-email CTA, résumé link, and social links. */
export function ContactSection() {
  return (
    <section className="card contact" id="contact" data-navlabel="Contact">
      <Reveal as="div" className="clabel">
        <span className="num">04</span> Contact
      </Reveal>
      <Reveal as="h2" delay={1}>
        Get in touch.
      </Reveal>
      <Reveal as="p" delay={2}>
        I&#8217;m looking for a Design Engineer role and open to freelance work.
        Email is the best way to reach me.
      </Reveal>
      <Reveal as="div" className="cta" delay={2}>
        <CopyEmailButton email={EMAIL} />
        <Button asChild variant="ghost">
          <Link href="/resume">Résumé</Link>
        </Button>
      </Reveal>
      <Reveal as="div" className="socials" delay={3}>
        {SOCIALS.map((social) => (
          <a key={social.href} href={social.href}>
            {social.label} ↗
          </a>
        ))}
      </Reveal>
    </section>
  );
}
