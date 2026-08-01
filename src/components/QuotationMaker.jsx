import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Layers, Calculator, UserCheck, PieChart, Info, RefreshCw, Edit3, AlertTriangle, CheckCircle2, Menu, X, Lock, Check } from 'lucide-react';

/**
 * ALPHAS OS - Service Design & Financial Architecture Specification v4.1
 * 
 * Version: 4.1 (Active Production Specification)
 * Entity: ALPHAS - Digital Business Solutions
 * Architecture Standard: Lean Duopoly Financial Split & 40% Execution Cost Cap
 * 
 * Financial Breakdown Rules:
 * 1. 40% Max COGS Task Execution Cap
 * 2. 15% Sales Closer Fee
 * 3. 45% Gross Operating Profit Pool ($100% - 40% - 15% = 45%$)
 * 4. 25% Capital Reserve Rule
 * 5. 50/50 Distributable Net Profit Split
 */

export const CANONICAL_SERVICE_TASKS_V41 = {
  web_engineering: [
    { id: "t_web_1", name: "Web Architecture & Custom Development", assignee: "Asy", percentage: 22 },
    { id: "t_web_2", name: "UI/UX Wireframing & Asset Design", assignee: "Editor/Freelancer", percentage: 10 },
    { id: "t_web_3", name: "Domain, Staging Hosting, SSL & Plugins", assignee: "Overhead", percentage: 4 },
    { id: "t_web_4", name: "QA, Speed Optimization & Gateway Integration", assignee: "Asy", percentage: 4 }
  ],
  media_buying: [
    { id: "t_ads_1", name: "Campaign Strategy, Audience & Media Buying", assignee: "Abanoub", percentage: 20 },
    { id: "t_ads_2", name: "Server-Side Pixel (CAPI), GTM & Analytics", assignee: "Asy", percentage: 10 },
    { id: "t_ads_3", name: "Ad Copywriting, Creatives & Motion Visuals", assignee: "Editor/Freelancer", percentage: 6 },
    { id: "t_ads_4", name: "Analytics Tools & Research Software", assignee: "Overhead", percentage: 4 }
  ],
  social_media: [
    { id: "t_smm_1", name: "Graphic Design, Reels & Video Production", assignee: "Editor/Freelancer", percentage: 20 },
    { id: "t_smm_2", name: "Content Strategy, Angles & Copywriting", assignee: "Abanoub", percentage: 14 },
    { id: "t_smm_3", name: "AI Automation & Scheduling Platforms", assignee: "Overhead", percentage: 6 }
  ],
  store_management: [
    { id: "t_mgmt_1", name: "Security Audits, Staging Backups & Core Updates", assignee: "Asy", percentage: 16 },
    { id: "t_mgmt_2", name: "Catalog Management & Inventory Operations", assignee: "Operations", percentage: 14 },
    { id: "t_mgmt_3", name: "On-Page SEO & Content Maintenance", assignee: "Abanoub", percentage: 6 },
    { id: "t_mgmt_4", name: "Uptime Monitoring & Server Maintenance Tools", assignee: "Overhead", percentage: 4 }
  ],
  consulting: [
    { id: "t_cons_1", name: "Diagnostic Session & Technical/Growth Leadership", assignee: "Shared", percentage: 30 },
    { id: "t_cons_2", name: "Strategic Roadmap, Blueprint & Action Plan", assignee: "Lead Consultant", percentage: 8 },
    { id: "t_cons_3", name: "Diagnostic Software & Audit Tools", assignee: "Overhead", percentage: 2 }
  ],
  academy: [
    { id: "t_acad_1", name: "Live Workshop Instruction & Technical Delivery", assignee: "Shared", percentage: 26 },
    { id: "t_acad_2", name: "Courseware, Exercises & Curriculum Preparation", assignee: "Instructors", percentage: 10 },
    { id: "t_acad_3", name: "LMS Platform, Digital Badges & Certification", assignee: "Overhead", percentage: 4 }
  ]
};

