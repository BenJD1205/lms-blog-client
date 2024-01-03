import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { signupSchema } from "@/app/helper/validation";
import {
	AiOutlineEye,
	AiOutlineEyeInvisible,
	AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "@/app/styles/styles";
import { useRegisterMutation } from "../../redux/features/auth/authApi";

type Props = {
	setRoute: (route: string) => void;
};

const SignUp: FC<Props> = ({ setRoute }) => {
	const [show, setShow] = useState<boolean>(false);
	const [register, { isError, data, error, isSuccess }] = useRegisterMutation();

	useEffect(() => {
		if (isSuccess) {
			const message = data?.message || "Registration successful";
			toast.success(message);
			setRoute("Verification");
		}
		if (error) {
			if ("data" in error) {
				const errorData = error as any;
				toast.error(errorData.data.message);
			}
		}
	}, [isSuccess, error]);

	const formik = useFormik({
		initialValues: { name: "", email: "", password: "" },
		validationSchema: signupSchema,
		onSubmit: async ({ name, email, password }) => {
			const data = { name, email, password };
			await register(data);
		},
	});

	const { errors, touched, values, handleChange, handleSubmit } = formik;

	return (
		<div className="w-full">
			<h1 className={`${styles.title}`}>SignUp with E-Learning</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-5">
					<label className={`${styles.label}`} htmlFor="email">
						Enter your name
					</label>
					<input
						type="text"
						name="name"
						value={values.name}
						onChange={handleChange}
						id="email"
						placeholder="John Doe"
						className={`${errors.name && touched.name && "border-red-500"} ${
							styles.input
						}`}
					/>
					{errors.name && touched.name && (
						<span className="text-red-500 pt-2 block">{errors.name}</span>
					)}
				</div>
				<label className={`${styles.label}`} htmlFor="email">
					Enter your email
				</label>
				<input
					type="email"
					name="email"
					value={values.email}
					onChange={handleChange}
					id="email"
					placeholder="example@example.com"
					className={`${errors.email && touched.email && "border-red-500"} ${
						styles.input
					}`}
				/>
				{errors.email && touched.email && (
					<span className="text-red-500 pt-2 block">{errors.email}</span>
				)}
				<div className="w-full mt-5 relative">
					<label className={`${styles.label}`} htmlFor="email">
						Enter your password
					</label>
					<input
						type={show ? "text" : "password"}
						name="password"
						value={values.password}
						onChange={handleChange}
						id="password"
						placeholder="password@123"
						className={`${
							errors.password && touched.password && "border-red-500"
						} ${styles.input}`}
					/>
					{!show ? (
						<AiOutlineEyeInvisible
							className="absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white"
							size={20}
							onClick={() => setShow(true)}
						/>
					) : (
						<AiOutlineEye
							className="absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white"
							size={20}
							onClick={() => setShow(false)}
						/>
					)}
					{errors.email && touched.email && (
						<span className="text-red-500 pt-2 block">{errors.password}</span>
					)}
				</div>
				<div className="w-full mt-5">
					<input type="submit" value="Sign up" className={`${styles.button}`} />
				</div>
				<br />
				<h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
					Or join with
				</h5>
				<div className="flex items-center justify-center my-3">
					<FcGoogle size={30} className="cursor-pointer mr-2" />
					<AiFillGithub size={30} className="cursor-pointer ml-2" />
				</div>
				<h5 className="text-center pt-4 font-Poppins text-[14px] dark:text-white">
					Not have any account?
					<span
						className="text-[#2190ff] pl-1 cursor-pointer"
						onClick={() => setRoute("Login")}
					>
						Login
					</span>
				</h5>
			</form>
			<br />
		</div>
	);
};

export default SignUp;
