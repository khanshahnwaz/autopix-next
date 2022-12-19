import React from "react";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import HeaderStats from "../components/Headers/HeaderStats.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";
import Link from 'next/link';
export default function Admin({ children }) {
	return (
		<>
			<Sidebar />
			<div className="relative md:ml-64 bg-blueGray-100">
				<AdminNavbar />
				{/* Header */}
				<div className="bg-white md:pt-32 pb-32 pt-12 mx-auto text-center">
					{/* <HeaderStats /> */}
					{/* CREATE NEW ORDERS */}
					
					<label className=" text-2xl text-center text-black font-bold">ORDERS</label><br />
					<p className="text-gray-700 mb-2">On this page, you can order new jobs, check current jobs and comment or simply approve and download</p>
					
						<button className=" w-96 rounded-lg px-3 py-2 text-center text-black bg-red-500 hover:opacity-50 hover:cursor-pointer border-2 font-bold" ><Link href='/AddOrder'>+ CREATE NEW ORDER</Link></button>

					
				</div>
				<div className="px-4 md:px-10 mx-auto w-full -m-24">
					{children}
					<FooterAdmin />
				</div>
			</div>
		</>
	);
}
