// src/data/teachersData.js

export const teachersData = [
  {
    id: 1,
    firstName: "Deo",
    lastName: "Mafo",
    gender: "Homme",
    birthDate: "12/03/1988",
    maritalStatus: "Marié",
    email: "deo.mafo@ecolecd.com",
    phone: "+243 829 331 002",
    address: "Gombe, Kinshasa",
    photo: "/images/teachers/deo.jpg",
    role: "Professeur de Mathématiques",
    subjects: ["Mathématiques", "Physique"],
    classes: ["3ème Scientifique", "4ème Scientifique"],
    degree: "Licence en Mathématiques",
    hireDate: "2015-09-01",
    experience: 10,
    contractType: "CDI",
    status: "Actif",

    // 🔹 Données pédagogiques
    attendanceRate: 95,
    lateCount: 3,
    absentCount: 1,
    successRate: 87,
    evaluation: 8.9,
    comment: "Très bon enseignant, ponctuel et rigoureux.",
    lastTraining: "Pédagogie active - Juin 2024",

    // 🔹 Informations financières
    salary: 750000,
    lastPayment: "Octobre 2025",
    bonus: "50 000 FC",
    deductions: "10 000 FC",
    bankAccount: "Rawbank 123-456-789",
    socialNumber: "CNSS 025-789-654",

    // 🔹 Documents administratifs
    documents: [
      { name: "Contrat de travail", url: "/docs/contrat-deo.pdf" },
      { name: "Diplôme universitaire", url: "/docs/diplome-deo.pdf" },
    ],

    // 🔹 Emploi du temps
    schedule: [
      {
        day: "Lundi",
        time: "08h00 - 10h00",
        subject: "Mathématiques",
        class: "3ème Scientifique",
        room: "Salle 12",
      },
      {
        day: "Mercredi",
        time: "10h00 - 12h00",
        subject: "Physique",
        class: "4ème Scientifique",
        room: "Salle 8",
      },
    ],
  },

  {
    id: 2,
    firstName: "Mya",
    lastName: "Lusamba",
    gender: "Femme",
    birthDate: "23/07/1991",
    maritalStatus: "Célibataire",
    email: "mya.lusamba@ecolecd.com",
    phone: "+243 818 440 991",
    address: "Lingwala, Kinshasa",
    photo: "/images/teachers/mya.jpg",
    role: "Professeure de Français",
    subjects: ["Français", "Expression écrite"],
    classes: ["2ème Littéraire", "3ème Littéraire"],
    degree: "Licence en Lettres Modernes",
    hireDate: "2018-02-12",
    experience: 7,
    contractType: "CDI",
    status: "Actif",

    attendanceRate: 98,
    lateCount: 1,
    absentCount: 0,
    successRate: 91,
    evaluation: 9.4,
    comment: "Pédagogue dynamique, très appréciée des élèves.",
    lastTraining: "Didactique du français - Avril 2025",

    salary: 700000,
    lastPayment: "Octobre 2025",
    bonus: "80 000 FC",
    deductions: "0 FC",
    bankAccount: "EquityBCDC 456-321-778",
    socialNumber: "CNSS 045-996-123",

    documents: [
      { name: "Contrat de travail", url: "/docs/contrat-mya.pdf" },
      { name: "Diplôme universitaire", url: "/docs/diplome-mya.pdf" },
    ],

    schedule: [
      {
        day: "Mardi",
        time: "08h00 - 10h00",
        subject: "Français",
        class: "2ème Littéraire",
        room: "Salle 6",
      },
      {
        day: "Jeudi",
        time: "10h00 - 12h00",
        subject: "Expression écrite",
        class: "3ème Littéraire",
        room: "Salle 9",
      },
    ],
  },

  {
    id: 3,
    firstName: "Ernest",
    lastName: "Mafo",
    gender: "Homme",
    birthDate: "02/11/1985",
    maritalStatus: "Marié",
    email: "ernest.mafo@ecolecd.com",
    phone: "+243 999 888 777",
    address: "Kintambo, Kinshasa",
    photo: "/images/teachers/ernest.jpg",
    role: "Professeur de Physique-Chimie",
    subjects: ["Physique", "Chimie"],
    classes: ["4ème Scientifique", "5ème Scientifique"],
    degree: "Licence en Physique Appliquée",
    hireDate: "2013-01-10",
    experience: 12,
    contractType: "CDI",
    status: "Congé",

    attendanceRate: 90,
    lateCount: 5,
    absentCount: 2,
    successRate: 83,
    evaluation: 8.2,
    comment: "Bon formateur, mais ponctualité à améliorer.",
    lastTraining: "Gestion de classe - Décembre 2024",

    salary: 720000,
    lastPayment: "Septembre 2025",
    bonus: "0 FC",
    deductions: "20 000 FC",
    bankAccount: "TMB 889-332-441",
    socialNumber: "CNSS 033-777-987",

    documents: [
      { name: "Contrat de travail", url: "/docs/contrat-ernest.pdf" },
      { name: "Diplôme universitaire", url: "/docs/diplome-ernest.pdf" },
    ],

    schedule: [
      {
        day: "Lundi",
        time: "08h00 - 10h00",
        subject: "Physique",
        class: "5ème Scientifique",
        room: "Salle 5",
      },
      {
        day: "Mercredi",
        time: "10h00 - 12h00",
        subject: "Chimie",
        class: "4ème Scientifique",
        room: "Salle 2",
      },
    ],
  },
];

export default teachersData;
