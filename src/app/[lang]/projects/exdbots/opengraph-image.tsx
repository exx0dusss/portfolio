import {
  contentType,
  generateProjectCardParams,
  projectCardAlt,
  renderProjectCard,
  size,
} from "../_components/project-card-image";

export { contentType, size };
export const alt = projectCardAlt("exdbots");
export const generateStaticParams = generateProjectCardParams;

/** Social preview card for this case study (see project-card-image). */
export default function Image() {
  return renderProjectCard("exdbots");
}
