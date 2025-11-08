import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import AddStudent from "../pages/admin/AddStudent";
import StudentDetails from "../pages/admin/StudentDetails";

import Teachers from "../pages/admin/Teachers";
import TeacherDetails from "../pages/admin/TeacherDetails";

import Attendance from "../pages/admin/Attendance";
import Payments from "../pages/admin/Payments"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="add" element={<AddStudent />} />
        <Route path="student/:id" element={<StudentDetails />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="teachers/:id" element={<TeacherDetails />} /> {/* ✅ Bon */}

        <Route path="attendance" element={<Attendance />} />
        <Route path="payments" element={<Payments />} />
      </Route>

      {/* routes pour teacher, student, parent à rajouter */}
    </Routes>
  );
}
