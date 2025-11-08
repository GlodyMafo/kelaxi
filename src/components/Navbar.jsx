import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBell } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { BiSolidMessageAlt } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";

export default function Navbar() {
  const { user: authUser } = useContext(AuthContext);
  const location = useLocation();
  const [imgError, setImgError] = useState(false);

  // 🧩 --- Données utilisateur par défaut (au cas où le AuthContext est vide)
  const defaultUser = {
    name: "Glody Mafo",
    role: "Promoteur",
    photo: "../public/WhatsApp Image 2025-11-04 at 11.08.03_c86b3171.jpg",
  };

  // 👤 --- Utilisateur actif : soit celui du contexte, soit le mock
  const user = authUser || defaultUser;

  // 🧭 --- Titre dynamique selon la route
  const getTitle = () => {
    const path = location.pathname.toLowerCase();

    if (path.includes("/dashboard")) return "Tableau de bord";
    if (path.includes("/students")) return "Élèves";
    if (path.includes("/add")) return "Fiche d'inscription";
    if (path.includes("/student/")) return "Détails de l'élève";
     if (path.includes("/attendance")) return "Assistance aux cours";
     if (path.includes("/teachers")) return "Enseignants";
     if(path.includes("/payments")) return "Finances"
    return "";
  };

  const pageTitle = getTitle();

  return (
    <header className="flex items-center justify-between p-4">
      {/* --- Titre de la page --- */}
      <div className="text-2xl font-bold text-[#1A2F6B] pt-8">{pageTitle}</div>

      {/* --- Section utilisateur et icônes --- */}
      <div className="flex items-center gap-4">
        <button
          title="Messages"
          className="bg-white h-8 w-8 flex items-center justify-center shadow-sm rounded-full hover:bg-gray-100"
        >
          <BiSolidMessageAlt />
        </button>

        <button
          title="Notifications"
          className="bg-white h-8 w-8 flex items-center justify-center shadow-sm rounded-full hover:bg-gray-100"
        >
          <FaBell />
        </button>

        <button
          title="Langue"
          className="bg-white h-8 w-8 flex items-center justify-center shadow-sm rounded-full hover:bg-gray-100"
        >
          <IoLanguage />
        </button>

        {/* --- Données utilisateur connectée --- */}
        <div className="flex items-center gap-2">
          <div>
            <div className="text-sm font-medium text-right text-gray-800">
              {user.name}
            </div>
            <p className="text-right text-xs text-gray-500">{user.role}</p>
          </div>

          <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-gray-300 shadow-sm">
            {user.photo && !imgError ? (
              <img
                src={user.photo}
                alt={user.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <RxAvatar className="w-10 h-10 text-gray-500" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
