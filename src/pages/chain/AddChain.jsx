import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowRight, CircleX } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Dashboardlayout from "../../common/Dashboardlayout";
import { post } from "../../services/ApiService";
import { toast } from "react-toastify";
import { handleFileUpload } from "../../utils/handleFileUpload";

function AddChain() {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			chainId: "",
			name: "",
			symbol: "",
			description: "",
			status: false,
			fileName: "", // Change to URL for simplicity
		},
		validationSchema: Yup.object().shape({
			chainId: Yup.number().required("chainId is required"),
			name: Yup.string().required("name is required"),
			symbol: Yup.string().required("symbol is required"),
		}),
		onSubmit: async (values) => {
			try {
				const result = await post("addChain", values);
				toast.success(result.message);
				navigate("/chain-list");
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<Dashboardlayout title="Addchain">
			<h2 className="text-3xl mb-2 text-secondary font-extrabold">Add Chain</h2>
			<div className="card-bg p-6 mt-4 rounded-lg">
				<div className="w-full">
					<form onSubmit={formik.handleSubmit}>
						<div className="flex flex-wrap -mx-3 mb-6">
							<div className="w-full md:w-1/2 px-3 mb-4">
								<label
									className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1"
									htmlFor="chainId"
								>
									Chain Id
								</label>
								<input
									id="chainId"
									name="chainId"
									placeholder="Enter Chain Id"
									className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5]
                    cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
									type="text"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.chainId}
								/>
								{formik.touched.chainId && formik.errors.chainId ? (
									<div className="text-red-500 text-sm">
										{formik.errors.chainId}
									</div>
								) : null}
							</div>

							<div className="w-full md:w-1/2 px-3 mb-4">
								<label
									className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1"
									htmlFor="name"
								>
									Name
								</label>
								<input
									id="name"
									name="name"
									placeholder="Enter Name"
									className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5]
                    cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
									type="text"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.name}
								/>
								{formik.touched.name && formik.errors.name ? (
									<div className="text-red-500 text-sm">
										{formik.errors.name}
									</div>
								) : null}
							</div>

							<div className="w-full md:w-1/2 px-3 mb-4">
								<label
									className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1"
									htmlFor="symbol"
								>
									Symbol
								</label>
								<input
									id="symbol"
									name="symbol"
									placeholder="Enter Symbol"
									className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5]
                    cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
									type="text"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.symbol}
								/>
								{formik.touched.symbol && formik.errors.symbol ? (
									<div className="text-red-500 text-sm">
										{formik.errors.symbol}
									</div>
								) : null}
							</div>

							<div className="w-full md:w-1/2 px-3 mb-4">
								<label
									className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1"
									htmlFor="description"
								>
									Description
								</label>
								<input
									id="description"
									name="description"
									placeholder="Enter Description"
									className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5]
                    cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
									type="text"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.description}
								/>
								{formik.touched.description && formik.errors.description ? (
									<div className="text-red-500 text-sm">
										{formik.errors.description}
									</div>
								) : null}
							</div>

							<div className="w-full md:w-1/2 flex items-center px-3 mb-4">
								<div className="flex items-center">
									<input
										id="status"
										name="status"
										type="checkbox"
										className="w-4 h-4 text-secondary bg-[#121a23] border-2 border-[#4c4c4c33] rounded focus:ring-secondary focus:ring-2"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										checked={formik.values.status}
									/>
									<label
										htmlFor="status"
										className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1 ml-2"
									>
										Status (Block/unblock)
									</label>
								</div>
								{formik.touched.status && formik.errors.status ? (
									<div className="text-red-500 text-sm">
										{formik.errors.status}
									</div>
								) : null}
							</div>

							<div className="w-full md:w-1/2 px-3">
								<label
									className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1"
									for="large-file-input"
								>
									File Upload
								</label>
								<input
									type="file"
									onChange={async (event) => {
										const fileName = await handleFileUpload(event);
										formik.setFieldValue("fileName", fileName);
									}}
									name="large-file-input"
									id="large-file-input"
									className="bg-[#0e151d] border-1  w-full border-[#4c4c4c5e]
                                          rounded-lg text-white  text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0 
                                          file:bg-gray-50 file:border-0
                                          file:me-4
                                          file:py-6 file:px-4 file:sm:py-5"
								/>
              </div>
              
							<div className="w-full flex justify-center gap-2 mt-2 px-3">
								<Link to="/chain-list" className="button">
									<CircleX />
									Cancel
								</Link>
								<button
									type="submit"
									className="submit-button"
									disabled={formik.isSubmitting}
								>
									Submit
									<ArrowRight />
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</Dashboardlayout>
	);
}

export default AddChain;
