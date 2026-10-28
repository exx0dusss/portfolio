import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/i18n";

import { EmailContact } from "./email-contact";

const EMAIL = "tymurmustafaiev029@gmail.com";

/** Contact: the email address as the closing line of the page; it opens the
 *  mail app, and a button beside it copies the address. */
export function ContactSection({ dict }: { dict: Dictionary["contact"] }) {
  return (
    <section className="border-t border-fg pt-20 pb-14" id="contact">
      <Reveal as="p" className="text-15 text-fg-dim">
        {dict.prompt}
      </Reveal>
      <Reveal delay={1}>
        <EmailContact email={EMAIL} copyLabel={dict.copy} copiedLabel={dict.copied} />
      </Reveal>
    </section>
  );
}
