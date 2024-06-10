'use client';

import { useState } from "react";
import Link from 'next/link';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    

    const handleMenuToggle = () => {
      setMenuOpen(!menuOpen);
    };

  return (
    <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <Link href="/" className="flex items-center">
                    <img src="https://framerusercontent.com/images/CbSPyXMVIfZHAkc9RBEP7XhXEw.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                </Link>
                <svg onClick={handleMenuToggle} className='w-6 md:hidden' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <path d="M4 18H10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 12L16 12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 6L20 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${menuOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
                    <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <Link href="/" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/about" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">About</Link>
                        </li>
                        <li>
                            <Link href="/blog" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Blog</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar