# ALPHAS OS - Service Design & Financial Architecture Specification

> **Version:** 4.1 (Active Production Specification)  
> **Entity:** ALPHAS - Digital Business Solutions  
> **Architecture Standard:** Lean Duopoly Financial Split & 40% Execution Cost Cap  

---

## 1. Executive Summary & Operating Model

ALPHAS OS operates under a **Lean Duopoly Financial Engine** between **Mohamed Asy** (CEO & Dev Partner) and **Abanoub Hany** (COO & Media Partner).

### Key Business Constraints & Margins:
1. **40% Execution Cost Cap (COGS):** All service execution costs (COGS) are strictly capped at **40% maximum** of package revenue.
2. **60% Gross Margin Guarantee:** Gross margin before sales compensation is guaranteed at a minimum of **60%**.
3. **Dynamic Task Breakdown Sub-Panels:** Every active service allows defining modular tasks with custom percentage-based cost allocations within the 40% COGS cap.
4. **15% Sales Closer Fee:** Allocated directly to the deal closer (Asy or Abanoub) as top-line revenue compensation.
5. **45% Gross Operating Profit Pool:** Calculated after deducting 40% maximum COGS and 15% Closer Fee from 100% Gross Revenue ($100\% - 40\% - 15\% = 45\%$).
6. **25% Capital Reserve Rule:** 25% of Gross Operating Profit is automatically reserved for capital reinvestment before net profit distribution.
7. **50/50 Distributable Profit Split:** The remaining 75% of Gross Operating Profit is split equally (50% / 50%) between partners.

---

