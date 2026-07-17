// Alphas Agency OS - JavaScript Controller
// Zero Server Cost Local Database with localStorage & Ledger Computations

// 1. BUSINESS CONFIGURATIONS (From DNA Specifications)
const businessConfigs = {
    web: {
        starter: { label: "Starter Web custom build", price: 11500, cogs: 4200, execFee: 2625, execPartner: 'asy' },
        essential: { label: "Essential Web CMS Development", price: 23000, cogs: 8400, execFee: 3465, execPartner: 'asy' },
        ecommerce: { label: "Ecommerce Web (Custom Woo & Integrations)", price: 34500, cogs: 11550, execFee: 4410, execPartner: 'asy' }
    },
    mgmt: {
        bronze: { label: "Bronze Store Management", price: 5750, cogs: 3150, execFee: 2100, execPartner: 'asy' },
        silver: { label: "Silver Store Management & SEO", price: 8625, cogs: 4725, execFee: 2100, execPartner: 'asy' },
        gold: { label: "Gold Full-Service Management", price: 11500, cogs: 6300, execFee: 2625, execPartner: 'asy' }
    },
    smm: {
        kickstart: { label: "Social Media Kickstart", price: 5175, cogs: 2362.5, execFee: 892.5, execPartner: 'abanoub' },
        growth: { label: "Social Media Growth Plan", price: 8280, cogs: 2887.5, execFee: 1050, execPartner: 'abanoub' },
        domination: { label: "Social Media Domination Package", price: 11500, cogs: 4200, execFee: 1575, execPartner: 'abanoub' }
    },
    ads: {
        starter: { label: "Starter Ads Meta/Google Campaign", price: 5750, cogs: 2625, execFee: 1575, execPartner: 'abanoub' },
        essential: { label: "Essential Multi-channel Campaigns", price: 11500, cogs: 5250, execFee: 2625, execPartner: 'abanoub' },
        ecommerce: { label: "Ecommerce Full Meta/Google Merchant Sync", price: 17250, cogs: 7875, execFee: 3150, execPartner: 'abanoub' }
    },
    consulting: {
        technical: { label: "Technical & Code Architecture Consulting", price: 1725, cogs: 0, execFee: 1000, execPartner: 'asy' },
        growth: { label: "Growth & Conversion Optimization Consulting", price: 1725, cogs: 0, execFee: 1000, execPartner: 'abanoub' },
        enterprise: { label: "Enterprise Strategy & Transformation Session", price: 2300, cogs: 525, execFee: 315, execPartner: 'shared' }
    },
    academy: {
        woocommerce: { label: "Custom WooCommerce Website Training", price: 2875, cogs: 525, execFee: 315, execPartner: 'asy' },
        mediabuying: { label: "Media Buying & Server-Side Tracking Course", price: 2875, cogs: 525, execFee: 315, execPartner: 'abanoub' },
        crm: { label: "CRM & Sales Pipeline Automation Training", price: 2875, cogs: 525, execFee: 315, execPartner: 'abanoub' }
    },
    swatches: {
        cards: {
            none: { label: "", price: 0, cogs: 0, execFee: 0, execPartner: 'asy' },
            basic: { label: "Printed Business Cards (Basic 250)", price: 5750, cogs: 1575, execFee: 2625, execPartner: 'asy' },
            standard: { label: "Printed Business Cards (Standard Spot UV 500)", price: 8625, cogs: 2362.5, execFee: 3465, execPartner: 'asy' },
            premium: { label: "Printed Business Cards (Premium Spot UV & Gold Foil 1000)", price: 11500, cogs: 3150, execFee: 4410, execPartner: 'asy' }
        },
        signage: {
            none: { label: "", price: 0, cogs: 0, execFee: 0, execPartner: 'asy' },
            basic: { label: "Custom Business Signage (Basic up to 4x3 ft)", price: 5750, cogs: 1575, execFee: 2625, execPartner: 'asy' },
            standard: { label: "Custom Business Signage (Standard with Installation)", price: 8625, cogs: 2362.5, execFee: 3465, execPartner: 'asy' },
            premium: { label: "Custom Business Signage (Premium Maintenance & Support)", price: 11500, cogs: 3150, execFee: 4410, execPartner: 'asy' }
        },
        cim: {
            none: { label: "", price: 0, cogs: 0, execFee: 0, execPartner: 'asy' },
            basic: { label: "CIM Custom Bags & Uniforms (100 Sets)", price: 11500, cogs: 3150, execFee: 4410, execPartner: 'asy' },
            standard: { label: "CIM Custom Bags & Uniforms (250 Sets)", price: 23000, cogs: 6300, execFee: 8820, execPartner: 'asy' },
            premium: { label: "CIM Custom Bags & Uniforms (500 Sets)", price: 34500, cogs: 9450, execFee: 13230, execPartner: 'asy' }
        }
    }
};

// 2. SEED DATA (If Local Storage is Empty)
const seedLeads = [
    { id: "lead_1", name: "John Doe", email: "john@example.com", phone: "+20123456789", budget: 34500, services: "Ecommerce Web Development", status: "won", notes: "Negotiating standard ecommerce package. Convert to project approved.", date: "2026-07-01", source: "Upwork Gig" },
    { id: "lead_2", name: "Jane Smith", email: "jane.smith@design.co", phone: "+20987654321", budget: 15000, services: "SMM Growth Plan", status: "negotiating", notes: "Needs custom social media coverage. In discussions for pricing adjustments.", date: "2026-07-10", source: "index.html - Contact Form" },
    { id: "lead_3", name: "Robert Johnson", email: "rob@techcorp.com", phone: "+20111222333", budget: 5750, services: "Ads Campaign Starter", status: "won", notes: "Approved starter meta campaign to test conversions.", date: "2026-07-12", source: "service-media.html - Consult" },
    { id: "lead_4", name: "Emily Davis", email: "emily@startup.io", phone: "+20444555666", budget: 45000, services: "Web Engineering + Ads Setup", status: "new", notes: "Wants a full product launch bundle. Awaiting consultation call.", date: "2026-07-16", source: "index.html - Diagnostic Drawer" },
    { id: "lead_5", name: "Michael Wilson", email: "m.wilson@agency.com", phone: "+20777888999", budget: 23000, services: "Essential Web Development", status: "lost", notes: "Budget mismatch. Declined proposal.", date: "2026-06-25", source: "Direct Admin" }
];

const seedProjects = [
    {
        id: "proj_1",
        clientName: "مستشفى تكنو لايف للعيون",
        date: "2026-07-12",
        revenue: 34500,
        cogs: 11550,
        closerPartner: "abanoub",
        closerFee: 5175,
        capitalReserve: 4375,
        execPartner: "asy",
        execFee: 4410,
        netProfit: 17775,
        partnerSplit: 6665.62,
        status: "dev"
    },
    {
        id: "proj_2",
        clientName: "شركة المعادي للتطوير العقاري",
        date: "2026-07-14",
        revenue: 17250,
        cogs: 7875,
        closerPartner: "asy",
        closerFee: 2587.5,
        capitalReserve: 1696.88,
        execPartner: "abanoub",
        execFee: 3150,
        netProfit: 6787.5,
        partnerSplit: 2545.31,
        status: "audit"
    }
];

const seedInvoices = [
    { id: "INV-1001", clientName: "مستشفى تكنو لايف للعيون", amount: 34500, status: "pending", date: "2026-07-12", items: [{ label: "Ecommerce Web & Custom Integrations", price: 34500 }] },
    { id: "INV-1002", clientName: "شركة المعادي للتطوير العقاري", amount: 17250, status: "paid", date: "2026-07-14", items: [{ label: "Ecommerce Full Ads Sync & Optim", price: 17250 }] }
];

const seedCMS = {
    heroTitle: "Accelerate Your Digital Evolution",
    heroSubtitle: "Premium web engineering, high-performance media buying, and outcome-driven SMM strategy designed for ambitious businesses.",
    formspreeId: "f/YOUR_FORM_ID",
    contactEmail: "alphas.dbs@gmail.com",
    servicesDesc: "We construct custom corporate stores, optimize advertising spends, and engineer digital workflows with transparent partnership frameworks."
};

const seedKB = [
    {
        id: "kb_1",
        title: "Lean Duopoly Revenue split system",
        category: "business",
        author: "Mohamed Asy",
        date: "2026-07-15",
        content: "Alphas Digital Business Solutions operates on a Lean Duopoly structure with clear double-ledger formulas:\n\n1. Gross Revenue represents the aggregate client invoice.\n2. COGS (Operational Expenses) are extracted immediately. Execution premiums (e.g. Asy's Tech Premium, Abanoub's Buyer Premium) are embedded within COGS and paid directly to the executing partner.\n3. Closer Fees (15%) are allocated to the partner who closed the deal.\n4. Capital Reserve (25% of profit) is retained in the agency treasury for software licenses and capital investments.\n5. Remaining Profit is split 50/50 between Mohamed Asy and Abanoub Hany."
    },
    {
        id: "kb_2",
        title: "Server-Side Tracking Configuration Spec",
        category: "technical",
        author: "Abanoub Hany",
        date: "2026-07-16",
        content: "To bypass iOS tracking restrictions and browser restrictions, all ALPHAS client web deployments must implement Server-Side tracking via Google Tag Manager and Cloudflare Workers:\n\n1. Provision custom domain sub-routing (e.g. metrics.clientdomain.com) pointing to Cloudflare Workers.\n2. Bind Conversions API (Meta CAPI) to trigger server-side purchase events with hashed user keys (em, ph, fn).\n3. Deduplicate events between browser Pixel and server CAPI using unique event_id parameters."
    }
];

const seedGigs = [
    { id: "gig_1", title: "Corporate WooCommerce Store with POS Sync", platform: "Upwork", budget: 1500, category: "Web Development", desc: "We need a premium WooCommerce website built for our retail clothing business. It must sync inventory in real time with our offline POS system. Visual quality and loading speeds are extremely important.", date: "Just now" },
    { id: "gig_2", title: "Meta & Google Ads Campaign Manager", platform: "Fiverr", budget: 800, category: "Ads Management", desc: "Looking for an expert to scale our Shopify shop's advertising campaigns. We require CAPI tracking setup and conversion optimization. Budget is monthly retainer.", date: "10m ago" },
    { id: "gig_3", title: "Corporate Brand Identity & Visual Swatches", platform: "Behance", budget: 2000, category: "Branding", desc: "Design full brand guidelines, uniform assets, custom packaging, and business cards for a high-end coffee shop chain. Need standard and raised UV print specifications.", date: "1h ago" },
    { id: "gig_4", title: "B2B SaaS Landing Page Design & Webflow Development", platform: "Freelancer", budget: 1200, category: "Web Development", desc: "Seeking a designer and developer to craft a high-converting, modern glassmorphic landing page for our SaaS startup. GSAP animations are highly preferred.", date: "2h ago" }
];

// 3. DATABASE CONTROLLER
class DatabaseManager {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem("alphas_leads")) localStorage.setItem("alphas_leads", JSON.stringify(seedLeads));
        if (!localStorage.getItem("alphas_projects")) localStorage.setItem("alphas_projects", JSON.stringify(seedProjects));
        if (!localStorage.getItem("alphas_invoices")) localStorage.setItem("alphas_invoices", JSON.stringify(seedInvoices));
        if (!localStorage.getItem("alphas_cms")) localStorage.setItem("alphas_cms", JSON.stringify(seedCMS));
        if (!localStorage.getItem("alphas_kb")) localStorage.setItem("alphas_kb", JSON.stringify(seedKB));
        if (!localStorage.getItem("alphas_gigs")) localStorage.setItem("alphas_gigs", JSON.stringify(seedGigs));
    }

    get(key) {
        return JSON.parse(localStorage.getItem(`alphas_${key}`));
    }

    save(key, data) {
        localStorage.setItem(`alphas_${key}`, JSON.stringify(data));
        this.updateGlobalAnalytics();
    }

    updateGlobalAnalytics() {
        // Updates KPI cards and charts
        renderDashboardView();
        updateCRMStats();
    }
}

