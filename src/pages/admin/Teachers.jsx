import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const teachersData = [
  {
    id: 1,
    firstName: "Ernest",
    lastName: "Mafo",
    email: "ernest@example.com",
    phone: "+243 999 888 777",
    address: "Kinshasa, Gombe",
    hireDate: "2020-02-15",
    experience: 5,
    contractType: "Permanent",
    status: "Actif",
    photo: "../public/WhatsApp Image 2025-11-04 at 11.08.03_c86b3171.jpg",
    subjects: ["Mathématiques", "Physique"],
    classes: ["3e A", "4e C"],
    bio: "Enseignant passionné par la pédagogie moderne.",
    attendanceRate: 96,
    lateCount: 2,
    absentCount: 1,
    // ✅ Nouvel emploi du temps détaillé
    schedule: [
      { day: "Lundi", time: "07h30 - 09h00", subject: "Mathématiques", class: "3e A", room: "Salle 4" },
      { day: "Lundi", time: "09h10 - 10h40", subject: "Physique", class: "4e C", room: "Salle 2" },
      { day: "Mardi", time: "07h30 - 09h00", subject: "Mathématiques", class: "4e C", room: "Salle 3" },
      { day: "Mercredi", time: "09h10 - 10h40", subject: "Physique", class: "3e A", room: "Salle 5" },
      { day: "Vendredi", time: "10h50 - 12h20", subject: "Mathématiques", class: "3e A", room: "Salle 4" },
    ],
    successRate: 87,
    evaluation: 9,
    comment: "Excellent suivi et bonne communication avec les élèves.",
    salary: 850000,
    lastPayment: "Octobre 2025",
    bonus: "100000 FC (Prime de performance)",
    deductions: "0 FC",
    documents: [
      { name: "Contrat de travail", url: "/docs/contrat-jean.pdf" },
      { name: "Diplôme", url: "/docs/diplome-jean.pdf" },
    ],
  },

  {
    id: 2,
    firstName: "John",
    lastName: "Lwamba",
    email: "lwamba@example.com",
    phone: "+243 999 888 777",
    address: "Kinshasa, Gombe",
    hireDate: "2020-02-15",
    experience: 5,
    contractType: "Permanent",
    status: "Congé ",
    photo: "../public/jonh.jpg",
    subjects: ["EPS", "Histoire"],
    classes: ["3e A", "4e C"],
    bio: "Enseignant passionné par la pédagogie moderne.",
    attendanceRate: 96,
    lateCount: 2,
    absentCount: 1,
    // ✅ Nouvel emploi du temps détaillé
    schedule: [
      { day: "Lundi", time: "07h30 - 09h00", subject: "Mathématiques", class: "3e A", room: "Salle 4" },
      { day: "Lundi", time: "09h10 - 10h40", subject: "Physique", class: "4e C", room: "Salle 2" },
      { day: "Mardi", time: "07h30 - 09h00", subject: "Mathématiques", class: "4e C", room: "Salle 3" },
      { day: "Mercredi", time: "09h10 - 10h40", subject: "Physique", class: "3e A", room: "Salle 5" },
      { day: "Vendredi", time: "10h50 - 12h20", subject: "Mathématiques", class: "3e A", room: "Salle 4" },
    ],
    successRate: 87,
    evaluation: 9,
    comment: "Excellent suivi et bonne communication avec les élèves.",
    salary: 850000,
    lastPayment: "Octobre 2025",
    bonus: "100000 FC (Prime de performance)",
    deductions: "0 FC",
    documents: [
      { name: "Contrat de travail", url: "/docs/contrat-jean.pdf" },
      { name: "Diplôme", url: "/docs/diplome-jean.pdf" },
    ],
  },

  {
    id: 3,
    firstName: "Agapy",
    lastName: "Kyungu",
    email: "agapy@example.com",
    phone: "+243 999 888 777",
    address: "Kinshasa, Gombe",
    hireDate: "2020-02-15",
    experience: 5,
    contractType: "Permanent",
    status: "Actif",
    photo: "../public/ag.jpg",
    subjects: ["Information", "Electronique"],
    classes: ["3e A", "4e C"],
    bio: "Enseignant passionné par la pédagogie moderne.",
    attendanceRate: 96,
    lateCount: 2,
    absentCount: 1,
    // ✅ Nouvel emploi du temps détaillé
    schedule: [
      { day: "Lundi", time: "07h30 - 09h00", subject: "Mathématiques", class: "3e A", room: "Salle 4" },
      { day: "Lundi", time: "09h10 - 10h40", subject: "Physique", class: "4e C", room: "Salle 2" },
      { day: "Mardi", time: "07h30 - 09h00", subject: "Mathématiques", class: "4e C", room: "Salle 3" },
      { day: "Mercredi", time: "09h10 - 10h40", subject: "Physique", class: "3e A", room: "Salle 5" },
      { day: "Vendredi", time: "10h50 - 12h20", subject: "Mathématiques", class: "3e A", room: "Salle 4" },
    ],
    successRate: 87,
    evaluation: 9,
    comment: "Excellent suivi et bonne communication avec les élèves.",
    salary: 850000,
    lastPayment: "Octobre 2025",
    bonus: "100000 FC (Prime de performance)",
    deductions: "0 FC",
    documents: [
      { name: "Contrat de travail", url: "/docs/contrat-jean.pdf" },
      { name: "Diplôme", url: "/docs/diplome-jean.pdf" },
    ],
  },

  {
    id: 4,
    firstName: "Mike",
    lastName: "Kabombo",
    email: "kabombo@example.com",
    phone: "+243 999 888 777",
    address: "Kinshasa, Gombe",
    hireDate: "2020-02-15",
    experience: 5,
    contractType: "Permanent",
    status: "Actif",
    photo: "../public/mike.jpg",
    subjects: ["Musique"],
    classes: ["3e A", "4e C"],
    bio: "Enseignant passionné par la pédagogie moderne.",
    attendanceRate: 96,
    lateCount: 2,
    absentCount: 1,
    // ✅ Nouvel emploi du temps détaillé
    schedule: [
      { day: "Lundi", time: "07h30 - 09h00", subject: "Mathématiques", class: "3e A", room: "Salle 4" },
      { day: "Lundi", time: "09h10 - 10h40", subject: "Physique", class: "4e C", room: "Salle 2" },
      { day: "Mardi", time: "07h30 - 09h00", subject: "Mathématiques", class: "4e C", room: "Salle 3" },
      { day: "Mercredi", time: "09h10 - 10h40", subject: "Physique", class: "3e A", room: "Salle 5" },
      { day: "Vendredi", time: "10h50 - 12h20", subject: "Mathématiques", class: "3e A", room: "Salle 4" },
    ],
    successRate: 87,
    evaluation: 9,
    comment: "Excellent suivi et bonne communication avec les élèves.",
    salary: 850000,
    lastPayment: "Octobre 2025",
    bonus: "100000 FC (Prime de performance)",
    deductions: "0 FC",
    documents: [
      { name: "Contrat de travail", url: "/docs/contrat-jean.pdf" },
      { name: "Diplôme", url: "/docs/diplome-jean.pdf" },
    ],
  },

  {
    id: 5,
    firstName: "Magloire",
    lastName: "Lugozi",
    email: "lugozi@example.com",
    phone: "+243 999 888 777",
    address: "Kinshasa, Gombe",
    hireDate: "2020-02-15",
    experience: 5,
    contractType: "Permanent",
    status: "Actif",
    photo: "../public/mag.jpg",
    subjects: ["Mathématiques", "Physique"],
    classes: ["3e A", "4e C"],
    bio: "Enseignant passionné par la pédagogie moderne.",
    attendanceRate: 96,
    lateCount: 2,
    absentCount: 1,
    // ✅ Nouvel emploi du temps détaillé
    schedule: [
      { day: "Lundi", time: "07h30 - 09h00", subject: "Mathématiques", class: "3e A", room: "Salle 4" },
      { day: "Lundi", time: "09h10 - 10h40", subject: "Physique", class: "4e C", room: "Salle 2" },
      { day: "Mardi", time: "07h30 - 09h00", subject: "Mathématiques", class: "4e C", room: "Salle 3" },
      { day: "Mercredi", time: "09h10 - 10h40", subject: "Physique", class: "3e A", room: "Salle 5" },
      { day: "Vendredi", time: "10h50 - 12h20", subject: "Mathématiques", class: "3e A", room: "Salle 4" },
    ],
    successRate: 87,
    evaluation: 9,
    comment: "Excellent suivi et bonne communication avec les élèves.",
    salary: 850000,
    lastPayment: "Octobre 2025",
    bonus: "100000 FC (Prime de performance)",
    deductions: "0 FC",
    documents: [
      { name: "Contrat de travail", url: "/docs/contrat-jean.pdf" },
      { name: "Diplôme", url: "/docs/diplome-jean.pdf" },
    ],
  },


];


