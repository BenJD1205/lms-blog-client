import Image from "next/image";
import React, { FC } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import avatarDefault from "../../../public/assets/avatar.jpg";

type Props = {
	user: any;
	active: number;
	avatar: any;
	setActive: (value: number) => void;
	logoutHandler: VoidFunction;
};

const SidebarProfile: FC<Props> = ({
	user,
	active,
	avatar,
	setActive,
	logoutHandler,
}) => {
	return (
		<div className="w-full">
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer ${
					active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
				}`}
				onClick={() => setActive(1)}
			>
				<Image
					src={user?.avatar || avatar ? user?.avatar || avatar : avatarDefault}
					alt=""
					className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
				/>
				<h5 className="pl-2 800px:block hidden font-Poppins dark:text-white light:text-black">
					My Account
				</h5>
			</div>
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer ${
					active == 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
				}`}
				onClick={() => setActive(2)}
			>
				<RiLockPasswordLine size={20} className="dark:text-white" />
				<h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
					Change password
				</h5>
			</div>
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer ${
					active == 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
				}`}
				onClick={() => setActive(3)}
			>
				<SiCoursera size={20} className="dark:text-white" />
				<h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
					Enrolled Courses
				</h5>
			</div>
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer ${
					active == 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
				}`}
				onClick={() => logoutHandler()}
			>
				<AiOutlineLogout size={20} className="dark:text-white" />
				<h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
					Logout
				</h5>
			</div>
		</div>
	);
};

export default SidebarProfile;