const DB = new DatabaseManager();

// 4. NAVIGATION TAB CONTROLLER
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    renderDashboardView();
    renderCRMView();
    populateQuotationSelects();
    populateExecPartnerSelects();
    populateCloserSelect();
    calculateQuotation();
    renderProjectBoard();
    renderInvoicesLedger();
    renderCMSView();
    renderKnowledgeView();
    renderDealHunterFeed();
    updateBackupView();
});

function initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".view-section");
    const viewTitle = document.getElementById("view-title");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-target");

            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            sections.forEach(sec => sec.classList.remove("active"));
            document.getElementById(target).classList.add("active");

            // Update title
            const name = link.querySelector("span").textContent;
            viewTitle.textContent = name + " Management";

            // Trigger updates on tab click
            if (target === "dashboard") renderDashboardView();
            if (target === "crm") renderCRMView();
            if (target === "projects") renderProjectBoard();
            if (target === "invoices") renderInvoicesLedger();
            if (target === "cms") renderCMSView();
            if (target === "knowledge") renderKnowledgeView();
            if (target === "dealhunter") renderDealHunterFeed();
            if (target === "backup") updateBackupView();
        });
    });
}

function switchTab(targetId) {
    const navLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
    if (navLink) {
        navLink.click();
    }
}

// 5. OVERVIEW DASHBOARD VIEW
function renderDashboardView() {
    const projects = DB.get("projects");
    const invoices = DB.get("invoices");
    const leads = DB.get("leads");

    let totalRevenue = 0;
    let totalCapital = 0;
    let totalAsy = 0;
    let totalAbanoub = 0;

    projects.forEach(p => {
        totalRevenue += p.revenue;
        totalCapital += p.capitalReserve;

        const asyCloser = p.closerPartner === 'asy' ? p.closerFee : 0;
        const abanoubCloser = p.closerPartner === 'abanoub' ? p.closerFee : 0;

        let asyExec = p.execPartner === 'asy' ? p.execFee : 0;
        let abanoubExec = p.execPartner === 'abanoub' ? p.execFee : 0;

        // Custom enterprise consulting splits execution
        if (p.execPartner === 'shared') {
            asyExec = p.execFee / 2;
            abanoubExec = p.execFee / 2;
        }

        totalAsy += p.partnerSplit + asyExec + asyCloser;
        totalAbanoub += p.partnerSplit + abanoubExec + abanoubCloser;
    });

    document.getElementById("kpi-total-revenue").textContent = `EGP ${totalRevenue.toLocaleString()}`;
    document.getElementById("kpi-capital-reserve").textContent = `EGP ${totalCapital.toLocaleString()}`;
    document.getElementById("kpi-asy-earnings").textContent = `EGP ${totalAsy.toLocaleString()}`;
    document.getElementById("kpi-abanoub-earnings").textContent = `EGP ${totalAbanoub.toLocaleString()}`;

    // Render Recent Projects Table
    const tableBody = document.getElementById("dashboard-projects-table");
    tableBody.innerHTML = "";

    if (projects.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="py-6 text-center text-slate-500">No projects loaded. Configure a quote to start.</td></tr>`;
    } else {
        projects.slice(-5).reverse().forEach(p => {
            let badgeClass = "status-awaiting";
            let statusText = "Awaiting Start";
            if (p.status === "dev") { badgeClass = "status-dev"; statusText = "In Development"; }
            if (p.status === "audit") { badgeClass = "status-audit"; statusText = "Quality Audit"; }
            if (p.status === "done") { badgeClass = "status-handedover"; statusText = "Handed Over"; }

            const tr = document.createElement("tr");
            tr.className = "border-b border-alphas-glassBorder/10 hover:bg-alphas-glass/20 transition-colors";
            tr.innerHTML = `
                <td class="py-4 text-left">
                    <span class="font-bold text-white block">${p.clientName}</span>
                    <span class="text-[9px] text-slate-500 font-mono">${p.date}</span>
                </td>
                <td class="py-4 text-center font-mono font-bold">EGP ${p.revenue.toLocaleString()}</td>
                <td class="py-4 text-center text-red-400 font-mono">EGP ${p.cogs.toLocaleString()}</td>
                <td class="py-4 text-center text-amber-500 font-mono">EGP ${p.closerFee.toLocaleString()} <span class="text-[9px] text-slate-500">(${p.closerPartner})</span></td>
                <td class="py-4 text-center text-yellow-500 font-mono">EGP ${p.capitalReserve.toLocaleString()}</td>
                <td class="py-4 text-center font-semibold text-[10px] leading-relaxed">
                    <span class="text-blue-400">Asy: EGP ${(p.partnerSplit + (p.execPartner === 'asy' ? p.execFee : 0) + (p.closerPartner === 'asy' ? p.closerFee : 0)).toLocaleString()}</span><br>
                    <span class="text-purple-400">Abanoub: EGP ${(p.partnerSplit + (p.execPartner === 'abanoub' ? p.execFee : 0) + (p.closerPartner === 'abanoub' ? p.closerFee : 0)).toLocaleString()}</span>
                </td>
                <td class="py-4 text-center"><span class="status-badge ${badgeClass}">${statusText}</span></td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // Update charts & stats panel
    document.getElementById("stat-active-leads").textContent = leads.filter(l => l.status === "new" || l.status === "negotiating").length;
    document.getElementById("stat-active-projects").textContent = projects.filter(p => p.status !== "done").length;

    const wonLeadsCount = leads.length;
    document.getElementById("bar-active-leads").style.width = `${Math.min(100, wonLeadsCount * 15)}%`;
    document.getElementById("bar-active-projects").style.width = `${Math.min(100, projects.filter(p => p.status !== "done").length * 20)}%`;

    const paidInvoices = invoices.filter(i => i.status === "paid");
    const ratio = invoices.length > 0 ? Math.round((paidInvoices.length / invoices.length) * 100) : 0;
    document.getElementById("stat-invoices-ratio").textContent = `${ratio}%`;
    document.getElementById("bar-invoices-ratio").style.width = `${ratio}%`;

    // Storage Size calculation
    const usage = (JSON.stringify(localStorage).length / 1024).toFixed(2);
    document.getElementById("storage-percentage").textContent = `${usage} KB`;

    // Render CSS chart
    renderChart(projects);
}

function renderChart(projects) {
    const chart = document.getElementById("dashboard-chart-container");
    chart.innerHTML = "";

    if (projects.length === 0) {
        chart.innerHTML = `<div class="text-xs text-slate-500 py-16">Create project ledgers to plot earnings graphs.</div>`;
        return;
    }

    // Plot last 5 projects
    projects.slice(-5).forEach(p => {
        const asyCut = p.partnerSplit + (p.execPartner === 'asy' ? p.execFee : 0) + (p.closerPartner === 'asy' ? p.closerFee : 0);
        const abanoubCut = p.partnerSplit + (p.execPartner === 'abanoub' ? p.execFee : 0) + (p.closerPartner === 'abanoub' ? p.closerFee : 0);

        const maxVal = Math.max(...projects.map(pr => pr.revenue));
        const revHeight = Math.max(15, Math.round((p.revenue / maxVal) * 80));
        const capHeight = Math.max(10, Math.round((p.capitalReserve / maxVal) * 80));
        const asyHeight = Math.max(10, Math.round((asyCut / maxVal) * 80));
        const abaHeight = Math.max(10, Math.round((abanoubCut / maxVal) * 80));

        const barGroup = document.createElement("div");
        barGroup.className = "chart-bar-group";
        barGroup.innerHTML = `
            <div class="flex items-end gap-1 h-full w-full justify-center">
                <div class="chart-bar bg-blue-500 shadow-lg shadow-blue-500/20" style="height: ${revHeight}%" data-val="Rev: ${p.revenue.toLocaleString()} EGP"></div>
                <div class="chart-bar bg-amber-500 shadow-lg shadow-amber-500/20" style="height: ${capHeight}%" data-val="Reserve: ${p.capitalReserve.toLocaleString()} EGP"></div>
                <div class="chart-bar bg-blue-400 shadow-lg shadow-blue-400/20" style="height: ${asyHeight}%" data-val="Asy: ${Math.round(asyCut).toLocaleString()} EGP"></div>
                <div class="chart-bar bg-purple-400 shadow-lg shadow-purple-400/20" style="height: ${abaHeight}%" data-val="Abanoub: ${Math.round(abanoubCut).toLocaleString()} EGP"></div>
            </div>
            <span class="text-[8px] text-slate-500 font-bold block mt-2 text-center truncate max-w-[50px] font-mono">${p.clientName.slice(0,6)}</span>
        `;
        chart.appendChild(barGroup);
    });
}

// 6. CRM CONTROLLER
let activeCRMFilter = "all";

function renderCRMView() {
    const leads = DB.get("leads");
    const tbody = document.getElementById("crm-leads-table-body");
    tbody.innerHTML = "";

    const filtered = leads.filter(l => {
        if (activeCRMFilter === "all") return true;
        return l.status === activeCRMFilter;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-slate-500">No leads match the pipeline filters.</td></tr>`;
    } else {
        filtered.forEach(lead => {
            let statusClass = "status-new";
            let statusText = "New Lead";
            if (lead.status === "negotiating") { statusClass = "status-negotiating"; statusText = "Negotiation"; }
            if (lead.status === "won") { statusClass = "status-won"; statusText = "Closed Won"; }
            if (lead.status === "lost") { statusClass = "status-lost"; statusText = "Closed Lost"; }

            const tr = document.createElement("tr");
            tr.className = "border-b border-alphas-glassBorder/10 hover:bg-alphas-glass/20 transition-colors";
            tr.innerHTML = `
                <td class="py-4 text-left">
                    <span class="font-bold text-white block text-sm">${lead.name}</span>
                    <span class="text-[10px] text-slate-400 block">${lead.email} • ${lead.phone || 'No phone'}</span>
                </td>
                <td class="py-4 text-left">
                    <span class="px-2 py-0.5 bg-slate-900 border border-alphas-glassBorder rounded text-[9px] font-bold text-slate-300 mr-2 uppercase">${lead.source || "Direct Admin"}</span>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </td>
                <td class="py-4 text-center font-mono font-bold text-slate-200">EGP ${parseInt(lead.budget).toLocaleString()}</td>
                <td class="py-4 text-left font-semibold text-slate-300 max-w-[120px] truncate" title="${lead.services}">${lead.services}</td>
                <td class="py-4 text-left text-slate-400 font-medium">
                    <p class="max-w-[150px] truncate" title="${lead.notes || 'No notes'}">${lead.notes || 'No communication logs'}</p>
                    <span class="text-[9px] text-slate-500 font-mono">${lead.date}</span>
                </td>
                <td class="py-4 text-center">
                    <div class="flex items-center justify-center gap-2">
                        <button onclick="editLead('${lead.id}')" class="text-blue-400 hover:text-blue-300 text-sm p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg"><i class='bx bx-edit'></i></button>
                        ${lead.status !== 'won' ? `<button onclick="convertLeadToProject('${lead.id}')" class="text-emerald-400 hover:text-emerald-300 text-xs font-black px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-1"><i class='bx bx-party'></i> Quote</button>` : ''}
                        <button onclick="deleteLead('${lead.id}')" class="text-red-500 hover:text-red-400 text-sm p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg"><i class='bx bx-trash'></i></button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    updateCRMStats();
}

function updateCRMStats() {
    const leads = DB.get("leads");
    document.getElementById("crm-total-leads").textContent = leads.length;
    document.getElementById("crm-new-leads").textContent = leads.filter(l => l.status === "new").length;
    document.getElementById("crm-negotiating-leads").textContent = leads.filter(l => l.status === "negotiating").length;
    document.getElementById("crm-won-leads").textContent = leads.filter(l => l.status === "won").length;
    document.getElementById("crm-lost-leads").textContent = leads.filter(l => l.status === "lost").length;

    // Badge notification on sidebar
    const badge = document.getElementById("crm-badge");
    const activeNew = leads.filter(l => l.status === "new").length;
    if (activeNew > 0) {
        badge.textContent = activeNew;
        badge.classList.remove("hidden");
    } else {
        badge.classList.add("hidden");
    }
}

function filterLeads(status) {
    activeCRMFilter = status;
    document.querySelectorAll(".crm-filter-btn").forEach(btn => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");
    renderCRMView();
}

function searchLeads() {
    const query = document.getElementById("crm-search").value.toLowerCase();
    const rows = document.querySelectorAll("#crm-leads-table-body tr");
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
    });
}

// CRM Modal Actions
const leadModal = document.getElementById("lead-modal");

function openLeadModal() {
    document.getElementById("lead-form-id").value = "";
    document.getElementById("lead-form").reset();
    document.getElementById("lead-modal-title").textContent = "Add New Lead";
    leadModal.classList.add("show");
}

function closeLeadModal() {
    leadModal.classList.remove("show");
}

function editLead(id) {
    const leads = DB.get("leads");
    const lead = leads.find(l => l.id === id);
    if (!lead) return;

    document.getElementById("lead-form-id").value = lead.id;
    document.getElementById("lead-form-name").value = lead.name;
    document.getElementById("lead-form-email").value = lead.email;
    document.getElementById("lead-form-phone").value = lead.phone || "";
    document.getElementById("lead-form-status").value = lead.status;
    document.getElementById("lead-form-budget").value = lead.budget;
    document.getElementById("lead-form-services").value = lead.services;
    document.getElementById("lead-form-notes").value = lead.notes || "";
    document.getElementById("lead-form-source").value = lead.source || "Direct Admin";

    document.getElementById("lead-modal-title").textContent = "Edit Lead Details";
    leadModal.classList.add("show");
}

function saveLeadForm(e) {
    e.preventDefault();
    const id = document.getElementById("lead-form-id").value;
    const leads = DB.get("leads");

    const formData = {
        id: id || "lead_" + Date.now(),
        name: document.getElementById("lead-form-name").value,
        email: document.getElementById("lead-form-email").value,
        phone: document.getElementById("lead-form-phone").value,
        status: document.getElementById("lead-form-status").value,
        budget: parseInt(document.getElementById("lead-form-budget").value),
        services: document.getElementById("lead-form-services").value,
        notes: document.getElementById("lead-form-notes").value,
        source: document.getElementById("lead-form-source").value || "Direct Admin",
        date: new Date().toISOString().split("T")[0]
    };

    if (id) {
        const index = leads.findIndex(l => l.id === id);
        leads[index] = formData;
    } else {
        leads.push(formData);
    }

    DB.save("leads", leads);
    closeLeadModal();
    renderCRMView();
}

function deleteLead(id) {
    if (confirm("Delete this lead? This cannot be undone.")) {
        const leads = DB.get("leads");
        const filtered = leads.filter(l => l.id !== id);
        DB.save("leads", filtered);
        renderCRMView();
    }
}

function convertLeadToProject(id) {
    const leads = DB.get("leads");
    const lead = leads.find(l => l.id === id);
    if (!lead) return;

    // Pre-fill quotation client name
    document.getElementById("quote-client-name").value = lead.name;
    switchTab("quotation");
    calculateQuotation();
}


// 7. QUOTATION MAKER & LEDGER SPLIT ENGINE
let currentCalcState = {};

function toggleService(serviceId) {
    const isChecked = document.getElementById(`service-${serviceId}-active`).checked;
    const configBlock = document.getElementById(`config-${serviceId}`);
    if (isChecked) {
        configBlock.classList.remove("hidden");
    } else {
        configBlock.classList.add("hidden");
    }
    calculateQuotation();
}

function calculateQuotation() {
    const configs = getBusinessConfigs();
    let totalRevenue = 0;
    let totalCOGS = 0;
    let invoiceItems = [];

    // Closer selection
    const closerPartner = document.getElementById('quote-closer-select').value;

    // Execution fees trackers
    let asyExecFee = 0;
    let abanoubExecFee = 0;
    let customExecFees = {};

    function addExecutionFee(partner, fee) {
        if (!partner || partner === 'none' || fee <= 0) return;
        if (partner === 'asy') {
            asyExecFee += fee;
        } else if (partner === 'abanoub') {
            abanoubExecFee += fee;
        } else if (partner === 'shared') {
            asyExecFee += fee / 2;
            abanoubExecFee += fee / 2;
        } else {
            customExecFees[partner] = (customExecFees[partner] || 0) + fee;
        }
    }

    // 1. Web Custom build
    if (document.getElementById('service-web-active').checked) {
        const tier = document.getElementById('web-tier').value;
        const config = configs.web[tier];
        totalRevenue += config.price;
        totalCOGS += config.cogs;
        const execPartner = document.getElementById('web-partner-exec').value;
        addExecutionFee(execPartner, config.execFee);
        invoiceItems.push({ label: config.label, price: config.price });
    }

    // 2. Website Management
    if (document.getElementById('service-mgmt-active') && document.getElementById('service-mgmt-active').checked) {
        const tier = document.getElementById('mgmt-tier').value;
        const config = configs.mgmt[tier];
        totalRevenue += config.price;
        totalCOGS += config.cogs;
        const execPartner = document.getElementById('mgmt-partner-exec').value;
        addExecutionFee(execPartner, config.execFee);
        invoiceItems.push({ label: config.label, price: config.price });
    }

    // 3. Social Media Management
    if (document.getElementById('service-smm-active') && document.getElementById('service-smm-active').checked) {
        const tier = document.getElementById('smm-tier').value;
        const config = configs.smm[tier];
        totalRevenue += config.price;
        totalCOGS += config.cogs;
        const execPartner = document.getElementById('smm-partner-exec').value;
        addExecutionFee(execPartner, config.execFee);
        invoiceItems.push({ label: config.label, price: config.price });
    }

    // 4. Media Buying Execution (Mandatory for Abanoub)
    if (document.getElementById('service-ads-active').checked) {
        const tier = document.getElementById('ads-tier').value;
        const config = configs.ads[tier];
        totalRevenue += config.price;
        totalCOGS += config.cogs;
        const execPartner = document.getElementById('ads-partner-exec').value;
        addExecutionFee(execPartner, config.execFee);
        invoiceItems.push({ label: config.label, price: config.price });
    }

    // 5. Consulting Hours
    if (document.getElementById('service-consulting-active') && document.getElementById('service-consulting-active').checked) {
        const tier = document.getElementById('consulting-tier').value;
        const hours = parseInt(document.getElementById('consulting-hours').value) || 0;
        const config = configs.consulting[tier];
        const calculatedPrice = config.price * hours;
        const calculatedCOGS = config.cogs * hours;
        totalRevenue += calculatedPrice;
        totalCOGS += calculatedCOGS;

        const execPartner = document.getElementById('consulting-partner-exec').value;
        addExecutionFee(execPartner, config.execFee * hours);

        invoiceItems.push({ label: `${config.label} (${hours} Hours)`, price: calculatedPrice });
    }

    // 6. Academy Courses
    if (document.getElementById('service-academy-active') && document.getElementById('service-academy-active').checked) {
        const tier = document.getElementById('academy-tier').value;
        const students = parseInt(document.getElementById('academy-students').value) || 0;
        const config = configs.academy[tier];
        const calculatedPrice = config.price * students;
        const calculatedCOGS = config.cogs * students;
        totalRevenue += calculatedPrice;
        totalCOGS += calculatedCOGS;

        const execPartner = document.getElementById('academy-partner-exec').value;
        addExecutionFee(execPartner, config.execFee * students);

        invoiceItems.push({ label: `${config.label} (${students} Students)`, price: calculatedPrice });
    }

    // 7. Swatches add-ons
    const swatches = ['cards', 'signage', 'cim'];
    swatches.forEach(sw => {
        const val = document.getElementById(`swatch-${sw}`).value;
        if (val !== 'none') {
            const config = configs.swatches[sw][val];
            totalRevenue += config.price;
            totalCOGS += config.cogs;
            addExecutionFee(config.execPartner, config.execFee);
            invoiceItems.push({ label: config.label, price: config.price });
        }
    });

    // CLOSER SALES FEE (15% OF REVENUE)
    const closerFee = totalRevenue * 0.15;

    // FINANCES FORMULAS
    const grossProjectProfit = Math.max(0, totalRevenue - totalCOGS - closerFee);
    const capitalReserve = grossProjectProfit * 0.25;
    const distributableNetProfit = grossProjectProfit - capitalReserve;
    const partnerSplit = distributableNetProfit * 0.50;

    // Final Payout Statement values
    const asyCloserCut = closerPartner === 'asy' ? closerFee : 0;
    const abanoubCloserCut = closerPartner === 'abanoub' ? closerFee : 0;
    const isCustomCloser = closerPartner !== 'asy' && closerPartner !== 'abanoub';
    
    if (isCustomCloser) {
        customExecFees[`Sales Closer (${closerPartner})`] = closerFee;
    }

    const asyTotalPayout = partnerSplit + asyExecFee + asyCloserCut;
    const abanoubTotalPayout = partnerSplit + abanoubExecFee + abanoubCloserCut;

    // SAVE STATE FOR LEDGER SUBMISSION
    currentCalcState = {
        revenue: totalRevenue,
        cogs: totalCOGS,
        closerPartner: closerPartner,
        closerFee: closerFee,
        capitalReserve: capitalReserve,
        grossProfit: grossProjectProfit,
        netProfit: distributableNetProfit,
        partnerSplit: partnerSplit,
        asyExecFee: asyExecFee,
        abanoubExecFee: abanoubExecFee,
        customExecFees: customExecFees,
        asyTotal: asyTotalPayout,
        abanoubTotal: abanoubTotalPayout,
        items: invoiceItems
    };

    // UPDATE UI SPLIT SHEET
    document.getElementById('split-gross-revenue').innerText = `EGP ${totalRevenue.toLocaleString()}`;
    document.getElementById('split-total-cogs').innerText = `EGP ${totalCOGS.toLocaleString()}`;
    document.getElementById('split-closer-fee').innerText = `EGP ${closerFee.toLocaleString()}`;
    document.getElementById('split-gross-profit').innerText = `EGP ${grossProjectProfit.toLocaleString()}`;
    document.getElementById('split-capital-reserve').innerText = `EGP ${capitalReserve.toLocaleString()}`;
    
    document.getElementById('split-asy-total').innerText = `EGP ${asyTotalPayout.toLocaleString()}`;
    document.getElementById('split-asy-net').innerText = `EGP ${partnerSplit.toLocaleString()}`;
    document.getElementById('split-asy-exec').innerText = `EGP ${asyExecFee.toLocaleString()}`;
    document.getElementById('split-asy-closer').innerText = `EGP ${asyCloserCut.toLocaleString()}`;

    document.getElementById('split-abanoub-total').innerText = `EGP ${abanoubTotalPayout.toLocaleString()}`;
    document.getElementById('split-abanoub-net').innerText = `EGP ${partnerSplit.toLocaleString()}`;
    document.getElementById('split-abanoub-exec').innerText = `EGP ${abanoubExecFee.toLocaleString()}`;
    document.getElementById('split-abanoub-closer').innerText = `EGP ${abanoubCloserCut.toLocaleString()}`;

    // Render custom partner payouts in UI
    const customContainer = document.getElementById('split-custom-payouts-container');
    const customList = document.getElementById('split-custom-payouts-list');
    if (customContainer && customList) {
        customList.innerHTML = '';
        const customKeys = Object.keys(customExecFees);
        if (customKeys.length > 0) {
            customContainer.classList.remove('hidden');
            customKeys.forEach(partner => {
                const fee = customExecFees[partner];
                const div = document.createElement('div');
                div.className = "flex justify-between items-center py-1 border-b border-slate-800/40 last:border-0";
                div.innerHTML = `
                    <span>Partner / Provider (${partner}):</span>
                    <strong class="text-blue-400 font-mono">EGP ${fee.toLocaleString()}</strong>
                `;
                customList.appendChild(div);
            });
        } else {
            customContainer.classList.add('hidden');
        }
    }

    // UPDATE PRINTABLE INVOICE PREVIEW
    const clientNameInput = document.getElementById("quote-client-name").value;
    document.getElementById("invoice-client-display").innerText = clientNameInput || "مؤسسة البزنس الطموح";
    document.getElementById("invoice-date-display").innerText = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById("invoice-contract-number").innerText = `#DBS-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;

    const tbody = document.getElementById('invoice-preview-items-body');
    tbody.innerHTML = '';
    
    if (invoiceItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-slate-400">Please select at least one service to preview invoice.</td></tr>`;
    } else {
        invoiceItems.forEach(item => {
            const row = document.createElement('tr');
            row.className = "border-b border-slate-100";
            row.innerHTML = `
                <td class="py-3 text-right text-slate-800 font-bold">${item.label}</td>
                <td class="py-3 text-center text-slate-600">1</td>
                <td class="py-3 text-left font-bold text-slate-800 font-mono">${item.price.toLocaleString()}</td>
            `;
            tbody.appendChild(row);
        });
    }

    document.getElementById('invoice-preview-subtotal').innerText = `EGP ${totalRevenue.toLocaleString()}`;
    document.getElementById('invoice-preview-total').innerText = `EGP ${totalRevenue.toLocaleString()}`;
}

function lockQuoteToLedger() {
    if (!currentCalcState.revenue || currentCalcState.revenue === 0) {
        alert("Operation Error: Please select valid services before locking deal.");
        return;
    }

    const clientName = document.getElementById("quote-client-name").value;
    if (!clientName) {
        alert("Please enter a client organization name.");
        return;
    }

    const projects = DB.get("projects");
    const invoices = DB.get("invoices");
    const leads = DB.get("leads");

    const newProject = {
        id: "proj_" + Date.now(),
        clientName: clientName,
        date: new Date().toISOString().split("T")[0],
        revenue: currentCalcState.revenue,
        cogs: currentCalcState.cogs,
        closerPartner: currentCalcState.closerPartner,
        closerFee: currentCalcState.closerFee,
        capitalReserve: currentCalcState.capitalReserve,
        execPartner: currentCalcState.asyExecFee > currentCalcState.abanoubExecFee ? 'asy' : (currentCalcState.asyExecFee === 0 && currentCalcState.abanoubExecFee === 0 ? 'shared' : 'abanoub'),
        execFee: Math.max(currentCalcState.asyExecFee, currentCalcState.abanoubExecFee),
        netProfit: currentCalcState.netProfit,
        partnerSplit: currentCalcState.partnerSplit,
        status: "awaiting"
    };

    const newInvoice = {
        id: "INV-" + Date.now().toString().slice(-4),
        clientName: clientName,
        amount: currentCalcState.revenue,
        status: "pending",
        date: new Date().toISOString().split("T")[0],
        items: currentCalcState.items
    };

    // Convert matching CRM leads to won status if name matches
    const leadIndex = leads.findIndex(l => l.name.toLowerCase().includes(clientName.toLowerCase()));
    if (leadIndex !== -1) {
        leads[leadIndex].status = "won";
        DB.save("leads", leads);
    }

    projects.push(newProject);
    invoices.push(newInvoice);

    DB.save("projects", projects);
    DB.save("invoices", invoices);

    alert("Deal locked successfully! Project generated in tracker & invoice created.");
    switchTab("dashboard");
}

function printProposal() {
    window.print();
}

// === DYNAMIC EXECUTION PARTNER & CLOSER SYSTEM ===

function getExecPartners() {
    return JSON.parse(localStorage.getItem("alphas_exec_partners")) || [];
}

function saveExecPartner(name) {
    const list = getExecPartners();
    if (!list.includes(name)) {
        list.push(name);
        localStorage.setItem("alphas_exec_partners", JSON.stringify(list));
    }
}

function populateExecPartnerSelects() {
    const customPartners = getExecPartners();
    const selectIds = [
        'web-partner-exec',
        'mgmt-partner-exec',
        'smm-partner-exec',
        'ads-partner-exec',
        'consulting-partner-exec',
        'academy-partner-exec'
    ];

    selectIds.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;

        const previousVal = select.value;
        select.innerHTML = '';

        // Add standard options
        const optNone = document.createElement('option');
        optNone.value = 'none';
        optNone.textContent = 'No premium';
        select.appendChild(optNone);

        const optAsy = document.createElement('option');
        optAsy.value = 'asy';
        optAsy.textContent = 'Asy';
        select.appendChild(optAsy);

        const optAbanoub = document.createElement('option');
        optAbanoub.value = 'abanoub';
        optAbanoub.textContent = 'Abanoub';
        select.appendChild(optAbanoub);

        const optShared = document.createElement('option');
        optShared.value = 'shared';
        optShared.textContent = 'Shared';
        select.appendChild(optShared);

        // Add custom partners
        customPartners.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p;
            opt.textContent = p;
            select.appendChild(opt);
        });

        // Add "+ Add New..." option
        const optAddNew = document.createElement('option');
        optAddNew.value = 'add-new';
        optAddNew.textContent = '+ Add New...';
        optAddNew.style.color = '#e59b58';
        optAddNew.style.fontWeight = 'bold';
        select.appendChild(optAddNew);

        // Restore previous value or set default
        if (previousVal && Array.from(select.options).some(o => o.value === previousVal)) {
            select.value = previousVal;
        } else {
            // Apply default behavior
            if (selectId === 'web-partner-exec' || selectId === 'mgmt-partner-exec' || selectId === 'consulting-partner-exec' || selectId === 'academy-partner-exec') {
                select.value = 'asy';
            } else if (selectId === 'smm-partner-exec' || selectId === 'ads-partner-exec') {
                select.value = 'abanoub';
            } else {
                select.value = 'none';
            }
        }
    });
}

function handleExecPartnerChange(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;

    if (select.value === 'add-new') {
        const name = prompt("Enter the name of the new Execution Partner:");
        if (name && name.trim()) {
            const cleanedName = name.trim();
            saveExecPartner(cleanedName);
            populateExecPartnerSelects();
            select.value = cleanedName;
        } else {
            select.selectedIndex = 1; // default to Asy/Abanoub default
        }
    }
    calculateQuotation();
}

function getCustomClosers() {
    return JSON.parse(localStorage.getItem("alphas_custom_closers")) || [];
}

function saveCustomCloser(name) {
    const list = getCustomClosers();
    if (!list.includes(name)) {
        list.push(name);
        localStorage.setItem("alphas_custom_closers", JSON.stringify(list));
    }
}

function populateCloserSelect() {
    const select = document.getElementById('quote-closer-select');
    if (!select) return;

    const previousVal = select.value;
    select.innerHTML = '';

    // Asy
    const optAsy = document.createElement('option');
    optAsy.value = 'asy';
    optAsy.textContent = 'Mohamed Asy';
    select.appendChild(optAsy);

    // Abanoub
    const optAbanoub = document.createElement('option');
    optAbanoub.value = 'abanoub';
    optAbanoub.textContent = 'Abanoub Hany';
    select.appendChild(optAbanoub);

    // Custom closers
    const custom = getCustomClosers();
    custom.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        select.appendChild(opt);
    });

    // Add New...
    const optAddNew = document.createElement('option');
    optAddNew.value = 'add-new';
    optAddNew.textContent = '+ Add New Closer...';
    optAddNew.style.color = '#e59b58';
    optAddNew.style.fontWeight = 'bold';
    select.appendChild(optAddNew);

    if (previousVal && Array.from(select.options).some(o => o.value === previousVal)) {
        select.value = previousVal;
    } else {
        select.value = 'asy';
    }

    updateCloserDeleteBtnVisibility();
}

