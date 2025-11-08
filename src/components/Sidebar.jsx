import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { IoLibraryOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

export default function Sidebar() {
  return (
    <aside className="w-48 bg-white shadow-sm m-2 rounded-2xl">
      <div className="pl-8 pt-8 font-bold text-xl">
        <img src="../public/logo.png" alt="kelaxi" className="w-24" />
      </div>

      <nav className="p-4 pl-8 text-sm">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded duration-120 ease-linear ${
                  isActive
                    ? "bg-[#1A2F6B] text-white"
                    : "hover:bg-[#1A2F6B] hover:text-white focus:bg-[#1A2F6B] focus:text-white"
                }`
              }
            >
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/students"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded duration-110 ${
                  isActive
                    ? "bg-[#1A2F6B] text-white"
                    : "hover:bg-[#1A2F6B] hover:text-white focus:bg-[#1A2F6B] focus:text-white"
                }`
              }
            >
              <FaPeopleGroup /> Students
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/teachers"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded duration-110 ${
                  isActive
                    ? "bg-[#1A2F6B] text-white"
                    : "hover:bg-[#1A2F6B] hover:text-white focus:bg-[#1A2F6B] focus:text-white"
                }`
              }
            >
              <GiTeacher /> Teachers
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/attendance"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded duration-110 ${
                  isActive
                    ? "bg-[#1A2F6B] text-white"
                    : "hover:bg-[#1A2F6B] hover:text-white focus:bg-[#1A2F6B] focus:text-white"
                }`
              }
            >
              <AiOutlineSchedule /> Attendance
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/payments"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded duration-110 ${
                  isActive
                    ? "bg-[#1A2F6B] text-white"
                    : "hover:bg-[#1A2F6B] hover:text-white focus:bg-[#1A2F6B] focus:text-white"
                }`
              }
            >
              <GrMoney /> Finance <IoIosArrowForward className="ml-4" />
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/calendar"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded duration-110 ${
                  isActive
                    ? "bg-[#1A2F6B] text-white"
                    : "hover:bg-[#1A2F6B] hover:text-white focus:bg-[#1A2F6B] focus:text-white"
                }`
              }
            >
              <BiCalendar /> Calendar
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/library"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded duration-110 ${
                  isActive
                    ? "bg-[#1A2F6B] text-white"
                    : "hover:bg-[#1A2F6B] hover:text-white focus:bg-[#1A2F6B] focus:text-white"
                }`
              }
            >
              <IoLibraryOutline /> Library
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/messages"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded duration-110 ${
                  isActive
                    ? "bg-[#1A2F6B] text-white"
                    : "hover:bg-[#1A2F6B] hover:text-white focus:bg-[#1A2F6B] focus:text-white"
                }`
              }
            >
              <MdOutlineMessage /> Message
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded duration-110 ${
                  isActive
                    ? "bg-[#1A2F6B] text-white"
                    : "hover:bg-[#1A2F6B] hover:text-white focus:bg-[#1A2F6B] focus:text-white"
                }`
              }
            >
              <IoSettingsOutline /> Setting
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded duration-110 ${
                  isActive
                    ? "bg-[#1A2F6B] text-white"
                    : "hover:bg-[#1A2F6B] hover:text-white focus:bg-[#1A2F6B] focus:text-white"
                }`
              }
            >
              <RiLogoutCircleLine /> Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
