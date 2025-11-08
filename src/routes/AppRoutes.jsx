// src/routes/AppRoutes.jsx
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
import Login from "../components/Login";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Page de connexion */}
      <Route path="/login" element={<Login />} />

      {/* Page d’accueil = redirige vers la connexion */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Pages d’administration accessibles après connexion */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="add" element={<AddStudent />} />
        <Route path="student/:id" element={<StudentDetails />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="teachers/:id" element={<TeacherDetails />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="payments" element={<Payments />} />
      </Route>
    </Routes>
  );
}