function updateCloserDeleteBtnVisibility() {
    const select = document.getElementById('quote-closer-select');
    const deleteBtn = document.getElementById('delete-btn-closer');
    if (!select || !deleteBtn) return;

    const val = select.value;
    if (val !== 'asy' && val !== 'abanoub' && val !== 'add-new') {
        deleteBtn.classList.remove('hidden');
    } else {
        deleteBtn.classList.add('hidden');
    }
}

function handleCloserChange() {
    const select = document.getElementById('quote-closer-select');
    if (!select) return;

    if (select.value === 'add-new') {
        const name = prompt("Enter the name of the new Sales Closer:");
        if (name && name.trim()) {
            const cleanedName = name.trim();
            saveCustomCloser(cleanedName);
            populateCloserSelect();
            select.value = cleanedName;
        } else {
            select.value = 'asy';
        }
    }
    updateCloserDeleteBtnVisibility();
    calculateQuotation();
}

function deleteCustomCloser() {
    const select = document.getElementById('quote-closer-select');
    if (!select) return;

    const selectedVal = select.value;
    if (selectedVal === 'asy' || selectedVal === 'abanoub') return;

    if (confirm(`Are you sure you want to delete Closer "${selectedVal}"?`)) {
        const custom = getCustomClosers();
        const index = custom.indexOf(selectedVal);
        if (index !== -1) {
            custom.splice(index, 1);
            localStorage.setItem("alphas_custom_closers", JSON.stringify(custom));
        }
        select.value = 'asy';
        populateCloserSelect();
        calculateQuotation();
    }
}

