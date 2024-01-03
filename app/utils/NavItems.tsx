import { FC } from "react";
import Link from "next/link";

export const navItemData = [
	{ name: "Home", url: "/" },
	{ name: "Courses", url: "/courses" },
	{ name: "About", url: "/about" },
	{ name: "Policy", url: "/policy" },
	{ name: "FAQ", url: "/faq" },
];

type Props = {
	activeItem: number;
	isMobile?: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
	return (
		<>
			<div className="hidden 800px:flex">
				{navItemData &&
					navItemData.map((item, index) => (
						<Link key={index} href={`{item.url}`} passHref>
							<span
								className={`${
									activeItem === index
										? "dark:text-[#37a39a] text-[crimson]"
										: "dark:text-white text-black"
								} text-[18px] px-6 font-Poppins font-[400]`}
							>
								{item.name}
							</span>
						</Link>
					))}
			</div>
			{isMobile && (
				<div className="800px:hidden mt-5">
					{navItemData &&
						navItemData.map((item, index) => (
							<Link key={index} href={`{item.url}`} passHref>
								<span
									className={`${
										activeItem === index
											? "dark:text-[#37a39a] text-[crimson]"
											: "dark:text-white text-black"
									} block py-5 text-[18px] px-6 font-Poppins px-6 font-[400]`}
								>
									{item.name}
								</span>
							</Link>
						))}
				</div>
			)}
		</>
	);
};

export default NavItems;
