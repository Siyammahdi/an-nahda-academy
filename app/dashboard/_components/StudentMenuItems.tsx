import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	FiHome,
} from "react-icons/fi";
import { LuLayoutDashboard,LuWallet } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCart,MdOutlineCastForEducation  } from "react-icons/md";
type MenuItemProps = {
	label: string;
	href: string;
	Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};
export const menuItems = [
	
	{ label: "Dashboard", href: "/dashboard/students", Icon: LuLayoutDashboard  },
	{ label: "Enrolled Courses", href: "/dashboard/students/my_courses", Icon: MdOutlineCastForEducation  },
	{ label: "My Cart", href: "/dashboard/students/my_cart", Icon: MdOutlineShoppingCart },
	{ label: "Payment History", href: "/dashboard/students/payment_history", Icon: LuWallet },
	{ label: "Profile", href: "/dashboard/students/profile", Icon: CgProfile },
	{ label: "Home", href: "/", Icon: FiHome },
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