// === CUSTOM SERVICE ITEMS ENGINE ===

function getBusinessConfigs() {
    const defaultConfigs = JSON.parse(JSON.stringify(businessConfigs));
    const custom = JSON.parse(localStorage.getItem("alphas_custom_configs")) || {};
    
    for (const category in custom) {
        if (!defaultConfigs[category]) defaultConfigs[category] = {};
        for (const tierKey in custom[category]) {
            defaultConfigs[category][tierKey] = custom[category][tierKey];
        }
    }
    return defaultConfigs;
}

function isItemCustom(categoryKey, swatchKey, key) {
    const custom = JSON.parse(localStorage.getItem("alphas_custom_configs")) || {};
    if (swatchKey) {
        return custom.swatches && custom.swatches[swatchKey] && custom.swatches[swatchKey][key];
    }
    return custom[categoryKey] && custom[categoryKey][key];
}

function populateQuotationSelects() {
    const configs = getBusinessConfigs();
    const categories = {
        'web-tier': configs.web,
        'mgmt-tier': configs.mgmt,
        'smm-tier': configs.smm,
        'ads-tier': configs.ads,
        'consulting-tier': configs.consulting,
        'academy-tier': configs.academy,
        'swatch-cards': configs.swatches.cards,
        'swatch-signage': configs.swatches.signage,
        'swatch-cim': configs.swatches.cim
    };

    for (const selectId in categories) {
        const select = document.getElementById(selectId);
        if (!select) continue;

        const previousVal = select.value;
        select.innerHTML = '';
        const items = categories[selectId];

        let categoryKey = selectId.split('-')[0];
        let swatchKey = null;
        if (selectId.startsWith('swatch-')) {
            categoryKey = 'swatches';
            swatchKey = selectId.replace('swatch-', '');
        }

        for (const key in items) {
            const item = items[key];
            if (key === 'none' && item.label === "") {
                const opt = document.createElement('option');
                opt.value = 'none';
                opt.textContent = selectId === 'swatch-cards' ? "No physical business cards" :
                                  (selectId === 'swatch-signage' ? "No physical signage" : "No physical CIM goods");
                select.appendChild(opt);
                continue;
            }

            const opt = document.createElement('option');
            opt.value = key;
            
            const isCustom = isItemCustom(categoryKey, swatchKey, key);
            const customLabel = isCustom ? `[CUSTOM] ${item.label}` : item.label;
            
            let priceSuffix = ` (EGP ${item.price.toLocaleString()})`;
            if (categoryKey === 'consulting') priceSuffix = ` (EGP ${item.price.toLocaleString()} / hr)`;
            if (categoryKey === 'academy') priceSuffix = ` (EGP ${item.price.toLocaleString()} / student)`;
            
            opt.textContent = customLabel + priceSuffix;
            select.appendChild(opt);
        }

        const addOpt = document.createElement('option');
        addOpt.value = 'add-new';
        addOpt.textContent = "+ Add Custom Item...";
        addOpt.style.color = '#e59b58';
        addOpt.style.fontWeight = 'bold';
        select.appendChild(addOpt);

        if (previousVal && Array.from(select.options).some(o => o.value === previousVal)) {
            select.value = previousVal;
        } else {
            if (selectId.startsWith('swatch-')) {
                select.value = 'none';
            } else {
                select.selectedIndex = 0;
            }
        }

        updateDeleteBtnVisibility(selectId);
    }
}

