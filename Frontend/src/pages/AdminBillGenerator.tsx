import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
// @ts-ignore - html2pdf.js has no bundled types
import html2pdf from "html2pdf.js";

/**
 * AdminBillGenerator
 * ------------------
 * Fully client-side invoice/bill generator. No backend, no API calls.
 * - Admin selects occasions (Pre-Wedding / Haldi / Wedding / Reception / Mehendi / Birthday / Thread Ceremony)
 * - Fills client + payment details
 * - Uploads business logo + a static QR code image (both stay in-browser as base64)
 * - Live preview renders in the exact invoice layout
 * - "Download PDF" converts the preview div straight to PDF via html2pdf.js
 *
 * Install once:
 *   npm install html2pdf.js
 */

type OccasionKey =
  | "PRE-WEDDING"
  | "HALDI"
  | "WEDDING"
  | "RECEPTION"
  | "MEHENDI"
  | "BIRTHDAY"
  | "THREAD CEREMONY";

type OccasionItem = {
  description: string;
  date: string;
  time: string;
  rate: number;
  qty: number;
};

const OCCASION_DEFAULTS: Record<OccasionKey, string> = {
  "PRE-WEDDING": "CINEMATOGRAPHY, CANDID, DRONE",
  HALDI: "STILL CAMERA, TRADITIONAL VIDEO CAMERA",
  WEDDING: "STILL CAMERA, CINEMATOGRAPHY, CANDID, DRONE",
  RECEPTION: "STILL CAMERA, TRADITIONAL VIDEO CAMERA",
  MEHENDI: "STILL CAMERA, CANDID",
  BIRTHDAY: "STILL CAMERA, CANDID",
  "THREAD CEREMONY": "STILL CAMERA, TRADITIONAL VIDEO CAMERA",
};

const STUDIO = {
  name: "RP OPULENCE PHOTOGRAPHY",
  address: "AT/PO - BERHAMPUR, LANJIPALI JAIL STREET",
  phone: "7735284645",
  email: "rpphotography800@gmail.com",
  bankName: "Axis Bank",
  accountNumber: "922010021281558",
  ifsc: "UTIB0001288",
  accountHolder: "RUDRA PRASAD SWAIN",
  upiId: "7735284645@axl",
};

const emptyItem = (name: OccasionKey): OccasionItem => ({
  description: OCCASION_DEFAULTS[name],
  date: "",
  time: "",
  rate: 0,
  qty: 1,
});

