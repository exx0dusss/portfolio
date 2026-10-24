import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/i18n";

import { CopyEmailButton } from "./copy-email-button";

const EMAIL = "tymurmustafaiev029@gmail.com";

/** Contact: the email address as the closing line of the page. */
export function ContactSection({ dict }: { dict: Dictionary["contact"] }) {
  return (
    <section className="contact" id="contact">
      <Reveal as="p">{dict.prompt}</Reveal>
      <Reveal delay={1}>
        <CopyEmailButton email={EMAIL} copyLabel={dict.copy} copiedLabel={dict.copied} />
      </Reveal>
    </section>
  );
}
