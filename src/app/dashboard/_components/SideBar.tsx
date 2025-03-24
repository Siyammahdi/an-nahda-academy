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
			<div className="md:hidden flex justify-between items-center mb-4">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="flex items-center text-gray-600 dark:text-gray-300"
				>
					{isMobileMenuOpen ? (
						<>
							<X className="h-5 w-5 mr-2" />
							Close Menu
						</>
					) : (
						<>
							<Menu className="h-5 w-5 mr-2" />
							Menu
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
				<div className="space-y-1">
					{menuItems.map((item, index) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={index}
								href={item.href}
								className={cn(
									"flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
									isActive
										? "bg-violet-100 text-violet-950 dark:bg-violet-950/20 dark:text-violet-200"
										: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-700"
								)}
							>
								<item.Icon className={cn("h-5 w-5 mr-3", isActive ? "text-violet-700 dark:text-violet-300" : "text-gray-500 dark:text-gray-400")} />
								<span>{item.label}</span>
								{isActive && <ChevronRight className="ml-auto h-4 w-4" />}
							</Link>
						);
					})}
				</div>
			</nav>
		</div>
	);
};

export default Sidebar;