import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chapter-14.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/my-library/", "/enroll/", "/settings/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
