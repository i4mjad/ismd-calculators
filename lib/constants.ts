export const cloudRiskColors: Record<string, string> = {
  Low: "#D1FAE5", // green-100
  Medium: "#FEF9C3", // yellow-100
  High: "#FEE2E2", // red-100
  Critical: "#F3E8FF", // purple-100
}

export const cloudRiskValues: Record<string, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
  Critical: 4,
}

export const cloudFields: Record<string, Record<string, string>> = {
  dataClassification: {
    label: "Data Classification",
    options: {
      Public: "Low",
      Internal: "Medium",
      Confidential: "High",
      Restricted: "Critical",
    },
  },
  userAuthentication: {
    label: "User Authentication",
    options: {
      "Multi-Factor Authentication (MFA)": "Low",
      "Strong Password Policy": "Medium",
      "Basic Password Policy": "High",
      "No Authentication": "Critical",
    },
  },
  networkSecurity: {
    label: "Network Security",
    options: {
      "VPC with Strict Firewall Rules": "Low",
      "VPC with Permissive Rules": "Medium",
      "Publicly Exposed with Security Groups": "High",
      "Direct Public Access": "Critical",
    },
  },
  dataEncryption: {
    label: "Data Encryption",
    options: {
      "End-to-End Encryption (In-transit & At-rest)": "Low",
      "Encryption at Rest Only": "Medium",
      "Encryption in Transit Only": "High",
      "No Encryption": "Critical",
    },
  },
  vulnerabilityManagement: {
    label: "Vulnerability Management",
    options: {
      "Automated Scanning & Patching": "Low",
      "Regular Manual Scanning": "Medium",
      "Ad-hoc Scanning": "High",
      "No Vulnerability Management": "Critical",
    },
  },
  loggingAndMonitoring: {
    label: "Logging and Monitoring",
    options: {
      "Centralized Logging with Real-time Alerts": "Low",
      "Local Logging with Regular Reviews": "Medium",
      "Basic Service Logs Only": "High",
      "No Logging or Monitoring": "Critical",
    },
  },
  incidentResponse: {
    label: "Incident Response Plan",
    options: {
      "Documented & Tested Plan": "Low",
      "Documented Plan (Untested)": "Medium",
      "Informal Plan": "High",
      "No Plan": "Critical",
    },
  },
  thirdPartyIntegrations: {
    label: "Third-Party Integrations",
    options: {
      "Vetted with Strict Security Review": "Low",
      "Vetted with Basic Review": "Medium",
      "Unvetted Reputable Sources": "High",
      "Unvetted or Unknown Sources": "Critical",
    },
  },
}

export interface Category {
  weight: number
  options: [label: string, score: number][]
}

export const projectCategories: Record<string, Category> = {
  strategic: {
    weight: 5,
    options: [
      ["Aligns with core business objectives", 1],
      ["Supports departmental goals", 2],
      ["Minor alignment with strategic goals", 3],
      ["No clear alignment with business strategy", 4],
      ["Conflicts with strategic direction", 5],
    ],
  },
  financial: {
    weight: 5,
    options: [
      ["Budget well-defined, <5% variance expected", 1],
      ["Budget defined, 5-10% variance expected", 2],
      ["Budget is an estimate, 10-20% variance possible", 3],
      ["High-level budget only, >20% variance likely", 4],
      ["No defined budget or funding", 5],
    ],
  },
  technical: {
    weight: 4,
    options: [
      ["Uses proven, in-house technology", 1],
      ["Uses mature, but new-to-us technology", 2],
      ["Requires significant integration with legacy systems", 3],
      ["Based on emerging or unproven technology", 4],
      ["Requires groundbreaking, undeveloped technology", 5],
    ],
  },
  resource: {
    weight: 4,
    options: [
      ["Team is fully staffed with required skills", 1],
      ["Team is mostly staffed, minor skill gaps", 2],
      ["Significant skill gaps or staff shortages", 3],
      ["Key roles are unfilled", 4],
      ["No team or resources allocated", 5],
    ],
  },
  schedule: {
    weight: 3,
    options: [
      ["Timeline is realistic with buffer", 1],
      ["Timeline is achievable but tight", 2],
      ["Timeline is aggressive, no room for delays", 3],
      ["Timeline is highly optimistic, likely to slip", 4],
      ["Deadline is fixed and seems impossible", 5],
    ],
  },
  operational: {
    weight: 3,
    options: [
      ["Minimal impact on existing business processes", 1],
      ["Requires minor changes to business processes", 2],
      ["Requires significant changes to business processes", 3],
      ["Will cause major disruption to operations", 4],
      ["Requires a complete overhaul of core operations", 5],
    ],
  },
  legal: {
    weight: 2,
    options: [
      ["No legal or compliance issues", 1],
      ["Minor compliance considerations (e.g., GDPR)", 2],
      ["Complex licensing or regulatory requirements", 3],
      ["Potential for significant legal challenges", 4],
      ["Known legal barriers or IP conflicts", 5],
    ],
  },
  security: {
    weight: 5,
    options: [
      ["Follows established security best practices", 1],
      ["Minor deviations from security standards", 2],
      ["Handles sensitive data with some security gaps", 3],
      ["Significant security vulnerabilities identified", 4],
      ["No security considerations in project plan", 5],
    ],
  },
  vendor: {
    weight: 2,
    options: [
      ["No external vendors required", 1],
      ["Working with established, reliable vendors", 2],
      ["Working with new, but reputable vendors", 3],
      ["Dependent on a single, unproven vendor", 4],
      ["Multiple critical dependencies on unreliable vendors", 5],
    ],
  },
  stakeholder: {
    weight: 3,
    options: [
      ["Stakeholders are fully aligned and supportive", 1],
      ["Most stakeholders are supportive", 2],
      ["Some key stakeholders are neutral or unengaged", 3],
      ["A key stakeholder is opposed to the project", 4],
      ["Widespread stakeholder opposition", 5],
    ],
  },
  scope: {
    weight: 4,
    options: [
      ["Scope is well-defined and frozen", 1],
      ["Scope is defined, minor changes expected", 2],
      ["Scope is loosely defined, changes are likely", 3],
      ["Scope is unclear and subject to frequent changes", 4],
      ["No defined scope (scope creep is guaranteed)", 5],
    ],
  },
  adoption: {
    weight: 2,
    options: [
      ["High user demand and enthusiasm", 1],
      ["Users are open, but require training", 2],
      ["Users are resistant to change", 3],
      ["Significant user resistance expected", 4],
      ["The solution is unwanted by the target users", 5],
    ],
  },
  data: {
    weight: 3,
    options: [
      ["Data is readily available and high quality", 1],
      ["Data is available but requires cleaning", 2],
      ["Data is difficult to obtain or of poor quality", 3],
      ["Significant data migration/creation effort needed", 4],
      ["No data available for the project", 5],
    ],
  },
}