## 2. Core Service Pillars & Canonical Task Breakdown (40% Execution Cap)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SERVICE PACKAGE PRICE (100%)                     │
├───────────────────────────────────┬─────────────────────────────────────┤
│   COGS Task Execution (Max 40%)   │   Gross Margin & Buffer (Min 60%)   │
└───────────────────────────────────┴─────────────────────────────────────┘
```

### Pillar 1: Web Engineering & Stores
*Headless e-commerce, custom WooCommerce API architecture, ERP webhooks, and speed optimization.*

* **Pricing Tiers:**
  * **Starter Web Build:** `EGP 11,500`
  * **Essential CMS Development:** `EGP 23,000`
  * **Ecommerce Web & Custom Integrations:** `EGP 34,500`

* **Canonical 40% Task Breakdown:**
  | Task Description | Responsible Party | % of COGS Budget | % of Total Package Price | Cost @ EGP 34,500 Package |
  | :--- | :--- | :---: | :---: | :---: |
  | **Web Architecture & Custom Development** | Mohamed Asy (Dev Lead) | 55% | **22.0%** | EGP 7,590 |
  | **UI/UX Wireframing & Asset Design** | External / Design Specialist | 25% | **10.0%** | EGP 3,450 |
  | **Domain, Staging Hosting, SSL & Premium Plugins** | Technical Overhead | 10% | **4.0%** | EGP 1,380 |
  | **QA, Speed Optimization & Gateway Integration** | Mohamed Asy (Dev Lead) | 10% | **4.0%** | EGP 1,380 |
  | **TOTAL EXECUTION COST (COGS CAP)** | -- | **100%** | **40.0%** | **EGP 13,800** |

---

### Pillar 2: Media Buying & Ads
*Omnichannel paid ad setup across Meta & Google, server-side Pixel CAPI, ad creatives, and ROAS scaling.*

* **Pricing Tiers:**
  * **Starter Ads Meta/Google Campaign:** `EGP 5,750 / mo`
  * **Essential Multi-channel Campaigns:** `EGP 11,500 / mo`
  * **Ecommerce Full Meta/Google Sync:** `EGP 17,250 / mo`

* **Canonical 40% Task Breakdown:**
  | Task Description | Responsible Party | % of COGS Budget | % of Total Package Price | Cost @ EGP 17,250 Package |
  | :--- | :--- | :---: | :---: | :---: |
  | **Campaign Strategy, Audience & Media Buying** | Abanoub Hany (Media Lead) | 50% | **20.0%** | EGP 3,450 |
  | **Server-Side Pixel (CAPI), GTM & Analytics Setup** | Mohamed Asy (Dev Partner) | 25% | **10.0%** | EGP 1,725 |
  | **Ad Copywriting, Creatives & Motion Visuals** | External / Creative Team | 15% | **6.0%** | EGP 1,035 |
  | **Analytics Tools & Research Software** | Technical Overhead | 10% | **4.0%** | EGP 690 |
  | **TOTAL EXECUTION COST (COGS CAP)** | -- | **100%** | **40.0%** | **EGP 6,900** |

---

### Pillar 3: Social Media Marketing (SMM)
*Brand identity, graphic design, video reels production, short-form motion editing, and copywriting.*

* **Pricing Tiers:**
  * **SMM Kickstart:** `EGP 7,245 / mo`
  * **SMM Growth Plan:** `EGP 11,592 / mo`
  * **SMM Domination Package:** `EGP 16,100 / mo`

* **Canonical 40% Task Breakdown:**
  | Task Description | Responsible Party | % of COGS Budget | % of Total Package Price | Cost @ EGP 16,100 Package |
  | :--- | :--- | :---: | :---: | :---: |
  | **Graphic Design, Reels & Video Production** | External Production Team | 50% | **20.0%** | EGP 3,220 |
  | **Content Strategy, Angles & Copywriting** | Abanoub Hany (Media Lead) | 35% | **14.0%** | EGP 2,254 |
  | **AI Automation & Scheduling Platform Subscriptions** | Tool Overhead | 15% | **6.0%** | EGP 966 |
  | **TOTAL EXECUTION COST (COGS CAP)** | -- | **100%** | **40.0%** | **EGP 6,440** |

---

### Pillar 4: Store Support & Management
*Catalog management, automated inventory flows, staging backups, and checkout security audits.*

* **Pricing Tiers:**
  * **Bronze Store Management:** `EGP 5,750 / mo`
  * **Silver Support & SEO:** `EGP 8,625 / mo`
  * **Gold Full-Service Ops:** `EGP 11,500 / mo`

* **Canonical 40% Task Breakdown:**
  | Task Description | Responsible Party | % of COGS Budget | % of Total Package Price | Cost @ EGP 11,500 Package |
  | :--- | :--- | :---: | :---: | :---: |
  | **Security Audits, Staging Backups & Core Updates** | Mohamed Asy (Dev Partner) | 40% | **16.0%** | EGP 1,840 |
  | **Catalog Management & Inventory Operations** | Operations Specialist | 35% | **14.0%** | EGP 1,610 |
  | **On-Page SEO & Content Maintenance** | Abanoub Hany (Media Lead) | 15% | **6.0%** | EGP 690 |
  | **Uptime Monitoring & Server Maintenance Tools** | Technical Overhead | 10% | **4.0%** | EGP 460 |
  | **TOTAL EXECUTION COST (COGS CAP)** | -- | **100%** | **40.0%** | **EGP 4,600** |

---

### Pillar 5: Strategic Consulting
*Technical codebase audits, CRO funnel diagnostics, growth strategy blueprints, and executive sessions.*

* **Pricing Tiers:**
  * **Technical Code Architecture (10 hrs):** `EGP 17,250`
  * **Growth & CRO Optimization (10 hrs):** `EGP 17,250`
  * **Enterprise Strategy Session (10 hrs):** `EGP 23,000`

* **Canonical 40% Task Breakdown:**
  | Task Description | Responsible Party | % of COGS Budget | % of Total Package Price | Cost @ EGP 23,000 Package |
  | :--- | :--- | :---: | :---: | :---: |
  | **Diagnostic Session & Technical/Growth Leadership** | Asy (Tech) / Abanoub (Growth) | 75% | **30.0%** | EGP 6,900 |
  | **Strategic Roadmap, Blueprint & Action Plan** | Lead Consultant | 20% | **8.0%** | EGP 1,840 |
  | **Diagnostic Software & Audit Tools** | Technical Overhead | 5% | **2.0%** | EGP 460 |
  | **TOTAL EXECUTION COST (COGS CAP)** | -- | **100%** | **40.0%** | **EGP 9,200** |

---

### Pillar 6: Corporate Academy Training
*Corporate team upskilling on WooCommerce development, CAPI tracking masterclasses, and CRM automation.*

* **Pricing Tiers:**
  * **WooCommerce Website Setup (5 Students):** `EGP 14,375`
  * **Media Buying Tracking (5 Students):** `EGP 14,375`
  * **CRM Pipeline Automation (5 Students):** `EGP 14,375`

* **Canonical 40% Task Breakdown:**
  | Task Description | Responsible Party | % of COGS Budget | % of Total Package Price | Cost @ EGP 14,375 Package |
  | :--- | :--- | :---: | :---: | :---: |
  | **Live Workshop Instruction & Technical Delivery** | Asy / Abanoub (Topic Lead) | 65% | **26.0%** | EGP 3,737.50 |
  | **Courseware, Exercises & Curriculum Preparation** | Instructors | 25% | **10.0%** | EGP 1,437.50 |
  | **LMS Platform, Digital Badges & Certification** | Technical Overhead | 10% | **4.0%** | EGP 575.00 |
  | **TOTAL EXECUTION COST (COGS CAP)** | -- | **100%** | **40.0%** | **EGP 5,750** |

---

## 3. Duo Split Financial Calculation Matrix & Formulas

$$\text{Gross Revenue} = \sum \text{Enabled Service Package Prices}$$

$$\text{Total Direct COGS} = \text{Task COGS Execution } (\le 40\%) + \text{Digital Infrastructure Overhead}$$

$$\text{Closer Sales Fee} = \text{Gross Revenue} \times 15\%$$

$$\text{Gross Operating Profit} = \text{Gross Revenue} - \text{Total COGS} - \text{Closer Sales Fee} \quad (= 45\% \text{ of Gross Revenue at max COGS})$$

$$\text{Capital Reserve} = \text{Gross Operating Profit} \times 25\%$$

$$\text{Distributable Net Profit} = \text{Gross Operating Profit} - \text{Capital Reserve}$$

$$\text{Partner Net Payout} = (\text{Distributable Net Profit} \times 50\%) + \text{Execution Task Fees Earned} + \text{Closer Fee (if deal closer)}$$

---

## 4. Step-by-Step Numerical Calculation Example

**Package:** Ecommerce Web & Custom Integrations  
**Price:** EGP 34,500

* **Gross Revenue:** EGP 34,500
* **Total Execution COGS (Max 40%):** EGP 13,800
  * Mohamed Asy Execution Fee (Dev Lead & QA - 65% of COGS): **EGP 8,970**
  * External UI/UX & Hosting Overhead (35% of COGS): **EGP 4,830**
* **Sales Closer Fee (15%):** **EGP 5,175** (Paid to deal closer)
* **Gross Operating Profit Pool:** $34,500 - 13,800 - 5,175 =$ **EGP 15,525** (45% of Gross Revenue)
* **Capital Reserve (25% of Operating Profit):** $15,525 \times 25\% =$ **EGP 3,881.25**
* **Distributable Net Profit:** $15,525 - 3,881.25 =$ **EGP 11,643.75**
* **Partner Profit Split (50% / 50%):**
  * Mohamed Asy Net Profit Share: **EGP 5,821.88**
  * Abanoub Hany Net Profit Share: **EGP 5,821.88**

#### Total Payout Summary (If Mohamed Asy is also Deal Closer):
* **Mohamed Asy Total Payout:** $\text{EGP 5,821.88 (Profit)} + \text{EGP 8,970 (Dev Task Fees)} + \text{EGP 5,175 (Closer Fee)} = \mathbf{EGP\ 19,966.88}$
* **Abanoub Hany Total Payout:** $\mathbf{EGP\ 5,821.88}$
* **ALPHAS Capital Reserve Pool:** $\mathbf{EGP\ 3,881.25}$

---

## 5. Mobile UI/UX & Responsive Design Tokens

```
📱 Mobile Viewport (< 1024px)
├── Sticky Header with Hamburger Drawer Toggle (☰)
├── Full Width Page Container (ml-0, 100% width)
├── Stacked Single-Column Cards (grid-cols-1)
├── 44px Minimum Touch Targets on Buttons/Inputs
└── Sticky Bottom Viewport Action Bar (Revenue & Lock Deal CTA)

💻 Desktop Viewport (≥ 1024px)
├── Fixed 260px Glassmorphism Sidebar Navigation
├── 12-Column Grid Split (7 Cols Configuration | 5 Cols Duo Split)
└── Live Real-Time Financial Cascade & Ledger Locking
```

---

*Document generated for ALPHAS OS Management Suite.*
