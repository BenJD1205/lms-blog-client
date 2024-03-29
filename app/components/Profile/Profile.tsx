"use client";
import React, { FC, useState } from "react";
import SidebarProfile from "./SideBarProfile";
import { signOut } from "next-auth/react";

type Props = {
	user: any;
};

const Profile: FC<Props> = ({ user }) => {
	const [scroll, setScroll] = useState(false);
	const [avatar, setAvatar] = useState(null);
	const [active, setActive] = useState(1);

	if (typeof window !== "undefined") {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 85) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		});
	}

	const logoutHandler = async () => {
		await signOut();
	};

	return (
		<div className="w-[85%] flex mx-auto">
			<div
				className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border dark:border-[$ffffff1d] border-[#0000001c] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
					scroll ? "top-[120px]" : "top-[30px] left-[30px]"
				} left-[30px]`}
			>
				<SidebarProfile
					user={user}
					active={active}
					avatar={avatar}
					setActive={setActive}
					logoutHandler={logoutHandler}
				/>
			</div>
		</div>
	);
};

export default Profile;
