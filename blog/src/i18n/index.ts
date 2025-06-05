import { en } from "./en";

export type Language = "en";
export type Translation = typeof en;

const translations = {
	en,
} as const;

export function useTranslation(lang: Language = "en") {
	const t = translations[lang];

	function formatMessage(
		message: string,
		params: Record<string, string | number>,
	) {
		return message.replace(/{(\w+)}/g, (_, key) => String(params[key] || ""));
	}

	return {
		t,
		formatMessage,
	};
}

export function getTranslation(lang: Language = "en") {
	return translations[lang];
}
