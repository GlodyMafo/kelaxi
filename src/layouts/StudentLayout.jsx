import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Students(){
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // example: remplacer par vraie route backend
    api.get("/students").then(res => setStudents(res.data)).catch(()=> {
      // fallback demo data
      setStudents([{id:1,name:"Jean K", class:"4B"}, {id:2,name:"Awa M", class:"3A"}]);
    });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Élèves</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Ajouter un élève</button>
      </div>

      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Nom</th>
              <th className="p-3">Classe</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.id}</td>
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.class}</td>
                <td className="p-3">
                  <button className="text-sm text-blue-600">Voir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
