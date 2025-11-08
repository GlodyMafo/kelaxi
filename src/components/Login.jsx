import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/admin/dashboard");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-200 via-sky-100 to-blue-50 overflow-hidden">
      {/* Arrière-plan image + overlay sombre */}
      <div className="absolute inset-0">
        <img
          src="../public/student_bg.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Carte de connexion centrée */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl w-[95%] sm:w-[400px] p-8"
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <img
            src="../public/logo.png"
            alt="Logo"
            className="w-60"
          />
        </div>

        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Connexion
        </h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2 text-sm"
            >
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-200 rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2 text-sm"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-200 rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="flex items-center text-gray-600 text-xs">
              <input
                type="checkbox"
                className="accent-blue-600 mr-2"
                id="remember"
              />
              Se souvenir de moi
            </label>

            <a
              href="#"
              className="text-blue-600 text-xs hover:underline hover:text-blue-700 transition"
            >
              Mot de passe oublié ?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold rounded-lg py-2 px-4 w-full shadow-md transition-all text-sm"
          >
            Se connecter
          </motion.button>
        </form>

        {/* <div className="mt-6 text-center text-gray-700 text-sm">
          Pas encore de compte ?{" "}
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition"
          >
            S’inscrire ici
          </a>
        </div> */}
      </motion.div>
    </div>
  );
}
