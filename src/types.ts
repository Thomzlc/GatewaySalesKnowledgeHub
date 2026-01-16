export type Category =
  | "playbooks"
  | "pricing"
  | "contracts"
  | "case-studies"
  | "objections"
  | "competitive"
  | "customer-intelligence";

export type HubItemType =
  | "doc"
  | "template"
  | "card"
  | "battlecard"
  | "guide"
  | "case"
  | "intelligence-report";


export type HubItem = {
  id: string;
  category: Category;
  type: HubItemType;
  title: string;
  summary: string;
  tags: string[];
  owner: string;
  lastUpdated: string; // YYYY-MM-DD
  audience?: string[];
  market?: string[];
  content: {
    sections: { heading: string; body: string }[];
    links?: { label: string; to: { category: Category; label: string } }[];
    downloads?: { label: string; filename: string }[];
  };
};
