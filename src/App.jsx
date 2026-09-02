import React, { useState, useEffect, useMemo, useCallback } from "react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

.khata-root {
  --paper: #EDE6D6;
  --card: #F8F3E8;
  --ink: #2A2118;
  --ink-soft: #6B6152;
  --rule: #C7B99C;
  --tractor: #A3352A;
  --tractor-dark: #7A2620;
  --jcb: #D9A227;
  --jcb-dark: #8A6512;
  --green: #4B6B3A;
  --green-dark: #35491F;
  font-family: 'Inter', sans-serif;
  background: var(--paper);
  color: var(--ink);
  min-height: 100vh;
  padding: 0;
  border-radius: 0;
  overflow: hidden;
  border: none;
}
.khata-root * { box-sizing: border-box; }
.khata-head {
  font-family: 'Zilla Slab', serif;
  font-weight: 700;
  padding: 18px 18px 14px;
  border-bottom: 2px solid var(--ink);
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.khata-head h1 { font-size: 21px; margin: 0; letter-spacing: 0.2px; }
.khata-head .stamp {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 11px;
  color: var(--ink-soft);
  border: 1px solid var(--rule);
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--card);
}
.khata-body { padding: 16px; padding-bottom: 40px; }
.khata-search {
  width: 100%;
  padding: 11px 12px;
  border: 1.5px solid var(--rule);
  border-radius: 8px;
  background: var(--card);
  color: var(--ink);
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  margin-bottom: 14px;
}
.khata-search:focus { outline: none; border-color: var(--ink); }
.khata-hero {
  background: var(--ink);
  color: var(--paper);
  border-radius: 10px;
  padding: 16px 18px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.khata-hero .label { font-size: 12px; opacity: 0.75; font-weight: 500; }
.khata-hero .amt { font-family: 'Zilla Slab', serif; font-weight: 700; font-size: 26px; font-variant-numeric: tabular-nums; }
.khata-addbtn {
  width: 100%;
  padding: 12px;
  border: 1.5px dashed var(--ink-soft);
  border-radius: 8px;
  background: transparent;
  color: var(--ink);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 16px;
  cursor: pointer;
}
.khata-addbtn:active { transform: scale(0.99); }
.khata-list { display: flex; flex-direction: column; }
.khata-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 4px;
  border-bottom: 1px solid var(--rule);
  cursor: pointer;
  background: transparent;
}
.khata-row:last-child { border-bottom: none; }
.khata-row .who { display: flex; flex-direction: column; gap: 2px; }
.khata-row .who .name { font-weight: 600; font-size: 15px; }
.khata-row .who .meta { font-size: 12px; color: var(--ink-soft); }
.khata-row .bal { font-family: 'Zilla Slab', serif; font-weight: 700; font-size: 17px; font-variant-numeric: tabular-nums; }
.khata-empty { text-align: center; padding: 30px 10px; color: var(--ink-soft); font-size: 14px; }

