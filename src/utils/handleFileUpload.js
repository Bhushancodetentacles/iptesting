import { toast } from "react-toastify";
import { post } from "../services/ApiService";

export const handleFileUpload = async (event) => {
	try {
		const file = event.target.files[0]; // Accessing the file from event.target.files
		const formData = new FormData();
		formData.append("file", file);
		const result = await post("fileUpload", formData, {
			"Content-Type": "multipart/form-data", // Setting correct Content-Type header
		});
		debugger

		toast.success(result.message);
		return result.filename;
	} catch (error) {
		console.log(error);
		toast.error("Error uploading file");
	}
};
