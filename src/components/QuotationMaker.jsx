import React, { useState, useMemo } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, Layers, DollarSign, Calculator, UserCheck, PieChart, Info } from 'lucide-react';

/**
 * ALPHAS OS - Quotation Maker & Financial Split Engine
 * 
 * Supports dynamic task breakdown per active service pillar, percentage-based cost allocations,
 * real-time COGS aggregation, and automated Duo Split Statement cascade.
 */

const DEFAULT_SERVICES = [
  {
    serviceId: "web_engineering",
    name: "Web Engineering & Stores",
    icon: "code",
    isEnabled: true,
    executionPaidTo: "Asy",
    tiers: [
      { id: "starter", name: "Starter Web Build", price: 11500 },
      { id: "essential", name: "Essential CMS Development", price: 23000 },
      { id: "ecommerce", name: "Ecommerce Web & Custom Integrations", price: 34500 }
    ],
    selectedTierId: "ecommerce",
    tasks: [
      { id: "t1", name: "Custom Woo Integration", assignee: "Asy", percentage: 10 },
      { id: "t2", name: "Motion Animations (GSAP)", assignee: "Editor/Freelancer", percentage: 5 }
    ]
  },
  {
    serviceId: "store_management",
    name: "Store Support & Management",
    icon: "gears",
    isEnabled: false,
    executionPaidTo: "Asy",
    tiers: [
      { id: "bronze", name: "Bronze Management", price: 5750 },
      { id: "silver", name: "Silver Support & SEO", price: 8625 },
      { id: "gold", name: "Gold Full-Service Ops", price: 11500 }
    ],
    selectedTierId: "bronze",
    tasks: [
      { id: "t3", name: "Monthly SEO & Technical Audit", assignee: "Asy", percentage: 15 }
    ]
  },
  {
    serviceId: "social_media",
    name: "Social Media Marketing (SMM)",
    icon: "hashtag",
    isEnabled: false,
    executionPaidTo: "Abanoub",
    tiers: [
      { id: "kickstart", name: "SMM Kickstart", price: 5175 },
      { id: "growth", name: "SMM Growth Plan", price: 8280 },
      { id: "domination", name: "SMM Domination Package", price: 11500 }
    ],
    selectedTierId: "growth",
    tasks: [
      { id: "t4", name: "Content Creation & Copywriting", assignee: "Abanoub", percentage: 20 }
    ]
  },
  {
    serviceId: "media_buying",
    name: "Media Buying & Ads",
    icon: "bullseye",
    isEnabled: true,
    executionPaidTo: "Abanoub",
    tiers: [
      { id: "starter", name: "Starter Ads Meta/Google Campaign", price: 5750 },
      { id: "essential", name: "Essential Multi-channel Campaigns", price: 11500 },
      { id: "ecommerce", name: "Ecommerce Full Meta/Google Sync", price: 17250 }
    ],
    selectedTierId: "ecommerce",
    tasks: [
      { id: "t5", name: "Meta & Google Pixel Setup", assignee: "Abanoub", percentage: 12 },
      { id: "t6", name: "High-Converting Ad Creatives", assignee: "Freelancer", percentage: 8 }
    ]
  },
  {
    serviceId: "consulting",
    name: "Strategic Consulting",
    icon: "user-tie",
    isEnabled: false,
    executionPaidTo: "Asy",
    tiers: [
      { id: "technical", name: "Technical Code Architecture (10 hrs)", price: 17250 },
      { id: "growth", name: "Growth & CRO Optimization (10 hrs)", price: 17250 },
      { id: "enterprise", name: "Enterprise Strategy Session (10 hrs)", price: 23000 }
    ],
    selectedTierId: "technical",
    tasks: [
      { id: "t7", name: "Architecture Review & Blueprint", assignee: "Asy", percentage: 25 }
    ]
  }
];

