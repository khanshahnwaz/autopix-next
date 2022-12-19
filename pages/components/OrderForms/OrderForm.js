import React, { useEffect, useState } from "react";
// import Auth from "../layouts/Auth.js";
import { useFormik, Formik, Field, Form } from "formik";
import Link from 'next/link';

export default function Register() {
	
	const [level, setLevel] = useState(0);
	const [data, setData] = useState({});

	
	const form1 = useFormik({
		initialValues: {
			jobName: "",
			deliveryTime: "",
			message: "",
			instruction:""
		},
		validate: (values) => {
			const errors = {};

			if (!values.jobName) {
				errors.jobName = "*Required";
			}
             
			if (!values.deliveryTime) {
				errors.deliveryTime = "*Required";
			}
             
			if (!values.message) {
				errors.message = "*Required";
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

	

    // upload images with preview
const[fileInput,setFileInput]=useState(null) ;
const[imageContainer,setImageContainer]=useState(null)
const[numOfFiles,setNumOfFiles]=useState(null)
const[num,setNum]=useState(0);
useEffect(()=>{
    console.log("hii")
 setFileInput (document.getElementById("file-input"));
 setImageContainer(document.getElementById("images"));
 console.log(imageContainer)
 setNumOfFiles(document.getElementById("num-of-files"));
},[level])
function preview(){
    // imageContainer.innerHTML = "";
    let number=`${fileInput.files.length}`
    // numOfFiles.textContent += `${fileInput.files.length} Files Selected`;
    setNum(parseInt(num)+parseInt(number));
let i;
    for( i of fileInput.files){
        let reader = new FileReader();
        let figure = document.createElement("figure");
        figure.classList.add('w-[45%]')
        let figCap = document.createElement("figcaption");
        figCap.classList.add('text-center','text-2xl','mt-2')
        figCap.innerText = i.name;
        figure.appendChild(figCap);
        reader.onload=()=>{
            let img = document.createElement("img");
            img.setAttribute("src",reader.result);
            // img.classList.add('w-[200px]')
            img.style.width='150px';
			img.style.border='1px dashed black';
			img.style.margin='0 5px';
            figure.insertBefore(img,figCap);
        }
        imageContainer.appendChild(figure);
        reader.readAsDataURL(i);
    }
}

	return (
		<>
			<div className="container mx-auto px-4 h-full">
				<div className="flex content-center items-center justify-center h-full">
					<div className="w-full lg:w-6/12 px-4">
						<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
							<div className="rounded-t mb-0 px-6 py-6">
								<div className="text-center mb-3">
									<h6 className="text-blueGray-500 text-xl font-bold">
										ADD NEW ORDER
									</h6>
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
												JOB NAME
											</label>
											<input
												type="text"
												name="jobName"
												onBlur={form1.handleBlur}
												onChange={form1.handleChange}
												value={form1.values.jobName}
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="jobName"
											/>
											{form1.errors.jobName && form1.touched.jobName ? (
												<span className="text-red-400 text-left">
													{form1.errors.jobName}
												</span>
											) : null}
										</div>

										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												DELIVERY TIME											</label>
											<input
												type="date"
												name="deliveryTime"
												onBlur={form1.handleBlur}
												onChange={form1.handleChange}
												value={form1.values.deliveryTime}
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="DeliveryTime"
											/>
											{form1.errors.deliveryTime && form1.touched.deliveryTime ? (
												<span className="text-red-400 text-left">
													{form1.errors.deliveryTime}
												</span>
											) : null}
										</div>
										
                                        <div className="relative w-full mb-3">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												MESSAGE											</label>
											<textarea
												name="message"
												onBlur={form1.handleBlur}
												onChange={form1.handleChange}
												value={form1.values.message}
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 h-96"
												placeholder="Please write message"
											/>
											{form1.errors.message && form1.touched.message ? (
												<span className="text-red-400 text-left">
													{form1.errors.message}
												</span>
											) : null}
										</div>
										
										<div className="relative w-full mb-3">
											<label
												className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
												htmlFor="grid-password"
											>
												INSTRUCTION											</label>
											<input
												type="text"
												name="instruction"
												onBlur={form1.handleBlur}
												onChange={form1.handleChange}
												value={form1.values.instruction}
												className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
												placeholder="Wan to add new instruction?"
											/>
											{form1.errors.instruction && form1.touched.instruction ? (
												<span className="text-red-400 text-left">
													{form1.errors.instruction}
												</span>
											) : null}
										</div>

										<div className="text-center mt-6">
											<button
												className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
												type="submit"
											>
												SAVE AND UPLOAD IMAGES
											</button>
										</div>
									</form>
								) : (
									<div className="container bg-white w-[60%] min-w-[45px] relative my-12 mx-auto py-12 px-5 rounded-md shadow-md text-center">
        <input className="hidden" type="file" id="file-input" accept="image/png, image/jpeg" onChange={preview} multiple/>
        <label htmlFor="file-input" className="bg-red-600 px-4 py-2 rounded-lg cursor-pointer hover:opacity-50 text-2xl ">
            + Upload image
        </label>
        <p id="num-of-files" className="text-center mt-5 mx-0 mb-8">{num} Files Chosen</p>
        <div id="images" className="flex flex-wrap"></div>
        <button className="bg-red-400 rounded-md text-base px-2 py-1 " onClick={()=>{
            console.log("Added images ",fileInput.files)
        }}><Link href='/admin/tables'>Save</Link></button>
    </div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

// Register.layout = Auth;
