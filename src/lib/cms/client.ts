import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "pg0p8z5s";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const isProduction = process.env.NODE_ENV === "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: process.env.SANITY_API_VERSION ?? "2025-01-01",
  useCdn: isProduction,
  perspective: "published",
});

export async function cmsFetch<Result>(query: string, params: Record<string, unknown> = {}) {
  try {
    return await sanityClient.fetch<Result>(query, params, {
      next: { revalidate: isProduction ? 60 : 0 },
    });
  } catch (error) {
    console.error("Sanity request failed", error);
    return null;
  }
}
