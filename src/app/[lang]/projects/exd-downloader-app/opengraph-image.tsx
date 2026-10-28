import {
  contentType,
  generateProjectCardParams,
  projectCardAlt,
  renderProjectCard,
  size,
} from "../_components/project-card-image";

export { contentType, size };
export const alt = projectCardAlt("exd-downloader-app");
export const generateStaticParams = generateProjectCardParams;

/** Social preview card for this case study (see project-card-image). */
export default function Image() {
  return renderProjectCard("exd-downloader-app");
}
