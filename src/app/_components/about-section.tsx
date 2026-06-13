import Link from "next/link";

import { ImageSlot } from "@/components/ui/image-slot";
import { Reveal } from "@/components/motion/reveal";

/** About section: portrait + two-paragraph bio. */
export function AboutSection() {
  return (
    <section className="card" id="about">
      <Reveal as="div" className="clabel">
        <span className="num">03</span> About
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-portrait">
          <ImageSlot
            shape="rounded"
            radius={12}
            style={{ display: "block", width: "100%", height: "auto", aspectRatio: "4 / 5" }}
            placeholder="Photo"
          />
        </Reveal>
        <Reveal className="about-body" delay={1}>
          <p>
            I&#8217;m <strong>Tymur Mustafaiev</strong>, a front-end developer
            and UX/UI designer based in Warsaw. I like working across the whole
            stack — interface, backend, and data model — usually on the same
            project, in TypeScript. Most recently I was a front-end developer
            and lead UX/UI designer at <strong>Softica Tech</strong>, and
            I&#8217;m finishing a Master&#8217;s at PJATK.
          </p>
          <p>
            My work spans a few areas: e-commerce, developer tooling, research
            platforms, and Telegram apps. It tends to involve building both the
            product and the system underneath it. I&#8217;ve also worked with
            the <strong>PJATK XR Lab and the University of Amsterdam</strong> on
            research tooling. More on the <Link href="/experience">experience</Link>{" "}
            page.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