function updateDeleteBtnVisibility(selectId) {
    const select = document.getElementById(selectId);
    const deleteBtn = document.getElementById(`delete-btn-${selectId}`);
    if (!select || !deleteBtn) return;

    let categoryKey = selectId.split('-')[0];
    let swatchKey = null;
    if (selectId.startsWith('swatch-')) {
        categoryKey = 'swatches';
        swatchKey = selectId.replace('swatch-', '');
    }

    const selectedVal = select.value;
    const isCustom = isItemCustom(categoryKey, swatchKey, selectedVal);

    if (isCustom) {
        deleteBtn.classList.remove('hidden');
    } else {
        deleteBtn.classList.add('hidden');
    }
}

function handleSelectChange(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;

    if (select.value === 'add-new') {
        document.getElementById('custom-item-select-id').value = selectId;
        document.getElementById('custom-item-form').reset();
        
        select.selectedIndex = 0;
        updateDeleteBtnVisibility(selectId);

        const modal = document.getElementById('custom-item-modal');
        modal.classList.add('show');
    } else {
        updateDeleteBtnVisibility(selectId);
        calculateQuotation();
    }
}

function closeCustomItemModal() {
    document.getElementById('custom-item-modal').classList.remove('show');
}

function saveCustomItemForm(e) {
    e.preventDefault();
    const selectId = document.getElementById('custom-item-select-id').value;
    const label = document.getElementById('custom-item-label').value.trim();
    const price = parseInt(document.getElementById('custom-item-price').value) || 0;
    const cogs = parseInt(document.getElementById('custom-item-cogs').value) || 0;
    const execFee = parseInt(document.getElementById('custom-item-exec-fee').value) || 0;
    const execPartner = document.getElementById('custom-item-exec-partner').value;

    let categoryKey = selectId.split('-')[0];
    let swatchKey = null;
    if (selectId.startsWith('swatch-')) {
        categoryKey = 'swatches';
        swatchKey = selectId.replace('swatch-', '');
    }

    const custom = JSON.parse(localStorage.getItem("alphas_custom_configs")) || {};
    const itemKey = "custom_" + Date.now();

    const newItem = { label, price, cogs, execFee, execPartner };

    if (swatchKey) {
        if (!custom.swatches) custom.swatches = {};
        if (!custom.swatches[swatchKey]) custom.swatches[swatchKey] = {};
        custom.swatches[swatchKey][itemKey] = newItem;
    } else {
        if (!custom[categoryKey]) custom[categoryKey] = {};
        custom[categoryKey][itemKey] = newItem;
    }

    localStorage.setItem("alphas_custom_configs", JSON.stringify(custom));
    
    populateQuotationSelects();
    const select = document.getElementById(selectId);
    if (select) {
        select.value = itemKey;
        updateDeleteBtnVisibility(selectId);
    }

    closeCustomItemModal();
    calculateQuotation();
}

function deleteCustomItem(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;

    const selectedVal = select.value;
    let categoryKey = selectId.split('-')[0];
    let swatchKey = null;
    if (selectId.startsWith('swatch-')) {
        categoryKey = 'swatches';
        swatchKey = selectId.replace('swatch-', '');
    }

    if (confirm("Are you sure you want to delete this custom item?")) {
        const custom = JSON.parse(localStorage.getItem("alphas_custom_configs")) || {};
        
        if (swatchKey) {
            if (custom.swatches && custom.swatches[swatchKey]) {
                delete custom.swatches[swatchKey][selectedVal];
            }
        } else {
            if (custom[categoryKey]) {
                delete custom[categoryKey][selectedVal];
            }
        }

        localStorage.setItem("alphas_custom_configs", JSON.stringify(custom));
        
        select.selectedIndex = 0;
        
        populateQuotationSelects();
        calculateQuotation();
    }
}