const INITIAL_SERVICES_V41 = [
  {
    serviceId: "web_engineering",
    name: "Web Engineering & Stores",
    icon: "code",
    isEnabled: true,
    executionPaidTo: "Asy",
    selectedTierId: "ecommerce",
    tiers: [
      { id: "starter", name: "Starter Web Build", price: 11500 },
      { id: "essential", name: "Essential CMS Development", price: 23000 },
      { id: "ecommerce", name: "Ecommerce Web & Custom Integrations", price: 34500 }
    ],
    tasks: CANONICAL_SERVICE_TASKS_V41.web_engineering
  },
  {
    serviceId: "store_management",
    name: "Store Support & Management",
    icon: "gears",
    isEnabled: false,
    executionPaidTo: "Asy",
    selectedTierId: "bronze",
    tiers: [
      { id: "bronze", name: "Bronze Store Management", price: 5750 },
      { id: "silver", name: "Silver Support & SEO", price: 8625 },
      { id: "gold", name: "Gold Full-Service Ops", price: 11500 }
    ],
    tasks: CANONICAL_SERVICE_TASKS_V41.store_management
  },
  {
    serviceId: "social_media",
    name: "Social Media Marketing (SMM)",
    icon: "hashtag",
    isEnabled: false,
    executionPaidTo: "Abanoub",
    selectedTierId: "growth",
    tiers: [
      { id: "kickstart", name: "SMM Kickstart", price: 7245 },
      { id: "growth", name: "SMM Growth Plan", price: 11592 },
      { id: "domination", name: "SMM Domination Package", price: 16100 }
    ],
    tasks: CANONICAL_SERVICE_TASKS_V41.social_media
  },
  {
    serviceId: "media_buying",
    name: "Media Buying & Ads",
    icon: "bullseye",
    isEnabled: true,
    executionPaidTo: "Abanoub",
    selectedTierId: "ecommerce",
    tiers: [
      { id: "starter", name: "Starter Ads Meta/Google Campaign", price: 5750 },
      { id: "essential", name: "Essential Multi-channel Campaigns", price: 11500 },
      { id: "ecommerce", name: "Ecommerce Full Meta/Google Sync", price: 17250 }
    ],
    tasks: CANONICAL_SERVICE_TASKS_V41.media_buying
  },
  {
    serviceId: "consulting",
    name: "Strategic Consulting",
    icon: "user-tie",
    isEnabled: false,
    executionPaidTo: "Asy",
    selectedTierId: "technical",
    tiers: [
      { id: "technical", name: "Technical Code Architecture (10 hrs)", price: 17250 },
      { id: "growth", name: "Growth & CRO Optimization (10 hrs)", price: 17250 },
      { id: "enterprise", name: "Enterprise Strategy Session (10 hrs)", price: 23000 }
    ],
    tasks: CANONICAL_SERVICE_TASKS_V41.consulting
  },
  {
    serviceId: "academy",
    name: "Corporate Academy Training",
    icon: "graduation-cap",
    isEnabled: false,
    executionPaidTo: "Asy",
    selectedTierId: "woocommerce",
    tiers: [
      { id: "woocommerce", name: "WooCommerce Website Setup (5 Students)", price: 14375 },
      { id: "mediabuying", name: "Media Buying Tracking (5 Students)", price: 14375 },
      { id: "crm", name: "CRM Pipeline Automation (5 Students)", price: 14375 }
    ],
    tasks: CANONICAL_SERVICE_TASKS_V41.academy
  }
];

