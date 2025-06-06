type ClassValue = string | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
	return classes.filter(Boolean).join(" ");
}

export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
