import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowRight, CircleX } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Dashboardlayout from '../../common/Dashboardlayout';
import { get, put } from '../../services/ApiService';
import { toast } from 'react-toastify';

function EditTag() {
    const navigate = useNavigate();
    const { tagsId } = useParams();
    const [initialValues, setInitialValues] = useState({
        name: '',
        // description: '',
        status: false,
    });

    useEffect(() => {
        const fetchTag = async () => {
            try {
                const response = await get(`getTagInfo/${tagsId}`);
                setInitialValues({
                    name: response.name,
                    // description: response.description,
                    status: response.status,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchTag();
    }, [tagsId]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
               const result = await put(`updateTag/${tagsId}`, values);
                toast.success(result.message)
                navigate('/tag-list');
            } catch (error) {
                console.log(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Dashboardlayout title="Edit Tag">
            <h2 className='text-3xl mb-2 text-secondary font-extrabold'>Edit Tag</h2>
            <div className='card-bg p-6 mt-4 rounded-lg'>
                <div className='w-full'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-4">
                                <label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1" htmlFor="name">
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
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                                ) : null}
                            </div>

                            {/* <div className="w-full md:w-1/2 px-3 mb-4">
                                <label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1" htmlFor="description">
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
                             
                            </div> */}

                            <div className="w-full md:w-1/2 flex items-center px-3 mb-4">
                                <div className="flex items-center">
                                    <input
                                        id="status"
                                        name="status"
                                        type="checkbox"
                                        className="w-4 h-4 text-secondary bg-[#121a23] border-2 border-[#4c4c4c33] rounded focus:ring-secondary focus:ring-2"
                                        checked={formik.values.status}
                                        onChange={formik.handleChange}
                                    />
                                    <label htmlFor="status" className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1 ml-2">
                                        Status (Block/Unblock)
                                    </label>
                                </div>
                            </div>

                            <div className="w-full flex justify-center gap-2 mt-2 px-3">
                                <Link to="/tag-list" className="button">
                                    <CircleX />
                                    Cancel
                                </Link>
                                <button type="submit" className="submit-button" disabled={formik.isSubmitting}>
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

export default EditTag;