// FinanceDashboardVictory.jsx
import React, { useMemo, useState } from "react";
import StatCard from "../../components/ui/StatCard";

import { PiStudent, PiChalkboardTeacherFill } from "react-icons/pi";
import { GrMoney } from "react-icons/gr";
import { AiOutlineSchedule } from "react-icons/ai";
import { GiArtificialHive } from "react-icons/gi";

import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLegend,
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { FaPlus, FaPrint } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { RiFileExcel2Line } from "react-icons/ri";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

const categories = ["Scolarité", "Cantine", "Transport", "Salaires", "Fournitures", "Activités"];

const initialPayments = [
  { id: 1, name: "Jean Mukuna", matricule: "E-001", classe: "4A", type: "Scolarité", montant: 200, statut: "Payé", date: "2025-11-01" },
  { id: 2, name: "Marie Lolo", matricule: "E-002", classe: "5B", type: "Cantine", montant: 50, statut: "En retard", date: "2025-10-28" },
  { id: 3, name: "Kevin Lumumba", matricule: "E-003", classe: "6C", type: "Transport", montant: 100, statut: "Payé", date: "2025-11-03" },
];

const initialFlux = {
  entrees: [
    { id: 1, libelle: "Scolarité 4A", montant: 1200, categorie: "Scolarité", date: "2025-11-01" },
    { id: 2, libelle: "Cantine 5B", montant: 300, categorie: "Cantine", date: "2025-11-02" },
  ],
  sorties: [
    { id: 1, libelle: "Salaires Octobre", montant: 1500, categorie: "Salaires", date: "2025-11-01" },
    { id: 2, libelle: "Fournitures", montant: 500, categorie: "Fournitures", date: "2025-11-03" },
  ],
};

const COLORS = ["#2b6cb0", "#38b2ac", "#f6ad55", "#f56565", "#9f7aea", "#63b3ed"];

