import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowRight, CircleX } from "lucide-react";
import { get, post, put } from "../../services/ApiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Dashboardlayout from "../../common/Dashboardlayout";

function EditChain() {
  const { id } = useParams();
  const navigate = useNavigate();

  const getChainInfo = async () => {
    try {
      const result = await get(`getChainInfo/${id}`);
      const { chainId, name, symbol, description, status, image } = result;
      debugger
      formik.setValues({
        chainId,
        name,
        symbol,
        description,
        status,
        image,
        file: null, // Added to handle file input
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChainInfo();
  }, []);

  const formik = useFormik({
    initialValues: {
      chainId: "",
      name: "",
      symbol: "",
      description: "",
      status: false,
      fileName: "",
      file: null, // Added to handle file input
    },
    validationSchema: Yup.object().shape({
      chainId: Yup.number().required("Chain ID is required"),
      name: Yup.string().required("Name is required"),
      symbol: Yup.string().required("Symbol is required"),
    }),
    onSubmit: async (values) => {
      try {
           const formData = {
            name:values.name,
            chainId:values.chainId,
            description:values.description,
            status:values.status,
            symbol:values.symbol,
            fileName:values.fileName
           }
        const response = await put(`updateChain/${id}`, formData);
        toast.success(response.message);
        navigate("/chain-list");
      } catch (error) {
        console.log(error);
        toast.error("Error updating chain");
      }
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("file", event.currentTarget.files[0]);
    // Optionally, you can preview the selected image here
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        formik.setFieldValue("image", reader.result);
      }
    };
    reader.readAsDataURL(event.currentTarget.files[0]);
  };

  return (
    <div>
      <Dashboardlayout title="Edit Chain">
        <h2 className="text-3xl mb-2 text-secondary font-extrabold">
          Edit Chain
        </h2>
        <div className="card-bg p-6 mt-4 rounded-lg">
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1"
                    htmlFor="chainId"
                  >
                    Chain ID
                  </label>
                  <input
                    id="chainId"
                    name="chainId"
                    placeholder="Enter Chain ID"
                    className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5]
                      cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
                    type="text"
                    value={formik.values.chainId}
                    disabled
                  />
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
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                  />
                  {formik.errors.name && formik.touched.name && (
                    <p className="text-sm text-red-500">{formik.errors.name}</p>
                  )}
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
                    value={formik.values.symbol}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                  />
                  {formik.errors.symbol && formik.touched.symbol && (
                    <p className="text-sm text-red-500">{formik.errors.symbol}</p>
                  )}
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter Description"
                    className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5]
                      cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.description && formik.touched.description && (
                    <p className="text-sm text-red-500">{formik.errors.description}</p>
                  )}
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1"
                    htmlFor="status"
                  >
                     Status (Block/unblock)
                  </label>
                  <div className="flex items-center">
                    <input
                      id="status"
                      name="status"
                      type="checkbox"
                      className="w-4 h-4 text-secondary bg-[#121a23] border-2 border-[#4c4c4c33] rounded focus:ring-secondary focus:ring-2"
                      checked={formik.values.status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlFor="status"
                      className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1 ml-2"
                    >
                      Status
                    </label>
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label
                    className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1"
                    htmlFor="file"
                  >
                    File Upload
                  </label>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5]
                      cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
                    onChange={handleFileChange}
                    onBlur={formik.handleBlur}
                  />
               
                  {formik.values.image && (
                    <img
                      src={formik.values.image}
                      alt="Selected File"
                      className="mt-2 max-w-full h-auto rounded-lg"
                      style={{ maxHeight: "200px" }}
                    />
                  )}
                </div>

                <div className="w-full flex justify-center gap-2 mt-2 px-3">
                  <Link to="/chain-list" className="button">
                    <CircleX />
                    Back
                  </Link>
                  <button type="submit" className="submit-button">
                    Submit
                    <ArrowRight />
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

export default EditChain;