function exportProposalDrafts() {
    if (!currentCalcState.revenue || currentCalcState.revenue === 0) {
        alert("Please select valid services before exporting drafts.");
        return;
    }

    const clientName = document.getElementById("quote-client-name").value || "مؤسسة البزنس الطموح";
    const dateStr = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
    const dateISO = new Date().toISOString().split("T")[0];
    const contractNum = `#DBS-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;

    let tableRows = '';
    currentCalcState.items.forEach(item => {
        tableRows += `
                    <tr>
                        <td style="font-weight: bold; color: var(--alphas-dark);">${item.label}</td>
                        <td style="text-align: center;">1</td>
                        <td class="td-price">${item.price.toLocaleString()}</td>
                    </tr>`;
    });

    const clientHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>عرض سعر استراتيجي فخم - ${clientName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --alphas-accent: #e59b58;
            --alphas-dark: #0b0e14;
            --alphas-navy: #131924;
            --alphas-border: #e2e8f0;
            --text-main: #1e293b;
            --text-muted: #64748b;
        }
        * {
            box-sizing: border-box;
            font-family: 'Cairo', sans-serif;
            margin: 0;
            padding: 0;
        }
        body {
            background-color: #f8fafc;
            color: var(--text-main);
            padding: 20px;
            font-size: 11px;
            line-height: 1.5;
        }
        .proposal-paper {
            background-color: #ffffff;
            max-width: 800px;
            margin: 0 auto;
            padding: 30px 40px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
            border: 1px solid var(--alphas-border);
            position: relative;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #f1f5f9;
            padding-bottom: 12px;
            margin-bottom: 15px;
        }
        .logo-area {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .logo-img {
            height: 38px;
            width: auto;
        }
        .company-info {
            text-align: right;
        }
        .company-name {
            font-weight: 900;
            font-size: 18px;
            color: var(--alphas-dark);
            letter-spacing: 1px;
        }
        .company-sub {
            font-size: 9px;
            color: var(--alphas-accent);
            text-transform: uppercase;
            font-weight: 700;
            margin-top: 1px;
        }
        .meta-area {
            text-align: left;
        }
        .title-proposal {
            font-size: 18px;
            font-weight: 900;
            color: var(--alphas-dark);
            margin-bottom: 3px;
        }
        .meta-line {
            font-size: 10px;
            color: var(--text-muted);
        }
        .meta-val {
            font-family: monospace;
            font-weight: bold;
            color: var(--text-main);
        }
        .parties-grid {
            display: grid;
            grid-template-cols: 1fr 1fr;
            gap: 15px;
            padding: 8px 0;
            border-bottom: 1px solid #f1f5f9;
            margin-bottom: 15px;
        }
        .party-card {
            background-color: #f8fafc;
            padding: 10px 15px;
            border-radius: 10px;
            border: 1px solid #f1f5f9;
        }
        .party-title {
            font-size: 10px;
            color: var(--alphas-accent);
            font-weight: 900;
            text-transform: uppercase;
            margin-bottom: 4px;
            display: block;
        }
        .party-name {
            font-size: 12px;
            font-weight: 700;
            color: var(--alphas-dark);
            margin-bottom: 2px;
        }
        .party-desc {
            font-size: 10px;
            color: var(--text-muted);
        }
        .intro-text {
            margin-bottom: 15px;
            font-size: 11px;
            color: #475569;
        }
        .table-area {
            margin-bottom: 15px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            text-align: right;
        }
        th {
            background-color: #f8fafc;
            color: var(--text-muted);
            font-weight: 700;
            font-size: 10px;
            padding: 8px 12px;
            border-bottom: 2px solid #e2e8f0;
        }
        td {
            padding: 8px 12px;
            border-bottom: 1px solid #f1f5f9;
            font-size: 11px;
            color: #334155;
        }
        .td-price {
            font-family: monospace;
            font-weight: bold;
            text-align: left;
        }
        .totals-area {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 15px;
            padding-top: 12px;
            border-top: 2px solid #f1f5f9;
        }
        .notes-card {
            max-width: 55%;
        }
        .notes-title {
            font-weight: bold;
            font-size: 11px;
            color: var(--alphas-dark);
            margin-bottom: 4px;
        }
        .notes-list {
            font-size: 10px;
            color: var(--text-muted);
            list-style: none;
        }
        .notes-list li {
            margin-bottom: 3px;
            position: relative;
            padding-right: 12px;
        }
        .notes-list li::before {
            content: "•";
            color: var(--alphas-accent);
            position: absolute;
            right: 0;
            font-weight: bold;
        }
        .pricing-card {
            background-color: #f8fafc;
            padding: 10px 18px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            min-width: 220px;
        }
        .price-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
            font-size: 10px;
        }
        .price-total-row {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            padding-top: 8px;
            border-top: 2px dashed #cbd5e1;
            font-size: 13px;
            font-weight: 900;
            color: #2563eb;
        }
        .signatures {
            display: grid;
            grid-template-cols: 1fr 1fr;
            gap: 30px;
            margin-top: 25px;
            padding-top: 15px;
            border-top: 1px solid #f1f5f9;
            text-align: center;
        }
        .sig-box {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .sig-title {
            font-size: 10px;
            color: var(--text-muted);
            margin-bottom: 25px;
        }
        .sig-line {
            width: 130px;
            border-bottom: 1px solid var(--text-muted);
            margin-bottom: 4px;
        }
        .sig-name {
            font-weight: bold;
            font-size: 11px;
            color: var(--alphas-dark);
        }
        .sig-sub {
            font-size: 9px;
            color: var(--text-muted);
        }
        
        @media print {
            @page {
                size: A4 portrait;
                margin: 8mm 12mm;
            }
            body {
                background-color: #ffffff !important;
                padding: 0 !important;
                margin: 0 !important;
                font-size: 11px !important;
            }
            .proposal-paper {
                box-shadow: none !important;
                border: none !important;
                padding: 0 !important;
                margin: 0 !important;
                max-width: 100% !important;
            }
            button {
                display: none !important;
            }
        }
    </style>
</head>
<body>
    <div class="proposal-paper">
        <div class="header">
            <div class="company-info">
                <div class="logo-area">
                    <img src="data:image/png;base64,﻿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" class="logo-img" alt="Alphas Logo" onerror="this.style.display='none'">
                    <div>
                        <div class="company-name">ALPHAS</div>
                        <div class="company-sub">Digital Business Solutions</div>
                    </div>
                </div>
                <p style="font-size: 10px; color: var(--text-muted); margin-top: 6px;">القاهرة، جمهورية مصر العربية | alphas.dbs@gmail.com</p>
            </div>
            <div class="meta-area">
                <div class="title-proposal">عرض أسعار استراتيجي</div>
                <div class="meta-line">تاريخ الإصدار: <span class="meta-val">${dateStr}</span></div>
                <div class="meta-line">رقم العقد: <span class="meta-val">${contractNum}</span></div>
            </div>
        </div>

        <div class="parties-grid">
            <div class="party-card">
                <span class="party-title">الطرف الأول (مقدم الخدمة):</span>
                <div class="party-name">Alphas Digital Business Solutions</div>
                <div class="party-desc">يمثلها قانونياً الشركاء المؤسسون: محمد عاصي & أبانوب هاني.</div>
            </div>
            <div class="party-card">
                <span class="party-title">الطرف الثاني (العميل):</span>
                <div class="party-name">${clientName}</div>
                <div class="party-desc">شريك التطور الرقمي والنمو التجاري المستهدف.</div>
            </div>
        </div>

        <div class="intro-text">
            بناءً على دراسة متطلباتكم الرقمية ونموذج العمل الخاص ببياناتكم التشغيلية، يسعدنا في شركة <strong>ALPHAS</strong> تقديم هذا العرض الفني والمالي المتكامل لتنفيذ الخدمات والهندسة الرقمية المطلوبة وفقاً لأعلى معايير الجودة العالمية وبشروط الشفافية التشغيلية الكاملة:
        </div>

        <div class="table-area">
            <table>
                <thead>
                    <tr>
                        <th>الخدمة والعمل التشغيلي المشمول بالتفصيل</th>
                        <th style="text-align: center;">الكمية</th>
                        <th style="text-align: left;">التكلفة الاستثمارية (EGP)</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>

        <div class="totals-area">
            <div class="notes-card">
                <div class="notes-title">ملاحظات وشروط التعاقد الفني:</div>
                <ul class="notes-list">
                    <li>كافة الأسعار المذكورة أعلاه تشمل التراخيص البرمجية وسيرفرات الاستضافة المبدئية.</li>
                    <li>يتم دمج Conversions API وربطه بالخوادم لتجاوز قيود التتبع في أنظمة التشغيل الحديثة.</li>
                    <li>تلتزم شركة ALPHAS بتقديم الدعم التشغيلي والتدريب المجاني للتيم الفني للعميل.</li>
                </ul>
            </div>
            
            <div class="pricing-card">
                <div class="price-row">
                    <span style="color: var(--text-muted);">القيمة الإجمالية للخدمات:</span>
                    <strong style="font-family: monospace;">EGP ${currentCalcState.revenue.toLocaleString()}</strong>
                </div>
                <div class="price-row">
                    <span style="color: var(--text-muted);">الخصومات والمميزات الاستثنائية:</span>
                    <strong style="color: #10b981; font-family: monospace;">EGP 0</strong>
                </div>
                <div class="price-total-row">
                    <span>إجمالي الاستثمار الصافي:</span>
                    <span>EGP ${currentCalcState.revenue.toLocaleString()}</span>
                </div>
            </div>
        </div>

        <div class="signatures">
            <div class="sig-box">
                <p class="sig-title">توقيع واعتماد الطرف الأول (Alphas DBS)</p>
                <div style="display: flex; gap: 40px; margin-bottom: 20px;">
                    <div>
                        <div class="sig-line"></div>
                        <div class="sig-name">محمد عاصي</div>
                        <div class="sig-sub">الرئيس التنفيذي للتكنولوجيا</div>
                    </div>
                    <div>
                        <div class="sig-line"></div>
                        <div class="sig-name">أبانوب هاني</div>
                        <div class="sig-sub">الرئيس التنفيذي للعمليات</div>
                    </div>
                </div>
            </div>
            <div class="sig-box">
                <p class="sig-title">توقيع واعتماد الطرف الثاني (العميل)</p>
                <div style="margin-bottom: 20px;">
                    <div class="sig-line" style="margin-top: 25px;"></div>
                    <div class="sig-name">${clientName}</div>
                    <div class="sig-sub">المفوض بالتوقيع والاعتماد</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

    let boardCustomPayoutsHTML = '';
    if (currentCalcState.customExecFees) {
        for (const partner in currentCalcState.customExecFees) {
            const fee = currentCalcState.customExecFees[partner];
            boardCustomPayoutsHTML += `
            <div class="payout-card" style="border-left: 3px solid #38bdf8; grid-column: span 2; margin-top: 10px;">
                <div class="partner-head">
                    <span>External Provider / Partner (${partner})</span>
                    <span class="partner-total" style="color: #38bdf8;">EGP ${fee.toLocaleString()}</span>
                </div>
                <div class="ledger-line"><span>Execution / Sales Premium (Expenses):</span> <strong>EGP ${fee.toLocaleString()}</strong></div>
            </div>`;
        }
    }

    const boardHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Internal Payout Statement - ${clientName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --alphas-accent: #e59b58;
            --alphas-dark: #0b0e14;
            --alphas-navy: #131924;
            --alphas-border: rgba(255, 255, 255, 0.08);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
        }
        * {
            box-sizing: border-box;
            font-family: 'Cairo', 'Segoe UI', sans-serif;
            margin: 0; padding: 0;
        }
        body {
            background-color: var(--alphas-dark);
            color: var(--text-main);
            padding: 40px;
        }
        .board-container {
            background: var(--alphas-navy);
            max-width: 800px;
            margin: 0 auto;
            padding: 45px;
            border-radius: 32px;
            border: 1px solid var(--alphas-border);
            box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .header {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid var(--alphas-border);
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        h1 { font-size: 20px; font-weight: 900; }
        h1 span { color: var(--alphas-accent); }
        .deal-meta-grid {
            display: grid; grid-template-cols: 1fr 1fr 1fr; gap: 20px; margin-bottom: 30px;
        }
        .meta-card {
            background: rgba(255,255,255,0.01); border: 1px solid var(--alphas-border);
            padding: 15px; border-radius: 12px;
        }
        .kpi-row {
            display: grid; grid-template-cols: 1fr 1fr 1fr 1fr; gap: 15px; margin-bottom: 30px;
        }
        .kpi-card {
            background: rgba(255,255,255,0.01); border: 1px solid var(--alphas-border);
            padding: 15px; border-radius: 16px; text-align: center;
        }
        .kpi-num { font-size: 15px; font-weight: 900; font-family: monospace; }
        .payout-grid {
            display: grid; grid-template-cols: 1fr 1fr; gap: 20px; margin-bottom: 30px;
        }
        .payout-card {
            background: rgba(255,255,255,0.01); border: 1px solid var(--alphas-border);
            border-radius: 20px; padding: 20px;
        }
        .partner-head { display: flex; justify-content: space-between; margin-bottom: 15px; font-weight: 900; }
        .partner-total { font-family: monospace; color: var(--alphas-accent); }
        .ledger-line { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 8px; }
        .ledger-line strong { font-family: monospace; color: #fff; }
        .bottom-summary {
            background: rgba(0,0,0,0.2); padding: 15px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center;
        }
    </style>
</head>
<body>
    <div class="board-container">
        <div class="header">
            <div>
                <h1>ALPHAS <span>BOARD</span></h1>
                <p style="font-size: 10px; color: var(--text-muted);">Internal Financial Split Statement</p>
            </div>
            <div style="font-size: 10px; border: 1px solid rgba(229,155,88,0.3); padding: 4px 8px; border-radius: 8px; color: var(--alphas-accent);">Deal Statement</div>
        </div>

        <div class="deal-meta-grid">
            <div class="meta-card">
                <span style="font-size: 9px; color: var(--text-muted); display: block;">Client Organization</span>
                <strong>${clientName}</strong>
            </div>
            <div class="meta-card">
                <span style="font-size: 9px; color: var(--text-muted); display: block;">Lock Date</span>
                <strong>${dateISO}</strong>
            </div>
            <div class="meta-card">
                <span style="font-size: 9px; color: var(--text-muted); display: block;">Contract ID</span>
                <strong>${contractNum}</strong>
            </div>
        </div>

        <div class="kpi-row">
            <div class="kpi-card">
                <span style="font-size: 9px; color: var(--text-muted); display: block;">Gross Revenue</span>
                <span class="kpi-num" style="color: #fff;">EGP ${currentCalcState.revenue.toLocaleString()}</span>
            </div>
            <div class="kpi-card">
                <span style="font-size: 9px; color: var(--text-muted); display: block;">COGS Expenses</span>
                <span class="kpi-num" style="color: #f87171;">EGP ${currentCalcState.cogs.toLocaleString()}</span>
            </div>
            <div class="kpi-card">
                <span style="font-size: 9px; color: var(--text-muted); display: block;">Closer Fee (15%)</span>
                <span class="kpi-num" style="color: #f59e0b;">EGP ${currentCalcState.closerFee.toLocaleString()}</span>
            </div>
            <div class="kpi-card">
                <span style="font-size: 9px; color: var(--text-muted); display: block;">Gross Profit</span>
                <span class="kpi-num" style="color: #34d399;">EGP ${currentCalcState.grossProfit.toLocaleString()}</span>
            </div>
        </div>

        <div class="payout-grid">
            <div class="payout-card" style="border-left: 3px solid #3b82f6;">
                <div class="partner-head">
                    <span>Mohamed Asy (Tech)</span>
                    <span class="partner-total" style="color: #3b82f6;">EGP ${currentCalcState.asyTotal.toLocaleString()}</span>
                </div>
                <div class="ledger-line"><span>Net Profit (50%):</span> <strong>EGP ${currentCalcState.partnerSplit.toLocaleString()}</strong></div>
                <div class="ledger-line"><span>Exec Premium:</span> <strong>EGP ${currentCalcState.asyExecFee.toLocaleString()}</strong></div>
                <div class="ledger-line"><span>Closer Sales Cut:</span> <strong>EGP ${(currentCalcState.closerPartner === 'asy' ? currentCalcState.closerFee : 0).toLocaleString()}</strong></div>
            </div>

            <div class="payout-card" style="border-left: 3px solid var(--alphas-accent);">
                <div class="partner-head">
                    <span>Abanoub Hany (Media)</span>
                    <span class="partner-total">EGP ${currentCalcState.abanoubTotal.toLocaleString()}</span>
                </div>
                <div class="ledger-line"><span>Net Profit (50%):</span> <strong>EGP ${currentCalcState.partnerSplit.toLocaleString()}</strong></div>
                <div class="ledger-line"><span>Exec Premium:</span> <strong>EGP ${currentCalcState.abanoubExecFee.toLocaleString()}</strong></div>
                <div class="ledger-line"><span>Closer Sales Cut:</span> <strong>EGP ${(currentCalcState.closerPartner === 'abanoub' ? currentCalcState.closerFee : 0).toLocaleString()}</strong></div>
            </div>

            ${boardCustomPayoutsHTML}
        </div>

        <div class="bottom-summary">
            <span style="font-size: 9px; color: var(--text-muted);">Reserve (25% of Profit) goes directly to Treasury Vault.</span>
            <div style="text-align: right;">
                <span style="font-size: 9px; color: var(--text-muted); display: block;">Capital Treasury Reserve</span>
                <strong style="font-family: monospace; font-size: 14px;">EGP ${currentCalcState.capitalReserve.toLocaleString()}</strong>
            </div>
        </div>
    </div>
</body>
</html>`;

    // Trigger downloads
    const blobClient = new Blob([clientHTML], { type: 'text/html' });
    const linkClient = document.createElement('a');
    linkClient.href = URL.createObjectURL(blobClient);
    linkClient.download = `Client_Proposal_${clientName.replace(/\s+/g, '_')}.html`;
    linkClient.click();

    const blobBoard = new Blob([boardHTML], { type: 'text/html' });
    const linkBoard = document.createElement('a');
    linkBoard.href = URL.createObjectURL(blobBoard);
    linkBoard.download = `Board_Revenue_${clientName.replace(/\s+/g, '_')}.html`;
    linkBoard.click();

    alert("Dynamic proposal files exported successfully! Move the downloaded files to your 'Offers Record' folder for archiving.");
}


