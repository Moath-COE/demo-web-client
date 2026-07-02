import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chapter-14.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/my-library/", "/dashboard/", "/study/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
