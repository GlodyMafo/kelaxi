import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import StatCard from "../../components/ui/StatCard";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryGroup,
  VictoryLine,
  VictoryLegend
} from "victory";

import { FaMale, FaFemale, FaUser, FaArrowUp, FaArrowDown, FaExclamationTriangle } from "react-icons/fa";
import { GiArtificialHive } from "react-icons/gi";
import { IoIosMore } from "react-icons/io";
import { PiStudent, PiChalkboardTeacherFill } from "react-icons/pi";
import { GrMoney } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";




export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ✅ Filtre période financière
  const [selectedPeriod, setSelectedPeriod] = useState("mois");

  // ✅ Données selon la période
  const financialData = {
    mois: {
      entrees: [
        { x: "S1", y: 1200 },
        { x: "S2", y: 1800 },
        { x: "S3", y: 1500 },
        { x: "S4", y: 2200 },
      ],
      sorties: [
        { x: "S1", y: 900 },
        { x: "S2", y: 1300 },
        { x: "S3", y: 1700 },
        { x: "S4", y: 1900 },
      ],
    },
    trimestre: {
      entrees: [
        { x: "Jan", y: 3200 },
        { x: "Fév", y: 4100 },
        { x: "Mar", y: 4500 },
      ],
      sorties: [
        { x: "Jan", y: 2600 },
        { x: "Fév", y: 3000 },
        { x: "Mar", y: 3400 },
      ],
    },
    annee: {
      entrees: [
        { x: "T1", y: 10800 },
        { x: "T2", y: 12500 },
        { x: "T3", y: 13900 },
        { x: "T4", y: 14500 },
      ],
      sorties: [
        { x: "T1", y: 9600 },
        { x: "T2", y: 10500 },
        { x: "T3", y: 11800 },
        { x: "T4", y: 13000 },
      ],
    },
  };

  // ✅ Calculs automatiques selon la période sélectionnée
  const totalEntrees = financialData[selectedPeriod].entrees.reduce((sum, d) => sum + d.y, 0);
  const totalSorties = financialData[selectedPeriod].sorties.reduce((sum, d) => sum + d.y, 0);
  const gainNet = totalEntrees - totalSorties;

  // ✅ Détermination de l'état du gain
  const isGainPositif = gainNet >= 0;



  const events = [
    { date: "2025-10-30", time: "08:00", title: "Réunion des enseignants" },
    { date: "2025-10-30", time: "10:00", title: "Cours de Mathématiques - 4A" },
    { date: "2025-10-30", time: "09:00", title: "Visite du Directeur" },
    { date: "2025-10-30", time: "14:00", title: "Atelier de Sciences" },
  ];

  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const dayEvents = events.filter((event) => event.date === formattedDate);

  const studentGenderTotal = [
    { x: "Hommes", y: 620 },
    { x: "Femmes", y: 204 },
  ];

  const total = studentGenderTotal.reduce((sum, d) => sum + d.y, 0);

  const attendanceData = [
    { day: "Lun", male: 515, female: 200 },
    { day: "Mar", male: 260, female: 180 },
    { day: "Mer", male: 420, female: 204 },
    { day: "Jeu", male: 610, female: 200 },
    { day: "Ven", male: 620, female: 204 },
  ];


  return (
    <div>
      <div className="flex gap-6 ">
        <div className="flex flex-col space-y-6 w-[70%]">
          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard title="Élèves" value="1 234" icon={<PiStudent />} />
            <StatCard title="Enseignants" value="87" icon={<PiChalkboardTeacherFill />} />
            <StatCard title="Paiements" value="11 240 USD" icon={<GrMoney />} />
            <StatCard title="Absences" value="24" icon={<AiOutlineSchedule />} />
          </div>

          <div className="flex gap-6">
            {/* ✅ Nombre d'Élèves avec en-tête et filtre */}
            <section className="bg-white rounded-3xl shadow flex flex-col w-[30%] h-[318px]">
              {/* En-tête + filtre */}
              <div className="w-full flex flex-col justify-center items-center px-4 py-2 pt-4">
                <h2 className="font-semibold text-gray-800 pb-4">Nombre d'Élèves</h2>
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none">
                  <option>Toutes les classes</option>
                  <option>Primaire</option>
                  <option>Secondaire</option>
                  <option>Humanités</option>
                </select>
              </div>

              {/* Graphique */}
              <div className="flex flex-col items-center">
                <svg width={300} height={300} className="block mx-auto relative">
                  <foreignObject x="70" y="80" width="65" height="50">
                    <div className="flex items-center justify-center gap-2 w-full h-full">
                      <div className="flex flex-col items-center">
                        <FaFemale size={32} color="#00C4D9" />
                        <p className="text-gray-700 font-medium text-xs">
                          <span className="font-semibold text-[#00C4D9] text-sm">
                            {studentGenderTotal.find((d) => d.x === "Femmes")?.y ?? 0}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col items-center">
                        <FaMale size={32} color="#1A2F6B" />
                        <p className="text-gray-700 font-medium text-xs">
                          <span className="font-semibold text-[#1A2F6B] text-sm">
                            {studentGenderTotal.find((d) => d.x === "Hommes")?.y ?? 0}
                          </span>
                        </p>
                      </div>
                    </div>
                  </foreignObject>

                  <VictoryPie
                    standalone={false}
                    colorScale={["#1A2F6B", "#00C4D9"]}
                    width={200}
                    height={200}
                    innerRadius={75}
                    padding={{ top: 0, bottom: 0, left: 40, right: 40 }}
                    padAngle={2}
                    data={studentGenderTotal.map((d) => ({
                      ...d,
                      label: `${d.x}: ${((d.y / total) * 100).toFixed(1)}%`,
                    }))}
                    labels={({ datum }) => datum.label}
                    labelComponent={
                      <VictoryTooltip
                        flyoutStyle={{
                          fill: "white",
                          stroke: "#e5e7eb",
                          strokeWidth: 1,
                        }}
                        style={{ fontSize: 14, fill: "#111827", fontWeight: 500 }}
                        cornerRadius={4}
                        flyoutPadding={8}
                        pointerLength={6}
                      />
                    }
                    style={{
                      labels: { fill: "transparent" },
                    }}
                    theme={VictoryTheme.clean}
                  />
                </svg>
              </div>
            </section>

            {/* ✅ Présence des élèves avec en-tête et filtre */}
            <section className="bg-white rounded-3xl shadow w-[70%] flex flex-col h-[318px]">
              {/* En-tête + filtre */}
              <div className="w-full flex justify-between items-center px-4 py-2 pt-4">
                <h2 className="font-semibold text-gray-800">Présence des Élèves</h2>
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none">
                  <option>Cette semaine</option>
                  <option>Ce mois</option>
                  <option>Ce trimestre</option>
                </select>
              </div>

              {/* Graphique avec espacement réduit */}
              <div className="px-2 py-1 flex justify-center">
                <VictoryChart
                  theme={VictoryTheme.material}
                  height={265}
                  width={450}
                  domainPadding={{ x: 30, y: 5 }}
                  padding={{ top: 10, bottom: 40, left: 40, right: 25 }}
                >
                  <VictoryAxis
                    style={{
                      axisLabel: { padding: 20, fontSize: 13, fontWeight: 600 },
                      tickLabels: { fontSize: 11 },
                    }}
                  />

                  <VictoryAxis
                    dependentAxis
                    style={{
                      axisLabel: { padding: 30, fontSize: 13, fontWeight: 600 },
                      tickLabels: { fontSize: 11 },
                    }}
                  />

                  <VictoryGroup offset={22} colorScale={["#1A2F6B", "#00C4D9"]}>
                    <VictoryBar
                      data={attendanceData}
                      x="day"
                      y="male"
                      barWidth={16}
                      style={{ data: { fill: "#1A2F6B" } }}
                    />
                    <VictoryBar
                      data={attendanceData}
                      x="day"
                      y="female"
                      barWidth={16}
                      style={{ data: { fill: "#00C4D9" } }}
                    />
                  </VictoryGroup>
                </VictoryChart>
              </div>
            </section>

          </div>

          {/* Section financière */}
          <div className="flex gap-4">
            {/* ✅ Section financière dynamique */}
            <div className="flex gap-4 items-start">
              {/* Graphique financier avec filtre */}
              <section className="bg-white rounded-3xl shadow p-4 flex flex-col w-[80%]">
                {/* En-tête + filtre */}
                <div className="flex justify-between items-center mb-2 px-2">
                  <h2 className="font-semibold text-gray-800 ">Flux Financiers </h2>
                  <select
                    className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    <option value="mois">Ce mois</option>
                    <option value="trimestre">Ce trimestre</option>
                    <option value="annee">Cette année</option>
                  </select>
                </div>

                {/* Graphique dynamique */}
                <VictoryChart
                  theme={VictoryTheme.material}
                  height={370}
                  width={700}
                  domainPadding={{ x: 30, y: 20 }}
                  padding={{ top: 20, bottom: 60, left: 60, right: 40 }}
                >
                  <VictoryAxis
                    label={selectedPeriod === "mois" ? "Jours" : "Mois"}
                    style={{
                      axisLabel: { padding: 30, fontSize: 14, fontWeight: 600 },
                      tickLabels: { fontSize: 12 },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    style={{
                      axisLabel: { padding: 40, fontSize: 14, fontWeight: 600 },
                      tickLabels: { fontSize: 12 },
                    }}
                  />

                  <VictoryLine
                    data={financialData[selectedPeriod].entrees}
                    x="x"
                    y="y"
                    interpolation="monotoneX"
                    style={{ data: { stroke: "#1A2F6B", strokeWidth: 3 } }}
                  />

                  <VictoryLine
                    data={financialData[selectedPeriod].sorties}
                    x="x"
                    y="y"
                    interpolation="monotoneX"
                    style={{ data: { stroke: "#00C4D9", strokeWidth: 3 } }}
                  />

                  <VictoryLegend
                    x={220}
                    y={10}
                    orientation="horizontal"
                    gutter={25}
                    style={{ labels: { fontSize: 13 } }}
                    data={[
                      { name: "Entrées", symbol: { fill: "#1A2F6B" } },
                      { name: "Sorties", symbol: { fill: "#00C4D9" } },
                    ]}
                  />
                </VictoryChart>
              </section>

              {/* Données extérieures */}
              {/* Données extérieures dynamiques */}
              <div className="flex flex-col gap-4 w-[20%]">
                {/* Carte Entrées */}
                <div className="bg-white px-4 py-3 rounded-2xl shadow  ">
                   <p className="text-sm text-gray-500">Entrées</p>
                  <div className="flex justify-between items-center ">
                   
                    <p className="text-2xs font-semibold text-green-600">{totalEntrees.toLocaleString()} USD</p>
                     <FaArrowUp className="text-green-600" />
                  </div>
                 
                </div>

                {/* Carte Sorties */}
                <div className="bg-white px-4 py-3 rounded-2xl shadow ">
                   <p className="text-sm text-gray-500">Sorties</p>
                  <div className="flex justify-between items-center">
                   
                    <p className="text-2xs font-semibold text-red-600">{totalSorties.toLocaleString()} USD</p>
                     <FaArrowDown className="text-red-600" />
                  </div>
                 
                </div>

                {/* Carte Gain Net avec couleur dynamique */}
                <div
                  className={`px-4 py-3 rounded-2xl shadow flex justify-between items-center transition 
      ${isGainPositif ? "bg-white" : "bg-red-50 border border-red-200"}`}
                >
                  <div>
                    <p className={`text-sm ${isGainPositif ? "text-gray-500" : "text-red-600"}`}>
                      Gain net
                    </p>
                    <p
                      className={`text-2xs font-semibold ${isGainPositif ? "text-[#1A2F6B]" : "text-red-600"
                        }`}
                    >
                      {gainNet.toLocaleString()} USD
                    </p>
                  </div>
                  {isGainPositif ? (
                    <FaArrowUp className="text-[#1A2F6B]" />
                  ) : (
                    <FaExclamationTriangle className="text-red-600" />
                  )}
                </div>

                {/* Conseil AI */}
                <button className="bg-white px-4 py-3 rounded-2xl shadow flex flex-col items-center gap-2 hover:bg-gray-50 transition">
                  <GiArtificialHive className="text-[#1A2F6B]" size={24} />
                  <span className="text-sm font-medium text-gray-700">Conseil AI</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Calendrier et messages */}
        <div className="w-[30%] flex flex-col gap-6">
          <div>
            <section className="relative bg-white rounded-[2rem] shadow p-4 overflow-hidden">
              <div className="absolute inset-0 rounded-[2rem]"></div>
              <div className="relative z-10">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  className="rounded-lg shadow-sm border border-gray-200 p-2"
                />
              </div>

              <div className="pt-8 p-2 ">
                <div className="flex justify-between items-center pb-4">
                  <h2 className="font-semibold mb-0 text-[#1A2F6B]">
                    Agenda du {format(selectedDate, "dd/MM/yyyy")}
                  </h2>
                  <IoIosMore />
                </div>

                {dayEvents.length > 0 ? (
                  <ul className="text-sm text-gray-700 space-y-3">
                    {dayEvents.map((event, index) => (
                      <li key={index} className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">{event.time}</span>
                        <span>{event.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">Aucun événement prévu ce jour-là.</p>
                )}
              </div>
            </section>
          </div>

          <div>
            <section className="bg-white rounded-[2rem] shadow p-4 flex flex-col w-full">
              <div className="flex justify-between items-center pb-4">
                <h2 className="font-semibold text-gray-800 mb-">Messages récents</h2>
                <IoIosMore />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100">
                    <FaUser className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1 w-10">
                    <p className="font-semibold text-gray-800">Sarah Mbala</p>
                    <p className="text-sm text-gray-600 truncate ">
                      Bonjour, est-ce que la réunion de demain est confirmée ?
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">il y a 5 min</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100">
                    <FaUser className="text-pink-600" size={20} />
                  </div>
                  <div className="flex-1 w-10">
                    <p className="font-semibold text-gray-800">Kevin Lumumba</p>
                    <p className="text-sm text-gray-600 truncate">
                      Merci pour le rapport, je l’ai bien reçu !
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">il y a 12 min</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
