import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaMoneyBill,
  FaChartLine,
  FaCalendarAlt,
  FaFileAlt,
  FaUserTie,
  FaHome,
  FaClock,
  FaBookOpen,
  FaGraduationCap,
} from "react-icons/fa";
import { teachersData } from "./Teachers";

export default function TeacherDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const teacher = teachersData.find((t) => t.id === parseInt(id));

  if (!teacher) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-[#1A2F6B] mb-4 flex items-center gap-2"
        >
          <FaArrowLeft /> Retour
        </button>
        <h2 className="text-xl text-red-500">Enseignant introuvable</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* 🔙 Bouton retour */}
      <button
        onClick={() => navigate(-1)}
        className="text-[#1A2F6B] mb-4 flex items-center gap-2 cursor-pointer"
      >
        <FaArrowLeft /> Retour
      </button>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto">
        {/* 🧑‍🏫 Profil enseignant */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={teacher.photo}
            alt={teacher.firstName}
            className="w-32 h-32 rounded-full object-cover mb-3 border-4 border-blue-100"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            {teacher.firstName} {teacher.lastName}
          </h2>
          <p
            className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
              teacher.status === "Actif"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {teacher.status}
          </p>
        </div>

        {/* 🧾 Informations principales */}
        <section className="grid md:grid-cols-2 gap-4 text-gray-700 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-blue-700">
              <FaUserTie /> Informations personnelles
            </h3>
            <p><strong>Sexe :</strong> {teacher.gender}</p>
            <p><strong>Date de naissance :</strong> {teacher.birthDate}</p>
            <p><strong>Email :</strong> {teacher.email}</p>
            <p><strong>Téléphone :</strong> {teacher.phone}</p>
            <p><strong>Adresse :</strong> {teacher.address}</p>
            <p><strong>État civil :</strong> {teacher.maritalStatus}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-blue-700">
              <FaHome /> Informations professionnelles
            </h3>
            <p><strong>Poste :</strong> {teacher.role}</p>
            <p><strong>Matières :</strong> {teacher.subjects.join(", ")}</p>
            <p><strong>Classes :</strong> {teacher.classes.join(", ")}</p>
            <p><strong>Diplôme :</strong> {teacher.degree}</p>
            <p><strong>Date d’embauche :</strong> {teacher.hireDate}</p>
            <p><strong>Expérience :</strong> {teacher.experience} ans</p>
            <p><strong>Type de contrat :</strong> {teacher.contractType}</p>
          </div>
        </section>

        {/* 🕓 Présence & Horaire */}
        <section className="mt-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-blue-700">
            <FaCalendarAlt /> Présence et Horaire
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Taux de présence : {teacher.attendanceRate}%</li>
              <li>Retards : {teacher.lateCount} fois</li>
              <li>Absences injustifiées : {teacher.absentCount}</li>
            </ul>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm text-gray-700 rounded-lg">
                <thead className="bg-blue-50 text-gray-800">
                  <tr>
                    <th className="border p-2">Jour</th>
                    <th className="border p-2">Heures</th>
                    <th className="border p-2">Matière</th>
                    <th className="border p-2">Classe</th>
                    <th className="border p-2">Salle</th>
                  </tr>
                </thead>
                <tbody>
                  {teacher.schedule.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border p-2">{item.day}</td>
                      <td className="border p-2">{item.time}</td>
                      <td className="border p-2">{item.subject}</td>
                      <td className="border p-2">{item.class}</td>
                      <td className="border p-2">{item.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 📈 Performance pédagogique */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-blue-700">
            <FaChartLine /> Performance et évaluation
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <ul className="list-disc list-inside text-gray-700">
              <li>Taux de réussite des élèves : {teacher.successRate}%</li>
              <li>Évaluation interne : {teacher.evaluation}/10</li>
              <li>Appréciation du directeur : {teacher.comment}</li>
              <li>Dernière formation suivie : {teacher.lastTraining}</li>
            </ul>
          </div>
        </section>

        {/* 💰 Gestion financière */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-blue-700">
            <FaMoneyBill /> Informations financières
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <ul className="list-disc list-inside text-gray-700">
              <li>Salaire mensuel : {teacher.salary} FC</li>
              <li>Dernier paiement : {teacher.lastPayment}</li>
              <li>Primes : {teacher.bonus}</li>
              <li>Retenues : {teacher.deductions}</li>
              <li>Compte bancaire : {teacher.bankAccount}</li>
              <li>Numéro CNSS : {teacher.socialNumber}</li>
            </ul>
          </div>
        </section>

        {/* 📂 Documents officiels */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-blue-700">
            <FaFileAlt /> Documents officiels
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <ul className="list-disc list-inside text-gray-700">
              {teacher.documents.map((doc, index) => (
                <li key={index}>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ⚙️ Actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <FaEdit /> Modifier
          </button>
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
            <FaMoneyBill /> Payer
          </button>
          <button className="bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700">
            <FaTrash /> Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
