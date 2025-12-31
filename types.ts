
export interface RedFlag {
  risk: string;
  category: 'Payment Terms' | 'Termination Clauses' | 'Confidentiality' | 'Intellectual Property' | 'Liability' | 'Governing Law' | 'Other';
  severity: 'High' | 'Medium' | 'Low';
  explanation: string;
  alternative: string;
}

export interface ContractAuditResult {
  healthScore: number;
  verdict: string;
  redFlags: RedFlag[];
  negotiationEmail: string;
  summary: string;
}

export interface AuditRecord extends ContractAuditResult {
  id: string;
  contractTitle: string;
  timestamp: string;
  userId: string;
}

export type LoadingState = 'idle' | 'analyzing' | 'error';
