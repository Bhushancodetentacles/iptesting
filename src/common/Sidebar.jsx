import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");
    useEffect(() => {
        setActiveLink(location.pathname);

    }, [location.pathname]);
    const handleMenuItemClick = (link, isSubmenu) => {
        setActiveLink(link);
        if (!isSubmenu) {
            setIsOpen(false); // Close the dropdown if the clicked item is not a submenu
        }
        console.log(isOpen)
    };
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <aside id="default-sidebar" className="fixed top-[4.5rem] left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidenav">
            <div className="left-sidebar  overflow-y-auto py-5 px-3 h-full ">
                <ul className="space-y-2">
                <li>
                            <Link to="/dashboard" className={`flex menu-item items-center p-2 text-base text-headings font-normal rounded-lg group ${activeLink === '/dashboard' ? 'active' : ''}`}>
                                <svg aria-hidden="true" className="w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-secondary " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/chain-list" className={`flex menu-item items-center text-headings p-2 w-full text-base font-normal rounded-lg group ${activeLink === '/chain-list' ? 'active' : ''}`}  >
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-secondary dark:group-hover:text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Chain</span>

                            </Link>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex menu-item items-center border-0 hovr:border-0 bg-transparent p-2 w-full text-base font-normal text-headings rounded-lg transition duration-75 group dark:text-white"
                                aria-controls="dropdown-pages"
                                onClick={toggleDropdown}
                            >
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-secondary dark:text-gray-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
                                <span className="flex-1 ml-3 text-left whitespace-nowrap">Category</span>
                                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                            <ul id="dropdown-pages" className={`py-2 space-y-2 ${isOpen ? '' : 'hidden'}`}>
                                <li>
                                    <Link to="/category-list" className={`flex menu-item items-center p-2 w-full text-headings text-base font-normal rounded-lg group ${activeLink === '/category-list' ? 'active' : ''}`} onClick={() => handleMenuItemClick('/category-list', true)}>
                                        Category
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/sub-category" className={`flex menu-item items-center p-2 w-full text-headings text-base font-normal rounded-lg group ${activeLink === '/sub-category' ? 'active' : ''}`} onClick={() => handleMenuItemClick('/sub-category', true)}>
                                        Subcategory
                                    </Link>
                                </li>
                            </ul>
                        </li>



                        {/* <li>
                            <Link to="/tip-list" className={`flex menu-item items-center p-2 w-full text-base text-headings font-normal rounded-lg group ${activeLink === '/tip-list' ? 'active' : ''}`} >
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-secondary dark:group-hover:text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Tip</span>

                            </Link>
                        </li> */}
                        <li>
                            <Link to="/tag-list" className={`flex menu-item items-center p-2 w-full text-base text-headings font-normal rounded-lg group ${activeLink === '/tag-list' ? 'active' : ''}`}>
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-secondary dark:group-hover:text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Tag</span>

                            </Link>
                        </li>
                        <li>
                            <Link to="/project-list" className={`flex menu-item items-center p-2 w-full text-base text-headings font-normal rounded-lg group ${activeLink === '/project-list' ? 'active' : ''}`} >
                                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-secondary dark:group-hover:text-secondary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">Project</span>

                            </Link>
                        </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
