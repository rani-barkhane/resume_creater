import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export function getOpenAI(): OpenAI | null {
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

export async function rewriteExperienceBullet(
  raw: string,
  context?: string
): Promise<string> {
  const client = getOpenAI();
  if (!client) {
    return mockRewrite(raw);
  }

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a professional resume writer. Rewrite bullet points to be ATS-friendly with action verbs and metrics. Return only the rewritten text, no quotes.",
      },
      {
        role: "user",
        content: `Rewrite this resume bullet${context ? ` for a ${context} role` : ""}:\n\n${raw}`,
      },
    ],
    max_tokens: 200,
    temperature: 0.7,
  });

  return res.choices[0]?.message?.content?.trim() || mockRewrite(raw);
}

export async function generateSummary(
  jobTitle: string,
  skills: string[],
  experience: string
): Promise<string> {
  const client = getOpenAI();
  if (!client) {
    return `Experienced ${jobTitle} with expertise in ${skills.slice(0, 4).join(", ")}. Proven ability to deliver high-impact solutions and collaborate across teams.`;
  }

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Write a compelling 3-sentence professional resume summary. ATS-friendly, no fluff.",
      },
      {
        role: "user",
        content: `Job title: ${jobTitle}\nSkills: ${skills.join(", ")}\nExperience highlights: ${experience}`,
      },
    ],
    max_tokens: 250,
  });

  return (
    res.choices[0]?.message?.content?.trim() ||
    `Experienced ${jobTitle} professional.`
  );
}

export async function suggestSkills(
  jobTitle: string,
  existing: string[]
): Promise<string[]> {
  const client = getOpenAI();
  const defaults = [
    "Communication",
    "Problem Solving",
    "Team Collaboration",
    "Project Management",
    "Agile",
  ];
  if (!client) return defaults.filter((s) => !existing.includes(s));

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Suggest 8 ATS-friendly skills for a ${jobTitle}. Existing: ${existing.join(", ")}. Return comma-separated only.`,
      },
    ],
    max_tokens: 100,
  });

  const text = res.choices[0]?.message?.content || "";
  return text
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function mockRewrite(raw: string): string {
  const verbs: Record<string, string> = {
    worked: "Developed",
    made: "Engineered",
    helped: "Collaborated on",
    did: "Executed",
    built: "Architected",
  };
  let result = raw;
  for (const [k, v] of Object.entries(verbs)) {
    if (result.toLowerCase().startsWith(k)) {
      result = v + result.slice(k.length);
      break;
    }
  }
  if (result.length < 80) {
    result +=
      " using modern technologies, improving efficiency and user experience while collaborating with cross-functional teams.";
  }
  return result.charAt(0).toUpperCase() + result.slice(1);
}
