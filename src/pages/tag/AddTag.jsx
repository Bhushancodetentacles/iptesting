import React, { useState } from 'react';
import Dashboardlayout from '../../common/Dashboardlayout';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowRight, CircleX } from 'lucide-react';
import { post } from '../../services/ApiService';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
});

function AddTag() {
 
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            status: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            debugger
            try {
                const response = await post('addTag', values);
                toast.success(response.message)
                navigate('/tag-list'); // Navigate to tag list on success
            } catch (error) {
                console.error('Error adding tag:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Dashboardlayout title="Add Tag">
            <h2 className='text-3xl mb-2 text-white font-extrabold mb-6'>Add Tag</h2>
            <div className='card-bg p-6 mt-4 rounded-lg'>
                <div className='w-full'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 mb-4 px-3">
                                <label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    placeholder="Enter Name"
                                    className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-700 text-xs pt-1 pl-1">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            {/* <div className="w-full md:w-1/2 mb-4 px-3">
                                <label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1" htmlFor="description">
                                    Description
                                </label>
                                <input
                                    id="description"
                                    name="description"
                                    placeholder="Enter Description"
                                    className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                            </div> */}
                            <div className="w-full md:w-1/2 px-3 flex items-center">
                                <div className='flex items-center'>
                                    <input
                                        id="status"
                                        name="status"
                                        type="checkbox"
                                        className="w-4 h-4 text-secondary bg-[#0e151d] border-2 border-[#4c4c4c5e] rounded focus:ring-secondary dark:focus:ring-secondary dark:ring-offset-gray-800 focus:ring-2"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.status}
                                    />
                                    <label htmlFor="status" className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold ml-3 mb-1">
                                       Status (Block/Unblock)
                                    </label>
                                </div>
                            </div>
                            <div className="w-full flex justify-center gap-2 mt-2 px-3">
                                <Link to="/tag-list" className="button">
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
    );
}

export default AddTag;