// 8. PROJECT TRACKER BOARD
function renderProjectBoard() {
    const projects = DB.get("projects");

    const boardAwaiting = document.getElementById("board-awaiting");
    const boardDev = document.getElementById("board-development");
    const boardAudit = document.getElementById("board-audit");
    const boardDone = document.getElementById("board-done");

    boardAwaiting.innerHTML = "";
    boardDev.innerHTML = "";
    boardAudit.innerHTML = "";
    boardDone.innerHTML = "";

    let counts = { awaiting: 0, dev: 0, audit: 0, done: 0 };

    projects.forEach(p => {
        let badgeColor = "border-blue-500/20 text-blue-400 bg-blue-500/10";
        let badgeName = "Asy (Dev)";
        if (p.execPartner === 'abanoub') {
            badgeColor = "border-amber-500/20 text-alphas-accent bg-alphas-accent/10";
            badgeName = "Abanoub (Media)";
        } else if (p.execPartner === 'shared') {
            badgeColor = "border-purple-500/20 text-purple-400 bg-purple-500/10";
            badgeName = "Shared Exec";
        }

        const card = document.createElement("div");
        card.className = "project-card bg-slate-900/60 border border-alphas-glassBorder rounded-xl p-4 space-y-4 hover:border-slate-700 transition-all cursor-pointer";
        card.innerHTML = `
            <div class="flex justify-between items-start">
                <span class="font-bold text-white block text-sm leading-snug">${p.clientName}</span>
            </div>
            <div class="flex justify-between items-center text-[10px]">
                <span class="font-bold text-slate-400 font-mono">EGP ${p.revenue.toLocaleString()}</span>
                <span class="px-2 py-0.5 rounded border ${badgeColor} font-bold text-[9px]">${badgeName}</span>
            </div>
            
            <div class="flex justify-between gap-2 pt-2 border-t border-alphas-glassBorder/20 text-[9px] font-bold">
                ${p.status !== 'awaiting' ? `<button onclick="updateProjectStatus('${p.id}', 'prev')" class="text-slate-400 hover:text-white flex items-center"><i class='bx bx-left-arrow-alt'></i> Back</button>` : '<span></span>'}
                ${p.status !== 'done' ? `<button onclick="updateProjectStatus('${p.id}', 'next')" class="text-alphas-accent hover:text-white flex items-center ml-auto">Advance <i class='bx bx-right-arrow-alt'></i></button>` : '<span class="text-emerald-400 ml-auto flex items-center gap-0.5"><i class="fa-solid fa-circle-check"></i> Finished</span>'}
            </div>
        `;

        if (p.status === "awaiting") { boardAwaiting.appendChild(card); counts.awaiting++; }
        else if (p.status === "dev") { boardDev.appendChild(card); counts.dev++; }
        else if (p.status === "audit") { boardAudit.appendChild(card); counts.audit++; }
        else if (p.status === "done") { boardDone.appendChild(card); counts.done++; }
    });

    document.getElementById("proj-count-awaiting").textContent = counts.awaiting;
    document.getElementById("proj-count-dev").textContent = counts.dev;
    document.getElementById("proj-count-audit").textContent = counts.audit;
    document.getElementById("proj-count-done").textContent = counts.done;
}

function updateProjectStatus(id, direction) {
    const projects = DB.get("projects");
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) return;

    const stages = ["awaiting", "dev", "audit", "done"];
    let currStageIdx = stages.indexOf(projects[index].status);

    if (direction === "next" && currStageIdx < 3) currStageIdx++;
    else if (direction === "prev" && currStageIdx > 0) currStageIdx--;

    projects[index].status = stages[currStageIdx];
    DB.save("projects", projects);
    renderProjectBoard();
}


// 9. INVOICES LEDGER CONTROLLER
function renderInvoicesLedger() {
    const invoices = DB.get("invoices");
    const tbody = document.getElementById("invoices-ledger-tbody");
    tbody.innerHTML = "";

    if (invoices.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-slate-500">No invoices generated yet.</td></tr>`;
        return;
    }

    invoices.forEach(inv => {
        let badgeClass = "status-pending";
        let statusText = "Pending";
        if (inv.status === "paid") { badgeClass = "status-paid"; statusText = "Paid"; }
        if (inv.status === "overdue") { badgeClass = "status-overdue"; statusText = "Overdue"; }

        const tr = document.createElement("tr");
        tr.className = "border-b border-alphas-glassBorder/10 hover:bg-alphas-glass/20 transition-colors cursor-pointer";
        tr.onclick = () => inspectInvoice(inv.id);
        tr.innerHTML = `
            <td class="py-4 text-left font-mono font-bold">${inv.id}<br><span class="text-[9px] text-slate-500 font-medium">${inv.date}</span></td>
            <td class="py-4 text-left font-bold text-slate-200">${inv.clientName}</td>
            <td class="py-4 text-center font-mono font-bold">EGP ${inv.amount.toLocaleString()}</td>
            <td class="py-4 text-center"><span class="status-badge ${badgeClass}">${statusText}</span></td>
            <td class="py-4 text-center">
                <button onclick="event.stopPropagation(); deleteInvoice('${inv.id}')" class="text-red-500 hover:text-red-400 text-sm p-1.5"><i class='bx bx-trash'></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function searchInvoices() {
    const query = document.getElementById("invoice-search").value.toLowerCase();
    const rows = document.querySelectorAll("#invoices-ledger-tbody tr");
    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        row.style.display = name.includes(query) ? "" : "none";
    });
}

function inspectInvoice(id) {
    const invoices = DB.get("invoices");
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;

    const panel = document.getElementById("invoice-inspect-panel");
    panel.innerHTML = `
        <div class="space-y-4">
            <div class="flex justify-between border-b border-alphas-glassBorder/20 pb-2">
                <span class="text-slate-400">Invoice ID:</span>
                <strong class="text-white font-mono">${inv.id}</strong>
            </div>
            <div class="flex justify-between border-b border-alphas-glassBorder/20 pb-2">
                <span class="text-slate-400">Client:</span>
                <strong class="text-white text-right">${inv.clientName}</strong>
            </div>
            <div class="flex justify-between border-b border-alphas-glassBorder/20 pb-2">
                <span class="text-slate-400">Issued Date:</span>
                <strong class="text-white font-mono">${inv.date}</strong>
            </div>
            <div class="flex justify-between border-b border-alphas-glassBorder/20 pb-2">
                <span class="text-slate-400">Total Investment:</span>
                <strong class="text-alphas-accent font-mono text-sm">EGP ${inv.amount.toLocaleString()}</strong>
            </div>
            
            <div class="space-y-2">
                <span class="text-slate-400 font-bold block mb-1">Invoice Status</span>
                <select id="inspect-status-select" onchange="updateInvoiceStatus('${inv.id}')" class="w-full bg-slate-900 border border-alphas-glassBorder rounded-xl px-3 py-2 text-white outline-none">
                    <option value="pending" ${inv.status === 'pending' ? 'selected' : ''}>Pending Payment</option>
                    <option value="paid" ${inv.status === 'paid' ? 'selected' : ''}>Paid In Full</option>
                    <option value="overdue" ${inv.status === 'overdue' ? 'selected' : ''}>Overdue / Lapsed</option>
                </select>
            </div>

            <div class="pt-4 space-y-2">
                <button onclick="loadInvoiceToQuote('${inv.id}')" class="w-full py-2.5 bg-slate-900 border border-alphas-glassBorder hover:border-slate-500 text-slate-300 font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"><i class='bx bx-printer'></i> Load into Proposal Maker</button>
            </div>
        </div>
    `;
}

function updateInvoiceStatus(id) {
    const invoices = DB.get("invoices");
    const index = invoices.findIndex(i => i.id === id);
    if (index === -1) return;

    const newStatus = document.getElementById("inspect-status-select").value;
    invoices[index].status = newStatus;
    DB.save("invoices", invoices);
    renderInvoicesLedger();
}

function deleteInvoice(id) {
    if (confirm("Delete this invoice from the database ledger?")) {
        const invoices = DB.get("invoices");
        const filtered = invoices.filter(i => i.id !== id);
        DB.save("invoices", filtered);
        renderInvoicesLedger();
        document.getElementById("invoice-inspect-panel").innerHTML = `<div class="text-center text-slate-500 py-12">Select an invoice from the ledger to inspect, edit status, or export for printing.</div>`;
    }
}

function loadInvoiceToQuote(id) {
    const invoices = DB.get("invoices");
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;

    document.getElementById("quote-client-name").value = inv.clientName;
    switchTab("quotation");
    calculateQuotation();
}


// 10. CMS PORTAL CONTROLLER
function renderCMSView() {
    const cms = DB.get("cms");
    document.getElementById("cms-hero-title").value = cms.heroTitle;
    document.getElementById("cms-hero-subtitle").value = cms.heroSubtitle;
    document.getElementById("cms-formspree-id").value = cms.formspreeId;
    document.getElementById("cms-contact-email").value = cms.contactEmail;
    document.getElementById("cms-services-desc").value = cms.servicesDesc;

    updateCMSJSONPreview(cms);
}

function saveCMSConfig() {
    const updated = {
        heroTitle: document.getElementById("cms-hero-title").value,
        heroSubtitle: document.getElementById("cms-hero-subtitle").value,
        formspreeId: document.getElementById("cms-formspree-id").value,
        contactEmail: document.getElementById("cms-contact-email").value,
        servicesDesc: document.getElementById("cms-services-desc").value
    };

    DB.save("cms", updated);
    updateCMSJSONPreview(updated);
    alert("CMS configurations synchronized successfully in memory.");
}

function updateCMSJSONPreview(cms) {
    document.getElementById("cms-json-preview").value = JSON.stringify(cms, null, 4);
}

function copyCMSJSON() {
    const textarea = document.getElementById("cms-json-preview");
    textarea.select();
    document.execCommand("copy");
    alert("CMS Configuration JSON copied to clipboard!");
}


// 11. KNOWLEDGE BASE & AI AGENT console
const knowledgeModal = document.getElementById("knowledge-modal");

function renderKnowledgeView() {
    const articles = DB.get("kb");
    const container = document.getElementById("knowledge-articles-list");
    container.innerHTML = "";

    if (articles.length === 0) {
        container.innerHTML = `<div class="text-center text-slate-500 py-12 bg-alphas-glass rounded-2xl border border-alphas-glassBorder">No handbook documentation loaded. Add articles.</div>`;
    } else {
        articles.forEach(art => {
            const card = document.createElement("div");
            card.className = "glass-card rounded-2xl p-6 border border-alphas-glassBorder space-y-3";
            card.innerHTML = `
                <div class="flex justify-between items-start gap-4">
                    <div>
                        <span class="px-2 py-0.5 bg-slate-900 border border-alphas-glassBorder rounded text-[9px] font-bold text-alphas-accent uppercase tracking-wide mr-2">${art.category}</span>
                        <h4 class="text-base font-black text-white inline-block">${art.title}</h4>
                        <div class="text-[10px] text-slate-500 font-medium mt-1 font-mono">${art.date} • Authored by ${art.author}</div>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="editArticle('${art.id}')" class="text-blue-400 hover:text-blue-300 text-sm p-1.5"><i class='bx bx-edit-alt'></i></button>
                        <button onclick="deleteArticle('${art.id}')" class="text-red-500 hover:text-red-400 text-sm p-1.5"><i class='bx bx-trash'></i></button>
                    </div>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed pt-2 border-t border-alphas-glassBorder/20 whitespace-pre-line text-justify">${art.content}</p>
            `;
            container.appendChild(card);
        });
    }

    generateAIAgentPrompt();
}

function generateAIAgentPrompt() {
    const cms = DB.get("cms");
    const projects = DB.get("projects");
    
    // Generate AI instructions profile prompt
    const prompt = `[SYSTEM PROFILE: ALPHAS DIGITAL BUSINESS SOLUTIONS]
- Agency Identity: High-performance eCommerce engineering, Meta/Google Media Buying, and data-driven SMM strategy.
- Core Founders & Roles:
  * Mohamed Asy: CEO, Technical Lead & Developer. Responsible for web building, WooCommerce setups, and custom server infrastructure.
  * Abanoub Hany: COO, Performance Marketer & Media Buyer. Responsible for campaigns execution, tracking metrics, and branding assets.
- Financial Duo-Split Engine Rules:
  * Sales Closer receives 15% closer fee from gross revenue.
  * Operational costs (COGS) include hardware, servers, and execution fees (tech premium for developer, media premium for buyer).
  * 25% of project Net Profit (Revenue - COGS - Closer) is deposited into Capital Reserve Treasury.
  * Remaining Net Profit is split 50/50.
- Current Active CMS Settings:
  * Title: ${cms.heroTitle}
  * Tagline: ${cms.heroSubtitle}
  * Formspree Endpoint: https://formspree.io/${cms.formspreeId}
- Current Active Projects: ${projects.length} signed ledgers.

[AGENT GUIDELINE]
If modifying project files, comply with these business DNA constraints. Always check knowledge files and maintain aesthetic glassmorphic continuity.`;

    document.getElementById("ai-agent-prompt-output").value = prompt;
}

function copyAgentPrompt() {
    const textarea = document.getElementById("ai-agent-prompt-output");
    textarea.select();
    document.execCommand("copy");
    alert("AI Agent prompt copied to clipboard! Share it with coding assistants to align context.");
}

function openKnowledgeModal() {
    document.getElementById("knowledge-form-id").value = "";
    document.getElementById("knowledge-form").reset();
    document.getElementById("knowledge-modal-title").textContent = "Create New Handbook Article";
    knowledgeModal.classList.add("show");
}

function closeKnowledgeModal() {
    knowledgeModal.classList.remove("show");
}

function editArticle(id) {
    const articles = DB.get("kb");
    const art = articles.find(a => a.id === id);
    if (!art) return;

    document.getElementById("knowledge-form-id").value = art.id;
    document.getElementById("knowledge-form-title").value = art.title;
    document.getElementById("knowledge-form-category").value = art.category;
    document.getElementById("knowledge-form-author").value = art.author;
    document.getElementById("knowledge-form-content").value = art.content;

    document.getElementById("knowledge-modal-title").textContent = "Edit Handbook Article";
    knowledgeModal.classList.add("show");
}

function saveKnowledgeForm(e) {
    e.preventDefault();
    const id = document.getElementById("knowledge-form-id").value;
    const articles = DB.get("kb");

    const formData = {
        id: id || "kb_" + Date.now(),
        title: document.getElementById("knowledge-form-title").value,
        category: document.getElementById("knowledge-form-category").value,
        author: document.getElementById("knowledge-form-author").value,
        content: document.getElementById("knowledge-form-content").value,
        date: new Date().toISOString().split("T")[0]
    };

    if (id) {
        const index = articles.findIndex(a => a.id === id);
        articles[index] = formData;
    } else {
        articles.push(formData);
    }

    DB.save("kb", articles);
    closeKnowledgeModal();
    renderKnowledgeView();
}

function deleteArticle(id) {
    if (confirm("Delete this handbook article?")) {
        const articles = DB.get("kb");
        const filtered = articles.filter(a => a.id !== id);
        DB.save("kb", filtered);
        renderKnowledgeView();
    }
}


// 12. FREELANCE PLATFORM DEAL HUNTER SIMULATOR
let selectedGigId = null;
let activeGigPlatformFilter = "all";

function renderDealHunterFeed() {
    const gigs = DB.get("gigs");
    const container = document.getElementById("gigs-feed-container");
    container.innerHTML = "";

    const filtered = gigs.filter(g => {
        if (activeGigPlatformFilter === "all") return true;
        return g.platform === activeGigPlatformFilter;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div class="text-center text-slate-500 py-12 bg-alphas-glass rounded-2xl border border-alphas-glassBorder">No gigs loaded. Scan for new deals.</div>`;
        return;
    }

    filtered.forEach(gig => {
        let platColor = "border-emerald-500/20 text-emerald-400 bg-emerald-500/10";
        if (gig.platform === "Fiverr") platColor = "border-green-500/20 text-green-400 bg-green-500/10";
        if (gig.platform === "Freelancer") platColor = "border-blue-500/20 text-blue-400 bg-blue-500/10";
        if (gig.platform === "Behance") platColor = "border-red-500/20 text-red-400 bg-red-500/10";

        const div = document.createElement("div");
        div.className = `gig-item p-5 bg-slate-950/40 border border-alphas-glassBorder rounded-2xl cursor-pointer hover:border-slate-600 transition-all space-y-3 ${selectedGigId === gig.id ? 'selected' : ''}`;
        div.onclick = () => selectGig(gig.id);
        div.innerHTML = `
            <div class="flex justify-between items-start gap-4">
                <div>
                    <h4 class="text-sm font-black text-white">${gig.title}</h4>
                    <span class="text-[9px] text-slate-500 font-mono font-medium">${gig.date} • Budget: EGP ${(gig.budget*30).toLocaleString()} (approx)</span>
                </div>
                <span class="px-2 py-0.5 rounded border ${platColor} text-[8px] font-black uppercase tracking-wide">${gig.platform}</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed text-justify line-clamp-2">${gig.desc}</p>
        `;
        container.appendChild(div);
    });

    if (selectedGigId) {
        const gig = gigs.find(g => g.id === selectedGigId);
        if (gig) displayGigMeta(gig);
    }
}

function selectGig(id) {
    selectedGigId = id;
    renderDealHunterFeed();
}

function filterGigs(platform) {
    activeGigPlatformFilter = platform;
    document.querySelectorAll(".gig-platform-btn").forEach(btn => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");
    renderDealHunterFeed();
}

function searchGigs() {
    const query = document.getElementById("gig-search").value.toLowerCase();
    const items = document.querySelectorAll(".gig-item");
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? "" : "none";
    });
}

