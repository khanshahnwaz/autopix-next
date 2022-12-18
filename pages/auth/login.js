import React, { useState } from "react";
import Link from "next/link";
import Auth from "../layouts/Auth.js";
import { useFormik } from "formik";
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
export default function Login() {
	const [Vicon,setVIcon]=useState(eyeOff)
	const [type,setType]=useState('password')
	// to change the password visibility
	const handlePass=()=>{
		type=='password'?(setType('text'),setVIcon(eye)):(setType('password'),setVIcon(eyeOff))
	}
	const loginForm = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validate: (values) => {
			const errors = {};

			if (!values.email) {
				errors.email = "*required";
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
			) {
				errors.email = "*invalid email";
			}
			if (!values.password) {
				errors.password = "*required";
			}
			return errors;
		},
		onSubmit: async (values) => {
			await new Promise((r) => setTimeout(r, 500));
			console.log(values);
		},
	});

	return (
		<>
			<div className="container mx-auto px-4 h-full">
				<div className="flex content-center items-center justify-center h-full">
					<div className="w-full lg:w-4/12 px-4">
						<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
							<div className="rounded-t mb-0 px-6 py-6">
								<div className="text-center mb-3">
									<h6 className="text-blueGray-500 text-sm font-bold">
										Sign in with
									</h6>
								</div>
								<hr className="mt-6 border-b-1 border-blueGray-300" />
							</div>
							<div className="flex-auto px-4 lg:px-10 py-10 pt-0">
								<form onSubmit={loginForm.handleSubmit}>
									<div className="relative w-full mb-3">
										<label
											className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
											htmlFor="grid-password"
										>
											Email
										</label>
										<input
											className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
											placeholder="Email"
											type="email"
											name="email"
											onBlur={loginForm.handleBlur}
											onChange={loginForm.handleChange}
											value={loginForm.values.email}
										/>
										{loginForm.errors.email && loginForm.touched.email ? (
											<span className="text-red-400 text-left">
												{loginForm.errors.email}
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
										<div className="bg-white rounded-md flex items-center ">
										<input
											type={type}
											className=" px-3 py-3 rounded placeholder-blueGray-300 focus:outline-none focus:ring  text-blueGray-600 bg-transparent text-sm bg-white ease-linear transition-all duration-150 w-full shadow border-0"
											placeholder="Password"
											name="password"
											onBlur={loginForm.handleBlur}
											onChange={loginForm.handleChange}
											value={loginForm.values.password}
										/>
												<span className="bg-white pt-1 cursor-pointer" onClick={handlePass}><Icon icon={Vicon}/></span>

										</div>
										{loginForm.errors.password && loginForm.touched.password ? (
											<span className="text-red-400 text-left">
												{loginForm.errors.password}
											</span>
										) : null}
									</div>
									<div>
										<label className="inline-flex items-center cursor-pointer">
											<input
												id="customCheckLogin"
												type="checkbox"
												className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
											/>
											<span className="ml-2 text-sm font-semibold text-blueGray-600">
												Remember me
											</span>
										</label>
									</div>

									<div className="text-center mt-6">
										<button
											className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
											type="submit"
										>
											Sign In
										</button>
									</div>
								</form>
							</div>
						</div>
						<div className="flex flex-wrap mt-6 relative">
							<div className="w-1/2">
								<a
									href="#pablo"
									onClick={(e) => e.preventDefault()}
									className="text-blueGray-200"
								>
									<small>Forgot password?</small>
								</a>
							</div>
							<div className="w-1/2 text-right">
								<Link legacyBehavior href="/auth/register">
									<a href="#pablo">
										<small>Create new account</small>
									</a>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

Login.layout = Auth;
