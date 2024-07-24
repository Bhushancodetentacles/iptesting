import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowRight, CircleX } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dashboardlayout from "../../common/Dashboardlayout";
import { get, put } from "../../services/ApiService";
import { toast } from "react-toastify";

function EditCategory() {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  /* get data from api */
  const fetchCategoryById = async () => {
    try {
      const response = await get(`getCategoryInfo/${categoryId}`);
      formik.setFieldValue('name', response.name)
      formik.setFieldValue('description', response.description)
      formik.setFieldValue('status', response.status)
    } catch (error) {
      console.log(error);
    }
  };
  /* from defination */
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      status: false,
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values,{setSubmitting}) => {
      try {
        const result = await put(`updateCategory/${categoryId}`, values);
        navigate("/category-list");
        toast.success(result.message);
      } catch (error) {
        console.log(error);
      } finally{
        setSubmitting(false)
      }
    },
  });
  /* fetch initial data */
  useEffect(() => {
    fetchCategoryById();
  }, [categoryId]);

  return (
    <Dashboardlayout title="Edit Category">
      <h2 className="text-3xl mb-2 text-secondary font-extrabold">
        Edit Category
      </h2>
      <div className="card-bg p-6 mt-4 rounded-lg">
        <div className="w-full">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
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
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {
                    formik.errors && formik.touched && <p className="text-sm text-red-500">{formik.errors.name}</p>
                }
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
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              <div className="w-full md:w-1/2 flex items-center px-3 mb-4">
                <div className="flex items-center">
                  <input
                    id="status"
                    name="status"
                    type="checkbox"
                    className="w-4 h-4 text-secondary bg-[#121a23] border-2 border-[#4c4c4c33] rounded focus:ring-secondary focus:ring-2"
                    value={formik.values.status}
                    checked={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                 />
                  <label
                    htmlFor="status"
                    className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1 ml-2"
                  >
                    Is Block
                  </label>
                </div>
              </div>

              <div className="w-full flex justify-center gap-2 mt-2 px-3">
                <Link to="/category-list" className="button">
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

export default EditCategory;
