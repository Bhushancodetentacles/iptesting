import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ArrowRight, CircleX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Dashboardlayout from '../../common/Dashboardlayout';
import { post } from '../../services/ApiService';
import { toast } from 'react-toastify';

function AddCategory() {
    const navigate = useNavigate();
    const initialValues = {
        name: '',
        description: '',
        status: false,
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        status: Yup.boolean(),
    });

    const onSubmit = async (values) => {
        try {
           const result = await post('addCategory', values);
           toast.success(result.message)
            navigate('/category-list');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dashboardlayout title="Add Category">
            <h2 className='text-3xl mb-2 text-secondary font-extrabold'>Add Category</h2>
            <div className='card-bg p-6 mt-4 rounded-lg'>
                <div className='w-full'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-4">
                                        <label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1" htmlFor="name">
                                            Name
                                        </label>
                                        <Field
                                            id="name"
                                            name="name"
                                            placeholder="Enter Name"
                                            className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5]
                                            cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
                                            type="text"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div className="w-full md:w-1/2 px-3 mb-4">
                                        <label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1" htmlFor="description">
                                            Description
                                        </label>
                                        <Field
                                            id="description"
                                            name="description"
                                            placeholder="Enter Description"
                                            className="bg-[#0e151d] border-1 w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5]
                                            cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
                                            type="text"
                                        />
                                    </div>

                                    <div className="w-full md:w-1/2 flex items-center px-3 mb-4">
                                        <div className="flex items-center">
                                            <Field
                                                id="status"
                                                name="status"
                                                type="checkbox"
                                                className="w-4 h-4 text-secondary bg-[#121a23] border-2 border-[#4c4c4c33] rounded focus:ring-secondary focus:ring-2"
                                            />
                                            <label htmlFor="status" className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1 ml-2">
                                               Status (Block/unblock)
                                            </label>
                                        </div>
                                        <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div className="w-full flex justify-center gap-2 mt-2 px-3">
                                        <Link to="/category-list" className="button">
                                            <CircleX />
                                            Cancel
                                        </Link>
                                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                                            Submit
                                            <ArrowRight />
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Dashboardlayout>
    );
}

export default AddCategory;
