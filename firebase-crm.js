// ============================================================
//  Alphas CRM — Cloud Integration Layer
//  Firebase Firestore + EmailJS
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, setDoc, doc, deleteDoc, getDocs, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDO3o9HVBEdrwaz2ByTvveNzuclF0DrgmU",
    authDomain: "alphas-crm.firebaseapp.com",
    projectId: "alphas-crm",
    storageBucket: "alphas-crm.firebasestorage.app",
    messagingSenderId: "193528333253",
    appId: "1:193528333253:web:5b48cce98545ce3ff541ac"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

const EMAILJS_SERVICE_ID  = "service_dz397n6";
const EMAILJS_TEMPLATE_ID = "template_a874ju6";
const EMAILJS_PUBLIC_KEY  = "ipL5F66kuu0jUAOL0";

async function saveLeadToCloud(lead, source) {
    try {
        const leadId = lead.id || ("lead_" + Date.now());
        const record = {
            name: lead.name || "Unknown Lead",
            email: lead.email || "—",
            phone: lead.phone || "—",
            budget: Number(lead.budget) || 0,
            services: lead.services || lead.service_type || "General Inquiry",
            status: lead.status || "new",
            notes: lead.notes || lead.message || "",
            source: source || lead.source || "Website Form",
            createdAt: lead.createdAt || new Date().toISOString()
        };
        await setDoc(doc(db, "leads", leadId), record, { merge: true });
        console.log("[Alphas CRM] Lead saved to Firestore:", leadId);
    } catch (err) {
        console.error("[Alphas CRM] Firestore save error:", err);
    }

    if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY) {
        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                company_name: lead.name    || "Unknown",
                client_email: lead.email   || "—",
                service_type: lead.services || lead.service_type || "—",
                budget:       lead.budget ? "EGP " + Number(lead.budget).toLocaleString() : "—",
                message:      lead.notes   || lead.message || "—",
                source_page:  source || lead.source || "Website Form",
                submitted_at: new Date().toLocaleString("en-EG", { timeZone: "Africa/Cairo" })
            }, EMAILJS_PUBLIC_KEY);
            console.log("[Alphas CRM] Email sent");
        } catch (err) {
            console.error("[Alphas CRM] EmailJS error:", err);
        }
    }
}

async function deleteLeadFromCloud(leadId) {
    try {
        await deleteDoc(doc(db, "leads", leadId));
        console.log("[Alphas CRM] Lead deleted from Firestore:", leadId);
    } catch (err) {
        console.error("[Alphas CRM] Firestore delete error:", err);
    }
}

async function fetchLeadsFromCloud() {
    try {
        const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
        console.error("[Alphas CRM] Firestore fetch error:", err);
        return [];
    }
}

function subscribeToLeads(callback) {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const leads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(leads);
    }, (err) => {
        console.error("[Alphas CRM] onSnapshot error:", err);
    });
}

// Global attachment for non-ESM script environments
if (typeof window !== "undefined") {
    window.AlphasCRM = {
        saveLeadToCloud,
        deleteLeadFromCloud,
        fetchLeadsFromCloud,
        subscribeToLeads,
        db
    };
}

export { saveLeadToCloud, deleteLeadFromCloud, fetchLeadsFromCloud, subscribeToLeads };

