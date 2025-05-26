import { Link } from "react-router-dom";
import { useState } from 'react';

const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`flex h-screen bg-blue-700 text-white transition-all duration-300 ${isExpanded ? 'w-50' : 'w-20'}`}>
            <div className="flex flex-col h-full w-full">
                <div className="flex items-center justify-between p-4 border-b border-white w-full">
                    {isExpanded ? <span className="text-xl font-bold">Flash-Cards</span> : <span className="text-xl font-bold">F</span>}
                </div>

                <nav className="flex-1 p-2 space-y-1">
                    <Link to="/list" className="hover:bg-blue-700 px-3 py-2 rounded">lista</Link>
                </nav>

                <div className="p-4 border-t border-indigo-500 ">
                    <button
                        onClick={toggleNavbar}
                        className="p-2 rounded-full hover:bg-indigo-500 focus:outline-none items-center justify-center"
                        aria-label={isExpanded ? 'Contraer menú' : 'Expandir menú'}
                    >
                        {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};




export default Navbar;