export default function FinanceDashboardVictory() {
  // State
  const [payments, setPayments] = useState(initialPayments);
  const [flux, setFlux] = useState(initialFlux);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [newPayment, setNewPayment] = useState({
    name: "", matricule: "", classe: "", type: categories[0], montant: "", statut: "Payé", date: ""
  });
  const [newExpense, setNewExpense] = useState({
    libelle: "", montant: "", categorie: categories[3], date: ""
  });

  // Filtre mois
  const [filterMonth, setFilterMonth] = useState("all");

  // Helpers
  const formatCurrency = (n) => `${Number(n || 0).toLocaleString()} USD`;

  // KPIs
  const totalEntrees = useMemo(() => flux.entrees.reduce((s, e) => s + Number(e.montant || 0), 0), [flux]);
  const totalSorties = useMemo(() => flux.sorties.reduce((s, e) => s + Number(e.montant || 0), 0), [flux]);
  const gainNet = totalEntrees - totalSorties;
  const revenusRecus = useMemo(() => payments.filter(p => p.statut === "Payé").reduce((s, p) => s + Number(p.montant || 0), 0), [payments]);
  const revenusImpayes = useMemo(() => payments.filter(p => p.statut !== "Payé").reduce((s, p) => s + Number(p.montant || 0), 0), [payments]);

  // Charts data
  const toMonthKey = (d) => {
    const dt = new Date(d);
    if (isNaN(dt)) return "Unknown";
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
  };

  const series = useMemo(() => {
    const map = {};
    [...flux.entrees, ...flux.sorties].forEach(t => {
      const key = toMonthKey(t.date);
      if (!map[key]) map[key] = { month: key, entrees: 0, sorties: 0 };
      if (flux.entrees.includes(t)) map[key].entrees += Number(t.montant || 0);
      if (flux.sorties.includes(t)) map[key].sorties += Number(t.montant || 0);
    });
    payments.forEach(p => {
      const key = toMonthKey(p.date);
      if (!map[key]) map[key] = { month: key, entrees: 0, sorties: 0 };
      map[key].entrees += p.statut === "Payé" ? Number(p.montant || 0) : 0;
    });
    return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
  }, [flux, payments]);

  const filteredSeries = useMemo(() => {
    if (filterMonth === "all") return series;
    return series.filter((s) => s.month === filterMonth);
  }, [series, filterMonth]);

  const expenseByCategory = useMemo(() => {
    const sums = {};
    flux.sorties.forEach(s => { sums[s.categorie] = (sums[s.categorie] || 0) + Number(s.montant || 0); });
    return Object.keys(sums).map((k, i) => ({ x: k, y: sums[k], color: COLORS[i % COLORS.length] }));
  }, [flux]);

  // Add payment -> also add to flux.entrees (if statut Payé)
  const handleAddPayment = () => {
    if (!newPayment.name || !newPayment.montant || !newPayment.date) {
      return alert("Veuillez remplir le nom, le montant et la date.");
    }
    const added = { ...newPayment, id: payments.length + 1, montant: Number(newPayment.montant) };
    const updatedPayments = [...payments, added];
    setPayments(updatedPayments);

    // Add as entrée if Payé
    if (added.statut === "Payé") {
      setFlux(prev => ({
        ...prev,
        entrees: [...prev.entrees, {
          id: prev.entrees.length + 1,
          libelle: added.type + (added.classe ? ` ${added.classe}` : ""),
          montant: Number(added.montant),
          categorie: added.type,
          date: added.date
        }]
      }));
    }

    setNewPayment({ name: "", matricule: "", classe: "", type: categories[0], montant: "", statut: "Payé", date: "" });
    setShowPaymentModal(false);
    setSelectedPayment(added);
    setShowReceipt(true);
  };

  // Add expense
  const handleAddExpense = () => {
    if (!newExpense.libelle || !newExpense.montant || !newExpense.date) {
      return alert("Veuillez remplir le libellé, le montant et la date.");
    }
    const added = { ...newExpense, id: flux.sorties.length + 1, montant: Number(newExpense.montant) };
    setFlux(prev => ({ ...prev, sorties: [...prev.sorties, added] }));
    setNewExpense({ libelle: "", montant: "", categorie: categories[3], date: "" });
    setShowExpenseModal(false);
  };

  // Export Excel (2 sheets: Paiements, Depenses)
  const exportExcelBoth = () => {
    const wb = XLSX.utils.book_new();
    const paymentsSheet = XLSX.utils.json_to_sheet(payments);
    XLSX.utils.book_append_sheet(wb, paymentsSheet, "Paiements");
    const expenses = flux.sorties.map(s => ({ libelle: s.libelle, categorie: s.categorie, montant: s.montant, date: s.date }));
    const expensesSheet = XLSX.utils.json_to_sheet(expenses);
    XLSX.utils.book_append_sheet(wb, expensesSheet, "Dépenses");
    XLSX.writeFile(wb, "flux_financiers.xlsx");
  };

  // Export PDF (payments then expenses)
  const exportPdfBoth = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const marginLeft = 40;
    let y = 40;
    doc.setFontSize(16);
    doc.text("Rapport Flux Financiers", marginLeft, y);
    y += 24;
    doc.setFontSize(11);
    doc.text(`Généré le : ${new Date().toLocaleString()}`, marginLeft, y);
    y += 20;
    doc.setFontSize(12);
    doc.text(`Totaux — Entrées: ${formatCurrency(totalEntrees)}  |  Sorties: ${formatCurrency(totalSorties)}  |  Solde: ${formatCurrency(gainNet)}`, marginLeft, y);
    y += 26;
    doc.setFontSize(13);
    doc.text("1) Paiements", marginLeft, y);
    y += 16;
    doc.setFontSize(10);
    doc.text("Date", marginLeft, y);
    doc.text("Nom", marginLeft + 70, y);
    doc.text("Type", marginLeft + 240, y);
    doc.text("Montant", marginLeft + 360, y);
    doc.text("Statut", marginLeft + 440, y);
    y += 10;
    payments.forEach((p, i) => {
      if (y > 750) { doc.addPage(); y = 40; }
      y += 18;
      doc.text(p.date || "-", marginLeft, y);
      doc.text(String(p.name || "-"), marginLeft + 70, y);
      doc.text(String(p.type || "-"), marginLeft + 240, y);
      doc.text(String(p.montant || "-"), marginLeft + 360, y);
      doc.text(String(p.statut || "-"), marginLeft + 440, y);
    });
    doc.addPage();
    y = 40;
    doc.setFontSize(13);
    doc.text("2) Dépenses", marginLeft, y);
    y += 18;
    doc.setFontSize(10);
    doc.text("Date", marginLeft, y);
    doc.text("Libellé", marginLeft + 80, y);
    doc.text("Catégorie", marginLeft + 280, y);
    doc.text("Montant", marginLeft + 420, y);
    y += 8;
    flux.sorties.forEach((s) => {
      if (y > 750) { doc.addPage(); y = 40; }
      y += 18;
      doc.text(s.date || "-", marginLeft, y);
      doc.text(String(s.libelle || "-"), marginLeft + 80, y);
      doc.text(String(s.categorie || "-"), marginLeft + 280, y);
      doc.text(String(s.montant || "-"), marginLeft + 420, y);
    });
    doc.save("rapport_flux_financiers.pdf");
  };

  // Print / export receipt for selectedPayment
  const handlePrintReceipt = async () => {
    if (!selectedPayment) return;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("École - Reçu de Paiement", 20, 30);
    doc.setFontSize(12);
    doc.text(`Nom : ${selectedPayment.name}`, 20, 55);
    doc.text(`Matricule : ${selectedPayment.matricule || "-"}`, 20, 70);
    doc.text(`Classe : ${selectedPayment.classe || "-"}`, 20, 85);
    doc.text(`Type : ${selectedPayment.type}`, 20, 100);
    doc.text(`Montant : ${selectedPayment.montant} USD`, 20, 115);
    doc.text(`Date : ${selectedPayment.date}`, 20, 130);
    try {
      const qrSvg = document.getElementById("receipt-qr");
      if (qrSvg && qrSvg.outerHTML) {
        const svgString = qrSvg.outerHTML;
        const img = new Image();
        const svg64 = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
        await new Promise((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = svg64;
        });
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        try { ctx.drawImage(document.querySelector("#receipt-qr"), 0, 0, 200, 200); } catch {}
        try { ctx.drawImage(img, 0, 0, 200, 200); } catch {}
        try { const dataURL = canvas.toDataURL("image/png"); doc.addImage(dataURL, "PNG", 350, 40, 200, 200); } catch {}
      }
    } catch {}
    doc.setFontSize(10);
    doc.text("Signature : ______________________", 20, 180);
    doc.save(`Recu_${selectedPayment.id || "0"}.pdf`);
  };

  // UI
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1A2F6B]">Tableau Financier</h1>
        <div className="flex gap-3">
          <button onClick={() => setShowPaymentModal(true)} className="bg-[#233e87] hover:bg-[#1A2F6B] text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer">
            <FaPlus /> Nouveau paiement
          </button>
          <button onClick={() => setShowExpenseModal(true)} className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700 cursor-pointer">
            <FaPlus /> Nouvelle dépense
          </button>
          <button onClick={exportExcelBoth} className="bg-green-600 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-green-700 cursor-pointer">
            <RiFileExcel2Line /> Excel
          </button>
          <button onClick={exportPdfBoth} className="bg-[#ed0010] hover:bg-red-700 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-black cursor-pointer">
            <BsFillFileEarmarkPdfFill /> PDF
          </button>

          <button className="bg-[#233e87] hover:bg-[#1A2F6B] px-3 py-2 rounded shadow flex items-center gap-2 transition cursor-pointer">
            <GiArtificialHive className="text-white" size={24} />
            <span className="text-sm font-medium text-white">Conseil AI</span>
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Scolarité" value={formatCurrency(revenusRecus)} icon={<PiStudent />} />
        <StatCard title="Scolarité Impayé" value={formatCurrency(revenusImpayes)} icon={<PiChalkboardTeacherFill />} />
        <StatCard title="Total Entrées" value={formatCurrency(totalEntrees)} icon={<GrMoney />} />
        <StatCard title="Gain Net" value={formatCurrency(gainNet)} icon={<AiOutlineSchedule />} />
      </div>

      {/* Charts */}
      <div className="flex gap-8">
        <div className="bg-white p-4 rounded-2xl shadow w-[70%]">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Évolution mensuelle (Entrées vs Sorties)</h3>
            <select
              className="border rounded px-2 py-1"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              <option value="all">Tous les mois</option>
              {series.map((s) => (
                <option key={s.month} value={s.month}>
                  {s.month}
                </option>
              ))}
            </select>
          </div>
          <VictoryChart
            theme={VictoryTheme.material}
            height={250}
            width={450}
            domainPadding={{ x: 30, y: 5 }}
            padding={{ top: 10, bottom: 40, left: 75, right: 25 }}
          >
            <VictoryLegend
              x={100}
              y={10}
              orientation="horizontal"
              gutter={20}
              data={[
                { name: "Entrées", symbol: { fill: "#1A2F6B" } },
                { name: "Sorties", symbol: { fill: "#00C4D9" } },
              ]}
            />
            <VictoryAxis label="" style={{ axisLabel: { padding: 30 } }} />
            <VictoryAxis
              dependentAxis
              label="Montant (USD)"
              style={{ axisLabel: { padding: 60 } }}
            />
            <VictoryLine
              data={filteredSeries.map((s) => ({ x: s.month, y: s.entrees }))}
              interpolation="monotoneX"
              style={{ data: { stroke: "#1A2F6B", strokeWidth: 3 } }}
              labels={({ datum }) => `${datum.y} USD`}
              labelComponent={<VictoryTooltip />}
            />
            <VictoryLine
              data={filteredSeries.map((s) => ({ x: s.month, y: s.sorties }))}
              interpolation="monotoneX"
              style={{ data: { stroke: "#00C4D9", strokeWidth: 3 } }}
              labels={({ datum }) => `${datum.y} USD`}
              labelComponent={<VictoryTooltip />}
            />
          </VictoryChart>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow w-[30%]">
          <h3 className="font-semibold mb-2">Répartition des dépenses</h3>
          <VictoryPie
            data={expenseByCategory}
            x="x"
            y="y"
            colorScale={COLORS}
            innerRadius={50}
            labels={({ datum }) => `${datum.x}: ${datum.y} USD`}
            labelComponent={<VictoryTooltip />}
          />
        </div>
      </div>

      {/* Tableaux Paiements */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h3 className="font-semibold mb-2">Paiements</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Nom</th>
                <th className="px-4 py-2 border">Matricule</th>
                <th className="px-4 py-2 border">Classe</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Montant</th>
                <th className="px-4 py-2 border">Statut</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 border">{p.name}</td>
                  <td className="px-4 py-2 border">{p.matricule}</td>
                  <td className="px-4 py-2 border">{p.classe}</td>
                  <td className="px-4 py-2 border">{p.type}</td>
                  <td className="px-4 py-2 border">{p.montant}</td>
                  <td className="px-4 py-2 border">{p.statut}</td>
                  <td className="px-4 py-2 border">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tableaux Dépenses */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h3 className="font-semibold mb-2">Dépenses</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Libellé</th>
                <th className="px-4 py-2 border">Catégorie</th>
                <th className="px-4 py-2 border">Montant</th>
                <th className="px-4 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {flux.sorties.map(s => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 border">{s.libelle}</td>
                  <td className="px-4 py-2 border">{s.categorie}</td>
                  <td className="px-4 py-2 border">{s.montant}</td>
                  <td className="px-4 py-2 border">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modales */}
      {showPaymentModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-2xl shadow w-96">
            <h3 className="font-semibold text-lg mb-4">Nouveau Paiement</h3>
            <div className="flex flex-col gap-2">
              <input className="border px-2 py-1 rounded" placeholder="Nom" value={newPayment.name} onChange={e => setNewPayment({...newPayment, name: e.target.value})} />
              <input className="border px-2 py-1 rounded" placeholder="Matricule" value={newPayment.matricule} onChange={e => setNewPayment({...newPayment, matricule: e.target.value})} />
              <input className="border px-2 py-1 rounded" placeholder="Classe" value={newPayment.classe} onChange={e => setNewPayment({...newPayment, classe: e.target.value})} />
              <select className="border px-2 py-1 rounded" value={newPayment.type} onChange={e => setNewPayment({...newPayment, type: e.target.value})}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="number" className="border px-2 py-1 rounded" placeholder="Montant" value={newPayment.montant} onChange={e => setNewPayment({...newPayment, montant: e.target.value})} />
              <input type="date" className="border px-2 py-1 rounded" value={newPayment.date} onChange={e => setNewPayment({...newPayment, date: e.target.value})} />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowPaymentModal(false)}>Annuler</button>
              <button className="px-4 py-2 rounded bg-[#233e87] text-white" onClick={handleAddPayment}>Ajouter</button>
            </div>
          </div>
        </div>
      )}

      {showExpenseModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-2xl shadow w-96">
            <h3 className="font-semibold text-lg mb-4">Nouvelle Dépense</h3>
            <div className="flex flex-col gap-2">
              <input className="border px-2 py-1 rounded" placeholder="Libellé" value={newExpense.libelle} onChange={e => setNewExpense({...newExpense, libelle: e.target.value})} />
              <select className="border px-2 py-1 rounded" value={newExpense.categorie} onChange={e => setNewExpense({...newExpense, categorie: e.target.value})}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="number" className="border px-2 py-1 rounded" placeholder="Montant" value={newExpense.montant} onChange={e => setNewExpense({...newExpense, montant: e.target.value})} />
              <input type="date" className="border px-2 py-1 rounded" value={newExpense.date} onChange={e => setNewExpense({...newExpense, date: e.target.value})} />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowExpenseModal(false)}>Annuler</button>
              <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={handleAddExpense}>Ajouter</button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt */}
      {showReceipt && selectedPayment && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-2xl shadow w-96 flex flex-col items-center gap-4">
            <h3 className="font-semibold text-lg mb-2">Reçu de Paiement</h3>
            <QRCodeSVG id="receipt-qr" value={`Paiement-${selectedPayment.id}`} size={128} />
            <button className="px-4 py-2 rounded bg-[#233e87] text-white" onClick={handlePrintReceipt}>Imprimer</button>
            <button className="px-4 py-2 rounded bg-gray-200" onClick={() => setShowReceipt(false)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}
