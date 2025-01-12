"use client";

import React from "react";
import MenuItem, { menuItems } from "./StudentMenuItems";


// import Logo from "./Logo";
// import Button from "./ui-components/Button";






const Sidebar: React.FC = () => {
	return (
		<div className="h-screen bg-violet-950 lg:w-[250px]">
			<div className="flex flex-col justify-between h-full">
				<nav>
					<div className="px-8 py-5">
						{/* <Logo /> */}
					</div>
					<ul>
						{menuItems.map((item, index) => (
							<li key={index}>
								<MenuItem
									label={item.label}
									href={item.href}
									Icon={item.Icon}
								/>
							</li>
						))}
					</ul>
				</nav>
				
			</div>
		</div>
	);
};






export default Sidebar;