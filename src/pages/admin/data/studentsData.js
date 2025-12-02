// src/data/studentsData.js

const studentsData = [
  {
    id: 1,
    name: "Deo Mafo",
    class: "1ère A",
    percentage: 84,
    parentContact: "+243 829331002",
    fichiers: ["bulletin1.pdf", "trimestre1.pdf"],
    photos: [""], // ✅ vient de public
    palmares: ["2e de la classe", "Prix de bonne conduite"],
  },
  {
    id: 2,
    name: "Mya Kalumba",
    class: "1ère B",
    percentage: 79,
    parentContact: "+243 826103987",
    fichiers: ["bulletin2.pdf"],
    photos: [""], // ✅ vient de public
    palmares: ["4e de la classe"],
  },
  {
    id: 3,
    name: "Junior Kasongo",
    class: "2ème A",
    percentage: 91,
    parentContact: "+243 817320876",
    fichiers: ["releve_note.pdf"],
    photos: [""], // ❌ vide
    palmares: ["1er de la classe", "Excellence en Mathématiques"],
  },
  {
    id: 4,
    name: "Amina Kalala",
    class: "2ème B",
    percentage: 87,
    parentContact: "+243 829223344",
    fichiers: ["attestation.pdf"],
    photos: [""],
    palmares: ["Prix d’assiduité"],
  },
  {
    id: 5,
    name: "Kevin Tshibola",
    class: "3ème A",
    percentage: 77,
    parentContact: "+243 815662190",
    fichiers: ["bulletin.pdf"],
    photos: [""],
    palmares: [],
  },
  {
    id: 6,
    name: "Grace Mwamba",
    class: "3ème B",
    percentage: 93,
    parentContact: "+243 819331054",
    fichiers: ["trimestre2.pdf"],
    photos: [""], // ❌ vide (pas de public)
    palmares: ["1ère de la classe", "Prix d’excellence"],
  },
  {
    id: 7,
    name: "Merveille Mutombo",
    class: "4ème C",
    percentage: 68,
    parentContact: "+243 812541222",
    fichiers: ["bulletin4.pdf"],
    photos: [""],
    palmares: [],
  },
  {
    id: 8,
    name: "Patrick Ilunga",
    class: "5ème A",
    percentage: 80,
    parentContact: "+243 811909090",
    fichiers: ["examen_final.pdf"],
    photos: [""],
    palmares: ["Prix du courage"],
  },
  {
    id: 9,
    name: "Deborah Kasongo",
    class: "5ème B",
    percentage: 95,
    parentContact: "+243 818765321",
    fichiers: ["bulletin5.pdf"],
    photos: [""],
    palmares: ["1ère de la classe", "Excellence en Français"],
  },
  {
    id: 10,
    name: "Chadrack Kalala",
    class: "6ème A",
    percentage: 72,
    parentContact: "+243 818302112",
    fichiers: ["releve_note.pdf"],
    photos: [""],
    palmares: [],
  },
];

// 🔹 Génération automatique de 90 autres élèves avec photo vide
const prenoms = [
  "Daniel", "Rachel", "Fabrice", "Prisca", "Jonathan", "Naomi", "David", "Rebecca",
  "Steve", "Benita", "Gédéon", "Gloria", "Samuel", "Kelly", "Ethan", "Yvette",
  "Patrick", "Stéphanie", "Josué", "Micheline", "Prince", "Nadine", "Christian",
  "Cynthia", "Joseph", "Esther", "Junior", "Inès", "Moïse", "Dorcas", "Hervé",
  "Aline", "Alain", "Laetitia", "Patrick", "Mado", "Yannick", "Naomie", "Jessica",
  "David", "Patricia", "Noël", "Linda", "Patrick", "Carine", "Daniela", "Marcel",
  "Esther", "Diane", "Christian", "Josiane", "Gracia", "Marvin", "Kelly", "Prisca",
  "Ephraïm", "Sandra", "Yves", "Natacha", "Prince", "Deborah", "Steve", "Judith",
  "John", "Sarah", "Yann", "Fleur", "David", "Joëlle", "Benjamin", "Ruth", "Patrick",
  "Cédric", "Eliane", "Kevin", "Monique", "Raphaël", "Nadine", "Manassé", "Estelle",
  "Jules", "Tatiana", "Isaac", "Divine", "Eric", "Rachel", "Gloire", "Agnès",
  "Didier", "Annie", "Lionel", "Chantal", "Samuel", "Céline", "Yvan", "Clarisse"
];

const noms = [
  "Ilunga", "Kasongo", "Mbuyi", "Mwamba", "Kalala", "Mutombo", "Tshibola", "Mbala",
  "Kabongo", "Lukusa", "Ngoyi", "Mulumba", "Kayembe", "Nkosi", "Katembo", "Makiese",
  "Nsamba", "Kanku", "Mavungu", "Mukendi"
];

const classes = [
  "1ère A", "1ère B", "2ème A", "2ème B", "3ème A", "3ème B", "4ème C", "5ème A", "5ème B", "6ème A"
];

for (let i = 11; i <= 100; i++) {
  const first = prenoms[Math.floor(Math.random() * prenoms.length)];
  const last = noms[Math.floor(Math.random() * noms.length)];
  const classe = classes[Math.floor(Math.random() * classes.length)];
  const percentage = Math.floor(55 + Math.random() * 40);
  const contact = `+243 8${Math.floor(10000000 + Math.random() * 89999999)}`;

  studentsData.push({
    id: i,
    name: `${first} ${last}`,
    class: classe,
    percentage,
    parentContact: contact,
    fichiers: [`bulletin_${i}.pdf`],
    photos: [""], // ✅ vide
    palmares: [],
  });
}

export default studentsData;
