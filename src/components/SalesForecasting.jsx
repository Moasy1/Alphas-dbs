import React, { useState, useMemo } from 'react';
import { TrendingUp, Target, DollarSign, PieChart, UserCheck, Plus, Trash2, ShieldCheck, CheckCircle2, AlertCircle, ArrowUpRight, BarChart3, Award } from 'lucide-react';

/**
 * ALPHAS OS - Sales Forecasting & Targets Module v4.1
 * 
 * Enforces ALPHAS Version 4.1 Financial Rules:
 * - 40% Max COGS Task Execution Cap
 * - 15% Sales Closer Fee
 * - 45% Gross Operating Profit Pool
 * - 25% Capital Reserve Rule
 * - 50/50 Distributable Partner Net Profit Split
 */

const INITIAL_PIPELINE_DEALS = [
  { id: "deal_1", client: "مؤسسة البزنس الطموح", pillar: "Web Engineering", tier: "Ecommerce Web Build", value: 34500, stage: "Negotiation", probability: 80, closer: "Asy" },
  { id: "deal_2", client: "شركة الأفق للتجارة", pillar: "Media Buying & Ads", tier: "Ecommerce Ads Sync", value: 17250, stage: "Proposal Sent", probability: 50, closer: "Abanoub" },
  { id: "deal_3", client: "براند النخبة للأزياء", pillar: "Social Media Marketing", tier: "SMM Growth Plan", value: 11592, stage: "Qualified Lead", probability: 30, closer: "Abanoub" },
  { id: "deal_4", client: "مجموعة الشروق الطبية", pillar: "Store Management", tier: "Gold Full-Service Ops", value: 11500, stage: "Contract Sent", probability: 90, closer: "Asy" },
  { id: "deal_5", client: "أكاديمية المستقبل", pillar: "Corporate Academy", tier: "Media Buying Masterclass", value: 14375, stage: "Proposal Sent", probability: 50, closer: "Asy" }
];

