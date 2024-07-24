import React, { useEffect, useState } from "react";
import Dashboardlayout from "../../common/Dashboardlayout";
import ReactSelect from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { get, put } from "../../services/ApiService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	shortDiscription: Yup.string().required("Short description is required"),
	longDiscription: Yup.string().required("Long description is required"),
	websiteSite: Yup.string()
		.url("Invalid URL")
		.required("Website Link is required"),
	// fileUrl: Yup.string().url("Invalid URL").required("File URL is required"),
	// Add validation rules for other fields...
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
function EditProject() {
	const { projectId } = useParams();
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [chains, setChains] = useState([]);
	const [tags, setTags] = useState([]);
	const [imageChanged, setImageChanged] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [categoriesData, subCategoryData, chainData, tagData] =
					await Promise.all([
						get("getAllCategory"),
						get("getAllSubCategory"),
						get("getAllChains"),
						get("getAllTag"),
					]);
				const categoryOptions = categoriesData.map((item) => ({
					value: item._id,
					label: item.name,
				}));

				const subCategoryOptions = subCategoryData.map((item) => ({
					value: item._id,
					label: item.name,
				}));
				const chainOptions = chainData.map((item) => ({
					value: item._id,
					label: item.name,
				}));
				const tagOptions = tagData.map((item) => ({
					value: item._id,
					label: item.name,
				}));
				setTags(tagOptions);
				setChains(chainOptions);
				setSubCategories(subCategoryOptions);
				setCategories(categoryOptions);
				await fetchProjectData(
					categoryOptions,
					subCategoryOptions,
					chainOptions,
					tagOptions
				);
			} catch (error) {
				console.error("unable to fetch data please try again", error);
			}
		};

		fetchData();
	}, []);

	const fetchProjectData = async (categories, subCategories, chains, tags) => {
		try {
			const response = await get(`getProjectInfo/${projectId}`);
			// formik.setValues(response);

			// Convert comma-separated strings to arrays
			const categoryIds = response.categoryId;
			const subCategoryIds = response.subCategoryId;
			const chainsIds = response.chainId;
			const tagIds = response.tagId;
			const categoryOptions = categoryIds.map((categoryId) => {
				const category = categories.find((cat) => cat.value == categoryId);
				return {
					value: categoryId,
					label: category ? category.label : "", // Get category name or an empty string if not found
				};
			});

			const subCategoryOptions = subCategoryIds.map((subCategoryId) => {
				const subCategory = subCategories.find(
					(subCat) => subCat.value == subCategoryId
				);
				return {
					value: subCategoryId,
					label: subCategory ? subCategory.label : "", // Get subcategory name or an empty string if not found
				};
			});
			const chainsOption = chainsIds.map((chainId) => {
				const chainD = chains.find((chainCat) => chainCat.value == chainId);
				debugger;
				return {
					value: chainId,
					label: chainD ? chainD.label : "", // Get subcategory name or an empty string if not found
				};
			});
			const tagOptions = tagIds.map((tagId) => {
				const tag = tags.find((t) => t.value == tagId);
				return {
					value: tagId,
					label: tag ? tag.label : "", // Get tag name or an empty string if not found
				};
			});

			// Set formik values with the selected options
			formik.setValues({
				...response,
				category: categoryOptions,
				subCategory: subCategoryOptions,
				tagId: tagOptions,
				chain: chainsOption,
				name: response.name,
				shortDescription: response.shortDiscription,
				longDescription: response.longDiscription,
				websiteSite: response.webSiteLink,
				twitterLink: response.twitterLink,
				linkedinLink: response.linkedInLink,
				telegramLink: response.telegramLink,
				discordLink: response.discordLink,
				redditLink: response.redditLink,
				otherLink: response.otherLink,
				projectNameId: response.projectNameId,
				fileName: response.image,
				createdAt: response.createdAt,
				updatedAt: response.updatedAt,
				status: response.status,
			});
		} catch (error) {
			console.error("Error fetching project data:", error);
		}
	};

	// Fetch functions remain the same as in AddProject component

	const formik = useFormik({
		initialValues: {
			name: "",
			shortDescription: "",
			longDescription: "",
			fileName: "",
			chain: [],
			category: [],
			subCategory: [],
			tagId: "",
			websiteSite: "",
			twitterLink: "",
			linkedinLink: "",
			telegramLink: "",
			discordLink: "",
			redditLink: "",
			otherLink: "",
		},
		validationSchema: validationSchema,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const payload = {
					name: values.name,
					shortDiscription: values.shortDescription,
					longDiscription: values.longDescription,
					chainId: values.chain.map((chain) => chain.value),
					categoryId: values.category.map((category) => category.value),
					subCategoryId: values.subCategory.map(
						(subCategory) => subCategory.value
					),
					tagId: values.tagId.map((tag) => tag.value),
					webSiteLink: values.websiteSite,
					twitterLink: values.twitterLink,
					linkedInLink: values.linkedinLink,
					telegramLink: values.telegramLink,
					discordLink: values.discordLink,
					redditLink: values.redditLink,
					otherLink: values.otherLink,
					fileName: imageChanged ? values.fileName : null,
				};
				delete payload.projectNameId;
				const response = await put(`updateProject/${projectId}`, payload);
				toast.success(response.message);
				navigate("/project-list");
			} catch (error) {
				console.error("Error updating project:", error);
			} finally {
				setSubmitting(false);
			}
		},
	});

	console.log("errors", formik.errors);

	return (
		<div>
			<Dashboardlayout title="Edit Project">
				<h2 className="text-3xl mb-2 text-white font-extrabold mb-6">
					Edit Project
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
										name="name"
										placeholder="Enter Name"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="text"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.name}
									/>
									{formik.touched.name && formik.errors.name ? (
										<div className="text-red-700 text-xs">
											{formik.errors.name}
										</div>
									) : null}
								</div>

								<div className="w-full px-3 mb-4">
									<label className="block capitalize mb-1 tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Short Description
									</label>
									<textarea
										name="shortDescription"
										placeholder="Enter Short Description"
										id="resizableTextarea"
										rows="2"
										className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.shortDescription}
									></textarea>
									{formik.touched.shortDescription &&
									formik.errors.shortDescription ? (
										<div className="text-red-700 text-xs">
											{formik.errors.shortDescription}
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
										value={formik.values.longDescription}
										onChange={(value) =>
											formik.setFieldValue("longDescription", value)
										}
									/>
									{formik.touched.longDescription &&
									formik.errors.longDescription ? (
										<div className="text-red-700 text-xs">
											{formik.errors.longDescription}
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
										name="category"
										options={categories}
										isMulti
										styles={customStyles}
										onChange={(selectedOptions) =>
											formik.setFieldValue("category", selectedOptions)
										}
										onBlur={formik.handleBlur}
										value={formik.values.category}
									/>
									{formik.touched.category && formik.errors.category ? (
										<div className="text-red-700 text-xs">
											{formik.errors.category}
										</div>
									) : null}
								</div>

								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										SubCategory
									</label>
									<ReactSelect
										id="SubCategory"
										name="subCategory"
										options={subCategories}
										styles={customStyles}
										isMulti
										onChange={(selectedOptions) =>
											formik.setFieldValue("subCategory", selectedOptions)
										}
										onBlur={formik.handleBlur}
										value={formik.values.subCategory}
									/>
									{formik.touched.subCategory && formik.errors.subCategory ? (
										<div className="text-red-700 text-xs">
											{formik.errors.subCategory}
										</div>
									) : null}
								</div>

								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Chain
									</label>
									<ReactSelect
										id="Chain"
										name="chain"
										isMulti
										options={chains}
										styles={customStyles}
										onChange={(selectedOptions) =>
											formik.setFieldValue("chain", selectedOptions)
										}
										onBlur={formik.handleBlur}
										value={formik.values.chain}
									/>
									{formik.touched.chain && formik.errors.chain ? (
										<div className="text-red-700 text-xs">
											{formik.errors.chain}
										</div>
									) : null}
								</div>

								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Tags
									</label>
									<ReactSelect
										id="tagId"
										name="tagId"
										options={tags}
										isMulti
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
											setImageChanged(true);
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

								{formik.values.fileName && (
									<img
										src={formik.values.fileName}
										alt="Selected File"
										className="mt-2 max-w-full h-auto rounded-lg"
										style={{ maxHeight: "200px" }}
									/>
								)}

								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Website Link
									</label>
									<input
										id="websiteSite"
										name="websiteSite"
										placeholder="Enter Website Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.websiteSite}
									/>
									{formik.touched.websiteSite && formik.errors.websiteSite ? (
										<div className="text-red-700 text-xs">
											{formik.errors.websiteSite}
										</div>
									) : null}
								</div>

								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Twitter Link
									</label>
									<input
										id="twitterLink"
										name="twitterLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.twitterLink}
									/>
									{formik.touched.twitterLink && formik.errors.twitterLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.twitterLink}
										</div>
									) : null}
								</div>
								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Other Link
									</label>
									<input
										id="otherLink"
										name="otherLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.otherLink}
									/>
									{formik.touched.otherLink && formik.errors.otherLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.otherLink}
										</div>
									) : null}
								</div>
								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Discord Link
									</label>
									<input
										id="discordLink"
										name="discordLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.discordLink}
									/>
									{formik.touched.discordLink && formik.errors.discordLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.discordLink}
										</div>
									) : null}
								</div>
								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Linkedin Link
									</label>
									<input
										id="linkedinLink"
										name="linkedinLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.linkedinLink}
									/>
									{formik.touched.linkedinLink && formik.errors.linkedinLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.linkedinLink}
										</div>
									) : null}
								</div>
								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Reddit Link
									</label>
									<input
										id="redditLink"
										name="redditLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.redditLink}
									/>
									{formik.touched.redditLink && formik.errors.redditLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.redditLink}
										</div>
									) : null}
								</div>
								<div className="w-full md:w-1/2 px-3 mb-4">
									<label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1">
										Telegram Link
									</label>
									<input
										id="telegramLink"
										name="telegramLink"
										placeholder="Enter Twitter Link"
										className="bg-[#0e151d] border-1 mb-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
										type="url"
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.telegramLink}
									/>
									{formik.touched.telegramLink && formik.errors.telegramLink ? (
										<div className="text-red-700 text-xs">
											{formik.errors.telegramLink}
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

export default EditProject;
{
	/* <div className="w-full md:w-1/2 px-3">
                                    <label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1" for="large-file-input">
                                        File Upload
                                    </label>
                                    <input type="file" name="large-file-input" id="large-file-input" class="bg-[#0e151d] border-1  w-full border-[#4c4c4c5e] 
                                          rounded-lg text-white  text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0 
                                          file:bg-gray-50 file:border-0
                                          file:me-4
                                          file:py-6 file:px-4 file:sm:py-5"
                                    />

                                </div> */
}
