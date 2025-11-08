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
    // Prepare expenses sheet from flux.sorties
    const expenses = flux.sorties.map(s => ({ libelle: s.libelle, categorie: s.categorie, montant: s.montant, date: s.date }));
    const expensesSheet = XLSX.utils.json_to_sheet(expenses);
    XLSX.utils.book_append_sheet(wb, expensesSheet, "Dépenses");
    XLSX.writeFile(wb, "flux_financiers.xlsx");
  };

  // Export PDF (simple style): payments then expenses
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

    // Totals
    doc.setFontSize(12);
    doc.text(`Totaux — Entrées: ${formatCurrency(totalEntrees)}  |  Sorties: ${formatCurrency(totalSorties)}  |  Solde: ${formatCurrency(gainNet)}`, marginLeft, y);
    y += 26;

    // Section Paiements
    doc.setFontSize(13);
    doc.text("1) Paiements", marginLeft, y);
    y += 16;
    doc.setFontSize(10);
    // header
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

    // New page for expenses
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
    // create a PDF with payment details and the QR image.
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

    // Convert SVG QR (rendered by QRCodeSVG) to image and add to PDF
    try {
      const qrSvg = document.getElementById("receipt-qr");
      if (qrSvg && qrSvg.outerHTML) {
        const svgString = qrSvg.outerHTML;
        // create image from svg string
        const img = new Image();
        const svg64 = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
        await new Promise((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // even if fails, proceed without QR
          img.src = svg64;
        });
        // draw to a canvas to get PNG dataURL
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext("2d");
        // fill white background (SVG may be transparent)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // draw image (may fail in some browsers for data-uri SVG cross-origin — best-effort)
        try { ctx.drawImage(document.querySelector("#receipt-qr"), 0, 0, 200, 200); } catch (e) {
          // fallback: draw Image we loaded from svg data
          try { ctx.drawImage(img, 0, 0, 200, 200); } catch (err) { /* ignore */ }
        }
        try {
          const dataURL = canvas.toDataURL("image/png");
          doc.addImage(dataURL, "PNG", 350, 40, 200, 200);
        } catch (e) {
          // ignore QR if can not be converted
        }
      }
    } catch (e) {
      console.warn("QR to image conversion failed:", e);
    }

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
          <h3 className="font-semibold mb-2">Évolution mensuelle (Entrées vs Sorties)</h3>
          <VictoryChart theme={VictoryTheme.material}
            height={265}
            width={450}
            domainPadding={{ x: 30, y: 5 }}
            padding={{ top: 10, bottom: 40, left: 40, right: 25 }}>
            <VictoryLegend x={100} y={10} orientation="horizontal" gutter={20}
              data={[{ name: "Entrées", symbol: { fill: "#1A2F6B" } }, { name: "Sorties", symbol: { fill: "#00C4D9" } }]} />
            <VictoryAxis label="Mois" style={{ axisLabel: { padding: 30 } }} />
            <VictoryAxis dependentAxis label="Montant (USD)" style={{ axisLabel: { padding: 40 } }} />
            <VictoryLine
              data={series.map(s => ({ x: s.month, y: s.entrees }))}
              interpolation="monotoneX"
              style={{ data: { stroke: "#1A2F6B", strokeWidth: 3 } }}
              labels={({ datum }) => `${datum.y} USD`}
              labelComponent={<VictoryTooltip />}
            />
            <VictoryLine
              data={series.map(s => ({ x: s.month, y: s.sorties }))}
              interpolation="monotoneX"
              style={{ data: { stroke: "#00C4D9", strokeWidth: 3 } }}
              labels={({ datum }) => `${datum.y} USD`}
              labelComponent={<VictoryTooltip />}
            />
          </VictoryChart>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
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

      {/* Payments table */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Paiements</h3>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1A2F6B] text-white">
                <th className="p-2 pl-4">Date</th>
                <th>Nom</th>
                <th>Matricule</th>
                <th>Classe</th>
                <th>Type</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Reçu</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{p.date}</td>
                  <td>{p.name}</td>
                  <td>{p.matricule}</td>
                  <td>{p.classe}</td>
                  <td>{p.type}</td>
                  <td>{formatCurrency(p.montant)}</td>
                  <td className={p.statut === "Payé" ? "text-green-600" : "text-red-600"}>{p.statut}</td>
                  <td>
                    {p.statut === "Payé" ? (
                      <button
                        onClick={() => { setSelectedPayment(p); setShowReceipt(true); }}
                        className="text-blue-600 underline"
                      >
                        Voir reçu
                      </button>
                    ) : <span className="text-gray-500">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expenses table */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h3 className="font-semibold mb-2">Dépenses</h3>
        <div className="overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1A2F6B] text-white">
                <th className="p-2">Date</th>
                <th>Libellé</th>
                <th>Catégorie</th>
                <th>Montant</th>
              </tr>
            </thead>
            <tbody>
              {flux.sorties.map(s => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{s.date}</td>
                  <td>{s.libelle}</td>
                  <td>{s.categorie}</td>
                  <td>{formatCurrency(s.montant)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[420px]">
            <h2 className="text-xl font-semibold mb-4">Nouveau Paiement</h2>
            <input placeholder="Nom" className="w-full border p-2 rounded mb-2" value={newPayment.name} onChange={e => setNewPayment({ ...newPayment, name: e.target.value })} />
            <input placeholder="Matricule" className="w-full border p-2 rounded mb-2" value={newPayment.matricule} onChange={e => setNewPayment({ ...newPayment, matricule: e.target.value })} />
            <input placeholder="Classe" className="w-full border p-2 rounded mb-2" value={newPayment.classe} onChange={e => setNewPayment({ ...newPayment, classe: e.target.value })} />
            <select className="w-full border p-2 rounded mb-2" value={newPayment.type} onChange={e => setNewPayment({ ...newPayment, type: e.target.value })}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input placeholder="Montant" type="number" className="w-full border p-2 rounded mb-2" value={newPayment.montant} onChange={e => setNewPayment({ ...newPayment, montant: e.target.value })} />
            <input type="date" className="w-full border p-2 rounded mb-2" value={newPayment.date} onChange={e => setNewPayment({ ...newPayment, date: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPaymentModal(false)} className="bg-gray-300 px-3 py-1 rounded">Annuler</button>
              <button onClick={handleAddPayment} className="bg-blue-600 text-white px-3 py-1 rounded">Valider</button>
            </div>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[420px]">
            <h2 className="text-xl font-semibold mb-4">Nouvelle Dépense</h2>
            <input placeholder="Libellé" className="w-full border p-2 rounded mb-2" value={newExpense.libelle} onChange={e => setNewExpense({ ...newExpense, libelle: e.target.value })} />
            <select className="w-full border p-2 rounded mb-2" value={newExpense.categorie} onChange={e => setNewExpense({ ...newExpense, categorie: e.target.value })}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input placeholder="Montant" type="number" className="w-full border p-2 rounded mb-2" value={newExpense.montant} onChange={e => setNewExpense({ ...newExpense, montant: e.target.value })} />
            <input type="date" className="w-full border p-2 rounded mb-2" value={newExpense.date} onChange={e => setNewExpense({ ...newExpense, date: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowExpenseModal(false)} className="bg-gray-300 px-3 py-1 rounded">Annuler</button>
              <button onClick={handleAddExpense} className="bg-red-600 text-white px-3 py-1 rounded">Valider</button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && selectedPayment && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[420px] relative text-center">
            <h2 className="text-xl font-semibold mb-2">Reçu de Paiement</h2>
            <p><strong>Nom :</strong> {selectedPayment.name}</p>
            <p><strong>Matricule :</strong> {selectedPayment.matricule || "-"}</p>
            <p><strong>Classe :</strong> {selectedPayment.classe || "-"}</p>
            <p><strong>Type :</strong> {selectedPayment.type}</p>
            <p><strong>Montant :</strong> {formatCurrency(selectedPayment.montant)}</p>
            <p><strong>Date :</strong> {selectedPayment.date}</p>

            <div className="flex justify-center my-3">
              {/* QR svg (we will try convert svg to image for PDF) */}
              <QRCodeSVG id="receipt-qr" value={`Recu|${selectedPayment.id}|${selectedPayment.matricule || ""}|${selectedPayment.montant}|${selectedPayment.date}`} size={120} />
            </div>

            <div className="flex justify-center gap-2 mt-3">
              <button onClick={handlePrintReceipt} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
                <FaPrint /> Imprimer / Télécharger PDF
              </button>
              <button onClick={() => { setShowReceipt(false); setSelectedPayment(null); }} className="bg-gray-300 px-4 py-2 rounded">Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
