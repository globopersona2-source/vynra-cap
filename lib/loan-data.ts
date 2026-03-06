import { Building2, Landmark, TrendingUp, Briefcase, Zap, BarChart3, DollarSign } from "lucide-react";

export type LoanProduct = {
  slug: string;
  icon: React.ElementType;
  badge: string;
  headline: string;
  subheadline: string;
  overview: string;
  seoKeywords: string[];
  terms: {
    term: string;
    amortization: string;
    rateStructure: string;
  };
  loanRange: {
    min: string;
    max: string;
  };
  positioning: string;
  highlights: string[];
  useCases: { title: string; desc: string }[];
  ctaLabel: string;
};

export const loanProducts: LoanProduct[] = [
  {
    slug: "sba-loans",
    icon: Building2,
    badge: "Government-Backed Financing",
    headline: "SBA Loans",
    subheadline: "Long-Term Financing for Business Growth",
    overview:
      "SBA loans provide government-backed financing designed to support business acquisitions, owner-occupied commercial real estate, expansion, and working capital. These loans offer stability through extended repayment structures.",
    seoKeywords: ["SBA loans", "SBA 7(a) loans", "SBA business acquisition financing", "SBA commercial real estate loans"],
    terms: {
      term: "10 years (business acquisition) or up to 25 years (real estate)",
      amortization: "Fully amortizing",
      rateStructure: "Typically variable, some fixed components",
    },
    loanRange: { min: "$150,000", max: "$5,000,000" },
    positioning:
      "Vynra Capital structures SBA loans to strengthen long-term business stability, improve balance sheet positioning, and prepare borrowers for future growth, refinancing, or expansion.",
    highlights: [
      "Business acquisition financing",
      "Owner-occupied commercial real estate",
      "Working capital & expansion",
      "Longer repayment periods",
      "Government-backed security",
      "Competitive interest rates",
    ],
    useCases: [
      { title: "Business Acquisition", desc: "Finance the purchase of an existing business with SBA 7(a) up to $5M with favorable long-term terms." },
      { title: "Owner-Occupied Real Estate", desc: "Acquire commercial property you operate from with up to 25-year amortization." },
      { title: "Expansion Capital", desc: "Fund equipment, renovations, or new locations with structured SBA working capital lines." },
    ],
    ctaLabel: "Apply for SBA Financing",
  },
  {
    slug: "construction-loans",
    icon: Zap,
    badge: "Development & Ground-Up Financing",
    headline: "Construction Loans",
    subheadline: "Development and Ground-Up Financing",
    overview:
      "Construction loans provide phased funding for ground-up and redevelopment projects. Funds are typically disbursed in draws based on construction milestones, enabling disciplined project execution.",
    seoKeywords: ["construction loans", "commercial construction financing", "multifamily construction loans"],
    terms: {
      term: "12–36 months",
      amortization: "Interest-only during construction",
      rateStructure: "Generally adjustable or floating",
    },
    loanRange: { min: "$250,000", max: "$25,000,000+" },
    positioning:
      "Each construction loan is structured with a defined takeout strategy to ensure a smooth transition into permanent financing after project completion.",
    highlights: [
      "Ground-up construction funding",
      "Milestone-based draw schedules",
      "Interest-only during build phase",
      "Multifamily & commercial eligible",
      "Defined takeout strategy included",
      "Fast approval for qualified projects",
    ],
    useCases: [
      { title: "Ground-Up Development", desc: "Fund new residential or commercial construction with phased draws tied to milestones." },
      { title: "Multifamily Projects", desc: "Finance 5+ unit multifamily builds with interest-only construction period up to 36 months." },
      { title: "Redevelopment", desc: "Reposition or gut-renovate existing structures with flexible construction draw schedules." },
    ],
    ctaLabel: "Finance Your Build",
  },
  {
    slug: "commercial-purchase-loans",
    icon: Building2,
    badge: "Acquisition Financing",
    headline: "Commercial Purchase Loans",
    subheadline: "Acquisition Financing for Income-Producing Properties",
    overview:
      "Commercial purchase loans fund the acquisition of income-producing or owner-occupied commercial properties. These loans are structured to support both stabilized assets and value-add acquisitions.",
    seoKeywords: ["commercial purchase loans", "commercial real estate acquisition financing"],
    terms: {
      term: "5–10 years typical",
      amortization: "20–25 years",
      rateStructure: "Fixed or adjustable depending on lender",
    },
    loanRange: { min: "$500,000", max: "$20,000,000+" },
    positioning:
      "Vynra Capital evaluates acquisition financing with an eye toward long-term asset performance and refinancing flexibility to ensure each purchase positions you optimally.",
    highlights: [
      "Income-producing property acquisition",
      "Owner-occupied commercial properties",
      "20–25 year amortization available",
      "Fixed & adjustable rate options",
      "Up to $20M+ deal sizes",
      "Refinancing-ready structuring",
    ],
    useCases: [
      { title: "Office & Retail Acquisition", desc: "Purchase office, retail, or mixed-use properties with conventional commercial mortgages." },
      { title: "Industrial & Warehouse", desc: "Acquire light industrial, flex space, or logistics assets with long amortization schedules." },
      { title: "Value-Add Plays", desc: "Finance commercial acquisitions with near-term value-add potential and bridge-to-perm options." },
    ],
    ctaLabel: "Get Acquisition Financing",
  },
  {
    slug: "bridge-loans",
    icon: Zap,
    badge: "Short-Term Transitional Financing",
    headline: "Bridge Loans",
    subheadline: "Fast Capital for Acquisitions, Repositioning & Gaps",
    overview:
      "Bridge loans provide short-term capital for acquisitions, repositioning, or refinance gaps where speed and certainty of execution are critical. Ideal when conventional financing timelines don't align with deal requirements.",
    seoKeywords: ["bridge loans", "short-term commercial loans", "real estate bridge financing"],
    terms: {
      term: "6–24 months",
      amortization: "Interest-only",
      rateStructure: "Adjustable or floating",
    },
    loanRange: { min: "$250,000", max: "$15,000,000+" },
    positioning:
      "We structure bridge loans with clearly defined exit strategies — whether permanent financing, refinance, or sale — to protect borrower flexibility and long-term positioning.",
    highlights: [
      "Close in days, not months",
      "Interest-only payments",
      "Acquisition & repositioning use cases",
      "Defined exit strategy built-in",
      "No prepayment penalties (typical)",
      "Flexible term extensions available",
    ],
    useCases: [
      { title: "Time-Sensitive Acquisitions", desc: "Close competitive deals quickly when conventional timelines are too slow." },
      { title: "Repositioning Assets", desc: "Fund light-to-heavy renovations before transitioning to permanent financing." },
      { title: "Refinance Gaps", desc: "Bridge maturity gaps between outgoing and incoming permanent loans without disruption." },
    ],
    ctaLabel: "Get Bridge Financing",
  },
  {
    slug: "hard-money-loans",
    icon: Landmark,
    badge: "Asset-Based Capital Solutions",
    headline: "Hard Money Loans",
    subheadline: "Speed and Collateral-Focused Private Lending",
    overview:
      "Hard money loans are asset-based financing solutions focused on speed and collateral strength rather than traditional underwriting metrics. Ideal for investors who need certainty and velocity.",
    seoKeywords: ["hard money loans", "private money loans", "asset-based lending"],
    terms: {
      term: "6–24 months",
      amortization: "Interest-only",
      rateStructure: "Typically adjustable",
    },
    loanRange: { min: "$100,000", max: "$10,000,000" },
    positioning:
      "Vynra Capital ensures every hard money structure includes a defined exit plan — protecting the borrower's long-term financial stability and preparing them for conventional financing.",
    highlights: [
      "Collateral-based underwriting",
      "Fast approvals & funding",
      "No income documentation required",
      "Fix-and-flip eligible",
      "Cross-collateralization options",
      "Defined exit plan included",
    ],
    useCases: [
      { title: "Fix & Flip", desc: "Fund residential or commercial flips quickly with asset-backed short-term capital." },
      { title: "Distressed Assets", desc: "Acquire distressed or non-stabilized properties that conventional lenders won't touch." },
      { title: "Investor Portfolios", desc: "Leverage existing equity across your portfolio for rapid capital deployment." },
    ],
    ctaLabel: "Apply for Hard Money",
  },
  {
    slug: "dscr-loans",
    icon: TrendingUp,
    badge: "Cash Flow Based Investment Financing",
    headline: "DSCR Loans",
    subheadline: "Investor Financing Without Income Documentation",
    overview:
      "DSCR loans qualify borrowers based on property cash flow rather than personal income, enabling scalable real estate investment growth without W-2s or tax returns.",
    seoKeywords: ["DSCR loans", "rental property loans", "real estate investor financing"],
    terms: {
      term: "30 years or 5–10 year fixed with balloon",
      amortization: "30 years typical",
      rateStructure: "Fixed or adjustable",
    },
    loanRange: { min: "$100,000", max: "$5,000,000+" },
    positioning:
      "We structure DSCR loans to align with portfolio expansion goals and long-term leverage strategy — helping investors scale without the friction of traditional income verification.",
    highlights: [
      "No personal income docs required",
      "Qualified on rental cash flow",
      "30-year fully amortizing options",
      "Single-family & multifamily eligible",
      "Portfolio scaling friendly",
      "Fixed & ARM rate products",
    ],
    useCases: [
      { title: "Single-Family Rentals", desc: "Finance SFR investment properties based solely on rent income and DSCR ratio." },
      { title: "Small Multifamily (2–4)", desc: "Qualify based on property NOI without personal income documentation requirements." },
      { title: "Portfolio Expansion", desc: "Scale your rental portfolio faster without being limited by personal debt-to-income ratios." },
    ],
    ctaLabel: "Get DSCR Financing",
  },
  {
    slug: "merchant-cash-advances",
    icon: Briefcase,
    badge: "Revenue-Based Working Capital",
    headline: "Merchant Cash Advances",
    subheadline: "Fast Working Capital Based on Future Receivables",
    overview:
      "Merchant cash advances provide fast access to working capital based on future receivables rather than traditional loan underwriting. Built for businesses that need speed over structure.",
    seoKeywords: ["merchant cash advance", "MCA funding", "fast business capital"],
    terms: {
      term: "3–18 months",
      amortization: "Daily or weekly revenue-based remittance",
      rateStructure: "Factor-based pricing",
    },
    loanRange: { min: "$10,000", max: "$500,000" },
    positioning:
      "Vynra Capital evaluates MCA use carefully to ensure it strengthens liquidity without compromising future financing opportunities or business cash flow stability.",
    highlights: [
      "Approval based on revenue",
      "No fixed monthly payments",
      "Fund in 24–48 hours",
      "Minimal documentation",
      "Flexible remittance structure",
      "Short-term liquidity solution",
    ],
    useCases: [
      { title: "Inventory & Payroll", desc: "Bridge cash flow gaps for payroll, inventory purchases, or seasonal demand spikes." },
      { title: "Emergency Capital", desc: "Access working capital within 48 hours when time-sensitive needs arise." },
      { title: "Growth Acceleration", desc: "Fuel short-term growth initiatives — marketing, hiring, or new locations — without waiting for bank approvals." },
    ],
    ctaLabel: "Get Working Capital",
  },
];

export function getLoanBySlug(slug: string): LoanProduct | undefined {
  return loanProducts.find((p) => p.slug === slug);
}
