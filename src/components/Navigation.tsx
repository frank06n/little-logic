import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import schoolLogo from "@/assets/logo-mini.png";

const navigationItems = [
    { name: "Home", href: "/", children: [] },
    {
        name: "Students",
        href: "#",
        children: [
            { name: "Admission Register", href: "/students/admission" },
            { name: "Certificate", href: "/students/certificate" },
            { name: "Student Details", href: "/students/details" },
            { name: "Attendance", href: "/students/attendance" },
        ],
    },
    {
        name: "Teachers",
        href: "#",
        children: [
            { name: "Teacher Details", href: "/teachers/details" },
            { name: "Teacher's Profile", href: "/teachers/profile" },
            { name: "Leave Register", href: "/teachers/leave" },
            { name: "Attendance", href: "/teachers/attendance" },
        ],
    },
    { name: "Forms", href: "/forms", children: [] },
    { name: "Gallery", href: "/gallery", children: [] },
    { name: "Notice", href: "/notice", children: [] },
    {
        name: "Academic",
        href: "#",
        children: [
            { name: "Calendar", href: "/academic/calendar" },
            { name: "Class Routine", href: "/academic/routine" },
            { name: "Result Sheet", href: "/academic/results" },
            { name: "Holiday List", href: "/academic/holidays" },
        ],
    },
    { name: "Rules and Regulation", href: "/rules", children: [] },
    { name: "Contact us", href: "/contact", children: [] },
];

export const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const navRef = useRef(null);
    const timeoutRef = useRef(null);

    const handleMouseEnter = (itemName, event) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();

        setDropdownPosition({
            top: rect.bottom - navRect.top,
            left: rect.left - navRect.left
        });

        setActiveDropdown(itemName);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 150);
    };

    const handleDropdownMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handleDropdownMouseLeave = () => {
        setActiveDropdown(null);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const getActiveDropdownData = () => {
        return navigationItems.find(item => item.name === activeDropdown);
    };

    return (
        <>
            <style jsx>{`
        .nav-backdrop {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        
        .nav-item {
          position: relative;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #1d4ed8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
        }
        
        .nav-item:hover::after {
          width: 100%;
        }
        
        .dropdown-enter {
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
        }
        
        .dropdown-enter-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-menu-enter {
          opacity: 0;
          transform: translateY(-20px);
        }
        
        .mobile-menu-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }
        
        .nav-link {
          position: relative;
          overflow: hidden;
        }
        
        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-link:hover::before {
          left: 100%;
        }
      `}</style>

            <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 nav-backdrop bg-white/60 border-b border-white/20 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand space */}
                        <div className="flex-shrink-0">
                            <img
                                src={schoolLogo}
                                alt="Dewanganj Primary School Logo"
                                className="h-12 w-12 rounded-full"
                            />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <ul className="flex space-x-1">
                                {navigationItems.map((item) => (
                                    <li
                                        key={item.name}
                                        className="nav-item"
                                        onMouseEnter={(e) => item.children.length > 0 && handleMouseEnter(item.name, e)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {item.children.length > 0 ? (
                                            <div className="nav-link flex items-center text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer select-none">
                                                <span>{item.name}</span>
                                                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                                                    }`} />
                                            </div>
                                        ) : (
                                            <a
                                                href={item.href}
                                                className="nav-link text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg transition-all duration-200 block"
                                            >
                                                {item.name}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <div
                                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <div className={`transition-transform duration-300 ${mobileMenuOpen ? 'rotate-180' : ''}`}>
                                    {mobileMenuOpen ? (
                                        <X className="h-6 w-6" />
                                    ) : (
                                        <Menu className="h-6 w-6" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Dropdown */}
                    {activeDropdown && getActiveDropdownData()?.children.length > 0 && (
                        <div
                            className="absolute glass-effect rounded-xl p-2 min-w-[220px] z-50 dropdown-enter dropdown-enter-active"
                            style={{
                                top: `${dropdownPosition.top + 8}px`,
                                left: `${dropdownPosition.left}px`,
                            }}
                            onMouseEnter={handleDropdownMouseEnter}
                            onMouseLeave={handleDropdownMouseLeave}
                        >
                            <div className="py-2">
                                {getActiveDropdownData().children.map((child) => (
                                    <a
                                        key={child.name}
                                        href={child.href}
                                        className="nav-link block px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                                    >
                                        <div className="flex items-center">
                                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                                                {child.name}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="md:hidden glass-effect border-t border-white/20 mobile-menu-enter mobile-menu-enter-active">
                            <div className="px-2 pt-4 pb-4 space-y-2">
                                {navigationItems.map((item) => (
                                    <div key={item.name} className="space-y-1">
                                        {item.children.length > 0 ? (
                                            <div className="space-y-2">
                                                <div className="text-gray-800 font-semibold px-4 py-2 text-sm bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                                                    {item.name}
                                                </div>
                                                <div className="pl-4 space-y-1">
                                                    {item.children.map((child) => (
                                                        <a
                                                            key={child.name}
                                                            href={child.href}
                                                            className="nav-link block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                                        >
                                                            {child.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <a
                                                href={item.href}
                                                className="nav-link block px-4 py-2 text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                                            >
                                                {item.name}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Spacer to prevent content from going under fixed nav */}
            {/* <div className="h-16"></div> */}

        </>
    );
};