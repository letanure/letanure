"use client";

import Link from "next/link";
import { getTranslation } from "@/i18n";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const t = getTranslation();

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const pathname = usePathname();

	// Handle scroll behavior
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			
			if (currentScrollY > lastScrollY) {
				// Scrolling down
				setIsVisible(false);
			} else {
				// Scrolling up
				setIsVisible(true);
			}
			
			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	// Close menu when route changes
	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	const navLinks = [
		{ href: "/", label: t.nav.home },
		{ href: "/blog", label: t.nav.blog },
		{ href: "/workshop-diy", label: t.nav.workshop },
		{ href: "/about", label: t.nav.about },
		{ href: "/now", label: t.nav.now },
		{ href: "/projects", label: t.nav.projects },
	];

	return (
		<header 
			className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#191919] border-b border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.12)] transition-transform duration-300 ${
				isVisible ? "translate-y-0" : "-translate-y-full"
			}`}
		>
			<nav className="mx-auto max-w-[1192px] px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
				<div className="flex h-16 justify-between items-center">
					<div className="flex items-center">
						<Link
							href="/"
							className="text-xl font-bold text-[#292929] dark:text-[#E6E6E6] tracking-tight"
						>
							{t.site.name}
						</Link>
					</div>

					{/* Mobile menu button */}
					<button
						type="button"
						className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-[#757575] hover:text-[#292929] dark:text-[#A8A8A8] dark:hover:text-[#E6E6E6] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.1)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1A8917] dark:focus:ring-[#1DB954]"
						aria-controls="mobile-menu"
						aria-expanded={isOpen}
						onClick={() => setIsOpen(!isOpen)}
					>
						<span className="sr-only">Open main menu</span>
						{/* Hamburger icon */}
						<svg
							className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
						{/* Close icon */}
						<svg
							className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>

					{/* Desktop menu */}
					<div className="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-8">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`text-[15px] font-normal transition-colors ${
									pathname === link.href
										? "text-[#292929] dark:text-[#E6E6E6]"
										: "text-[#757575] hover:text-[#292929] dark:text-[#A8A8A8] dark:hover:text-[#E6E6E6]"
								}`}
							>
								{link.label}
							</Link>
						))
					}</div>
				</div>

				{/* Mobile menu */}
				<div
					className={`${
						isOpen ? "block" : "hidden"
					} sm:hidden transition-all duration-300 ease-in-out`}
					id="mobile-menu"
				>
					<div className="space-y-1 pb-3 pt-2">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`block py-3 pl-4 pr-4 text-base transition-colors ${
									pathname === link.href
										? "text-[#292929] dark:text-[#E6E6E6] font-medium bg-[rgba(0,0,0,0.03)] dark:bg-[rgba(255,255,255,0.05)]"
										: "text-[#757575] dark:text-[#A8A8A8]"
								}`}
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</nav>
		</header>
	);
}