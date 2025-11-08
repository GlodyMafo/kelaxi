import React, { useState, useEffect } from "react";
import studentsData from "./data/studentsData.js";
import { addDays, startOfWeek, format, differenceInHours } from "date-fns";
import { fr } from "date-fns/locale";
import { FaSave } from "react-icons/fa";


export default function Attendance() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClass, setSelectedClass] = useState("Toutes");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [students] = useState(studentsData);
  const studentsPerPage = 15;

  // --- Chargement / sauvegarde dans localStorage ---
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendanceData");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("attendanceData", JSON.stringify(attendance));
  }, [attendance]);

  // --- Calcul des jours de la semaine (Lun à Sam) ---
  const getWeekDays = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return Array.from({ length: 6 }).map((_, i) => addDays(start, i));
  };
  const weekDays = getWeekDays(selectedWeek);

  const currentWeekKey = format(selectedWeek, "yyyy-'W'II");

  // --- Bascule présence / absence ---
  const togglePresence = (studentId, dateKey) => {
    setAttendance((prev) => {
      const newState = {
        ...prev,
        [currentWeekKey]: {
          ...prev[currentWeekKey],
          [studentId]: {
            ...prev[currentWeekKey]?.[studentId],
            [dateKey]: !prev[currentWeekKey]?.[studentId]?.[dateKey],
            lastUpdate: new Date().toISOString(),
          },
        },
      };
      return newState;
    });
  };

  // --- Détection automatique des absences (72h) ---
  useEffect(() => {
    const now = new Date();
    const updated = { ...attendance };

    for (const weekKey in updated) {
      for (const studentId in updated[weekKey]) {
        const studentPresence = updated[weekKey][studentId];
        for (const dateKey in studentPresence) {
          if (dateKey === "lastUpdate") continue;
          const lastUpdate = new Date(studentPresence.lastUpdate || now);
          const hours = differenceInHours(now, lastUpdate);

          // Si plus de 72h sans mise à jour => absent automatique
          if (hours >= 72 && studentPresence[dateKey] === undefined) {
            studentPresence[dateKey] = false;
          }
        }
      }
    }
    setAttendance(updated);
  }, []); // Vérifie une fois au chargement

  // --- Filtres élèves ---
  const filteredStudents = students.filter((s) => {
    const matchesClass = selectedClass === "Toutes" || s.class === selectedClass;
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // --- Pagination ---
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  // --- Changement de semaine ---
  const changeWeek = (direction) => {
    setSelectedWeek((prev) => addDays(prev, direction * 7));
  };

  // --- Sauvegarde manuelle ---
  const handleSaveAttendance = () => {
    localStorage.setItem("attendanceData", JSON.stringify(attendance));
    alert("✅ Présences enregistrées !");
  };

  return (
    <div className="px-6 py-4 bg-gray-50 min-h-screen">
      <h1 className="font-semibold text-gray-800 mb-4">
        Présence des élèves – semaine du{" "}
        {format(weekDays[0], "dd MMM yyyy", { locale: fr })} au{" "}
        {format(weekDays[5], "dd MMM yyyy", { locale: fr })}
      </h1>

      {/* --- Filtres --- */}
     <div className="flex justify-center items-center gap-2 mb-3">
          <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-xl shadow">
                      <img src="../public/les-niveaux.png" alt="Niveaux" className="w-6 h-6" />

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
              className="px-2 py-2 h-[20px] border border-[#1a2f6b] rounded-lg focus:ring-[#1A2F6B] focus:outline-none"
          >
            <option value="Toutes">Toutes les classes</option>
            {["1ère A","1ère B","2ème A","2ème B","3ème A","3ème B","4ème C","5ème A","5ème B","6ème A"].map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Rechercher un élève..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 h-[35px] border border-[#1A2F6B] rounded flex-1 min-w-[200px] rounded-[50px]"
        />

        {/* Navigation semaine */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeWeek(-1)}
            className="px-3 py-2 bg-[#233e87] text-white font-semibold rounded hover:bg-[#1A2F6B] cursor-pointer"
          >
            ← Semaine précédente
          </button>
          <button
            onClick={() => changeWeek(1)}
            className="px-3 py-2 bg-[#233e87] text-white font-semibold rounded hover:bg-[#1A2F6B] cursor-pointer"
          >
            Semaine suivante →
          </button>
        </div>
      </div>

      {/* --- Tableau --- */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-[#1A2F6B] text-white uppercase text-xs">
            <tr>
              {/* <th className="px-6 py-3">Photo</th> */}
              <th className="px-6 py-3">Nom complet</th>
              <th className="px-6 py-3">Classe</th>
              {weekDays.map((date) => (
                <th key={date} className="px-4 py-3 text-center">
                  {format(date, "EEE dd/MM", { locale: fr })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50 transition">
                {/* <td className="px-6 py-3">
                  <img
                    src={
                      student.photos?.[0]
                        ? `/images/${student.photos[0]}`
                        : "/images/default.jpg"
                    }
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td> */}
                <td className="px-6 py-2 font-medium text-blue-600">
                  {student.name}
                </td>
                <td className="px-6 py-2">{student.class}</td>
                {weekDays.map((date) => {
                  const dateKey = format(date, "yyyy-MM-dd");
                  const isPresent =
                    attendance?.[currentWeekKey]?.[student.id]?.[dateKey] ?? null;
                  const bgColor =
                    isPresent === true
                      ? "bg-green-100"
                      : isPresent === false
                      ? "bg-red-100"
                      : "";

                  return (
                    <td
                      key={dateKey}
                      className={`px-4 py-2 text-center ${bgColor}`}
                    >
                      <input
                        type="checkbox"
                        checked={isPresent === true}
                        onChange={() => togglePresence(student.id, dateKey)}
                        className="w-5 h-5 cursor-pointer accent-green-600"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Pagination + sauvegarde --- */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded cursor-pointer ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : " bg-[#233e87] text-white hover:bg-[#1A2F6B]"
          }`}
        >
          ← Précédent
        </button>

        <p className="text-gray-700 font-medium">
          Page {currentPage} sur {totalPages}
        </p>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded cursor-pointer ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#233e87] text-white hover:bg-[#1A2F6B]"
          }`}
        >
          Suivant →
        </button>

        <button
          onClick={handleSaveAttendance}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 cursor-pointer"
        >
          <FaSave />
          Enregistrer
        </button>
      </div>
    </div>
  );
}
