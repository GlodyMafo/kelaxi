import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function AddStudentStepForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [form, setForm] = useState({
    matricule: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    placeOfBirth: "",
    nationality: "",
    class: "",
    section: "",
    academicYear: "",
    previousSchool: "",
    fatherName: "",
    motherName: "",
    fatherContact: "",
    motherContact: "",
    healthIssues: "",
    allergies: "",
    emergencyContact: "",
    responsible: "",
    paymentMethod: "",
    registrationDate: "",
    profilePhoto: null,
  });

  // 🧠 Génération automatique du matricule
  useEffect(() => {
    if (form.lastName && form.firstName && form.dateOfBirth) {
      const namePart = form.lastName.trim().slice(0, 3).toUpperCase();
      const postNamePart = form.firstName.trim().slice(0, 3).toUpperCase();
      const datePart = form.dateOfBirth.replaceAll("-", "").slice(2); // format yymmdd
      const matricule = `${namePart}${postNamePart}${datePart}`;
      setForm((prev) => ({ ...prev, matricule }));
    }
  }, [form.lastName, form.firstName, form.dateOfBirth]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // ✅ Validation dynamique selon les étapes
  const requiredFieldsByStep = {
    1: ["firstName", "lastName", "gender", "dateOfBirth"],
    2: ["class", "section", "academicYear"],
    3: [],
    4: ["fatherName", "motherName"],
    5: ["registrationDate", "paymentMethod"],
  };

  const validateStep = () => {
    const fields = requiredFieldsByStep[step] || [];
    for (const field of fields) {
      if (!form[field]) return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      alert("⚠️ Veuillez remplir tous les champs obligatoires avant de continuer.");
      return;
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.profilePhoto) {
      alert("⚠️ Veuillez sélectionner une photo de profil avant d’enregistrer.");
      return;
    }
    console.log("Données soumises :", form);
    alert(`Élève inscrit avec succès !\nMatricule : ${form.matricule}`);
    navigate("/");
  };

  const steps = [
    "Informations personnelles",
    "Informations scolaires",
    "Informations médicales",
    "Détails des parents",
    "Informations administratives",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center">
  
      {/* Barre de progression */}
      <div className="w-full max-w-3xl mb-6">
        <div className="flex justify-between mb-2">
          {steps.map((label, i) => (
            <div key={i} className="text-xs text-gray-600 text-center flex-1">
              <div
                className={`w-8 h-8 mx-auto mb-1 rounded-full flex items-center justify-center text-white font-bold ${step >= i + 1 ? "bg-[#1A2F6B]" : "bg-gray-300"
                  }`}
              >
                {i + 1}
              </div>
              {label}
            </div>
          ))}
        </div>

        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-[#1A2F6B] rounded transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Formulaire multi-étapes */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >



            {/* Étape 1 – Infos personnelles */}
            {step === 1 && (
              <>


                {/* Grille pour inputs + photo */}
                <div className="col-span-2 grid grid-cols-3 gap-4">

                  {/* Div des autres inputs */}
                  <div className="col-span-2 flex flex-col gap-3">

                    {/* Matricule auto sur toute la largeur */}
                    <input
                      name="matricule"
                      placeholder="Matricule (auto)"
                      value={form.matricule}
                      readOnly
                      className="border rounded px-3 py-2 col-span-2 bg-gray-100"
                    />

                    <div className="flex justify-between gap-3">

                      <input
                        name="firstName"
                        placeholder="Prénom *"
                        value={form.firstName}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-[50%]"
                      />

                      <input
                        name="lastName"
                        placeholder="Nom *"
                        value={form.lastName}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-[50%]"
                      />
                    </div>


                    <div className="flex justify-between gap-3">
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-[28%]"
                      >
                        <option value="">Genre *</option>
                        <option value="Masculin">M</option>
                        <option value="Féminin">F</option>
                         <option value="Autre">Autre</option>
                      </select>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-[36%]"
                      />
                      <input
                        name="placeOfBirth"
                        placeholder="Lieu de naissance"
                        value={form.placeOfBirth}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 w-[36%]"
                      />
                    </div>

                    <input
                      name="nationality"
                      placeholder="Nationalité"
                      value={form.nationality}
                      onChange={handleChange}
                      className="border rounded px-3 py-2"
                    />
                  </div>

                  {/* Div photo */}
                  <div className="flex flex-col items-center justify-center">
                    <label
                      htmlFor="profilePhoto"
                      className="w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 overflow-hidden"
                    >
                      {form.profilePhoto ? (
                        <img
                          src={URL.createObjectURL(form.profilePhoto)}
                          alt="profil"
                          className="w-32 h-32 object-cover rounded-full"
                        />
                      ) : (
                        "Photo"
                      )}
                    </label>
                    <input
                      id="profilePhoto"
                      type="file"
                      name="profilePhoto"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500 mt-2 text-center">Photo de l’élève</p>
                  </div>
                </div>
              </>
            )}

            {/* Étape 2 – Infos scolaires */}
            {step === 2 && (
              <>
                <input
                  name="class"
                  placeholder="Classe *"
                  value={form.class}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                />
                <input
                  name="section"
                  placeholder="Section *"
                  value={form.section}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                />
                <input
                  name="academicYear"
                  placeholder="Année académique *"
                  value={form.academicYear}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 col-span-2"
                />
                <input
                  name="previousSchool"
                  placeholder="École précédente"
                  value={form.previousSchool}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 col-span-2"
                />
              </>
            )}

            {/* Étape 3 – Médical */}
            {step === 3 && (
              <>
                <input
                  name="allergies"
                  placeholder="Allergies"
                  value={form.allergies}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                />
                <input
                  name="healthIssues"
                  placeholder="Problèmes de santé"
                  value={form.healthIssues}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                />
                <input
                  name="emergencyContact"
                  placeholder="Contact d’urgence"
                  value={form.emergencyContact}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 col-span-2"
                />
              </>
            )}

            {/* Étape 4 – Parents */}
            {step === 4 && (
              <>
                <input
                  name="fatherName"
                  placeholder="Nom du père *"
                  value={form.fatherName}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                />
                <input
                  name="motherName"
                  placeholder="Nom de la mère *"
                  value={form.motherName}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                />
                <input
                  name="fatherContact"
                  placeholder="Contact du père"
                  value={form.fatherContact}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                />
                <input
                  name="motherContact"
                  placeholder="Contact de la mère"
                  value={form.motherContact}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                />
              </>
            )}

            {/* Étape 5 – Administratif */}
            {step === 5 && (
              <>
                <input
                  type="date"
                  name="registrationDate"
                  placeholder="Date d’inscription *"
                  value={form.registrationDate}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                />
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  className="border rounded px-3 py-2"
                >
                  <option value="">Mode de paiement *</option>
                  <option value="Cash">Espèces</option>
                  <option value="Mobile Money">Mobile Money</option>
                  <option value="Banque">Banque</option>
                </select>
                <input
                  name="responsible"
                  placeholder="Responsable financier"
                  value={form.responsible}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 col-span-2"
                />
              </>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
               Précédent
            </button>
          ) : (
            <span />
          )}

          {step < totalSteps ? (
            <button
              type="button"
              onClick={() => {
               
                setStep(step + 1);
              }}
              className="px-4 py-2 bg-[#00C4D9] cursor-pointer shadow text-white rounded hover:bg-[#1A2F6B]"
            >
              Suivant
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-600"
            >
              Enregistrer
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
