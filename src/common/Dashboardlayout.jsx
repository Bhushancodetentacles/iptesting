import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
const Dashboardlayout = ({ children }) => {
    return (
        <>
            <Header />
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <div className="p-4  mt-16">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Dashboardlayout
