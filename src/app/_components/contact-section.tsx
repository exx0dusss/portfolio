import { Reveal } from "@/components/motion/reveal";

import { CopyEmailButton } from "./copy-email-button";

const EMAIL = "tymurmustafaiev029@gmail.com";

/** Contact: the email address as the closing line of the page. */
export function ContactSection() {
  return (
    <section className="contact" id="contact">
      <Reveal as="p">Have a role or a project in mind?</Reveal>
      <Reveal delay={1}>
        <CopyEmailButton email={EMAIL} />
      </Reveal>
    </section>
  );
}
