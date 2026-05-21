import type { ATSResult, ResumeData } from "@/types/resume";

const ATS_KEYWORDS = [
  "leadership",
  "management",
  "communication",
  "collaboration",
  "problem-solving",
  "analytical",
  "agile",
  "scrum",
  "javascript",
  "typescript",
  "react",
  "node",
  "python",
  "sql",
  "aws",
  "docker",
  "kubernetes",
  "ci/cd",
  "api",
  "database",
  "optimization",
  "performance",
  "stakeholder",
  "cross-functional",
  "deliverables",
  "metrics",
  "roi",
];

export function analyzeATS(data: ResumeData, targetRole?: string): ATSResult {
  const text = buildResumeText(data);
  const words = text.toLowerCase().split(/\W+/).filter(Boolean);
  const wordSet = new Set(words);

  const missingSections: string[] = [];
  if (!data.personal.fullName) missingSections.push("Full Name");
  if (!data.personal.email) missingSections.push("Email");
  if (!data.summary || data.summary.length < 50)
    missingSections.push("Professional Summary");
  if (data.experience.length === 0) missingSections.push("Work Experience");
  if (data.education.length === 0) missingSections.push("Education");
  if (data.skills.length < 3) missingSections.push("Skills (min 3)");

  const weakSections: string[] = [];
  if (data.summary && data.summary.length < 100)
    weakSections.push("Summary is too short");
  data.experience.forEach((exp, i) => {
    if (exp.description.length < 80)
      weakSections.push(`Experience #${i + 1}: add more bullet points`);
  });
  if (data.skills.length < 5) weakSections.push("Add more relevant skills");

  const foundKeywords = ATS_KEYWORDS.filter((kw) =>
    wordSet.has(kw.toLowerCase()) || text.toLowerCase().includes(kw)
  );
  const missingKeywords = ATS_KEYWORDS.filter(
    (kw) => !foundKeywords.includes(kw)
  ).slice(0, 8);

  const roleKeywords = targetRole
    ? targetRole.toLowerCase().split(/\W+/).filter((w) => w.length > 3)
    : [];
  const roleMatches = roleKeywords.filter((kw) => text.toLowerCase().includes(kw));

  const completeness = Math.round(
    ((8 - missingSections.length) / 8) * 100
  );
  const keywordScore = Math.min(
    100,
    Math.round((foundKeywords.length / 12) * 100) +
      (roleKeywords.length ? Math.round((roleMatches.length / roleKeywords.length) * 20) : 0)
  );
  const readability = estimateReadability(text);
  const score = Math.round(
    completeness * 0.35 + keywordScore * 0.35 + readability * 0.3
  );

  const suggestions: string[] = [];
  if (missingSections.length)
    suggestions.push(`Complete missing sections: ${missingSections.join(", ")}`);
  if (missingKeywords.length)
    suggestions.push(
      `Consider adding keywords: ${missingKeywords.slice(0, 5).join(", ")}`
    );
  if (weakSections.length)
    suggestions.push(...weakSections.slice(0, 3));
  if (score >= 80)
    suggestions.push("Great ATS compatibility! Fine-tune keywords for your target role.");
  else
    suggestions.push("Use action verbs and quantify achievements in experience bullets.");

  return {
    score: Math.min(100, Math.max(0, score)),
    completeness,
    keywordScore,
    readability,
    missingSections,
    weakSections,
    missingKeywords: missingKeywords.slice(0, 10),
    suggestions,
  };
}

function buildResumeText(data: ResumeData): string {
  return [
    data.personal.fullName,
    data.personal.jobTitle,
    data.summary,
    ...data.skills,
    ...data.experience.map(
      (e) => `${e.position} ${e.company} ${e.description}`
    ),
    ...data.education.map((e) => `${e.degree} ${e.institution}`),
    ...data.projects.map((p) => `${p.name} ${p.description}`),
  ].join(" ");
}

function estimateReadability(text: string): number {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 5);
  const words = text.split(/\s+/).filter(Boolean);
  if (sentences.length === 0 || words.length === 0) return 40;
  const avgWords = words.length / sentences.length;
  if (avgWords > 30) return 55;
  if (avgWords > 22) return 70;
  return 88;
}
