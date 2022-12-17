import React, { useEffect, useState } from "react";
import Auth from "../layouts/Auth.js";
import { useFormik, Formik, Field, Form } from "formik";
import $ from "jquery";
import Link from 'next/link'
export default function Register() {
	const [level, setLevel] = useState(0);
	const [data, setData] = useState({});
	const form1 = useFormik({
		initialValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		validate: (values) => {
			const errors = {};

			if (!values.email) {
				errors.email = "*Required";
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
			) {
				errors.email = "*Invalid email";
			}
			if (!values.password) {
				errors.password = "*Required";
			} else if (values.password.length != 8) {
				errors.password = "*Must contain 8 characters";
			}
			if (!values.confirmPassword) {
				errors.confirmPassword = "*Required";
			} else if (values.confirmPassword != values.password) {
				errors.confirmPassword = "*password doesn't match.";
			}
			return errors;
		},
		onSubmit: async (values) => {
			await new Promise((r) => setTimeout(r, 500));
			console.log(values);
			setData(values);
			setLevel(1);
		},
	});

	const form2 = useFormik({
		initialValues: {
			name: "",
			company: "",
		},
		validate: (values) => {
			const errors = {};
			if (!values.name) {
				errors.name = "*Required";
			}

			if (!values.company) {
				errors.company = "*Required";
			}
			return errors;
		},
		onSubmit: async (values) => {
			// await new Promise((r) => setTimeout(r, 1000));
			// var obj = Object.assign({}, data, values);
			// console.log(values);
			setData(val=>[...val,values]);
			// useEffect(() => {
			alert(JSON.stringify(data));
			// }, [data]);
			// updateData(values);
		},
	});

	return (
		<>
			<div className="container mx-auto px-4 h-full">
				<div className="flex content-center items-center justify-center h-full">
					<div className="w-full lg:w-6/12 px-4">
						<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
							<div className="rounded-t mb-0 px-6 py-6">
								<div className="text-center mb-3">
									<h6 className="text-blueGray-500 text-xl font-bold">
										CREATE ACCOUNT
									</h6>
									<small>Already have one? <Link href='/auth/login'><span className="text-blue-700 hover:cursor-pointer">SignIn</span></Link></small>
								</div>
								<hr className="mt-6 border-b-1 border-blueGray-300" />
							</div>
							<div className="flex-auto px-4 lg:px-10 py-10 pt-0">

								{level === 0 ? (
									<form onSubmit={form1.handleSubmit}>
										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												Email
											</label>
											<input
												type="email"
												name="email"
												onBlur={form1.handleBlur}
												onChange={form1.handleChange}
												value={form1.values.email}
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="Email"
											/>
											{form1.errors.email && form1.touched.email ? (
												<span className="text-red-400 text-left">
													{form1.errors.email}
												</span>
											) : null}
										</div>

										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												Password
											</label>
											<input
												type="password"
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="Password"
												name="password"
												onBlur={form1.handleBlur}
												onChange={form1.handleChange}
												value={form1.values.password}
											/>
											{form1.errors.password && form1.touched.password ? (
												<span className="text-red-400 text-left">
													{form1.errors.password}
												</span>
											) : null}
										</div>

										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												Confirm Password
											</label>
											<input
												type="password"
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="Confirm Password"
												name="confirmPassword"
												onBlur={form1.handleBlur}
												onChange={form1.handleChange}
												value={form1.values.confirmPassword}
											/>
											{form1.errors.confirmPassword &&
											form1.touched.confirmPassword ? (
												<span className="text-red-400 text-left">
													{form1.errors.confirmPassword}
												</span>
											) : null}
										</div>
										<div className="text-center mt-6">
											<button
												className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
												type="submit"
											>
												Create New Account
											</button>
										</div>
									</form>
								) : (
									<form onSubmit={form2.handleSubmit}>
										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-name"
											>
												Name
											</label>
											<input
												type="text"
												name="name"
												onBlur={form2.handleBlur}
												onChange={form2.handleChange}
												value={form2.values.name}
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="Name"
											/>
											{form2.errors.name && form2.touched.name ? (
												<span className="text-red-400 text-left">
													{form2.errors.name}
												</span>
											) : null}
										</div>

										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-company"
											>
												Company Name
											</label>
											<input
												type="text"
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="Company Name"
												name="company"
												onBlur={form2.handleBlur}
												onChange={form2.handleChange}
												value={form2.values.company}
											/>
											{form2.errors.company && form2.touched.company ? (
												<span className="text-red-400 text-left">
													{form2.errors.company}
												</span>
											) : null}
										</div>

										<div className="text-center mt-6 flex">
											<button
												className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
												type="button"
												onClick={() => {
													setLevel(0);
												}}
											>
												Back
											</button>
											<button
												className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
												type="submit"
											>
												Complete Registration
											</button>
										</div>
									</form>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

Register.layout = Auth;