export default function QuotationMaker() {
  const [clientName, setClientName] = useState("مؤسسة البزنس الطموح");
  const [closerPartner, setCloserPartner] = useState("asy");
  const [services, setServices] = useState(INITIAL_SERVICES_V41);
  const [physicalMerchandiseOverhead, setPhysicalMerchandiseOverhead] = useState(0);
  const [fixedDirectCosts, setFixedDirectCosts] = useState(0);
  
  // Mobile UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("quotation");
  const [isDealLocked, setIsDealLocked] = useState(false);

  const handleToggleService = (serviceId) => {
    setServices((prev) =>
      prev.map((s) => (s.serviceId === serviceId ? { ...s, isEnabled: !s.isEnabled } : s))
    );
  };

  const handleTierChange = (serviceId, tierId) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.serviceId !== serviceId) return s;
        const defaultTasks = CANONICAL_SERVICE_TASKS_V41[serviceId] || [];
        return {
          ...s,
          selectedTierId: tierId,
          tasks: defaultTasks.map((t) => ({ ...t, id: `t_${Date.now()}_${Math.random().toString(36).substr(2, 4)}` }))
        };
      })
    );
  };

  const handleTierPriceChange = (serviceId, tierId, newPrice) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.serviceId !== serviceId) return s;
        const updatedTiers = s.tiers.map((t) => (t.id === tierId ? { ...t, price: parseFloat(newPrice) || 0 } : t));
        return { ...s, tiers: updatedTiers };
      })
    );
  };

  const handleAddTask = (serviceId) => {
    const newTask = {
      id: `t_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: "Custom Deliverable Task",
      assignee: serviceId === "media_buying" || serviceId === "social_media" ? "Abanoub" : "Asy",
      percentage: 5
    };
    setServices((prev) =>
      prev.map((s) => (s.serviceId === serviceId ? { ...s, tasks: [...s.tasks, newTask] } : s))
    );
  };

  const handleResetDefaultTasks = (serviceId) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.serviceId !== serviceId) return s;
        const defaultTasks = CANONICAL_SERVICE_TASKS_V41[serviceId] || [];
        return {
          ...s,
          tasks: defaultTasks.map((t) => ({ ...t, id: `t_${Date.now()}_${Math.random().toString(36).substr(2, 4)}` }))
        };
      })
    );
  };

  const handleUpdateTask = (serviceId, taskId, field, value) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.serviceId !== serviceId) return s;
        const updatedTasks = s.tasks.map((t) =>
          t.id === taskId ? { ...t, [field]: field === 'percentage' ? parseFloat(value) || 0 : value } : t
        );
        return { ...s, tasks: updatedTasks };
      })
    );
  };

  const handleRemoveTask = (serviceId, taskId) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.serviceId !== serviceId) return s;
        return { ...s, tasks: s.tasks.filter((t) => t.id !== taskId) };
      })
    );
  };

  const handleLockDeal = () => {
    setIsDealLocked(true);
    setTimeout(() => setIsDealLocked(false), 3000);
  };

  // Real-time Financial Cascade (v4.1 Matrix)
  const financialSummary = useMemo(() => {
    let grossRevenue = 0;
    let totalTaskCosts = 0;
    const partnerTaskEarnings = { Asy: 0, Abanoub: 0, Shared: 0 };
    const customTaskEarnings = {};

    const processedServices = services.map((s) => {
      const selectedTier = s.tiers.find((t) => t.id === s.selectedTierId) || s.tiers[0];
      const packagePrice = s.isEnabled ? selectedTier.price : 0;
      if (s.isEnabled) grossRevenue += packagePrice;

      const processedTasks = s.tasks.map((t) => {
        const percentage = Number(t.percentage) || 0;
        const calculatedCost = s.isEnabled ? packagePrice * (percentage / 100) : 0;
        return { ...t, calculatedCost };
      });

      if (s.isEnabled) {
        processedTasks.forEach((t) => {
          totalTaskCosts += t.calculatedCost;
          if (t.assignee === 'Asy') partnerTaskEarnings.Asy += t.calculatedCost;
          else if (t.assignee === 'Abanoub') partnerTaskEarnings.Abanoub += t.calculatedCost;
          else if (t.assignee === 'Shared') {
            partnerTaskEarnings.Asy += t.calculatedCost / 2;
            partnerTaskEarnings.Abanoub += t.calculatedCost / 2;
          } else {
            customTaskEarnings[t.assignee] = (customTaskEarnings[t.assignee] || 0) + t.calculatedCost;
          }
        });
      }

      return {
        ...s,
        selectedPackagePrice: packagePrice,
        selectedTier,
        tasks: processedTasks
      };
    });

    const totalCOGS = totalTaskCosts + Number(physicalMerchandiseOverhead) + Number(fixedDirectCosts);
    const closerFee = grossRevenue * 0.15;
    const grossOperatingProfit = Math.max(0, grossRevenue - totalCOGS - closerFee);
    const capitalReserve = grossOperatingProfit * 0.25;
    const netDistributableProfit = grossOperatingProfit - capitalReserve;
    const profitSharePerPartner = netDistributableProfit * 0.50;

    const asyCloserFee = closerPartner === 'asy' ? closerFee : 0;
    const abanoubCloserFee = closerPartner === 'abanoub' ? closerFee : 0;

    return {
      processedServices,
      grossRevenue,
      totalTaskCosts,
      totalCOGS,
      closerFee,
      grossOperatingProfit,
      capitalReserve,
      netDistributableProfit,
      profitSharePerPartner,
      partnerTaskEarnings,
      customTaskEarnings,
      asyTotalPayout: profitSharePerPartner + partnerTaskEarnings.Asy + asyCloserFee,
      abanoubTotalPayout: profitSharePerPartner + partnerTaskEarnings.Abanoub + abanoubCloserFee
    };
  }, [services, physicalMerchandiseOverhead, fixedDirectCosts, closerPartner]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-28 md:pb-12">
      
      {/* Mobile Top Sticky Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-slate-300 hover:text-white p-2.5 rounded-xl bg-slate-900 border border-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="w-5 h-5 text-blue-400" />
          </button>
          <div>
            <span className="text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md">
              ALPHAS OS v4.1
            </span>
            <h1 className="text-sm sm:text-base font-extrabold text-white leading-tight">Quotation Maker</h1>
          </div>
        </div>

        {/* Desktop Header Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2 min-h-[44px]">
            <span className="text-xs text-slate-400">Client:</span>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="bg-transparent text-xs font-bold text-white outline-none w-36 sm:w-44"
            />
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2 min-h-[44px]">
            <span className="text-xs text-slate-400">Closer (15%):</span>
            <select
              value={closerPartner}
              onChange={(e) => setCloserPartner(e.target.value)}
              className="bg-transparent text-xs font-bold text-blue-400 outline-none cursor-pointer"
            >
              <option value="asy" className="bg-slate-900 text-white">Mohamed Asy</option>
              <option value="abanoub" className="bg-slate-900 text-white">Abanoub</option>
            </select>
          </div>
        </div>
      </header>

      {/* Slide-over Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-xs bg-slate-950 border-r border-slate-800 p-5 flex flex-col justify-between z-10 space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-sm">
                    A
                  </div>
                  <span className="font-extrabold text-white text-base">ALPHAS OS</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2">
                {[
                  { id: "overview", label: "Executive Dashboard", icon: Layers },
                  { id: "crm", label: "CRM & Leads Management", icon: UserCheck },
                  { id: "quotation", label: "Quotation Maker & Split", icon: PieChart },
                  { id: "projects", label: "Project Board & Delivery", icon: Calculator }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-left transition-all min-h-[44px] ${
                      activeTab === item.id
                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="border-t border-slate-800 pt-4 text-center">
              <p className="text-[11px] font-mono text-slate-500">ALPHAS Digital Business Solutions v4.1</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 pt-4 md:pt-8 space-y-6">
        
        {/* Mobile Header Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:hidden bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Client Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-base font-bold text-white outline-none focus:border-blue-500 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">Sales Closer (15%)</label>
            <select
              value={closerPartner}
              onChange={(e) => setCloserPartner(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-base font-bold text-blue-400 outline-none min-h-[44px]"
            >
              <option value="asy">Mohamed Asy</option>
              <option value="abanoub">Abanoub</option>
            </select>
          </div>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Column 1: Core Service Pillars (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                Core Pillars & Services
              </h2>
              <span className="text-[11px] sm:text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                40% Execution Cap
              </span>
            </div>

            <div className="space-y-4">
              {financialSummary.processedServices.map((service) => {
                const totalTaskPercent = service.tasks.reduce((sum, t) => sum + (Number(t.percentage) || 0), 0);
                const isOverCap = totalTaskPercent > 40;

                return (
                  <div
                    key={service.serviceId}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                      service.isEnabled
                        ? isOverCap
                          ? "bg-slate-900/70 border-red-500/50 shadow-lg shadow-red-500/5"
                          : "bg-slate-900/70 border-blue-500/40 shadow-lg shadow-blue-500/5"
                        : "bg-slate-900/30 border-slate-800/80 opacity-70"
                    }`}
                  >
                    {/* Service Header Bar */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          service.isEnabled ? "bg-blue-600/20 text-blue-400" : "bg-slate-800 text-slate-500"
                        }`}>
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">{service.name}</h3>
                          {service.isEnabled && (
                            <span className="text-[11px] font-mono text-emerald-400 font-bold">
                              EGP {service.selectedPackagePrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer min-h-[44px] min-w-[44px] justify-end">
                        <input
                          type="checkbox"
                          checked={service.isEnabled}
                          onChange={() => handleToggleService(service.serviceId)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:right-[22px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {/* Expandable Sub-panel Drawer */}
                    {service.isEnabled && (
                      <div className="mt-4 pt-3.5 border-t border-slate-800/60 space-y-4">
                        
                        {/* Bundle Selector & Price */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                          <div className="sm:col-span-7">
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Bundle / Package Tier
                            </label>
                            <select
                              value={service.selectedTierId}
                              onChange={(e) => handleTierChange(service.serviceId, e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-base sm:text-xs font-bold text-slate-200 outline-none focus:border-blue-500 cursor-pointer min-h-[44px]"
                            >
                              {service.tiers.map((tier) => (
                                <option key={tier.id} value={tier.id}>
                                  {tier.name} (EGP {tier.price.toLocaleString()})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="sm:col-span-5">
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1">
                              <Edit3 className="w-3 h-3 text-blue-400" /> Package Price (EGP)
                            </label>
                            <input
                              type="number"
                              value={service.selectedTier.price}
                              onChange={(e) => handleTierPriceChange(service.serviceId, service.selectedTierId, e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-base sm:text-xs font-mono font-bold text-white outline-none focus:border-blue-500 min-h-[44px]"
                            />
                          </div>
                        </div>

                        {/* Task Breakdown Drawer Sub-panel */}
                        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 sm:p-3.5 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                                Canonical Task Breakdown
                              </span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold flex items-center gap-1 ${
                                isOverCap
                                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              }`}>
                                {isOverCap ? <AlertTriangle className="w-3 h-3 text-red-400" /> : <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                                {totalTaskPercent}% / 40% Max
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleResetDefaultTasks(service.serviceId)}
                                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg px-2 py-1.5 font-semibold flex items-center gap-1 min-h-[36px]"
                                title="Reset tasks to canonical v4.1 template"
                              >
                                <RefreshCw className="w-3 h-3" /> Reset v4.1
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAddTask(service.serviceId)}
                                className="text-[10px] bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg px-2.5 py-1.5 font-bold flex items-center gap-1 min-h-[36px]"
                              >
                                <Plus className="w-3.5 h-3.5" /> Add Task
                              </button>
                            </div>
                          </div>

                          {/* Over-Cap Warning Banner */}
                          {isOverCap && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2.5 text-[11px] text-red-300 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                              <span>Execution cost ({totalTaskPercent}%) exceeds the 40% limit!</span>
                            </div>
                          )}

                          {/* Dynamic Task Rows */}
                          {service.tasks.length === 0 ? (
                            <p className="text-[11px] text-slate-500 italic text-center py-2">
                              No tasks defined. Click "+ Add Task" or "Reset v4.1".
                            </p>
                          ) : (
                            <div className="space-y-2.5">
                              {service.tasks.map((task) => (
                                <div key={task.id} className="bg-slate-900/90 rounded-xl p-2.5 sm:p-2 border border-slate-800/80 space-y-2 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-2 sm:items-center">
                                  
                                  {/* Task Name (5 cols) */}
                                  <div className="sm:col-span-5">
                                    <input
                                      type="text"
                                      placeholder="Task Name"
                                      value={task.name}
                                      onChange={(e) =>
                                        handleUpdateTask(service.serviceId, task.id, "name", e.target.value)
                                      }
                                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-base sm:text-xs text-slate-100 outline-none focus:border-blue-500 min-h-[40px] sm:min-h-[32px]"
                                    />
                                  </div>

                                  {/* Assignee & Percentage & EGP Output */}
                                  <div className="grid grid-cols-12 gap-2 items-center sm:contents">
                                    <div className="col-span-6 sm:col-span-3">
                                      <select
                                        value={task.assignee}
                                        onChange={(e) =>
                                          handleUpdateTask(service.serviceId, task.id, "assignee", e.target.value)
                                        }
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-base sm:text-xs text-slate-300 outline-none focus:border-blue-500 min-h-[40px] sm:min-h-[32px]"
                                      >
                                        <option value="Asy">Mohamed Asy</option>
                                        <option value="Abanoub">Abanoub Hany</option>
                                        <option value="Shared">Shared Leadership</option>
                                        <option value="Editor/Freelancer">External Creative</option>
                                        <option value="Operations">Ops Specialist</option>
                                        <option value="Overhead">Technical Overhead</option>
                                        <option value="Lead Consultant">Lead Consultant</option>
                                        <option value="Instructors">Instructors</option>
                                      </select>
                                    </div>

                                    <div className="col-span-3 sm:col-span-2 flex items-center gap-1">
                                      <input
                                        type="number"
                                        min="0"
                                        max="40"
                                        placeholder="%"
                                        value={task.percentage}
                                        onChange={(e) =>
                                          handleUpdateTask(service.serviceId, task.id, "percentage", e.target.value)
                                        }
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-1.5 py-2 text-base sm:text-xs text-white font-mono text-center font-bold outline-none focus:border-blue-500 min-h-[40px] sm:min-h-[32px]"
                                      />
                                      <span className="text-xs font-bold text-slate-400">%</span>
                                    </div>

                                    <div className="col-span-3 sm:col-span-2 flex items-center justify-between pl-1">
                                      <span className="text-xs font-mono font-bold text-emerald-400">
                                        EGP {Math.round(task.calculatedCost).toLocaleString()}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveTask(service.serviceId, task.id)}
                                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 min-h-[40px] min-w-[40px] sm:min-h-[32px] sm:min-w-[32px] flex items-center justify-center"
                                        title="Remove Task"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>

                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Direct Costs & Physical Overhead Panel */}
            <div className="p-3.5 sm:p-4 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-400" />
                Digital Infrastructure & Direct Expenses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Physical Swatch / Merchandise Overhead (EGP)</label>
                  <input
                    type="number"
                    value={physicalMerchandiseOverhead}
                    onChange={(e) => setPhysicalMerchandiseOverhead(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-base sm:text-xs font-mono font-bold text-white outline-none focus:border-amber-400 min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Fixed Infrastructure Direct Costs (EGP)</label>
                  <input
                    type="number"
                    value={fixedDirectCosts}
                    onChange={(e) => setFixedDirectCosts(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-base sm:text-xs font-mono font-bold text-white outline-none focus:border-amber-400 min-h-[44px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Duo Split Statement (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-sm sm:text-base font-extrabold text-white">DUO SPLIT STATEMENT v4.1</h2>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold px-2 py-0.5 rounded-full">
                  45% PROFIT POOL
                </span>
              </div>

              {/* Metrics Summary */}
              <div className="space-y-2.5 font-mono text-xs">
                
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Gross Revenue (100%)</span>
                  <span className="text-sm font-bold text-white">
                    EGP {financialSummary.grossRevenue.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">Total Direct COGS (Max 40%)</span>
                    <div className="group relative cursor-pointer">
                      <Info className="w-3.5 h-3.5 text-slate-500" />
                      <div className="hidden group-hover:block absolute left-0 bottom-6 w-56 p-2 bg-slate-950 border border-slate-800 text-[10px] text-slate-300 rounded-lg shadow-xl z-20 font-sans">
                        Task execution costs strictly capped at 40% max per service tier.
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-amber-400">
                    EGP {financialSummary.totalCOGS.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Sales Closer Fee (15%)</span>
                  <span className="text-sm font-bold text-blue-400">
                    EGP {financialSummary.closerFee.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-800/60 bg-slate-950/60 px-3 rounded-xl border border-slate-800">
                  <span className="text-slate-300 font-bold">Gross Operating Profit (45%)</span>
                  <span className="text-sm font-extrabold text-emerald-400">
                    EGP {financialSummary.grossOperatingProfit.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Capital Reserve (25% of Ops Profit)</span>
                  <span className="text-sm font-bold text-slate-400">
                    EGP {financialSummary.capitalReserve.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Distributable Net Profit</span>
                  <span className="text-sm font-bold text-slate-200">
                    EGP {financialSummary.netDistributableProfit.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 text-slate-400">
                  <span>50/50 Partner Net Profit Split</span>
                  <span className="font-bold text-white">
                    EGP {financialSummary.profitSharePerPartner.toLocaleString()} / partner
                  </span>
                </div>
              </div>

              {/* Partner Net Payout Breakdown Cards */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-blue-400" />
                  Partner Net Payout Summary
                </h3>

                {/* Mohamed Asy Card */}
                <div className="p-3.5 bg-slate-950/80 border border-blue-500/30 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-300">Mohamed Asy (CEO & Dev)</span>
                    <span className="text-sm font-mono font-extrabold text-blue-400">
                      EGP {financialSummary.asyTotalPayout.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-400 font-mono">
                    <div>Profit: EGP {financialSummary.profitSharePerPartner.toLocaleString()}</div>
                    <div>Exec: EGP {financialSummary.partnerTaskEarnings.Asy.toLocaleString()}</div>
                    <div>Closer: EGP {(closerPartner === 'asy' ? financialSummary.closerFee : 0).toLocaleString()}</div>
                  </div>
                </div>

                {/* Abanoub Hany Card */}
                <div className="p-3.5 bg-slate-950/80 border border-purple-500/30 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-purple-300">Abanoub Hany (COO & Media)</span>
                    <span className="text-sm font-mono font-extrabold text-purple-400">
                      EGP {financialSummary.abanoubTotalPayout.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-[10px] text-slate-400 font-mono">
                    <div>Profit: EGP {financialSummary.profitSharePerPartner.toLocaleString()}</div>
                    <div>Exec: EGP {financialSummary.partnerTaskEarnings.Abanoub.toLocaleString()}</div>
                    <div>Closer: EGP {(closerPartner === 'abanoub' ? financialSummary.closerFee : 0).toLocaleString()}</div>
                  </div>
                </div>

                {/* External Task Allocations */}
                {Object.keys(financialSummary.customTaskEarnings).length > 0 && (
                  <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                    <span className="text-[11px] font-bold text-amber-400 block">External & Overhead Allocations (COGS)</span>
                    {Object.entries(financialSummary.customTaskEarnings).map(([assignee, amount]) => (
                      <div key={assignee} className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">{assignee}:</span>
                        <span className="font-bold text-amber-300">EGP {amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Sticky Bottom Action Bar for Mobile Viewports */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 px-4 py-3 shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Gross Revenue</span>
          <span className="text-sm font-mono font-extrabold text-emerald-400">
            EGP {financialSummary.grossRevenue.toLocaleString()}
          </span>
        </div>

        <button
          onClick={handleLockDeal}
          disabled={isDealLocked}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all min-h-[44px] ${
            isDealLocked
              ? "bg-emerald-600 text-white"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20"
          }`}
        >
          {isDealLocked ? (
            <>
              <Check className="w-4 h-4" /> Locked to Ledger
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" /> Lock Deal & Payouts
            </>
          )}
        </button>
      </div>

    </div>
  );
}
