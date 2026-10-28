import {
  contentType,
  generateProjectCardParams,
  projectCardAlt,
  renderProjectCard,
  size,
} from "../_components/project-card-image";

export { contentType, size };
export const alt = projectCardAlt("giga-psych");
export const generateStaticParams = generateProjectCardParams;

/** Social preview card for this case study (see project-card-image). */
export default function Image() {
  return renderProjectCard("giga-psych");
}
