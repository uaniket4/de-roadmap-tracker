import type { Day, Phase, Week } from "@/data/roadmap-data";

export type LocalAIProvider = "ollama" | "openai-compatible";

export interface LocalAIConfig {
  provider: LocalAIProvider;
  endpoint: string;
  model: string;
  temperature: number;
}

export interface LocalAIClient {
  generate(prompt: string): Promise<string>;
  healthCheck(): Promise<boolean>;
}

function endpointFor(config: LocalAIConfig) {
  return config.endpoint.replace(/\/+$/, "");
}

export function createLocalAIClient(config: LocalAIConfig): LocalAIClient {
  return {
    async generate(prompt) {
      const base = endpointFor(config);
      const response = await fetch(
        config.provider === "ollama" ? `${base}/api/generate` : `${base}/v1/chat/completions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            config.provider === "ollama"
              ? { model: config.model, prompt, stream: false, options: { temperature: config.temperature } }
              : { model: config.model, temperature: config.temperature, messages: [{ role: "user", content: prompt }] }
          ),
        }
      );
      if (!response.ok) throw new Error(`Local AI request failed (${response.status})`);
      const data = await response.json() as { response?: string; choices?: { message?: { content?: string } }[] };
      const text = config.provider === "ollama" ? data.response : data.choices?.[0]?.message?.content;
      if (!text) throw new Error("Local AI returned an empty response");
      return text;
    },
    async healthCheck() {
      try {
        const response = await fetch(config.provider === "ollama" ? `${endpointFor(config)}/api/tags` : `${endpointFor(config)}/v1/models`, { method: "GET" });
        return response.ok;
      } catch {
        return false;
      }
    },
  };
}

export function buildDailyGuidePrompt(week: Week, day: Day, phase: Phase | undefined, previousProgress: string) {
  return `You are a practical local coding mentor. Create an exact, sequential execution guide for one roadmap day.
Use only the roadmap context below. Do not give generic study advice and do not provide a complete project solution.

ROADMAP CONTEXT
Phase: ${phase?.label || "Unknown"}; project: ${phase?.project || "Not specified"}
Week ${week.w}: ${week.title}
Day: ${day.d} — ${day.title}
Estimated time: ${day.time}
Tasks: ${day.tasks.join(" | ")}
Deliverable: ${day.deliverable || "None"}
Suggested commit: ${day.commit || "No commit specified"}
Previous progress/notes: ${previousProgress || "No previous notes"}

Return concise markdown with exactly these sections:
## TODAY'S OBJECTIVE
## WHAT YOU WILL LEARN
## BEFORE YOU START
## EXACT EXECUTION STEPS
For every step include TEACH, DO, and VERIFY. Include commands, file names, expected outputs, and what counts as completion. Keep it executable within the estimated time. End with ## COMPLETION CHECK and a short checklist.`;
}
