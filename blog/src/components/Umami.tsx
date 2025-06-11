"use client";

import { siteConfig } from "@/siteConfig";
import Script from "next/script";

export function Umami() {
	if (process.env.NODE_ENV !== "production") {
		return null;
	}

	return (
		<Script
			defer
			src="https://cloud.umami.is/script.js"
			data-website-id={siteConfig.umami.websiteId}
			strategy="afterInteractive"
		/>
	);
} 