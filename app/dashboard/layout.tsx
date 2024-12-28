"use client";
import { Divider } from "@nextui-org/divider";
import { Avatar, Button } from "@nextui-org/react";
import React from "react";
import Sidebar from "./_components/SideBar";
import { IoMdLogOut } from "react-icons/io";
// import Logo from "./Logo";
// import Button from "./ui-components/Button";






const Dashboard: React.FC = ({ children }) => {
	return (
		<div >
			<div className="flex flex-row items-center justify-between gap-5">
				<div className="flex flex-row items-center  gap-5">
					<div>
						<Avatar
							className="w-20 h-20 text-large"
							name="Shoity"
						/>
					</div>
					<div>
						<h1 className="text-sm font-semibold my-5">Assalamualaikum,</h1>
						<h1 className="text-xl font-semibold my-5">Syeda Umme Ayman Shoity!!</h1>
					</div>

				</div>
				<Button className="bg-violet-950 text-white" variant="shadow">
				<IoMdLogOut /> Logout
				</Button>
			</div>
			<Divider className="my-4" />
			<div className="flex flex-row ">


				<div>
					<Sidebar />
				</div>
				<div className="flex flex-col items-center justify-start p-5 w-full">

					{children}
				</div>
			</div>

		</div>
	);
};






export default Dashboard;