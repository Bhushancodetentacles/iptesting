import React, { useEffect, useState } from 'react';
import Dashboardlayout from '../../common/Dashboardlayout';
import { Link, useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowRight, CircleX } from 'lucide-react';
import { get, post } from '../../services/ApiService';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    category: Yup.string().required('category is required'),
});

function Addsubcategory() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        try {
            const response = await get("getAllCategory");
            const formattedCategories = response.map(category => ({
                value: category._id,
                label: category.name
            }));
            setCategories(formattedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            category: '',
            description: '',
            status: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            debugger
            try {
                const payload = {
                    categoryId: values.category,
                    name: values.name,
                    description: values.description,
                    status: values.status,
                };
                const response = await post('addSubCategory', payload);
                navigate('/sub-category'); // Navigate to sub-category list on success
                toast.success(response.message)
            } catch (error) {
                console.error('Error adding subcategory:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            boxShadow: 'none',
            height: '50px',
            borderRadius: '0.5rem',
            backgroundColor: '#0e151d',
            color: '#fff',
            border: state.isFocused ? '1px solid #bcef0180' : '1px solid #4c4c4c5e',
            '&:hover': {
                border: '1px solid #bcef0180',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#bcef0180' : '#101214',
            color: state.isSelected ? 'white' : 'white',
            '&:hover': {
                backgroundColor: '#bcef0180',
                color: 'white',
            },
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '8px',
            color: '#fff',
            border: '1px solid #4c4c4c5e',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            backgroundColor: '#101214',
        }),
    };

    return (
        <div>
            <Dashboardlayout title="Add Subcategory">
                <h2 className='text-3xl mb-2 text-secondary font-extrabold'>Add Subcategory</h2>
                <div className='card-bg p-6 mt-4 rounded-lg'>
                    <div className='w-full'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 mb-4 px-3">
                                    <label className="block uppercase tracking-wide text-textcolor text-xs font-bold mb-2" htmlFor="Name">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        placeholder="Enter Name"
                                        className="bg-[#121a23] border-2 w-full border-[#4c4c4c33] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-red-700 text-xs pt-1 pl-1">{formik.errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="w-full md:w-1/2 mb-4 px-3">
                                    <label className="block uppercase tracking-wide text-textcolor text-xs font-bold mb-2" htmlFor="Category">
                                        Category
                                    </label>
                                    <ReactSelect
                                        isClearable
                                        isSearchable
                                        options={categories}
                                        styles={customStyles}
                                        name="category"
                                        onChange={(option) => {
                                            debugger
                                            formik.setFieldValue('category', option ? option.value : '')
                                        }}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.category && formik.errors.category ? (
                                        <div className="text-red-700 text-xs pt-1 pl-1">{formik.errors.category}</div>
                                    ) : null}
                                </div>

                                <div className="w-full md:w-1/2 mb-4 px-3">
                                    <label className="block uppercase tracking-wide text-textcolor text-xs font-bold mb-2" htmlFor="Description">
                                        Description
                                    </label>
                                    <input
                                        id="description"
                                        name="description"
                                        placeholder="Enter Description"
                                        className="bg-[#121a23] border-2 w-full border-[#4c4c4c33] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5] cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description}
                                    />
                          
                                </div>

                                <div className="w-full md:w-1/2 px-3 flex items-center">
                                    <div className='flex item-center '>
                                        <input
                                            id="status"
                                            name="status"
                                            type="checkbox"
                                            className="w-4 h-4 text-secondary bg-[#0e151d] border-2 border-[#4c4c4c5e] rounded focus:ring-secondary dark:focus:ring-secondary dark:ring-offset-gray-800 focus:ring-2"
                                            checked={formik.values.status}
                                            onChange={formik.handleChange}
                                        />
                                        <label htmlFor="status" className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold ml-3 mb-1">
                                            Status (Block/Unblock)
                                        </label>
                                    </div>
                                </div>

                                <div className="w-full flex justify-center gap-2 mt-2 px-3">
                                    <Link to="/sub-category" className="button">
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
        </div>
    );
}

export default Addsubcategory;
