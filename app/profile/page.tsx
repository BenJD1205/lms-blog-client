"use client";
import { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";

interface Props {}

const Page: FC<Props> = (props) => {
	const [open, setOpen] = useState(false);
	const [activeItem, setActiveItem] = useState(0);
	const [route, setRoute] = useState("Login");
	const { user } = useSelector((state: any) => state.auth);

	return (
		<div>
			<Protected>
				<Heading
					title={`${user?.name} profile`}
					description="ELearning is a platform for students to learn and get help form teachers"
					keywords="Programming, MERN, Redux"
				/>
				<Header
					open={open}
					setOpen={setOpen}
					activeItem={activeItem}
					route={route}
					setRoute={setRoute}
				/>
				<Profile user={user} />
			</Protected>
		</div>
	);
};

export default Page;
