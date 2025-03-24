"use client"

import {
	LayoutDashboard,
	GraduationCap,
	ShoppingCart,
	Wallet,
	User,
	Home,
	BookOpen,
	Calendar,
	MessageSquare,
	FileText,
	Settings,
	Bell
} from "lucide-react";

export type MenuItemProps = {
	label: string;
	href: string;
	Icon: React.ComponentType<any>;
	description?: string;
};

// Group menu items by categories
export const menuItems: MenuItemProps[] = [
	// Main
	{
		label: "Dashboard",
		href: "/dashboard",
		Icon: LayoutDashboard,
		description: "Overview of your account"
	},
	
	// Learning
	{
		label: "My Courses",
		href: "/dashboard/courses",
		Icon: GraduationCap,
		description: "View your enrolled courses"
	},
	{
		label: "Learning Resources",
		href: "/dashboard/resources",
		Icon: BookOpen,
		description: "Access study materials"
	},
	{
		label: "Schedule",
		href: "/dashboard/schedule",
		Icon: Calendar,
		description: "Your class schedule"
	},
	
	// Shopping & Payments
	{
		label: "My Cart",
		href: "/dashboard/cart",
		Icon: ShoppingCart,
		description: "Items in your cart"
	},
	{
		label: "Payment History",
		href: "/dashboard/payments",
		Icon: Wallet,
		description: "View past transactions"
	},
	
	// Account
	{
		label: "Profile",
		href: "/dashboard/profile",
		Icon: User,
		description: "Manage your account information"
	},
	{
		label: "Messages",
		href: "/dashboard/messages",
		Icon: MessageSquare,
		description: "Your conversations"
	},
	{
		label: "Notifications",
		href: "/dashboard/notifications",
		Icon: Bell,
		description: "Your alerts and notifications"
	},
	{
		label: "Documents",
		href: "/dashboard/documents",
		Icon: FileText,
		description: "Important files and documents"
	},
	{
		label: "Settings",
		href: "/dashboard/settings",
		Icon: Settings,
		description: "Adjust your preferences"
	},
	
	// Navigation
	{
		label: "Back to Home",
		href: "/",
		Icon: Home,
		description: "Return to homepage"
	}
];

const MenuItem: React.FC<MenuItemProps> = ({ label, href, Icon }) => {
   const pathname = usePathname();
   const isActive = pathname === href;

   return (
      <Link href={href}>
         <div
            className={`flex items-center space-x-3 py-4 cursor-pointer px-8  ${
               isActive ? "bg-gradient-to-r bg-[#a6ebe39a] text-white " : "text-white"
            } transition-all hover:bg-gradient-to-r from-[#215a539a] hover:border-l-4 border-[#215a53]`}
         >
            <Icon className="w-5 h-5" />
            <p>{label}</p>
         </div>
      </Link>
   );
};

export default MenuItem;