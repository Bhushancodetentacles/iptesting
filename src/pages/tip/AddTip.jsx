import React from 'react'
import Dashboardlayout from '../../common/Dashboardlayout'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, ArrowRight, CircleX } from 'lucide-react';
const validationSchema = Yup.object().shape({
    Name: Yup.string().required('Name is required'),
    
       // Define validation rules for other fields...
   });
   
function AddTip() {
    const formik = useFormik({
        initialValues: {
            Name: '',
           
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 400);
        },
    });
    return (
        <>
            <Dashboardlayout title="Addtip">
            <h2 className='text-3xl mb-2 text-white font-extrabold mb-6'>Add Tip</h2>
                <div className='card-bg p-6 mt-4 rounded-lg'>
                    <div className='w-full'>
                    <form onSubmit={formik.handleSubmit}>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                
                                <div className="w-full  mb-4 px-3">
                                    <label className="block capitalize tracking-wide text-[#ffffffd9] text-sm font-bold mb-1" for="grid-first-name">
                                        Name
                                    </label>
                                    <input
                                        id="Name"
                                        name="Name"
                                        placeholder="Enter Name"
                                        class="bg-[#0e151d] border-1  w-full border-[#4c4c4c5e] rounded-lg text-white px-6 py-3 text-base hover:border-secondary/[0.5]
                                        cursor-pointer transition focus:outline-none focus:border-secondary/[0.5] focus:ring-0  "
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Name}
                                    />
                                    {formik.touched.Name && formik.errors.Name ? (
                                        <div className="text-red-700 text-xs pt-1 pl-1">{formik.errors.Name}</div>
                                    ) : null}
                                </div>
                              <div className="w-full flex justify-center gap-2 mt-2 px-3">
                                    <Link to="/tag-list" class="button">
                                    <CircleX />
                                        Cancel
                                    </Link>
                                    <button class="submit-button">
                                        Submit
                                        <ArrowRight />
                                    </button>
                                </div>

                    </div>
                </form>
                    </div>
                </div>
            </Dashboardlayout >
        </>
    )
}

export default AddTip
