"use client";
import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { Routes } from "../models/path";
import { useSelector } from "react-redux";
import avatar from "../../public/assets/avatar.jpg";
import {
	useSocialAuthMutation,
	useLogoutQuery,
} from "../redux/features/auth/authApi";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	activeItem: number;
	route: string;
	setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, setRoute, open }) => {
	const [active, setActive] = useState(false);
	const [openSidebar, setOpenSidebar] = useState(false);
	const [logout, setLogout] = useState(false);
	const { user } = useSelector((state: any) => state.auth);
	const { data } = useSession();
	const {} = useLogoutQuery(undefined, {
		skip: !logout ? true : false,
	});
	const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

	useEffect(() => {
		if (!user) {
			if (data) {
				socialAuth({
					email: data?.user?.email,
					name: data?.user?.name,
					avatar: data?.user?.image,
				});
			}
		}
		if (!data && isSuccess) toast.success("Login successfully");
		if (!data) {
			setLogout(true);
		}
	}, [data, user]);

	if (typeof window !== "undefined") {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 85) {
				setActive(true);
			} else {
				setActive(false);
			}
		});
	}

	const handleClose = (e: any) => {
		if (e.target.id === "screen") {
			setOpenSidebar(false);
		}
	};

	return (
		<div className="w-full relative">
			<div
				className={`${
					active
						? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
						: "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
				}`}
			>
				<div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
					<div className="w-full h-[80px] flex items-center justify-between p-3">
						<div>
							<Link
								href={"/"}
								className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
							>
								E-learning
							</Link>
						</div>
						<div className="flex item-centers">
							<NavItems activeItem={activeItem} isMobile={false} />
							<ThemeSwitcher />
							{/* only for mobile */}
							<div className="800px:hidden">
								{user ? (
									<Link href={"/profile"}>
										<Image
											src={user?.avatar ? user?.avatar : avatar}
											className="w-[30px] h-[30px] rounded-full cursor-pointer"
											alt=""
										/>
									</Link>
								) : (
									<HiOutlineMenuAlt3
										size={25}
										className="cursor-pointer dark:text-white text-black"
										onClick={() => setOpenSidebar(true)}
									/>
								)}
							</div>
							{user ? (
								<Link href={"/profile"}>
									<Image
										src={user?.avatar ? user?.avatar : avatar}
										className="hidden 800px:block w-[30px] h-[30px] rounded-full cursor-pointer"
										alt=""
									/>
								</Link>
							) : (
								<HiOutlineUserCircle
									size={25}
									className="hidden 800px:block cursor-pointer dark:text-white text-black"
									onClick={() => setOpen(true)}
								/>
							)}
						</div>
					</div>
				</div>
				{/* mobile sidebar */}
				{openSidebar && (
					<div
						className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
						onClick={handleClose}
						id="screen"
					>
						<div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
							<NavItems activeItem={activeItem} isMobile={true} />
							<HiOutlineUserCircle
								size={25}
								className="cursor-pointer ml-5 my-2 text-black dark:text-white"
								onClick={() => setOpen(true)}
							/>
							<br />
							<br />
							<p className="text-[16px] px-2 pl-5 text-black dark:text-white">
								Copyright &#169; 2023 E-learning
							</p>
						</div>
					</div>
				)}
			</div>
			{route === Routes.Login && (
				<>
					{open && (
						<CustomModal
							open={open}
							setOpen={setOpen}
							setRoute={setRoute}
							activeItem={activeItem}
							component={Login}
						/>
					)}
				</>
			)}
			{route === Routes.SignUp && (
				<>
					{open && (
						<CustomModal
							open={open}
							setOpen={setOpen}
							setRoute={setRoute}
							activeItem={activeItem}
							component={SignUp}
						/>
					)}
				</>
			)}
			{route === Routes.Verification && (
				<>
					{open && (
						<CustomModal
							open={open}
							setOpen={setOpen}
							setRoute={setRoute}
							activeItem={activeItem}
							component={Verification}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Header;
