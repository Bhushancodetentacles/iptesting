import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../common/Dashboardlayout";
import ReactSelect from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { get, post } from "../../services/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleFileUpload } from "../../utils/handleFileUpload";

const validationSchema = Yup.object().shape({
	Name: Yup.string().required("Name is required"),
	Chain: Yup.array().nullable().required("Chain is required"),
	Category: Yup.array().nullable().required("Category is required"),
	WebsiteSite: Yup.string()
		.url("Invalid URL")
		.required("Website Link is required"),

	SubCategory: Yup.array().nullable().required("SubCategory is required"),
});

const toolbarOptions = [
	["bold", "italic", "underline", "strike"],
	["blockquote", "code-block"],
	["link", "image", "video", "formula"],
	[{ header: 1 }, { header: 2 }],
	[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
	[{ script: "sub" }, { script: "super" }],
	[{ indent: "-1" }, { indent: "+1" }],
	[{ direction: "rtl" }],
	[{ size: ["small", false, "large", "huge"] }],
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ color: [] }, { background: [] }],
	[{ font: [] }],
	[{ align: [] }],
	["clean"],
];

function AddProject() {
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [chains, setChains] = useState([]);
	const [tags, setTags] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		fetchCategories();
		fetchChains();
		fetchTags();
	}, []);

	const fetchCategories = async () => {
		try {
			const response = await get("getAllCategory");
			const categoryOptions = response.map((item) => ({
				value: item._id,
				label: item.name,
			}));
			setCategories(categoryOptions);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	const fetchSubCategories = async (catIds) => {
		try {
			const response = await post(`/subcategories/bycategoryids`, {
				categoryIds: catIds,
			});
			const subCategoryOptions = response.map((item) => ({
				value: item._id,
				label: item.name,
			}));
			setSubCategories(subCategoryOptions);
		} catch (error) {
			console.error("Error fetching subcategories:", error);
		}
	};

	const fetchChains = async () => {
		try {
			const response = await get("getAllChains");
			const chainOptions = response.map((item) => ({
				value: item._id,
				label: item.name,
			}));
			setChains(chainOptions);
		} catch (error) {
			console.error("Error fetching chains:", error);
		}
	};

	const fetchTags = async () => {
		try {
			const response = await get("getAllTag");
			const tagOptions = response.map((item) => ({
				value: item._id,
				label: item.name,
			}));
			setTags(tagOptions);
		} catch (error) {
			console.error("Error fetching tags:", error);
		}
	};

	const handleCategoryChange = (selectedOptions) => {
		formik.setFieldValue("Category", selectedOptions);

		// Extract the category IDs from the selected options
		const categoryIds = selectedOptions.map((option) => option.value);

		// Fetch subcategories if at least one category is selected
		if (categoryIds.length > 0) {
			fetchSubCategories(categoryIds); // Pass IDs as an array to the function
		} else {
			setSubCategories([]); // Clear subcategories if no category is selected
		}
	};

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			boxShadow: "none",
			height: "50px",
			borderRadius: "0.5rem",
			backgroundColor: "#0e151d",
			color: "#fff",
			border: state.isFocused ? "1px solid #bcef0180" : "1px solid #4c4c4c5e",
			"&:hover": {
				border: "1px solid #bcef0180",
			},
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? "#bcef0180" : "#101214",
			color: state.isSelected ? "white" : "white",
			"&:hover": {
				backgroundColor: "#bcef0180",
				color: "white",
			},
		}),
		menu: (provided) => ({
			...provided,
			borderRadius: "8px",
			color: "#fff",
			border: "1px solid #4c4c4c5e",
			boxShadow: "0 0 10px rgba(0,0,0,0.1)",
			backgroundColor: "#101214",
		}),
	};

	const formik = useFormik({
		initialValues: {
			Name: "",
			ShortDiscription: "",
			LongDiscription: "",
			FileName: "",
			Chain: "",
			Category: "",
			SubCategory: "",
			tagId: "",
			WebsiteSite: "",
			TwitterLink: "",
			LinkedinLink: "",
			TelegramLink: "",
			DiscordLink: "",
			RedditLink: "",
			OtherLink: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const payload = {
					// ...values,
					name: values.Name,
					shortDiscription: values.ShortDiscription,
					longDiscription: values.LongDiscription,
					chainId: values.Chain.map((Chain) => Chain.value),
					categoryId: values.Category.map((category) => category.value),
					subCategoryId: values.SubCategory.map(
						(SubCategory) => SubCategory.value
					),
					tagId: values.tagId.map((tag) => tag.value),
					webSiteLink: values.WebsiteSite,
					twitterLink: values.TwitterLink,
					linkedInLink: values.LinkedinLink,
					telegramLink: values.TelegramLink,
					discordLink: values.DiscordLink,
					redditLink: values.RedditLink,
					otherLink: values.OtherLink,
					fileName: values.FileName.length ? values.FileName : null,
				};

				console.log("payload", payload);
				const response = await post("addProject", payload);
				toast.success(response.message);
				navigate("/project-list");
			} catch (error) {
				console.error("Error adding project:", error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	return (
		<div>
			<Dashboardlayout title="Add Project">
				<h2 className="text-3xl mb-2 text-white font-extrabold mb-6">
					Add Project
				</h2>
				<div className="card-bg p-6 mt-4 rounded-lg">
					<div className="w-full">
						<form onSubmit={formik.handleSubmit}>
							<div className="flex flex-wrap mx-3 mb-6">
								<div className="w-full px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Name
									</label>
									<input
										id="Name"
										name="Name"
										placeholder="Enter Name"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="text"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.Name}
									/>
									{formik.touched.Name && formik.errors.Name ? (
										<div className="text-red-700 text-xs">
											{formik.errors.Name}
										</div>
									) : null}
								</div>

								<div className="w-full px-3 mb-4">
									<label className="block capitalize mb-1 tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Short Description
									</label>
									<textarea
										name="ShortDiscription"
										placeholder="Enter Short Description"
										id="resizableTextarea"
										rows="2"
										className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.ShortDiscription}
									></textarea>
									{formik.touched.ShortDiscription &&
									formik.errors.ShortDiscription ? (
										<div className="text-red-700 text-xs">
											{formik.errors.ShortDiscription}
										</div>
									) : null}
								</div>

								<div className="w-full px-3 mb-8">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Long Description
									</label>
									<ReactQuill
										className="bg-[#0e151d] border-1 border-[#4c4c4c5e] mb-6"
										style={{ height: "250px" }}
										modules={{ toolbar: toolbarOptions }}
										theme="snow"
										value={formik.values.LongDiscription}
										onChange={(value) =>
											formik.setFieldValue("LongDiscription", value)
										}
									/>
									{formik.touched.LongDiscription &&
									formik.errors.LongDiscription ? (
										<div className="text-red-700 text-xs mt-12">
											{formik.errors.LongDiscription}
										</div>
									) : null}
								</div>

								{/* Additional form fields for other URLs and ReactSelect components */}
								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Category
									</label>
									<ReactSelect
										id="Category"
										name="Category"
										options={categories}
										isMulti
										styles={customStyles}
										onChange={handleCategoryChange}
										onBlur={formik.handleBlur}
										value={formik.values.Category}
									/>
									{formik.touched.Category && formik.errors.Category ? (
										<div className="text-red-700 text-xs">
											{formik.errors.Category}
										</div>
									) : null}
								</div>

								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										SubCategory
									</label>
									<ReactSelect
										id="SubCategory"
										name="SubCategory"
										options={subCategories}
										styles={customStyles}
										isMulti
										onChange={(selectedOptions) =>
											formik.setFieldValue("SubCategory", selectedOptions)
										}
										onBlur={formik.handleBlur}
										value={formik.values.SubCategory}
									/>
									{formik.touched.SubCategory && formik.errors.SubCategory ? (
										<div className="text-red-700 text-xs">
											{formik.errors.SubCategory}
										</div>
									) : null}
								</div>

								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Chain
									</label>
									<ReactSelect
										id="Chain"
										name="Chain"
										isMulti
										options={chains}
										styles={customStyles}
										value={formik.values.Chain}
										onChange={(selectedOptions) =>
											formik.setFieldValue("Chain", selectedOptions)
										}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.Chain && formik.errors.Chain ? (
										<div className="text-red-700 text-xs">
											{formik.errors.Chain}
										</div>
									) : null}
								</div>

								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Tags
									</label>
									<ReactSelect
										isMulti
										id="tagId"
										name="tagId"
										options={tags}
										styles={customStyles}
										value={formik.values.tagId}
										onChange={(selectedOptions) =>
											formik.setFieldValue("tagId", selectedOptions)
										}
									/>
									{formik.touched.tagId && formik.errors.tagId ? (
										<div className="text-red-700 text-xs">
											{formik.errors.tagId}
										</div>
									) : null}
								</div>

								{/* Additional social media URL inputs */}

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
											debugger;
											formik.setFieldValue("FileName", fileName);
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

								{/* <div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										File URL
									</label>
									<input
										id="FileName"
										name="FileName"
										placeholder="Enter File URL"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.FileName}
									/>
									{formik.touched.FileName && formik.errors.FileName ? (
										<div className="text-red-700 text-xs">
											{formik.errors.FileName}
										</div>
									) : null}
								</div> */}

								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Website Link
									</label>
									<input
										id="WebsiteSite"
										name="WebsiteSite"
										placeholder="Enter Website Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.WebsiteSite}
									/>
									{formik.touched.WebsiteSite && formik.errors.WebsiteSite ? (
										<div className="text-red-700 text-xs">
											{formik.errors.WebsiteSite}
										</div>
									) : null}
								</div>

								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Twitter Link
									</label>
									<input
										id="TwitterLink"
										name="TwitterLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.TwitterLink}
									/>
									{formik.touched.TwitterLink && formik.errors.TwitterLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.TwitterLink}
										</div>
									) : null}
								</div>
								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Other Link
									</label>
									<input
										id="OtherLink"
										name="OtherLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.OtherLink}
									/>
									{formik.touched.OtherLink && formik.errors.OtherLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.OtherLink}
										</div>
									) : null}
								</div>
								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Discord Link
									</label>
									<input
										id="DiscordLink"
										name="DiscordLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.DiscordLink}
									/>
									{formik.touched.DiscordLink && formik.errors.DiscordLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.DiscordLink}
										</div>
									) : null}
								</div>
								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Linkedin Link
									</label>
									<input
										id="LinkedinLink"
										name="LinkedinLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.LinkedinLink}
									/>
									{formik.touched.LinkedinLink && formik.errors.LinkedinLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.LinkedinLink}
										</div>
									) : null}
								</div>
								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Reddit Link
									</label>
									<input
										id="RedditLink"
										name="RedditLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.RedditLink}
									/>
									{formik.touched.RedditLink && formik.errors.RedditLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.RedditLink}
										</div>
									) : null}
								</div>
								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Telegram Link
									</label>
									<input
										id="TelegramLink"
										name="TelegramLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.TelegramLink}
									/>
									{formik.touched.TelegramLink && formik.errors.TelegramLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.TelegramLink}
										</div>
									) : null}
								</div>

								{/* Repeat similar blocks for LinkedinLink, TelegramLink, DiscordLink, RedditLink, OtherLink */}

								<div className="w-full px-3 mb-6">
									<button
										type="submit"
										className="bg-secondary text-white rounded-lg px-6 py-3 text-base w-full transition hover:bg-secondary/[0.8] focus:outline-none focus:ring-2 focus:ring-secondary"
										disabled={formik.isSubmitting}
									>
										{formik.isSubmitting ? "Submitting..." : "Submit"}
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</Dashboardlayout>
		</div>
	);
}

export default AddProject;
