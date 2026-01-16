import type { HubItem } from './types';

export const CATEGORY_META = [
  {
    key: 'playbooks',
    title: 'Sales Playbooks',
    icon: '📘',
    desc: 'Step-by-step “how to win” by segment and deal type',
  },
  {
    key: 'pricing',
    title: 'Product & Pricing Guides',
    icon: '💰',
    desc: 'Packaging, bundles, price logic, approvals',
  },
  {
    key: 'contracts',
    title: 'Contract Templates',
    icon: '📄',
    desc: 'Templates, clauses, red-flags, fallbacks',
  },
  {
    key: 'case-studies',
    title: 'Case Studies',
    icon: '⭐',
    desc: 'Proof points, outcomes, pitch-ready stories',
  },
  {
    key: 'objections',
    title: 'Objection Handling',
    icon: '🛡️',
    desc: 'Fast responses, what not to say, escalation',
  },
  {
    key: 'competitive',
    title: 'Competitive Intel',
    icon: '🧠',
    desc: 'Battlecards, positioning, landmines to avoid',
  },
  {
    key: 'customer-intelligence',
    title: 'Customer Intelligence',
    icon: '🧩',
    desc: 'Account-specific insights, constraints, and deal-winning angles',
  },
] as const;

export const ITEMS: HubItem[] = [
  {
    id: 'pb-airline-renewal',
    category: 'playbooks',
    type: 'doc',
    title: 'Airline Contract Renewal Playbook',
    summary:
      'Renewals timeline, stakeholder map, risk controls, concession strategy.',
    tags: ['Airlines', 'Renewals', 'Negotiation'],
    owner: 'Commercial Ops',
    lastUpdated: '2026-01-10',
    audience: ['Airlines'],
    market: ['SG', 'SEA'],
    content: {
      sections: [
        {
          heading: 'When to use',
          body: 'Use 6–9 months before expiry to control the narrative and avoid last-minute concessions.',
        },
        {
          heading: 'Core storyline',
          body: 'Anchor on reliability + governance + controllability. Quantify risk cost of service failures where possible.',
        },
        {
          heading: 'Checkpoint cadence',
          body: 'Set monthly steering with Ops + Finance + Legal. Lock pricing guardrails early.',
        },
      ],
      links: [
        {
          label: 'Objection: “Price too high”',
          to: { category: 'objections', label: 'Objection Handling' },
        },
      ],
      downloads: [
        {
          label: 'Renewal checklist (PDF)',
          filename: 'airline-renewal-checklist.pdf',
        },
      ],
    },
  },
  {
    id: 'pb-forwarder-enterprise',
    category: 'playbooks',
    type: 'doc',
    title: 'Forwarder Enterprise Playbook',
    summary: 'Discovery → value story → commercials → negotiation checkpoints.',
    tags: ['Forwarders', 'Enterprise', 'Buy-flow'],
    owner: 'Commercial Ops',
    lastUpdated: '2026-01-05',
    audience: ['Forwarders'],
    market: ['SG', 'SEA'],
    content: {
      sections: [
        {
          heading: 'Who this is for',
          body: 'Account teams pursuing large freight forwarders with multi-lane volume and SLA expectations.',
        },
        {
          heading: 'Winning approach',
          body: 'Lead with reliability + controllability; anchor on total cost of delay (missed connections, re-handling, claims).',
        },
        {
          heading: 'Negotiation checkpoints',
          body: 'Discount tiers must align with volume commitment + operational constraints. Escalate exceptions early.',
        },
      ],
      downloads: [
        {
          label: 'One-page checklist (PDF)',
          filename: 'forwarder-playbook-checklist.pdf',
        },
      ],
    },
  },
  {
    id: 'pg-ecom-bundles',
    category: 'pricing',
    type: 'guide',
    title: 'E-commerce Product Bundles & Pricing Logic',
    summary:
      'How to package services; approval thresholds; add-ons & exclusions.',
    tags: ['E-commerce', 'Bundles', 'Pricing'],
    owner: 'Product',
    lastUpdated: '2026-01-02',
    audience: ['E-commerce Partners'],
    market: ['SG'],
    content: {
      sections: [
        {
          heading: 'Bundle components',
          body: 'Core handling + optional value adds (priority cut-off, tracking, special handling). Define what’s in/out clearly.',
        },
        {
          heading: 'Approvals',
          body: 'Any deviation from standard bundle rules or margin floor requires Product + Finance approval.',
        },
        {
          heading: 'Common pitfalls',
          body: 'Over-customisation creates ops friction. Keep 80/20 standard; document exceptions with expiry.',
        },
      ],
      downloads: [
        { label: 'Bundle matrix (XLSX)', filename: 'ecom-bundle-matrix.xlsx' },
      ],
    },
  },
  {
    id: 'ct-msa',
    category: 'contracts',
    type: 'template',
    title: 'Master Services Agreement (MSA) Template',
    summary: 'Standard MSA structure with placeholders and negotiation notes.',
    tags: ['MSA', 'Template', 'Legal'],
    owner: 'Legal',
    lastUpdated: '2025-12-20',
    content: {
      sections: [
        {
          heading: 'When to use',
          body: 'Use for standard commercial engagements with recurring scope and agreed service levels.',
        },
        {
          heading: 'Red-flag clauses',
          body: 'Unlimited liability, unilateral termination, and broad indemnities require Legal review.',
        },
        {
          heading: 'Fallback language',
          body: 'Cap liability to agreed multiple; define force majeure and service credits clearly.',
        },
      ],
      downloads: [
        { label: 'MSA template (DOCX)', filename: 'msa-template.docx' },
      ],
    },
  },
  {
    id: 'cs-ecom-peak',
    category: 'case-studies',
    type: 'case',
    title: 'E-commerce: Peak Season Cut-off Governance',
    summary:
      'How cut-off governance reduced rollovers and improved predictability.',
    tags: ['E-commerce', 'Peak', 'Governance'],
    owner: 'Marketing',
    lastUpdated: '2025-11-28',
    audience: ['E-commerce Partners'],
    market: ['SG'],
    content: {
      sections: [
        {
          heading: 'Challenge',
          body: 'Peak-driven rollovers and operational variability.',
        },
        {
          heading: 'Solution',
          body: 'Defined cut-off governance, priority lanes, and exception playbook.',
        },
        {
          heading: 'Outcome',
          body: 'Higher predictability and fewer escalations (share numbers internally if permitted).',
        },
      ],
    },
  },
  {
    id: 'obj-price-high',
    category: 'objections',
    type: 'card',
    title: 'Objection: “Your price is too high.”',
    summary: 'Short + long responses, proof points, what not to say.',
    tags: ['Objection', 'Price', 'Negotiation'],
    owner: 'Sales Enablement',
    lastUpdated: '2026-01-08',
    content: {
      sections: [
        {
          heading: 'What they really mean',
          body: 'They haven’t internalised risk/cost of delays, or they’re benchmarking a different scope.',
        },
        {
          heading: 'Suggested response (short)',
          body: '“Let’s compare like-for-like scope. If we map service levels side by side, we can align on value.”',
        },
        {
          heading: 'What not to say',
          body: 'Avoid immediate discounting. Don’t criticise competitors—reframe around total cost and controllability.',
        },
      ],
      links: [
        {
          label: 'Competitive intel (battlecards)',
          to: { category: 'competitive', label: 'Competitive Intel' },
        },
      ],
    },
  },
  {
    id: 'ci-battlecard-x',
    category: 'competitive',
    type: 'battlecard',
    title: 'Battlecard: Positioning vs Competitor X',
    summary:
      'Strengths/weaknesses + positioning statements + landmines to avoid.',
    tags: ['Battlecard', 'Competitor', 'Positioning'],
    owner: 'Strategy',
    lastUpdated: '2026-01-03',
    content: {
      sections: [
        {
          heading: 'Where they win',
          body: 'Aggressive commercial terms for narrow scope; faster approvals.',
        },
        {
          heading: 'Where we win',
          body: 'Operational depth, governance, resilience, and end-to-end accountability.',
        },
        {
          heading: 'Landmines',
          body: 'Avoid overpromising customisation beyond standard ops readiness.',
        },
      ],
    },
  },
  {
    id: 'ci-etihad-halal-coldroom',
    category: 'customer-intelligence',
    type: 'intelligence-report',
    title: 'Intelligence Report: Etihad Airways — Halal Coldroom Requirement',
    summary:
      'Customer constraint: coldroom storage must be halal-certified. Position compliance + chain-of-custody as value drivers.',
    tags: ['Etihad', 'Halal', 'Coldroom', 'Pharma/Perishables', 'Compliance'],
    owner: 'Customer Intelligence',
    lastUpdated: '2026-01-14',
    audience: ['Airlines'],
    market: ['UAE', 'MENA', 'SG'],
    content: {
      sections: [
        {
          heading: 'Account snapshot',
          body: 'Etihad is sensitive to cargo integrity and compliance requirements for specific shipments, especially those with religious/halal handling constraints.',
        },
        {
          heading: 'Known requirement / constraint',
          body: 'Coldroom storage for relevant goods must be halal-certified (or handled under a halal-compliant process). Any breach risks reputational impact and shipment rejection.',
        },
        {
          heading: 'Sales implications',
          body: "This is not just a pricing conversation—it's a risk + governance conversation. Lead with compliance assurance, audited processes, and clear SOP visibility.",
        },
        {
          heading: 'Recommended approach',
          body: '1) Confirm scope: which commodities/lanes require halal coldroom.\n2) Offer documented halal-compliant cold chain SOP + traceability.\n3) Propose a service addendum covering halal handling + escalation process.\n4) Provide a site walk / ops briefing to build trust early.',
        },
        {
          heading: 'Operational checklist (proposal-ready)',
          body: '• Halal certification evidence (facility/process)\n• Segregation controls (physical + process)\n• Labeling & chain-of-custody checkpoints\n• Temperature monitoring & exception handling\n• Named ops POC + escalation SLA\n• Audit / review cadence',
        },
        {
          heading: 'Risks & watchouts',
          body: 'Do not overpromise certification status. If certification is pending or partial, propose an interim process-control solution with explicit boundaries and a date-based commitment.',
        },
      ],
      links: [
        {
          label: 'Contract Templates (addendum / SLA language)',
          to: { category: 'contracts', label: 'Contract Templates' },
        },
        {
          label: 'Objection Handling (compliance / audit pushback)',
          to: { category: 'objections', label: 'Objection Handling' },
        },
      ],
      downloads: [
        {
          label: 'Halal coldroom checklist (PDF)',
          filename: 'halal-coldroom-checklist.pdf',
        },
        {
          label: 'Customer briefing one-pager (PPTX)',
          filename: 'etihad-intel-onepager.pptx',
        },
      ],
    },
  },
];

export function getItemById(id: string) {
  return ITEMS.find((x) => x.id === id);
}
