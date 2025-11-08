import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import studentsData from "./data/studentsData.js";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = studentsData.find((s) => s.id === parseInt(id));

  if (!student) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-700 text-lg mb-4">
          Élève non trouvé ou informations manquantes.
        </p>
        <button
          onClick={() => navigate("/students")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  const [files, setFiles] = useState(student.fichiers || []);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = uploadedFiles.map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  // ✅ Gestion photo principale avec avatar React Icon
  const photoExist =
    student.photos && student.photos[0] && student.photos[0].trim() !== "";

  const photoUrl =
    photoExist && !student.photos[0].includes("http")
      ? student.photos[0].replace("../public/", "/")
      : student.photos[0];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Retour à la liste
      </button>

      {/* Profil élève */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center gap-6">
          {photoExist ? (
            <img
              src={photoUrl}
              alt={student.name}
              className="w-32 h-32 object-cover rounded-full border"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full">
              <FaUserCircle className="text-gray-400 w-20 h-20" />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {student.name}
            </h2>
            <p>
              <span className="font-semibold">Classe :</span> {student.class}
            </p>
            <p>
              <span className="font-semibold">Pourcentage :</span>{" "}
              {student.percentage}%
            </p>
            <p>
              <span className="font-semibold">Contact Parent :</span>{" "}
              {student.parentContact}
            </p>
            <p>
              <span className="font-semibold">Identifiant :</span> #{student.id}
            </p>
          </div>
        </div>
      </div>

      {/* Fichiers */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Dossiers et fichiers
        </h3>

        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="mb-4 block"
        />

        {files.length === 0 ? (
          <p className="text-gray-500">Aucun fichier disponible.</p>
        ) : (
          <ul className="list-disc pl-5 text-gray-700">
            {files.map((file, index) => (
              <li key={index}>
                <a
                  href={file.url || `/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {file.name || file}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Galerie */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Photos</h3>
        {student.photos && student.photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {student.photos.map((photo, i) =>
              photo && photo.trim() !== "" ? (
                <img
                  key={i}
                  src={photo.replace("../public/", "/")}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-40 object-cover rounded-lg border"
                />
              ) : (
                <div
                  key={i}
                  className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-lg border"
                >
                  <FaUserCircle className="text-gray-400 w-16 h-16" />
                </div>
              )
            )}
          </div>
        ) : (
          <p className="text-gray-500">Aucune photo disponible.</p>
        )}
      </div>

      {/* Palmarès */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Palmarès</h3>

        {student.palmares && student.palmares.length > 0 ? (
          <ul className="list-disc pl-5 text-gray-700">
            {student.palmares.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun palmarès disponible.</p>
        )}
      </div>
    </div>
  );
}