function simulateGigScan() {
    // Add a new mock gig to local storage to simulate scanning
    const gigs = DB.get("gigs");
    const freshGigs = [
        { id: "scan_" + Date.now() + "_1", title: "Scale Meta Ads for High-end Jewelry Shop", platform: "Upwork", budget: 2200, category: "Ads Management", desc: "Need an agency to scale conversions. We want pixels and server-side tracking (CAPI) optimized immediately. Prior work in Gulf or Middle East preferred.", date: "Just now" },
        { id: "scan_" + Date.now() + "_2", title: "Arabic E-commerce Web Redesign & Speedup", platform: "Freelancer", budget: 1800, category: "Web Development", desc: "Redesign our website from basic HTML to a premium glassmorphic portal with custom filters, GSAP, and WooCommerce automation. Page loading must be under 1.5s.", date: "Just now" }
    ];

    freshGigs.forEach(g => gigs.unshift(g));
    DB.save("gigs", gigs);
    alert("Deal Hunter scanner returned 2 new live listings matching SMM and Web Dev keywords!");
    renderDealHunterFeed();
}

function displayGigMeta(gig) {
    const meta = document.getElementById("pitch-gig-meta");
    meta.innerHTML = `
        <h4 class="font-black text-white">${gig.title}</h4>
        <p class="text-slate-400">${gig.platform} • Budget approx: EGP ${(gig.budget*30).toLocaleString()}</p>
        <p class="italic text-slate-500 line-clamp-3">${gig.desc}</p>
    `;
    meta.classList.remove("hidden");
    generatePitchText();
}

function generatePitchText() {
    if (!selectedGigId) return;
    const gigs = DB.get("gigs");
    const gig = gigs.find(g => g.id === selectedGigId);
    if (!gig) return;

    const style = document.getElementById("pitch-style").value;
    let pitch = "";

    if (style === "premium") {
        pitch = `Dear Client,\n\nI reviewed your listing for "${gig.title}". At ALPHAS, we engineer custom digital solutions that translate directly into gross margins. We specialize in premium layouts, responsive UX, and server-side metrics tracking.\n\nOur service architecture is built on a duopoly structure: our Dev Partner Mohamed Asy manages technical execution, while Abanoub Hany manages performance metrics. For this project, we suggest setting up server-side CAPI tracking alongside a custom glassmorphic template.\n\nLet's schedule a call to review details.\n\nBest regards,\nAlphas DBS Team`;
    } else if (style === "lean") {
        pitch = `Hello,\n\nWe would love to help you deploy "${gig.title}". We offer fast delivery of WooCommerce architectures and SMM domination packages.\n\nHere is how we work: we extract COGS immediately and run lean operations so you get the best outcome for your EGP ${(gig.budget*30).toLocaleString()} budget. Our CEO Mohamed Asy manages technical implementation directly.\n\nLet's hop on a call to start this week.\n\nBest,\nAlphas Team`;
    } else {
        pitch = `Hi there,\n\nRegarding the technical specifications for "${gig.title}", we can conduct a full-scale code audit and tracking integration.\n\nWe bypass iOS tracking blocks using Google Tag Manager Server-Side Workers. Our lead developer, Mohamed Asy, has deployed high-scale, zero-downtime portals for 14,000+ users. We will implement server-side tracking, clean CAPI deduplication, and optimize page load speeds.\n\nLooking forward to aligning on details.\n\nRegards,\nAlphas Digital Business Solutions`;
    }

    document.getElementById("ai-pitch-output").value = pitch;
}

function copyPitchText() {
    const textarea = document.getElementById("ai-pitch-output");
    textarea.select();
    document.execCommand("copy");
    alert("Custom proposal pitch copied to clipboard! Paste it directly into the freelance portal.");
}


// 13. SYSTEM BACKUP MODULE
function updateBackupView() {
    const dbBackup = {
        leads: DB.get("leads"),
        projects: DB.get("projects"),
        invoices: DB.get("invoices"),
        cms: DB.get("cms"),
        kb: DB.get("kb"),
        gigs: DB.get("gigs")
    };

    document.getElementById("export-json-preview").value = JSON.stringify(dbBackup, null, 4);
}

function downloadBackupJSON() {
    const data = document.getElementById("export-json-preview").value;
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alphas_db_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("Alphas database backup JSON downloaded successfully!");
}

function handleImportJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.leads && data.projects && data.invoices && data.cms && data.kb && data.gigs) {
                DB.save("leads", data.leads);
                DB.save("projects", data.projects);
                DB.save("invoices", data.invoices);
                DB.save("cms", data.cms);
                DB.save("kb", data.kb);
                DB.save("gigs", data.gigs);
                alert("Database backup imported successfully! Reloading views.");
                location.reload();
            } else {
                alert("Invalid schema! Backup file must contain leads, projects, invoices, cms, kb, and gigs namespaces.");
            }
        } catch (err) {
            alert("Error parsing JSON file: " + err.message);
        }
    };
    reader.readAsText(file);
}

// 14. GLOBAL SEARCH RUNNER
function runGlobalSearch() {
    const query = document.getElementById("global-search").value.toLowerCase();
    if (!query) return;

    // Detect which tab is active, filter lists accordingly
    const activeSection = document.querySelector(".view-section.active");
    if (activeSection.id === "crm") {
        document.getElementById("crm-search").value = query;
        searchLeads();
    } else if (activeSection.id === "invoices") {
        document.getElementById("invoice-search").value = query;
        searchInvoices();
    } else if (activeSection.id === "dealhunter") {
        document.getElementById("gig-search").value = query;
        searchGigs();
    } else {
        // Auto navigate to active records for other sections
        alert(`Global Search: Query "${query}" matched. Try searching in CRM, Invoices, or Deal Hunter tabs!`);
    }
}
