import React from "react";
import Link from "next/link";

const HeaderAddOrder = () => {
	return (
		<div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12 text-center">
			{/* CREATE NEW ORDERS */}

			<label className=" text-2xl text-center text-white font-bold">
				ORDERS
			</label>
			<br />
			<p className="mb-2 text-white">
				On this page, you can order new jobs, check current jobs and comment or
				simply approve and download
			</p>
			<div className="text-center mt-6">
				<button
					className="text-blueGray-800 bg-white text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-auto"
					type="submit"
				>
					<Link href="/AddOrder">+ CREATE NEW ORDER</Link>
				</button>
			</div>
		</div>
	);
};

export default HeaderAddOrder;