.khata-backbar { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.khata-backbtn {
  border: 1.5px solid var(--rule); background: var(--card); border-radius: 8px;
  padding: 7px 10px; font-size: 14px; color: var(--ink); cursor: pointer; font-family: 'Inter', sans-serif;
}
.khata-cname { font-family: 'Zilla Slab', serif; font-weight: 700; font-size: 19px; flex: 1; }
.khata-delbtn { border: none; background: transparent; color: var(--tractor-dark); font-size: 13px; cursor: pointer; font-family: 'Inter', sans-serif; text-decoration: underline; }

.khata-balcard {
  border-radius: 10px; padding: 14px 18px; margin-bottom: 16px;
  display: flex; justify-content: space-between; align-items: center;
}
.khata-tabs { display: flex; gap: 8px; margin-bottom: 14px; }
.khata-tab {
  flex: 1; padding: 10px; text-align: center; border-radius: 8px;
  font-family: 'Inter', sans-serif; font-weight: 700; font-size: 13.5px; cursor: pointer;
  border: 1.5px solid var(--rule); background: var(--card); color: var(--ink-soft);
}
.khata-tab.active.tractor { background: var(--tractor); border-color: var(--tractor-dark); color: #FBEDEA; }
.khata-tab.active.jcb { background: var(--jcb); border-color: var(--jcb-dark); color: #2A2118; }

.khata-form { background: var(--card); border: 1.5px solid var(--rule); border-radius: 10px; padding: 14px; margin-bottom: 16px; }
.khata-form .frow { display: flex; gap: 10px; margin-bottom: 10px; }
.khata-form .fld { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.khata-form label { font-size: 11.5px; font-weight: 600; color: var(--ink-soft); }
.khata-form input {
  padding: 9px 10px; border: 1.5px solid var(--rule); border-radius: 7px; background: #fff;
  font-size: 15px; font-family: 'Inter', sans-serif; color: var(--ink); font-variant-numeric: tabular-nums;
  width: 100%;
}
.khata-form input:focus { outline: none; border-color: var(--ink); }
.khata-calc { text-align: right; font-family: 'Zilla Slab', serif; font-weight: 700; font-size: 20px; margin: 6px 0 12px; }
.khata-calc .sub { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 12px; color: var(--ink-soft); display: block; }
.khata-savebtn {
  width: 100%; padding: 11px; border: none; border-radius: 8px; font-weight: 700; font-size: 14.5px;
  cursor: pointer; font-family: 'Inter', sans-serif;
}
.khata-savebtn.tractor { background: var(--tractor); color: #FBEDEA; }
.khata-savebtn.jcb { background: var(--jcb); color: #2A2118; }
.khata-savebtn.pay { background: var(--green); color: #ECF3E4; }

.khata-entries { display: flex; flex-direction: column; gap: 0; margin-bottom: 6px; }
.khata-entry {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 4px; border-bottom: 1px solid var(--rule); font-size: 13.5px;
}
.khata-entry .l .d { font-weight: 600; }
.khata-entry .l .s { color: var(--ink-soft); font-size: 12px; }
.khata-entry .r { display: flex; align-items: center; gap: 8px; }
.khata-entry .r .amt { font-family: 'Zilla Slab', serif; font-weight: 700; font-variant-numeric: tabular-nums; }
.khata-entry .r button { border: none; background: none; color: var(--tractor-dark); font-size: 12px; cursor: pointer; }
.khata-payentry .r .amt { color: var(--green-dark); }
.khata-sectionlabel { font-size: 11.5px; font-weight: 700; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.5px; margin: 18px 0 6px; }
.khata-payrow { display: flex; gap: 8px; }
.khata-payrow input { flex: 1; }

.khata-footer {
  text-align: center;
  padding: 20px 16px 24px;
  border-top: 1px solid var(--rule);
  margin-top: 20px;
  font-size: 12px;
  color: var(--ink-soft);
  line-height: 1.5;
}
.khata-footer strong {
  color: var(--ink);
  font-weight: 600;
}
`;

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function formatINR(n) {
  const v = Math.round(n || 0);
  return "₹" + v.toLocaleString("en-IN");
}

const STORAGE_KEYS = {
  customers: "digital-bahi:customers",
  tractorEntries: "digital-bahi:tractor-entries",
  jcbEntries: "digital-bahi:jcb-entries",
  payments: "digital-bahi:payments",
  settings: "digital-bahi:settings",
};

function loadKey(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
    return fallback;
  } catch (e) {
    return fallback;
  }
}

function saveKey(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("save failed", key, e);
  }
}

export default function DigitalBahi() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [tractorEntries, setTractorEntries] = useState([]);
  const [jcbEntries, setJcbEntries] = useState([]);
  const [payments, setPayments] = useState([]);
  const [settings, setSettings] = useState({ tractorRate: 1600, jcbRate: 500 });

  const [view, setView] = useState("home");
  const [activeCustomerId, setActiveCustomerId] = useState(null);
  const [search, setSearch] = useState("");
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");

  const [tab, setTab] = useState("tractor");
  const [showTractorForm, setShowTractorForm] = useState(false);
  const [showJcbForm, setShowJcbForm] = useState(false);
  const [showPayForm, setShowPayForm] = useState(false);

  const [tHours, setTHours] = useState("");
  const [tMinutes, setTMinutes] = useState("");
  const [tRate, setTRate] = useState("");
  const [jTrips, setJTrips] = useState("");
  const [jRate, setJRate] = useState("");
  const [payAmt, setPayAmt] = useState("");

  useEffect(() => {
    const c = loadKey(STORAGE_KEYS.customers, []);
    const t = loadKey(STORAGE_KEYS.tractorEntries, []);
    const j = loadKey(STORAGE_KEYS.jcbEntries, []);
    const p = loadKey(STORAGE_KEYS.payments, []);
    const s = loadKey(STORAGE_KEYS.settings, { tractorRate: 1600, jcbRate: 500 });

    setCustomers(c);
    setTractorEntries(t);
    setJcbEntries(j);
    setPayments(p);
    setSettings(s);
    setTRate(String(s.tractorRate));
    setJRate(String(s.jcbRate));
    setLoading(false);
  }, []);

  const balanceFor = useCallback(
    (customerId) => {
      const tb = tractorEntries.filter((e) => e.customerId === customerId).reduce((sum, e) => sum + e.amount, 0);
      const jb = jcbEntries.filter((e) => e.customerId === customerId).reduce((sum, e) => sum + e.amount, 0);
      const pd = payments.filter((p) => p.customerId === customerId).reduce((sum, p) => sum + p.amount, 0);
      return tb + jb - pd;
    },
    [tractorEntries, jcbEntries, payments]
  );

  const totalOutstanding = useMemo(() => {
    return customers.reduce((sum, c) => sum + Math.max(0, balanceFor(c.id)), 0);
  }, [customers, balanceFor]);

  const filteredCustomers = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = q ? customers.filter((c) => c.name.toLowerCase().includes(q)) : customers;
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [customers, search]);

  const activeCustomer = customers.find((c) => c.id === activeCustomerId);

  function addCustomer() {
    const name = newCustomerName.trim();
    if (!name) return;
    const c = { id: uid(), name };
    const next = [...customers, c];
    setCustomers(next);
    saveKey(STORAGE_KEYS.customers, next);
    setNewCustomerName("");
    setShowAddCustomer(false);
    setActiveCustomerId(c.id);
    setView("customer");
  }

  function openCustomer(id) {
    setActiveCustomerId(id);
    setView("customer");
    setTab("tractor");
    setShowTractorForm(false);
    setShowJcbForm(false);
    setShowPayForm(false);
  }

  function goHome() {
    setView("home");
    setActiveCustomerId(null);
  }

  function deleteCustomer() {
    if (!activeCustomerId) return;
    const nc = customers.filter((c) => c.id !== activeCustomerId);
    const nt = tractorEntries.filter((e) => e.customerId !== activeCustomerId);
    const nj = jcbEntries.filter((e) => e.customerId !== activeCustomerId);
    const np = payments.filter((p) => p.customerId !== activeCustomerId);
    setCustomers(nc);
    setTractorEntries(nt);
    setJcbEntries(nj);
    setPayments(np);
    saveKey(STORAGE_KEYS.customers, nc);
    saveKey(STORAGE_KEYS.tractorEntries, nt);
    saveKey(STORAGE_KEYS.jcbEntries, nj);
    saveKey(STORAGE_KEYS.payments, np);
    goHome();
  }

  const tHoursNum = parseFloat(tHours) || 0;
  const tMinutesNum = parseFloat(tMinutes) || 0;
  const tRateNum = parseFloat(tRate) || 0;
  const tAmount = (tHoursNum + tMinutesNum / 60) * tRateNum;

  function saveTractorEntry() {
    if (!activeCustomerId) return;
    if (tHoursNum === 0 && tMinutesNum === 0) return;
    if (tRateNum <= 0) return;
    const entry = {
      id: uid(),
      customerId: activeCustomerId,
      date: new Date().toISOString().slice(0, 10),
      hours: tHoursNum,
      minutes: tMinutesNum,
      rate: tRateNum,
      amount: Math.round(tAmount),
    };
    const next = [entry, ...tractorEntries];
    setTractorEntries(next);
    saveKey(STORAGE_KEYS.tractorEntries, next);
    const ns = { ...settings, tractorRate: tRateNum };
    setSettings(ns);
    saveKey(STORAGE_KEYS.settings, ns);
    setTHours("");
    setTMinutes("");
    setShowTractorForm(false);
  }

  const jTripsNum = parseFloat(jTrips) || 0;
  const jRateNum = parseFloat(jRate) || 0;
  const jAmount = jTripsNum * jRateNum;

  function saveJcbEntry() {
    if (!activeCustomerId) return;
    if (jTripsNum <= 0 || jRateNum <= 0) return;
    const entry = {
      id: uid(),
      customerId: activeCustomerId,
      date: new Date().toISOString().slice(0, 10),
      trips: jTripsNum,
      rate: jRateNum,
      amount: Math.round(jAmount),
    };
    const next = [entry, ...jcbEntries];
    setJcbEntries(next);
    saveKey(STORAGE_KEYS.jcbEntries, next);
    const ns = { ...settings, jcbRate: jRateNum };
    setSettings(ns);
    saveKey(STORAGE_KEYS.settings, ns);
    setJTrips("");
    setShowJcbForm(false);
  }

  function savePayment() {
    if (!activeCustomerId) return;
    const amt = parseFloat(payAmt) || 0;
    if (amt <= 0) return;
    const p = {
      id: uid(),
      customerId: activeCustomerId,
      date: new Date().toISOString().slice(0, 10),
      amount: Math.round(amt),
    };
    const next = [p, ...payments];
    setPayments(next);
    saveKey(STORAGE_KEYS.payments, next);
    setPayAmt("");
    setShowPayForm(false);
  }

  function deleteTractorEntry(id) {
    const next = tractorEntries.filter((e) => e.id !== id);
    setTractorEntries(next);
    saveKey(STORAGE_KEYS.tractorEntries, next);
  }
  function deleteJcbEntry(id) {
    const next = jcbEntries.filter((e) => e.id !== id);
    setJcbEntries(next);
    saveKey(STORAGE_KEYS.jcbEntries, next);
  }
  function deletePayment(id) {
    const next = payments.filter((p) => p.id !== id);
    setPayments(next);
    saveKey(STORAGE_KEYS.payments, next);
  }

  function fmtHM(h, m) {
    const parts = [];
    if (h) parts.push(`${h} ghanta`);
    if (m) parts.push(`${m} minute`);
    return parts.length ? parts.join(" ") : "0 minute";
  }

  if (loading) {
    return (
      <div className="khata-root">
        <style>{STYLES}</style>
        <div className="khata-body">
          <p style={{ textAlign: "center", padding: "40px 0", color: "#6B6152" }}>Load hudaichha...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="khata-root">
      <style>{STYLES}</style>

      <div className="khata-head">
        <h1>Digital Bahi</h1>
        <span className="stamp">Tractor · JCB Hisab</span>
      </div>

      <div className="khata-body">
        {view === "home" && (
          <>
            <input
              className="khata-search"
              placeholder="Naam le khoja..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="khata-hero">
              <div>
                <div className="label">Kul Baki (sabai bata linu parne)</div>
                <div className="amt">{formatINR(totalOutstanding)}</div>
              </div>
            </div>

            <button className="khata-addbtn" onClick={() => setShowAddCustomer((v) => !v)}>
              + Naya Grahak Thapnu
            </button>

            {showAddCustomer && (
              <div className="khata-form">
                <div className="frow">
                  <div className="fld">
                    <label>Naam</label>
                    <input
                      autoFocus
                      value={newCustomerName}
                      onChange={(e) => setNewCustomerName(e.target.value)}
                      placeholder="Example: Ram Bahadur"
                      onKeyDown={(e) => e.key === "Enter" && addCustomer()}
                    />
                  </div>
                </div>
                <button className="khata-savebtn tractor" onClick={addCustomer}>
                  Thapnu
                </button>
              </div>
            )}

            <div className="khata-list">
              {filteredCustomers.length === 0 && (
                <div className="khata-empty">Koi grahak bheteko chaina. Mathi bata naya thapnu.</div>
              )}
              {filteredCustomers.map((c) => {
                const bal = balanceFor(c.id);
                return (
                  <div key={c.id} className="khata-row" onClick={() => openCustomer(c.id)}>
                    <div className="who">
                      <span className="name">{c.name}</span>
                      <span className="meta">
                        {bal > 0 ? "Linu parne" : bal < 0 ? "Advance jama" : "Hisab clear"}
                      </span>
                    </div>
                    <span
                      className="bal"
                      style={{ color: bal > 0 ? "#A3352A" : bal < 0 ? "#4B6B3A" : "#6B6152" }}
                    >
                      {formatINR(Math.abs(bal))}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {view === "customer" && activeCustomer && (
          <>
            <div className="khata-backbar">
              <button className="khata-backbtn" onClick={goHome}>
                ← Farkinu
              </button>
              <span className="khata-cname">{activeCustomer.name}</span>
              <button className="khata-delbtn" onClick={deleteCustomer}>
                Hataunu
              </button>
            </div>

            <div
              className="khata-balcard"
              style={{
                background: balanceFor(activeCustomer.id) > 0 ? "#F3E3E0" : "#E4EBDD",
                border: `1.5px solid ${balanceFor(activeCustomer.id) > 0 ? "#A3352A" : "#4B6B3A"}`,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "#6B6152" }}>
                {balanceFor(activeCustomer.id) > 0
                  ? "Baki linu parne"
                  : balanceFor(activeCustomer.id) < 0
                  ? "Advance jama chha"
                  : "Hisab barabar"}
              </span>
              <span
                style={{
                  fontFamily: "'Zilla Slab', serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: balanceFor(activeCustomer.id) > 0 ? "#A3352A" : "#4B6B3A",
                }}
              >
                {formatINR(Math.abs(balanceFor(activeCustomer.id)))}
              </span>
            </div>

            <div className="khata-tabs">
              <div
                className={`khata-tab tractor ${tab === "tractor" ? "active tractor" : ""}`}
                onClick={() => setTab("tractor")}
              >
                Tractor
              </div>
              <div
                className={`khata-tab jcb ${tab === "jcb" ? "active jcb" : ""}`}
                onClick={() => setTab("jcb")}
              >
                JCB (Matti)
              </div>
            </div>

            {tab === "tractor" && (
              <>
                <button className="khata-addbtn" onClick={() => setShowTractorForm((v) => !v)}>
                  + Naya Tractor Kaam
                </button>
                {showTractorForm && (
                  <div className="khata-form">
                    <div className="frow">
                      <div className="fld">
                        <label>Ghanta</label>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          value={tHours}
                          onChange={(e) => setTHours(e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="fld">
                        <label>Minute</label>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          max="59"
                          value={tMinutes}
                          onChange={(e) => setTMinutes(e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="fld">
                        <label>Rate / ghanta</label>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          value={tRate}
                          onChange={(e) => setTRate(e.target.value)}
                          placeholder="1600"
                        />
                      </div>
                    </div>
                    <div className="khata-calc">
                      <span className="sub">
                        {fmtHM(tHoursNum, tMinutesNum)} @ ₹{tRateNum || 0}/ghanta
                      </span>
                      {formatINR(tAmount)}
                    </div>
                    <button className="khata-savebtn tractor" onClick={saveTractorEntry}>
                      Jama Garnu
                    </button>
                  </div>
                )}
                <div className="khata-sectionlabel">Kaam ko Hisab</div>
                <div className="khata-entries">
                  {tractorEntries.filter((e) => e.customerId === activeCustomerId).length === 0 && (
                    <div className="khata-empty">Ahile samma koi kaam lekheko chaina.</div>
                  )}
                  {tractorEntries
                    .filter((e) => e.customerId === activeCustomerId)
                    .map((e) => (
                      <div key={e.id} className="khata-entry">
                        <div className="l">
                          <div className="d">{e.date}</div>
                          <div className="s">
                            {fmtHM(e.hours, e.minutes)} @ ₹{e.rate}/ghanta
                          </div>
                        </div>
                        <div className="r">
                          <span className="amt">{formatINR(e.amount)}</span>
                          <button onClick={() => deleteTractorEntry(e.id)}>Hataunu</button>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}

            {tab === "jcb" && (
              <>
                <button className="khata-addbtn" onClick={() => setShowJcbForm((v) => !v)}>
                  + Naya Matti Entry
                </button>
                {showJcbForm && (
                  <div className="khata-form">
                    <div className="frow">
                      <div className="fld">
                        <label>Trip (gaadi)</label>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          value={jTrips}
                          onChange={(e) => setJTrips(e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div className="fld">
                        <label>Rate / trip</label>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          value={jRate}
                          onChange={(e) => setJRate(e.target.value)}
                          placeholder="500"
                        />
                      </div>
                    </div>
                    <div className="khata-calc">
                      <span className="sub">
                        {jTripsNum || 0} trip @ ₹{jRateNum || 0}/trip
                      </span>
                      {formatINR(jAmount)}
                    </div>
                    <button className="khata-savebtn jcb" onClick={saveJcbEntry}>
                      Jama Garnu
                    </button>
                  </div>
                )}
                <div className="khata-sectionlabel">Matti ko Hisab</div>
                <div className="khata-entries">
                  {jcbEntries.filter((e) => e.customerId === activeCustomerId).length === 0 && (
                    <div className="khata-empty">Ahile samma koi entry chaina.</div>
                  )}
                  {jcbEntries
                    .filter((e) => e.customerId === activeCustomerId)
                    .map((e) => (
                      <div key={e.id} className="khata-entry">
                        <div className="l">
                          <div className="d">{e.date}</div>
                          <div className="s">
                            {e.trips} trip @ ₹{e.rate}/trip
                          </div>
                        </div>
                        <div className="r">
                          <span className="amt">{formatINR(e.amount)}</span>
                          <button onClick={() => deleteJcbEntry(e.id)}>Hataunu</button>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}

            <button
              className="khata-addbtn"
              onClick={() => setShowPayForm((v) => !v)}
              style={{ marginTop: 18 }}
            >
              + Paisa Jama Bhayo
            </button>
            {showPayForm && (
              <div className="khata-form">
                <div className="khata-payrow">
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    value={payAmt}
                    onChange={(e) => setPayAmt(e.target.value)}
                    placeholder="Kati paisa milyo"
                  />
                </div>
                <div style={{ height: 10 }} />
                <button className="khata-savebtn pay" onClick={savePayment}>
                  Jama Garnu
                </button>
              </div>
            )}
            <div className="khata-sectionlabel">Jama Bhayeko Paisa</div>
            <div className="khata-entries">
              {payments.filter((p) => p.customerId === activeCustomerId).length === 0 && (
                <div className="khata-empty">Ahile samma koi payment aako chaina.</div>
              )}
              {payments
                .filter((p) => p.customerId === activeCustomerId)
                .map((p) => (
                  <div key={p.id} className="khata-entry khata-payentry">
                    <div className="l">
                      <div className="d">{p.date}</div>
                    </div>
                    <div className="r">
                      <span className="amt">+{formatINR(p.amount)}</span>
                      <button onClick={() => deletePayment(p.id)}>Hataunu</button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="khata-footer">
        <div>
          Developed by <strong>RAZAN BHANDARY</strong>
        </div>
        <div>Founder of Bhandary Tech Empire</div>
      </div>
    </div>
  );
}