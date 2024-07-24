import React, { Children, useEffect } from 'react'
import Dashboardlayout from "../common/Dashboardlayout"
import Curvedgraph from "../assets/imgaes/curved.png";
import Linegraph from "../assets/imgaes/line.png";
import Trangle from "../assets/imgaes/trangle.png";
import Curvedline from "../assets/imgaes/curvedline.png";
function Dashboard() {

    return (
        <>
            <Dashboardlayout title="Dashboard">
                <h2 className='text-3xl mb-2 text-white font-extrabold'>Dashboard</h2>
                <div className='mt-4 rounded-lg'>
                    <div className='w-full'>
                        <div className='grid grid-cols-4 gap-4'>
                            <div className='box p-4 relative' >
                                <div className='flex justify-between'>
                                    <h6 className='text-textcolor text-xl items-center flex'>Total Expenses</h6>
                                    <h2 className='text-heading text-5xl'>20</h2>
                                </div>
                                <div className='absolute bottom-0 left-0'>
                                    <img src={Curvedgraph} />
                                </div>
                            </div>
                            <div className='box p-4 relative' >
                                <div className='flex justify-between'>
                                <h6 className='text-textcolor text-xl items-center flex'>Total Expenses</h6>
                                    <h2 className='text-heading text-5xl'>20</h2>
                                </div>
                                <div className='absolute bottom-0 left-0'>
                                    <img src={Linegraph} />
                                </div>
                            </div>
                            <div className='box p-4 relative' >
                                <div className='flex justify-between'>
                                <h6 className='text-textcolor text-xl items-center flex'>Total Expenses</h6>
                                    <h2 className='text-heading text-5xl'>20</h2>
                                </div>
                                <div className='absolute bottom-0 left-0'>
                                    <img src={Trangle} />
                                </div>
                            </div>
                            <div className='box p-4 relative' >
                                <div className='flex justify-between'>
                                <h6 className='text-textcolor text-xl items-center flex'>Total Expenses</h6>
                                    <h2 className='text-heading text-5xl'>20</h2>
                                </div>
                                <div className='absolute bottom-0 left-0'>
                                    <img src={Curvedline} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dashboardlayout>


        </>
    )
}

export default Dashboard

