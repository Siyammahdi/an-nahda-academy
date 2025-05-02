"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "./StudentMenuItems";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, X } from "lucide-react";

const Sidebar: React.FC = () => {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<div className="w-full h-full">
			{/* Mobile menu button */}
			<div className="md:hidden flex justify-between items-center mb-2 sm:mb-4">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="flex items-center text-gray-600  h-9 px-2.5"
				>
					{isMobileMenuOpen ? (
						<>
							<X className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
							<span className="text-sm">Close Menu</span>
						</>
					) : (
						<>
							<Menu className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
							<span className="text-sm">Menu</span>
						</>
					)}
				</Button>
			</div>

			{/* Sidebar navigation - always visible on desktop, toggle on mobile */}
			<nav
				className={cn(
					"flex flex-col",
					isMobileMenuOpen ? "block" : "hidden md:block"
				)}
			>
				<div className="space-y-0.5 sm:space-y-1">
					{menuItems.map((item, index) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={index}
								href={item.href}
								className={cn(
									"flex items-center px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-md transition-colors",
									isActive
										? "bg-violet-100 text-violet-950 "
										: "text-gray-600 hover:bg-gray-100 "
								)}
								onClick={() => setIsMobileMenuOpen(false)} // Close menu when a link is clicked on mobile
							>
								<item.Icon className={cn("h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0", isActive ? "text-violet-700 dark:text-violet-300" : "text-gray-500 dark:text-gray-400")} />
								<span className="truncate">{item.label}</span>
								{isActive && <ChevronRight className="ml-auto h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />}
							</Link>
						);
					})}
				</div>
			</nav>
		</div>
	);
};

export default Sidebar;