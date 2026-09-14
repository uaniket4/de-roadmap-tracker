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

class LocalAIRequestError extends Error {
  constructor(public readonly status: number, public readonly detail: string) {
    super(`Local AI request failed (${status})`);
  }
}

export function describeLocalAIError(error: unknown, config: LocalAIConfig): string {
  if (error instanceof LocalAIRequestError) {
    if (error.status === 404 && config.provider === "ollama") {
      return `Ollama was reached, but it returned 404 for model "${config.model}". Run "ollama list" to see installed models, then either set the exact model name in Settings or run "ollama pull ${config.model}". Keep the endpoint at http://localhost:11434 (without /api/generate).${error.detail ? ` Runtime response: ${error.detail}` : ""}`;
    }
    if (error.status === 404 && config.provider === "openai-compatible") {
      return `The OpenAI-compatible server was reached, but its route was not found. Set Endpoint to the server base URL, not /v1/chat/completions. The app adds /v1/chat/completions automatically.${error.detail ? ` Runtime response: ${error.detail}` : ""}`;
    }
    return `Local AI request failed (${error.status}).${error.detail ? ` Runtime response: ${error.detail}` : ""}`;
  }
  if (error instanceof TypeError && /fetch/i.test(error.message)) {
    const origin = typeof window === "undefined" ? "this app" : window.location.origin;
    if (config.provider === "ollama") {
      return `The browser could not reach Ollama at ${config.endpoint}. Make sure Ollama is running and allow this app origin (${origin}) with OLLAMA_ORIGINS, then restart Ollama. If this is a Vercel deployment, localhost refers to your own computer, which is expected.`;
    }

    return `The browser could not reach the local OpenAI-compatible server at ${config.endpoint}. Start the server, enable CORS for ${origin}, and confirm the endpoint is the server base URL (not a chat-completions URL).`;
  }
  return error instanceof Error ? error.message : "Local AI is unavailable. Check Settings and your local runtime.";
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
      if (!response.ok) {
        const detail = await response.text();
        throw new LocalAIRequestError(response.status, detail.slice(0, 240));
      }
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
