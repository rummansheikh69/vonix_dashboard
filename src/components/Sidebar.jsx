import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { GrCloudUpload } from "react-icons/gr";
import { BiCategoryAlt } from "react-icons/bi";
import { LuGalleryHorizontalEnd } from "react-icons/lu";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div>
      {/* Toggle button (mobile only) */}
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className=" text-heading bg-transparent box-border border border-transparent
         font-medium leading-5 rounded-base ms-3 mt-3 text-sm p-2 sm:hidden"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M5 7h14M5 12h14M5 17h10"
          />
        </svg>
      </button>

      {/* Desktop sidebar (always visible) */}
      <aside className="hidden sm:block  fixed top-0 left-0 z-40 w-64 h-full border-r border-zinc-800  bg-[#171717]">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <div className="flex items-center  py-1.5  group border-b border-zinc-800">
                <span className="ms-3 font-bold text-2xl">
                  ON<span className="text-[#ababab]">EX</span>
                </span>
              </div>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-3 py-1.5 hover:bg-[#2a2a2a] duration-200 ${
                    isActive ? "bg-[#2a2a2a]" : ""
                  } rounded-md group`
                }
              >
                <div>
                  <GrCloudUpload />
                </div>
                <span className="ms-3 font-normal">Upload</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  `flex items-center px-3 py-1.5 hover:bg-[#2a2a2a] duration-200 ${
                    isActive ? "bg-[#2a2a2a]" : ""
                  } rounded-md group`
                }
              >
                <div>
                  <BiCategoryAlt />
                </div>
                <span className="ms-3 font-normal">Categories</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery"
                className={({ isActive }) =>
                  `flex items-center px-3 py-1.5 hover:bg-[#2a2a2a] duration-200 ${
                    isActive ? "bg-[#2a2a2a]" : ""
                  } rounded-md group`
                }
              >
                <div>
                  <LuGalleryHorizontalEnd />
                </div>
                <span className="ms-3 font-normal">Gallery</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      {/* Mobile Sidebar with animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black sm:hidden"
            />

            {/* Sidebar Drawer */}
            <motion.aside
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="fixed top-0 left-0 z-50 w-64 h-full bg-[#171717] border-e border-zinc-800 sm:hidden"
            >
              <div className="h-full px-3 py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                  <li>
                    <div className="flex items-center  py-1.5  group border-b border-zinc-800">
                      <span className="ms-3 font-bold text-2xl">
                        ON<span className="text-[#ababab]">EX</span>
                      </span>
                    </div>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `flex items-center px-3 py-1.5 hover:bg-[#2a2a2a] duration-200 ${
                          isActive ? "bg-[#2a2a2a]" : ""
                        } rounded-md group`
                      }
                    >
                      <div>
                        <GrCloudUpload />
                      </div>
                      <span className="ms-3 font-normal">Upload</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        `flex items-center px-3 py-1.5 hover:bg-[#2a2a2a] duration-200 ${
                          isActive ? "bg-[#2a2a2a]" : ""
                        } rounded-md group`
                      }
                    >
                      <div>
                        <BiCategoryAlt />
                      </div>
                      <span className="ms-3 font-normal">Categories</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/gallery"
                      className={({ isActive }) =>
                        `flex items-center px-3 py-1.5 hover:bg-[#2a2a2a] duration-200 ${
                          isActive ? "bg-[#2a2a2a]" : ""
                        } rounded-md group`
                      }
                    >
                      <div>
                        <LuGalleryHorizontalEnd />
                      </div>
                      <span className="ms-3 font-normal">Gallery</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Sidebar;
