import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import studentsData from "./data/studentsData.js";
import { FaRegEdit, FaPhone, FaUserCircle } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

export default function Students() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState("Toutes");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const studentsPerPage = 20;

  const classes = [
    "1ère A",
    "1ère B",
    "2ème A",
    "2ème B",
    "3ème A",
    "3ème B",
    "4ème C",
    "5ème A",
    "5ème B",
    "6ème A",
  ];

  const [students] = useState(studentsData);

  // --- Filtrage par classe + recherche ---
  const filteredStudents = students.filter((s) => {
    const matchesClass = selectedClass === "Toutes" || s.class === selectedClass;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // --- Tri ---
  const sortedStudents =
    sortOption === "excellence"
      ? [...filteredStudents].sort((a, b) => b.percentage - a.percentage)
      : filteredStudents;

  // --- Pagination ---
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const goToAddStudent = () => {
    navigate("/admin/add");
  };

  return (
    <div className="px-6 py-4 bg-gray-50 min-h-screen">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-4 px-8">
        <h1 className="font-semibold text-gray-800">Liste des élèves</h1>

        <div className="flex justify-center items-center gap-2">
          <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl shadow">
            <img src="../public/les-niveaux.png" alt="Niveaux" className="w-6 h-6" />
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-2 py-2 h-[20px] border border-[#1a2f6b] rounded-lg focus:ring-[#1A2F6B] focus:outline-none"
            >
              <option value="Toutes">Toutes les classes</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Input de recherche */}
          <input
            type="text"
            placeholder="Rechercher un élève..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 h-[35px] border border-[#1A2F6B] rounded flex-1 min-w-[200px] rounded-[50px]"
          />

          {/* Tri par excellence */}
          <button
            onClick={() => setSortOption(sortOption === "excellence" ? "" : "excellence")}
            className={`px-2 py-2 relative rounded-full cursor-pointer transition group ${
              sortOption === "excellence"
                ? "bg-[#1A2F6B] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-[#1A2F6B] hover:text-white"
            }`}
          >
            <img
              src="../public/employe.png"
              alt="level"
              className={`w-6 h-6 transition duration-300 ${
                sortOption === "excellence"
                  ? "filter brightness-0 invert"
                  : "group-hover:filter group-hover:brightness-0 group-hover:invert"
              }`}
            />
            <span className="absolute left-1/2 -translate-x-1/2 mt-6 font-bold text-xs text-white bg-[#1A2F6B] px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap shadow-lg">
              Filtrer par performance
            </span>
          </button>

          <button
            onClick={goToAddStudent}
            className="relative bg-gray-100 font-bold text-[#1A2F6B] w-10 h-10 rounded-full hover:bg-[#1A2F6B] hover:text-white cursor-pointer transition group"
          >
            +
            <span className="absolute left-1/2 -translate-x-1/2 mt-12 text-xs text-white bg-[#1A2F6B] px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap shadow-lg">
              Inscrire un nouvel élève
            </span>
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-[#1A2F6B] text-white uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Photo</th>
              <th className="px-6 py-3">Nom complet</th>
              <th className="px-6 py-3">Classe</th>
              <th className="px-6 py-3">Pourcentage</th>
              <th className="px-6 py-3">Contact Parent</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-3">
                  {student.photos && student.photos[0] ? (
                    <img
                      src={`/images/${student.photos[0]}`}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full text-gray-400">
                      <FaUserCircle className="w-8 h-8" />
                    </div>
                  )}
                </td>

                <td
                  onClick={() => navigate(`/admin/student/${student.id}`, { state: { student } })}
                  className="px-6 py-3 font-medium text-blue-600 cursor-pointer hover:underline"
                >
                  {student.name}
                </td>

                <td className="px-6 py-3">{student.class}</td>
                <td className="px-6 py-3">{student.percentage}%</td>
                <td className="px-6 py-3">{student.parentContact}</td>

                <td className="px-6 py-3 flex justify-center gap-2">
                  <button className="p-4 text-gray-500 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white">
                    <FaRegEdit className="w-4 h-4" />
                  </button>
                  <button className="p-4 text-gray-500 rounded-full cursor-pointer hover:bg-red-600 hover:text-white">
                    <AiOutlineDelete className="w-4 h-4" />
                  </button>
                  <button className="p-4 text-gray-500 rounded-full cursor-pointer hover:text-white hover:bg-green-600">
                    <FaPhone className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          ← Précédent
        </button>

        <p className="text-gray-700 font-medium">
          Page {currentPage} sur {totalPages}
        </p>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
