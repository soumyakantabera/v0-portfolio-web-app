export const projects = [
  {
    id: "dcf-sandbox",
    title: "DCF Valuation Sandbox",
    description:
      "Interactive DCF model with sensitivity analysis and visualization. Build and test valuation assumptions in real-time.",
    category: "Valuation",
    tools: ["Python", "Excel", "Recharts"],
    features: ["Real-time WACC calculation", "Terminal value scenarios", "Sensitivity tables", "Export to Excel"],
    metrics: {
      complexity: "Advanced",
      timeToComplete: "3 weeks",
    },
    link: "/risk-lab",
  },
  {
    id: "scenario-toolkit",
    title: "Scenario & Sensitivity Toolkit",
    description:
      "Comprehensive toolkit for financial scenario modeling with tornado charts, what-if analysis, and guided walkthrough.",
    category: "Risk Analysis",
    tools: ["Excel", "Python", "VBA", "Recharts"],
    features: [
      "What-if analysis",
      "Tornado charts",
      "Editable data tables",
      "Guided walkthrough",
      "Real-time sensitivity",
    ],
    metrics: {
      complexity: "Advanced",
      timeToComplete: "3 weeks",
    },
    link: "/risk-lab",
  },
  {
    id: "kpi-dashboard",
    title: "Financial KPI Dashboard",
    description:
      "Power BI-style dashboard for tracking key financial metrics, variance analysis, and trend visualization.",
    category: "Analytics",
    tools: ["Power BI", "DAX", "Excel"],
    features: ["Real-time KPI tracking", "Variance waterfall charts", "Trend analysis", "Drill-down capabilities"],
    metrics: {
      complexity: "Intermediate",
      timeToComplete: "2 weeks",
    },
  },
  {
    id: "time-series",
    title: "Time Series Forecasting Tool",
    description: "ARIMA and regression-based forecasting model for financial planning and revenue prediction.",
    category: "Quantitative",
    tools: ["Python", "statsmodels", "scikit-learn"],
    features: ["Trend/seasonality decomposition", "ARIMA modeling", "Confidence intervals", "Error metrics (MAE/MSE)"],
    metrics: {
      complexity: "Advanced",
      timeToComplete: "4 weeks",
    },
    link: "/risk-lab",
  },
  {
    id: "fraud-detection",
    title: "Fraud Detection System",
    description: "Machine learning model for detecting anomalies and potential fraud in financial transactions.",
    category: "ML/AI",
    tools: ["Python", "scikit-learn", "pandas"],
    features: ["Anomaly detection", "Classification models", "Feature engineering", "Model evaluation"],
    metrics: {
      complexity: "Advanced",
      timeToComplete: "5 weeks",
    },
  },
]