export default function QuotationMaker() {
  const [clientName, setClientName] = useState("مؤسسة البزنس الطموح");
  const [closerPartner, setCloserPartner] = useState("asy"); // 'asy' | 'abanoub' | custom
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [physicalMerchandiseOverhead, setPhysicalMerchandiseOverhead] = useState(0);
  const [fixedDirectCosts, setFixedDirectCosts] = useState(0);

  // Toggle Service Activation
  const handleToggleService = (serviceId) => {
    setServices((prev) =>
      prev.map((s) => (s.serviceId === serviceId ? { ...s, isEnabled: !s.isEnabled } : s))
    );
  };

  // Change Service Package Tier
  const handleTierChange = (serviceId, tierId) => {
    setServices((prev) =>
      prev.map((s) => (s.serviceId === serviceId ? { ...s, selectedTierId: tierId } : s))
    );
  };

  // Change Execution Paid To
  const handleExecutionPaidToChange = (serviceId, assignee) => {
    setServices((prev) =>
      prev.map((s) => (s.serviceId === serviceId ? { ...s, executionPaidTo: assignee } : s))
    );
  };

  // Add Dynamic Task Row
  const handleAddTask = (serviceId) => {
    const newTask = {
      id: `t_${Date.now()}`,
      name: "New Task Allocation",
      assignee: "Asy",
      percentage: 5
    };
    setServices((prev) =>
      prev.map((s) => (s.serviceId === serviceId ? { ...s, tasks: [...s.tasks, newTask] } : s))
    );
  };

  // Update Task Row Details
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

  // Remove Task Row
  const handleRemoveTask = (serviceId, taskId) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.serviceId !== serviceId) return s;
        return { ...s, tasks: s.tasks.filter((t) => t.id !== taskId) };
      })
    );
  };

  // Financial Calculations Cascade
  const financialSummary = useMemo(() => {
    let grossRevenue = 0;
    let totalTaskCosts = 0;
    const partnerTaskEarnings = {
      Asy: 0,
      Abanoub: 0,
      Freelancer: 0
    };
    const customTaskEarnings = {};

    // Calculate Service & Task Breakdown Costs
    const processedServices = services.map((s) => {
      const selectedTier = s.tiers.find((t) => t.id === s.selectedTierId) || s.tiers[0];
      const packagePrice = s.isEnabled ? selectedTier.price : 0;
      if (s.isEnabled) {
        grossRevenue += packagePrice;
      }

      const processedTasks = s.tasks.map((t) => {
        const percentage = Number(t.percentage) || 0;
        const calculatedCost = s.isEnabled ? packagePrice * (percentage / 100) : 0;
        return {
          ...t,
          calculatedCost
        };
      });

      if (s.isEnabled) {
        processedTasks.forEach((t) => {
          totalTaskCosts += t.calculatedCost;
          if (t.assignee === 'Asy') {
            partnerTaskEarnings.Asy += t.calculatedCost;
          } else if (t.assignee === 'Abanoub') {
            partnerTaskEarnings.Abanoub += t.calculatedCost;
          } else {
            customTaskEarnings[t.assignee] = (customTaskEarnings[t.assignee] || 0) + t.calculatedCost;
          }
        });
      }

      return {
        ...s,
        selectedPackagePrice: packagePrice,
        tasks: processedTasks
      };
    });

    // COGS = Task Costs + Physical Overhead + Fixed Costs
    const totalCOGS = totalTaskCosts + Number(physicalMerchandiseOverhead) + Number(fixedDirectCosts);

    // Closer Fee (15%)
    const closerFee = grossRevenue * 0.15;

    // Gross Profit = Gross Revenue - COGS - Closer Fee
    const grossProfit = Math.max(0, grossRevenue - totalCOGS - closerFee);

    // Capital Reserve (25%)
    const capitalReserve = grossProfit * 0.25;

    // Net Distributable Profit
    const netDistributableProfit = grossProfit - capitalReserve;

    // Duo Partner 50/50 Split
    const profitSharePerPartner = netDistributableProfit * 0.50;

    // Closer Fee Allocation
    const asyCloserFee = closerPartner === 'asy' ? closerFee : 0;
    const abanoubCloserFee = closerPartner === 'abanoub' ? closerFee : 0;

    // Final Payouts
    const asyTotalPayout = profitSharePerPartner + partnerTaskEarnings.Asy + asyCloserFee;
    const abanoubTotalPayout = profitSharePerPartner + partnerTaskEarnings.Abanoub + abanoubCloserFee;

    return {
      processedServices,
      grossRevenue,
      totalTaskCosts,
      totalCOGS,
      closerFee,
      grossProfit,
      capitalReserve,
      netDistributableProfit,
      profitSharePerPartner,
      partnerTaskEarnings,
      customTaskEarnings,
      asyTotalPayout,
      abanoubTotalPayout
    };
  }, [services, physicalMerchandiseOverhead, fixedDirectCosts, closerPartner]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/10 text-blue-400 text-xs font-mono font-bold px-2.5 py-1 rounded-md border border-blue-500/20">
                ALPHAS OS v3.5
              </span>
              <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Financial Ledger Module</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">Quotation Maker & Service Allocation Engine</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2">
              <span className="text-xs text-slate-400">Client:</span>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="bg-transparent text-xs font-bold text-white outline-none w-44"
              />
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2">
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

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Core Pillars & Services (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-500" />
                Core Pillars & Services
              </h2>
              <span className="text-xs text-slate-400">
                {financialSummary.processedServices.filter(s => s.isEnabled).length} Services Active
              </span>
            </div>

            <div className="space-y-4">
              {financialSummary.processedServices.map((service) => {
                const selectedTier = service.tiers.find(t => t.id === service.selectedTierId) || service.tiers[0];
                const totalTaskPercent = service.tasks.reduce((sum, t) => sum + (Number(t.percentage) || 0), 0);

                return (
                  <div
                    key={service.serviceId}
                    className={`p-4 rounded-2xl border transition-all ${
                      service.isEnabled
                        ? "bg-slate-900/60 border-blue-500/40 shadow-lg shadow-blue-500/5"
                        : "bg-slate-900/20 border-slate-800/80 opacity-70"
                    }`}
                  >
                    {/* Service Header Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          service.isEnabled ? "bg-blue-600/20 text-blue-400" : "bg-slate-800 text-slate-500"
                        }`}>
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-100">{service.name}</h3>
                          {service.isEnabled && (
                            <span className="text-[11px] font-mono text-emerald-400 font-bold">
                              EGP {service.selectedPackagePrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={service.isEnabled}
                          onChange={() => handleToggleService(service.serviceId)}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    {/* Service Controls & Expandable Task Drawer */}
                    {service.isEnabled && (
                      <div className="mt-4 pt-3 border-t border-slate-800/60 space-y-4">
                        
                        {/* Package Selector & Execution Role */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Package Tier
                            </label>
                            <select
                              value={service.selectedTierId}
                              onChange={(e) => handleTierChange(service.serviceId, e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 outline-none focus:border-blue-500"
                            >
                              {service.tiers.map((tier) => (
                                <option key={tier.id} value={tier.id}>
                                  {tier.name} (EGP {tier.price.toLocaleString()})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                              Execution Lead / Partner
                            </label>
                            <select
                              value={service.executionPaidTo}
                              onChange={(e) => handleExecutionPaidToChange(service.serviceId, e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 outline-none focus:border-blue-500"
                            >
                              <option value="Asy">Asy</option>
                              <option value="Abanoub">Abanoub</option>
                              <option value="Shared">Shared Split</option>
                              <option value="Freelancer">External Freelancer</option>
                            </select>
                          </div>
                        </div>

                        {/* Task Breakdown Drawer Sub-panel */}
                        <div className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-3.5 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                                Task Breakdown & Execution Cost
                              </span>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                                totalTaskPercent > 100
                                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                  : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              }`}>
                                {totalTaskPercent}% Allocated
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddTask(service.serviceId)}
                              className="text-[11px] bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg px-2.5 py-1 font-bold flex items-center gap-1 transition-all"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              Add Task
                            </button>
                          </div>

                          {/* Dynamic Task Rows */}
                          {service.tasks.length === 0 ? (
                            <p className="text-[11px] text-slate-500 italic text-center py-2">
                              No specific task breakdown added yet. Click "+ Add Task" to allocate cost shares.
                            </p>
                          ) : (
                            <div className="space-y-2">
                              {service.tasks.map((task) => (
                                <div
                                  key={task.id}
                                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-900/80 p-2 rounded-lg border border-slate-800/60"
                                >
                                  {/* Task Name Input (5 cols) */}
                                  <div className="sm:col-span-4">
                                    <input
                                      type="text"
                                      placeholder="Task Name (e.g. Wireframing)"
                                      value={task.name}
                                      onChange={(e) =>
                                        handleUpdateTask(service.serviceId, task.id, "name", e.target.value)
                                      }
                                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 outline-none focus:border-blue-500"
                                    />
                                  </div>

                                  {/* Assignee Input/Select (3 cols) */}
                                  <div className="sm:col-span-3">
                                    <select
                                      value={task.assignee}
                                      onChange={(e) =>
                                        handleUpdateTask(service.serviceId, task.id, "assignee", e.target.value)
                                      }
                                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-300 outline-none focus:border-blue-500"
                                    >
                                      <option value="Asy">Asy</option>
                                      <option value="Abanoub">Abanoub</option>
                                      <option value="Editor/Freelancer">Editor / Freelancer</option>
                                      <option value="Freelancer">External Partner</option>
                                    </select>
                                  </div>

                                  {/* Percentage Input (2 cols) */}
                                  <div className="sm:col-span-2 flex items-center gap-1">
                                    <input
                                      type="number"
                                      min="0"
                                      max="100"
                                      placeholder="%"
                                      value={task.percentage}
                                      onChange={(e) =>
                                        handleUpdateTask(service.serviceId, task.id, "percentage", e.target.value)
                                      }
                                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono text-center font-bold outline-none focus:border-blue-500"
                                    />
                                    <span className="text-xs font-bold text-slate-400">%</span>
                                  </div>

                                  {/* Calculated Cost Output (2 cols) */}
                                  <div className="sm:col-span-2 text-right">
                                    <span className="text-xs font-mono font-bold text-emerald-400 block">
                                      EGP {Math.round(task.calculatedCost).toLocaleString()}
                                    </span>
                                  </div>

                                  {/* Remove Button (1 col) */}
                                  <div className="sm:col-span-1 flex justify-end">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveTask(service.serviceId, task.id)}
                                      className="text-red-400 hover:text-red-300 p-1.5 rounded-md hover:bg-red-500/10 transition-all"
                                      title="Remove Task"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
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
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-400" />
                Physical Overhead & Direct Expenses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Physical Merchandise Overhead (EGP)</label>
                  <input
                    type="number"
                    value={physicalMerchandiseOverhead}
                    onChange={(e) => setPhysicalMerchandiseOverhead(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Fixed Direct Costs (EGP)</label>
                  <input
                    type="number"
                    value={fixedDirectCosts}
                    onChange={(e) => setFixedDirectCosts(parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Real-time Duo Split Statement (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl relative space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-base font-extrabold text-white">DUO SPLIT STATEMENT</h2>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold px-2 py-0.5 rounded-full">
                  LIVE CASCADE
                </span>
              </div>

              {/* Financial Metrics Summary */}
              <div className="space-y-3 font-mono text-xs">
                
                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Gross Revenue</span>
                  <span className="text-sm font-bold text-white">
                    EGP {financialSummary.grossRevenue.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">COGS (Expenses)</span>
                    <div className="group relative cursor-pointer">
                      <Info className="w-3.5 h-3.5 text-slate-500" />
                      <div className="hidden group-hover:block absolute left-0 bottom-6 w-56 p-2 bg-slate-950 border border-slate-800 text-[10px] text-slate-300 rounded-lg shadow-xl z-20 font-sans">
                        Sum of all active service task cost shares + merchandise overhead.
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-amber-400">
                    EGP {financialSummary.totalCOGS.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Closer Sales Fee (15%)</span>
                  <span className="text-sm font-bold text-blue-400">
                    EGP {financialSummary.closerFee.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-800/60 bg-slate-950/50 px-3 rounded-xl border border-slate-800/40">
                  <span className="text-slate-300 font-bold">Gross Project Profit</span>
                  <span className="text-sm font-extrabold text-emerald-400">
                    EGP {financialSummary.grossProfit.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Capital Reserve (25%)</span>
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
                  <span>50/50 Partner Profit Share</span>
                  <span className="font-bold text-white">
                    EGP {financialSummary.profitSharePerPartner.toLocaleString()} / partner
                  </span>
                </div>
              </div>

              {/* Partner Final Payout Cards */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-blue-400" />
                  Partner Net Payout Breakdown
                </h3>

                {/* Mohamed Asy Card */}
                <div className="p-3.5 bg-slate-950/80 border border-blue-500/30 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-300">Mohamed Asy</span>
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

                {/* Abanoub Card */}
                <div className="p-3.5 bg-slate-950/80 border border-purple-500/30 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-purple-300">Abanoub</span>
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

                {/* External Freelancers & Partners */}
                {Object.keys(financialSummary.customTaskEarnings).length > 0 && (
                  <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
                    <span className="text-[11px] font-bold text-amber-400 block">External Task Payouts (COGS)</span>
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
      </div>
    </div>
  );
}