export default function TeachersPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const navigate = useNavigate();

  // 🔍 Filtrage dynamique
  const filteredTeachers = teachersData.filter((teacher) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase());
    const matchesStatus = filterStatus ? teacher.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // 🔗 Fonction pour aller vers la page détail
  const handleView = (id) => {
    navigate(`/admin/teachers/${id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">

      {/* Barre de recherche et filtre */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un enseignant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-4xl px-4 py-2 h-9 w-full md:w-1/2"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-1/4 cursor-pointer"
        >
          <option value="">Tous les statuts</option>
          <option value="Actif">Actif</option>
          <option value="Congé">En congé</option>
        </select>
        <button className="bg-[#233e87] text-white hover:bg-[#1A2F6B] px-4 py-2 rounded  cursor-pointer">
          Ajouter un enseignant
        </button>
      </div>

      {/* Liste des enseignants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white px-2 py-4 rounded-xl shadow flex flex-col items-center hover:shadow-lg cursor-pointer transition"
            onClick={() => handleView(teacher.id)} // 👈 clic sur la card
          >
            <img
              src={teacher.photo}
              alt={`${teacher.firstName} ${teacher.lastName}`}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-lg font-semibold text-[#1A2F6B]">
              {teacher.firstName} {teacher.lastName}
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              Matière(s): {teacher.subjects.join(", ")}
            </p>
            <p className="text-gray-600 text-sm mb-2">
              Classe(s): {teacher.classes.join(", ")}
            </p>
            <p className={`mb-2 font-medium ${teacher.status === "Actif" ? "text-green-600" : "text-red-500"}`}>
              {teacher.status}
            </p>

            {/* Boutons d'action */}
            <div className="flex gap-2 mt-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // empêche le clic sur la card
                handleView(teacher.id);
              }}
              title="Voir">

              <button

                className="bg-gray-200 p-2 rounded hover:bg-[#1A2F6B] hover:text-white"

              >
                <FaEye className="w-20 cursor-pointer " />
              </button>
              {/* <button className="bg-yellow-400 p-2 rounded hover:bg-yellow-500 text-white" title="Modifier">
                <FaEdit />
              </button>
              <button className="bg-red-500 p-2 rounded hover:bg-red-600 text-white" title="Supprimer">
                <FaTrash />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