export default function SalesForecasting() {
  const [targetMonthlyRevenue, setTargetMonthlyRevenue] = useState(250000);
  const [pipelineDeals, setPipelineDeals] = useState(INITIAL_PIPELINE_DEALS);
  const [closedRevenueThisMonth, setClosedRevenueThisMonth] = useState(115000);

  // New Deal Input state
  const [newClient, setNewClient] = useState("");
  const [newPillar, setNewPillar] = useState("Web Engineering");
  const [newValue, setNewValue] = useState(23000);
  const [newProbability, setNewProbability] = useState(50);
  const [newCloser, setNewCloser] = useState("Asy");

  const handleAddDeal = (e) => {
    e.preventDefault();
    if (!newClient.trim()) return;
    const deal = {
      id: `deal_${Date.now()}`,
      client: newClient,
      pillar: newPillar,
      tier: "Custom Package",
      value: Number(newValue) || 0,
      stage: "Proposal Sent",
      probability: Number(newProbability) || 50,
      closer: newCloser
    };
    setPipelineDeals([...pipelineDeals, deal]);
    setNewClient("");
  };

  const handleRemoveDeal = (id) => {
    setPipelineDeals(pipelineDeals.filter(d => d.id !== id));
  };

  const handleUpdateDealProbability = (id, prob) => {
    setPipelineDeals(pipelineDeals.map(d => d.id === id ? { ...d, probability: Number(prob) || 0 } : d));
  };

  // Financial Calculations Matrix v4.1
  const forecastSummary = useMemo(() => {
    let unweightedPipelineValue = 0;
    let weightedForecastRevenue = 0;
    let asyPipelineEarnings = 0;
    let abanoubPipelineEarnings = 0;

    pipelineDeals.forEach((deal) => {
      unweightedPipelineValue += deal.value;
      const weightedValue = deal.value * (deal.probability / 100);
      weightedForecastRevenue += weightedValue;

      // Closer calculation preview
      const closerFee = weightedValue * 0.15;
      if (deal.closer === 'Asy') asyPipelineEarnings += closerFee;
      else if (deal.closer === 'Abanoub') abanoubPipelineEarnings += closerFee;
    });

    const totalProjectedRevenue = closedRevenueThisMonth + weightedForecastRevenue;
    const targetProgressPercent = Math.min(100, Math.round((totalProjectedRevenue / targetMonthlyRevenue) * 100));

    // Target Financial Cascade v4.1
    const targetCOGS = targetMonthlyRevenue * 0.40;
    const targetCloserFees = targetMonthlyRevenue * 0.15;
    const targetOperatingProfit = targetMonthlyRevenue * 0.45; // 100% - 40% - 15%
    const targetCapitalReserve = targetOperatingProfit * 0.25;
    const targetDistributableProfit = targetOperatingProfit - targetCapitalReserve;
    const targetPartnerPayoutPerCap = targetDistributableProfit * 0.50;

    // Forecasted Financial Cascade v4.1
    const forecastCOGS = totalProjectedRevenue * 0.40;
    const forecastCloserFees = totalProjectedRevenue * 0.15;
    const forecastOperatingProfit = totalProjectedRevenue * 0.45;
    const forecastCapitalReserve = forecastOperatingProfit * 0.25;
    const forecastDistributableProfit = forecastOperatingProfit - forecastCapitalReserve;
    const forecastPartnerProfitShare = forecastDistributableProfit * 0.50;

    return {
      unweightedPipelineValue,
      weightedForecastRevenue,
      totalProjectedRevenue,
      targetProgressPercent,
      targetCOGS,
      targetCloserFees,
      targetOperatingProfit,
      targetCapitalReserve,
      targetDistributableProfit,
      targetPartnerPayoutPerCap,
      forecastCOGS,
      forecastCloserFees,
      forecastOperatingProfit,
      forecastCapitalReserve,
      forecastDistributableProfit,
      forecastPartnerProfitShare,
      asyPipelineEarnings,
      abanoubPipelineEarnings
    };
  }, [pipelineDeals, targetMonthlyRevenue, closedRevenueThisMonth]);

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-4 sm:p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" /> ALPHAS OS v4.1 ENGINE
            </span>
            <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Sales Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Sales Forecasting & Target Tracker</h2>
        </div>

        {/* Monthly Target Editable Setting */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Monthly Target Revenue</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400 font-mono font-bold">EGP</span>
              <input
                type="number"
                value={targetMonthlyRevenue}
                onChange={(e) => setTargetMonthlyRevenue(Number(e.target.value) || 0)}
                className="bg-transparent text-base sm:text-lg font-mono font-black text-white outline-none w-32 focus:border-b focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Target Progress Bar & Pipeline Health Gauges */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-blue-400" /> Monthly Target Attainment Gauge
            </span>
            <p className="text-xs text-slate-400 mt-0.5">
              Closed Revenue (EGP {closedRevenueThisMonth.toLocaleString()}) + Weighted Pipeline (EGP {Math.round(forecastSummary.weightedForecastRevenue).toLocaleString()})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-mono font-black text-emerald-400">
              {forecastSummary.targetProgressPercent}%
            </span>
            <span className="text-xs text-slate-400">of EGP {targetMonthlyRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 h-4 rounded-full border border-slate-800 overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700 shadow-lg shadow-emerald-500/20"
            style={{ width: `${forecastSummary.targetProgressPercent}%` }}
          />
        </div>

        {/* 4 Summary Stat Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Closed Revenue</span>
            <span className="text-base font-mono font-bold text-white">EGP {closedRevenueThisMonth.toLocaleString()}</span>
          </div>
          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Weighted Pipeline</span>
            <span className="text-base font-mono font-bold text-emerald-400">EGP {Math.round(forecastSummary.weightedForecastRevenue).toLocaleString()}</span>
          </div>
          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Target Ops Profit (45%)</span>
            <span className="text-base font-mono font-bold text-blue-400">EGP {Math.round(forecastSummary.targetOperatingProfit).toLocaleString()}</span>
          </div>
          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Target Partner Payout</span>
            <span className="text-base font-mono font-bold text-purple-400">EGP {Math.round(forecastSummary.targetPartnerPayoutPerCap).toLocaleString()} / partner</span>
          </div>
        </div>
      </div>

      {/* Pipeline Deals Table & Quick Add Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active Pipeline Deals (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Active Pipeline & Stage Probabilities
            </h3>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              Unweighted Total: EGP {forecastSummary.unweightedPipelineValue.toLocaleString()}
            </span>
          </div>

          <div className="space-y-3">
            {pipelineDeals.map((deal) => {
              const weightedVal = Math.round(deal.value * (deal.probability / 100));

              return (
                <div key={deal.id} className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{deal.client}</span>
                      <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md font-semibold">
                        {deal.pillar}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Deal Price: EGP {deal.value.toLocaleString()} | Closer: <strong className="text-slate-200">{deal.closer}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400">Prob:</span>
                      <select
                        value={deal.probability}
                        onChange={(e) => handleUpdateDealProbability(deal.id, e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs font-bold text-blue-400 outline-none min-h-[36px]"
                      >
                        <option value={20}>20% Lead</option>
                        <option value={50}>50% Proposal</option>
                        <option value={80}>80% Negotiation</option>
                        <option value={90}>90% Contract</option>
                        <option value={100}>100% Won</option>
                      </select>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">Weighted</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        EGP {weightedVal.toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemoveDeal(deal.id)}
                      className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 min-h-[36px] min-w-[36px] flex items-center justify-center"
                      title="Delete Deal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add New Pipeline Deal Form (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-400" /> Add Pipeline Deal
          </h3>

          <form onSubmit={handleAddDeal} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Client / Opportunity</label>
              <input
                type="text"
                placeholder="Client Name"
                value={newClient}
                onChange={(e) => setNewClient(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-blue-500 min-h-[44px]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Service Pillar</label>
              <select
                value={newPillar}
                onChange={(e) => setNewPillar(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-200 outline-none min-h-[44px]"
              >
                <option value="Web Engineering">Web Engineering & Stores</option>
                <option value="Media Buying & Ads">Media Buying & Ads</option>
                <option value="Social Media Marketing">Social Media Marketing (SMM)</option>
                <option value="Store Management">Store Support & Management</option>
                <option value="Strategic Consulting">Strategic Consulting</option>
                <option value="Corporate Academy">Corporate Academy Training</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Price (EGP)</label>
                <input
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-white outline-none min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Closer (15%)</label>
                <select
                  value={newCloser}
                  onChange={(e) => setNewCloser(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-bold text-blue-400 outline-none min-h-[44px]"
                >
                  <option value="Asy">Mohamed Asy</option>
                  <option value="Abanoub">Abanoub</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Plus className="w-4 h-4" /> Add to Sales Pipeline
            </button>
          </form>
        </div>

      </div>

      {/* Target Financial Cascade Matrix v4.1 Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-200 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-400" /> Target Financial Cascade Matrix v4.1 (EGP {targetMonthlyRevenue.toLocaleString()})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Max COGS Cap (40%)</span>
            <span className="text-base font-bold text-amber-400">EGP {Math.round(forecastSummary.targetCOGS).toLocaleString()}</span>
            <span className="text-[10px] text-slate-500 block">Direct execution & tools</span>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Closer Sales Pool (15%)</span>
            <span className="text-base font-bold text-blue-400">EGP {Math.round(forecastSummary.targetCloserFees).toLocaleString()}</span>
            <span className="text-[10px] text-slate-500 block">Top-line closer commissions</span>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Operating Profit Pool (45%)</span>
            <span className="text-base font-bold text-emerald-400">EGP {Math.round(forecastSummary.targetOperatingProfit).toLocaleString()}</span>
            <span className="text-[10px] text-slate-500 block">100% - 40% - 15%</span>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Capital Reserve Pool (25%)</span>
            <span className="text-base font-bold text-purple-400">EGP {Math.round(forecastSummary.targetCapitalReserve).toLocaleString()}</span>
            <span className="text-[10px] text-slate-500 block">Reinvestment reserve</span>
          </div>
        </div>
      </div>

    </div>
  );
}
