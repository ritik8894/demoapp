'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeSwitch() {
	const { theme, setTheme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [open, setOpen] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;

	// Helper to determine which theme is active
	const currentTheme = theme === 'system' ? systemTheme : theme;

	// Icon and color for the main button
	const icon =
		currentTheme === 'dark' ? (
			<Moon className="h-5 w-5 text-yellow-400" />
		) : currentTheme === 'light' ? (
			<Sun className="h-5 w-5 text-yellow-500" />
		) : (
			<svg
				className="h-5 w-5 text-blue-500"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M12 3v1" />
				<path d="M12 20v1" />
				<path d="M3 12h1" />
				<path d="M20 12h1" />
				<path d="M5.6 5.6l.7.7" />
				<path d="M18.4 18.4l.7.7" />
				<path d="M18.4 5.6l-.7.7" />
				<path d="M5.6 18.4l-.7.7" />
				<circle cx="12" cy="12" r="5" />
			</svg>
		);
	const label =
		currentTheme === 'dark'
			? 'Dark'
			: currentTheme === 'light'
			? 'Light'
			: 'System';

	return (
		<div className="fixed top-4 right-4 z-50">
			<div className="relative inline-block">
				<Button
					variant="outline"
					size="icon"
					aria-label="Theme switcher"
					onClick={() => setOpen((v) => !v)}
					className="flex items-center justify-center"
					id="theme-switcher-btn"
				>
					{icon}
				</Button>
				{open && (
					<div
						className="absolute z-50 mt-2 right-0 w-36 rounded-md shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
						style={{ minWidth: 120 }}
						role="menu"
						aria-labelledby="theme-switcher-btn"
					>
						<button
							className={`flex items-center w-full px-3 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
								theme === 'light' ? 'font-bold text-yellow-500' : ''
							}`}
							onClick={() => {
								setTheme('light');
								setOpen(false);
							}}
							role="menuitem"
						>
							<Sun className="h-4 w-4" /> Light
						</button>
						<button
							className={`flex items-center w-full px-3 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
								theme === 'dark' ? 'font-bold text-yellow-400' : ''
							}`}
							onClick={() => {
								setTheme('dark');
								setOpen(false);
							}}
							role="menuitem"
						>
							<Moon className="h-4 w-4" /> Dark
						</button>
						<button
							className={`flex items-center w-full px-3 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${
								theme === 'system' ? 'font-bold text-blue-500' : ''
							}`}
							onClick={() => {
								setTheme('system');
								setOpen(false);
							}}
							role="menuitem"
						>
							<svg
								className="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 3v1" />
								<path d="M12 20v1" />
								<path d="M3 12h1" />
								<path d="M20 12h1" />
								<path d="M5.6 5.6l.7.7" />
								<path d="M18.4 18.4l.7.7" />
								<path d="M18.4 5.6l-.7.7" />
								<path d="M5.6 18.4l-.7.7" />
								<circle cx="12" cy="12" r="5" />
							</svg>{' '}
							System
						</button>
					</div>
				)}
			</div>
		</div>
	);
}