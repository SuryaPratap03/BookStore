import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
    const links = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/allBooks" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" }
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const filteredLinks = isLoggedIn ? links : links.slice(0, 2); // Adjust based on login state
    const [MobileNav, setMobileNav] = useState(false);

    return (
        <>
            <nav className="z-50 relative bg-zinc-800 text-white px-8 py-4 flex items-center justify-between">
                <Link to={'/'}>
                    <div className="flex items-center">
                        <img className="h-10 me-4" src="http://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
                        <h1 className="text-2xl font-semibold">BookHeaven</h1>
                    </div>
                </Link>
                <div className="nav-links-bookheaven block md:flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        {filteredLinks.map((item, i) => (
                            <Link 
                                className={`hover:text-blue-500 transition-all duration-500 ${item.title === 'Profile' ? 'px-4 py-2 border border-blue-500 bg-blue-500 rounded hover:bg-white hover:text-zinc-800' : ''} text-center`} 
                                to={item.link} 
                                key={i}>
                                {item.title}
                            </Link>
                        ))}
                    </div>
                    {isLoggedIn === false && (
                        <div className="hidden md:flex items-center gap-4">
                            <Link className="px-4 py-2 border border-blue-500 rounded text-center hover:bg-white hover:text-zinc-800 transition-all duration-300" to={'/login'}>
                                LogIn
                            </Link>
                            <Link className="px-4 py-2 border border-blue-500 bg-blue-500 rounded text-center hover:bg-white hover:text-zinc-800 transition-all duration-300" to={'/signup'}>
                                SignUp
                            </Link>
                        </div>
                    )}
                    <button 
                        className="text-white text-2xl hover:text-zinc-400 md:hidden"
                        onClick={() => setMobileNav(!MobileNav)} 
                        aria-label="toggle mobile navigation"
                    >
                        <FaGripLines />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className={`fixed bg-zinc-800 h-screen top-0 left-0 w-full z-40 flex flex-col items-center justify-center transition-transform duration-500 ${MobileNav ? 'translate-y-0' : '-translate-y-full'}`}>
                {filteredLinks.map((item, i) => (
                    <Link 
                        className={`text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-500 ${item.title === 'Profile' ? 'px-8 py-2 border border-blue-500 bg-blue-500 rounded hover:bg-white hover:text-zinc-800' : ''} text-center`} 
                        to={item.link} 
                        key={i}
                        onClick={() => setMobileNav(false)} // Close mobile nav on click
                    >
                        {item.title}
                    </Link>
                ))}
                {isLoggedIn === false && (
                    <>
                        <Link 
                            className="px-8 mb-8 text-3xl font-semibold py-1 border border-blue-500 rounded text-center text-white hover:bg-white hover:text-zinc-800 transition-all duration-300" 
                            to={'/login'}
                            onClick={() => setMobileNav(false)}
                        >
                            LogIn
                        </Link>
                        <Link 
                            className="px-8 py-1 mb-8 text-3xl font-semibold border border-blue-500 bg-blue-500 rounded text-center hover:bg-white hover:text-zinc-800 transition-all duration-300" 
                            to={'/signup'}
                            onClick={() => setMobileNav(false)}
                        >
                            SignUp
                        </Link>
                    </>
                )}
            </div>
        </>
    );
};

export default Navbar;
