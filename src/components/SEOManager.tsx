import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://quickservee.com";

const getOrCreateMeta = (name: string) => {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  return meta;
};

const getOrCreateOgMeta = (property: string) => {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  return meta;
};

const getOrCreateCanonical = () => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  return link;
};

const SEOManager = () => {
  const location = useLocation();

  useEffect(() => {
    const robots = getOrCreateMeta("robots");
    const canonical = getOrCreateCanonical();
    const ogUrl = getOrCreateOgMeta("og:url");

    if (location.pathname === "/") {
      document.title = "QuickServee Coimbatore | AC, TV, Fridge, Washing Machine & Electrical Service";
      robots.setAttribute(
        "content",
        "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      );
      canonical.href = `${BASE_URL}/`;
      ogUrl.setAttribute("content", `${BASE_URL}/`);
      return;
    }

    if (location.pathname === "/admin") {
      document.title = "Admin Dashboard | QuickServee";
      robots.setAttribute("content", "noindex,nofollow,noarchive");
      canonical.href = `${BASE_URL}/admin`;
      ogUrl.setAttribute("content", `${BASE_URL}/admin`);
      return;
    }

    document.title = "Page Not Found | QuickServee";
    robots.setAttribute("content", "noindex,nofollow,noarchive");
    canonical.href = `${BASE_URL}${location.pathname}`;
    ogUrl.setAttribute("content", `${BASE_URL}${location.pathname}`);
  }, [location.pathname]);

  return null;
};

export default SEOManager;