const currency = (n: number | string) =>
  `Rs. ${Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

const AdminBillGenerator = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const [invoice, setInvoice] = useState({
    invoiceNumber: "RPOP-2026-0003",
    invoiceDate: new Date().toISOString().slice(0, 10),
    status: "DRAFT",
  });

  const [client, setClient] = useState({ name: "", mobile: "", location: "" });
  const [advancePaid, setAdvancePaid] = useState<number | string>(0);
  const [paymentNotes, setPaymentNotes] = useState("CASH / ONLINE");
  const [remarks, setRemarks] = useState("");

  const [selectedOccasions, setSelectedOccasions] = useState<OccasionKey[]>([]);
  const [items, setItems] = useState<Partial<Record<OccasionKey, OccasionItem>>>({});

  const toggleOccasion = (name: OccasionKey) => {
    setSelectedOccasions((prev) => {
      const isSelected = prev.includes(name);
      const next = isSelected ? prev.filter((o) => o !== name) : [...prev, name];
      setItems((prevItems) => {
        const updated = { ...prevItems };
        if (isSelected) delete updated[name];
        else updated[name] = emptyItem(name);
        return updated;
      });
      return next;
    });
  };

  const updateItem = (name: OccasionKey, field: keyof OccasionItem, value: string | number) => {
    setItems((prev) => ({
      ...prev,
      [name]: { ...(prev[name] as OccasionItem), [field]: value },
    }));
  };

  const itemsTotal = selectedOccasions.reduce((sum, name) => {
    const it = items[name];
    return sum + (Number(it?.rate) || 0) * (Number(it?.qty) || 1);
  }, 0);

  const subtotal = itemsTotal;
  const balanceDue = subtotal - Number(advancePaid || 0);

  const handleDownload = () => {
    if (!previewRef.current) return;
    setDownloading(true);
    const opt = {
      margin: 0,
      filename: `invoice-${invoice.invoiceNumber || "draft"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };
    html2pdf()
      .set(opt)
      .from(previewRef.current)
      .save()
      .finally(() => setDownloading(false));
  };

  const inputClass =
    "w-full bg-transparent border border-gold-muted px-4 py-2.5 text-sm font-body focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/60";
  const labelClass = "text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-8">
      {/* ── FORM PANEL ── */}
      <div className="bg-card border border-gold-muted/50 p-6 md:p-8 h-fit">
        <h3 className="font-heading text-lg mb-1">Bill Generator</h3>
        <p className="text-[11px] text-muted-foreground mb-6">Create and download a client invoice</p>

        {/* Invoice meta */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className={labelClass}>Invoice Number</label>
            <input
              className={inputClass}
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Invoice Date</label>
              <input
                type="date"
                className={inputClass}
                value={invoice.invoiceDate}
                onChange={(e) => setInvoice({ ...invoice, invoiceDate: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                className={inputClass}
                value={invoice.status}
                onChange={(e) => setInvoice({ ...invoice, status: e.target.value })}
              >
                <option>DRAFT</option>
                <option>SENT</option>
                <option>PAID</option>
              </select>
            </div>
          </div>
        </div>

        {/* Client details */}
        <h4 className="text-xs uppercase tracking-[0.2em] text-gold-dark mb-3">Client Details</h4>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className={labelClass}>Client Name</label>
            <input
              className={inputClass}
              value={client.name}
              onChange={(e) => setClient({ ...client, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Mobile</label>
              <input
                className={inputClass}
                value={client.mobile}
                onChange={(e) => setClient({ ...client, mobile: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input
                className={inputClass}
                value={client.location}
                onChange={(e) => setClient({ ...client, location: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Occasions */}
        <h4 className="text-xs uppercase tracking-[0.2em] text-gold-dark mb-3">Occasions</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.keys(OCCASION_DEFAULTS) as OccasionKey[]).map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => toggleOccasion(name)}
              className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest border transition-colors ${
                selectedOccasions.includes(name)
                  ? "bg-gradient-to-r from-gold-dark to-gold text-white border-gold"
                  : "border-gold-muted text-muted-foreground hover:text-gold-dark"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {selectedOccasions.map((name) => {
          const it = items[name] as OccasionItem;
          return (
            <div key={name} className="border border-gold-muted/50 rounded-sm p-4 mb-3 bg-background">
              <p className="text-xs font-medium mb-3">{name}</p>
              <div className="mb-3">
                <label className={labelClass}>Description</label>
                <input
                  className={inputClass}
                  value={it.description}
                  onChange={(e) => updateItem(name, "description", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Date</label>
                  <input
                    type="date"
                    className={inputClass}
                    value={it.date}
                    onChange={(e) => updateItem(name, "date", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Time</label>
                  <input
                    className={inputClass}
                    placeholder="10:30 AM - 02:30 AM"
                    value={it.time}
                    onChange={(e) => updateItem(name, "time", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Rate</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={it.rate}
                    onChange={(e) => updateItem(name, "rate", Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Payment */}
        <h4 className="text-xs uppercase tracking-[0.2em] text-gold-dark mb-3 mt-4">Payment</h4>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className={labelClass}>Advance Paid (Rs.)</label>
            <input
              type="number"
              className={inputClass}
              value={advancePaid}
              onChange={(e) => setAdvancePaid(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Payment Notes</label>
            <input
              className={inputClass}
              value={paymentNotes}
              onChange={(e) => setPaymentNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Remarks */}
        <h4 className="text-xs uppercase tracking-[0.2em] text-gold-dark mb-3 mt-4">Remarks</h4>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className={labelClass}>Admin Remarks (optional)</label>
            <textarea
              className={inputClass}
              rows={3}
              placeholder="Type any custom remark here..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="w-full px-6 py-3 bg-gradient-to-r from-gold-dark to-gold text-white text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          <Download size={14} /> {downloading ? "Generating PDF…" : "Download PDF"}
        </button>
      </div>

      {/* ── LIVE PREVIEW (exported to PDF exactly as rendered) ── */}
      <div className="flex justify-center overflow-x-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          ref={previewRef}
          style={{ width: 794, fontFamily: "'Segoe UI', Arial, sans-serif", fontSize: 12, color: "#222" }}
          className="bg-white p-10 shadow-md"
        >
          <div style={{ borderBottom: "1px solid #eee", paddingBottom: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#B8863B" }}>{STUDIO.name}</div>
              <div style={{ fontSize: 11, color: "#666" }}>{STUDIO.address}</div>
              <div style={{ fontSize: 11, color: "#666" }}>Phone: {STUDIO.phone}</div>
              <div style={{ fontSize: 11, color: "#666" }}>Email: {STUDIO.email}</div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "Georgia, serif" }}>Invoice</div>
            <div style={{ color: "#777", marginTop: 4 }}>#{invoice.invoiceNumber}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: 20, marginBottom: 20 }}>
            <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 14, flex: 1 }}>
              <div style={{ color: "#B8863B", fontWeight: 700, marginBottom: 6 }}>BILL TO:</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{client.name || "—"}</div>
              <div>Mobile: {client.mobile || "—"}</div>
              <div>Event: {selectedOccasions.length ? selectedOccasions.join(" / ") : "—"}</div>
              <div>Location: {client.location || "—"}</div>
            </div>
            <div style={{ fontSize: 12, paddingTop: 6, minWidth: 160 }}>
              <div><b>Invoice Date:</b> {invoice.invoiceDate}</div>
              <div><b>Status:</b> <span style={{ color: "#B8863B", fontWeight: 700 }}>{invoice.status}</span></div>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #B8863B" }}>
                {["ITEM/EVENT", "DESCRIPTION", "DATE", "TIME", "RATE", "QTY", "AMOUNT"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 6px", fontSize: 11, color: "#555" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedOccasions.map((name) => {
                const it = items[name] as OccasionItem;
                const amount = (Number(it.rate) || 0) * (Number(it.qty) || 1);
                return (
                  <tr key={name} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "8px 6px", fontWeight: 700, fontSize: 11 }}>{name}</td>
                    <td style={{ padding: "8px 6px", fontSize: 11 }}>{it.description}</td>
                    <td style={{ padding: "8px 6px", fontSize: 11 }}>{it.date || "-"}</td>
                    <td style={{ padding: "8px 6px", fontSize: 11 }}>{it.time || "- - -"}</td>
                    <td style={{ padding: "8px 6px", fontSize: 11 }}>{currency(it.rate)}</td>
                    <td style={{ padding: "8px 6px", fontSize: 11 }}>{it.qty}</td>
                    <td style={{ padding: "8px 6px", fontWeight: 700, fontSize: 11 }}>{currency(amount)}</td>
                  </tr>
                );
              })}
              <tr style={{ borderTop: "2px solid #B8863B" }}>
                <td colSpan={6} style={{ padding: "10px 6px", fontWeight: 700, fontSize: 12, textAlign: "right" }}>
                  Sum Total
                </td>
                <td style={{ padding: "10px 6px", fontWeight: 700, fontSize: 12 }}>{currency(itemsTotal)}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: "flex", gap: 20, marginTop: 10 }}>
            <div style={{ flex: 1, border: "1px solid #eee", borderRadius: 8, padding: 14, fontSize: 11 }}>
              <div style={{ color: "#B8863B", fontWeight: 700, marginBottom: 6, fontSize: 12 }}>Payment Information</div>
              <div><b>Bank Name:</b> {STUDIO.bankName}</div>
              <div><b>Account Number:</b> {STUDIO.accountNumber}</div>
              <div><b>IFSC Code:</b> {STUDIO.ifsc}</div>
              <div><b>Account Holder:</b> {STUDIO.accountHolder}</div>
              <div style={{ marginTop: 8 }}><b>UPI ID:</b> {STUDIO.upiId}</div>
              <div style={{ marginTop: 8 }}><b>Notes:</b> {paymentNotes}</div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span>Subtotal:</span><span>{currency(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 700 }}>
                <span>TOTAL AMOUNT:</span><span>{currency(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span>Advance Paid:</span><span>- {currency(advancePaid)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", background: "#B8863B", color: "#fff", padding: "10px 12px", borderRadius: 6, fontWeight: 700, marginTop: 6 }}>
                <span>BALANCE DUE:</span><span>{currency(balanceDue)}</span>
              </div>
            </div>
          </div>

          {remarks && (
            <div style={{ marginTop: 20, border: "1px solid #eee", borderRadius: 8, padding: 14, background: "#FCFCFC" }}>
              <div style={{ color: "#B8863B", fontWeight: 700, marginBottom: 6, fontSize: 12 }}>Remarks</div>
              <p style={{ fontSize: 11, lineHeight: 1.5, color: "#444", margin: 0, whiteSpace: "pre-wrap" }}>
                {remarks}
              </p>
            </div>
          )}

          <div
            style={{
              pageBreakBefore: "always",
              breakBefore: "page",
              paddingTop: 20,
            }}
          >
            <div style={{ color: "#B8863B", fontWeight: 700, marginBottom: 10, fontSize: 13 }}>TERMS & CONDITIONS</div>
            <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, marginBottom: 10, background: "#FCFCFC" }}>
              <div style={{ color: "#B8863B", fontWeight: 700, marginBottom: 6, fontSize: 12 }}>Contract Terms</div>
              <p style={{ fontSize: 10.5, lineHeight: 1.5, color: "#444", margin: 0 }}>
                1. A minimum 40% advance payment is required to confirm the booking. 2. The advance
                payment is non-refundable and non-transferable. 3. The remaining balance must be
                paid on the event day or before delivery of final photos/videos. 4. Raw photos, raw
                videos, and unedited files will be provided only after clearance of all dues. 5. Professionally edited
                photos and videos will be delivered. 6. Delivery Timeline: Photos 30–60 working
                days, Videos 30–60 working days. 7. Final deliverables handed over only after full
                payment is received. 8. Project data securely stored for 90 days post-delivery. 9.
                Album design revisions limited to two rounds. 10.Extra Album Sheets will be charged as per standard rates(i.e-500 per sheet). 11. All disputes subject to Berhampur,
                Odisha jurisdiction. 
              </p>
            </div>
            <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, marginBottom: 10, background: "#FCFCFC" }}>
              <div style={{ color: "#B8863B", fontWeight: 700, marginBottom: 6, fontSize: 12 }}>Copyright</div>
              <p style={{ fontSize: 10.5, lineHeight: 1.5, color: "#444", margin: 0 }}>
                All photographs, videos, and creative content remain the exclusive intellectual
                property of {STUDIO.name} unless otherwise agreed in writing. The studio reserves
                the right to use selected media for portfolio and promotional purposes unless the
                client requests otherwise in writing before the event. Commercial use requires
                prior written permission.
              </p>
            </div>
            <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 12, background: "#FCFCFC" }}>
              <div style={{ color: "#B8863B", fontWeight: 700, marginBottom: 6, fontSize: 12 }}>Cancellation Policy</div>
              <p style={{ fontSize: 10.5, lineHeight: 1.5, color: "#444", margin: 0 }}>
                If cancelled by the client, the advance payment is strictly non-refundable.
                Rescheduling is subject to studio availability. The studio is not liable for delays
                due to circumstances beyond its control. Drone coverage is subject to weather,
                aviation regulations, and venue permissions.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 60 }}>
            <div style={{ textAlign: "center", width: 220 }}>
              <div style={{ borderTop: "1px solid #333", paddingTop: 6, fontSize: 11, fontWeight: 600 }}>
                Customer Signature
              </div>
            </div>
            <div style={{ textAlign: "center", width: 220 }}>
              <div style={{ borderTop: "1px solid #333", paddingTop: 6, fontSize: 11, fontWeight: 600 }}>
                Authorised Signature
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", color: "#888", fontSize: 11, marginTop: 24 }}>
            Thank you for your business!
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminBillGenerator;