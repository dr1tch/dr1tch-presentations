---
theme: seriph
title: Evercam Copilot v2
info: From Prompt Spaghetti to a Production-Grade AI Assistant
class: text-center
drawings:
  persist: false
transition: slide-left
colorSchema: dark
---
<!-- background: ../assets/img/evercam.jpg -->

<div class="absolute inset-0 bg-black/65" />

<div class="relative z-10 flex flex-col items-center justify-center h-full gap-4">
  <div
    v-motion
    :initial="{ opacity: 0, y: -30 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }"
    class="text-xs tracking-widest uppercase text-red-400 font-semibold"
  >
    Evercam Labs · April 2026
  </div>

  <h1
    v-motion
    :initial="{ opacity: 0, scale: 0.92 }"
    :enter="{ opacity: 1, scale: 1, transition: { delay: 200, duration: 700 } }"
    class="text-6xl font-black leading-tight"
    style="background: #E72C32; -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
  >
    Evercam Copilot v2
  </h1>

  <p
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 450, duration: 600 } }"
    class="text-xl text-white/65"
  >
    From Prompt Spaghetti to a Production-Grade AI Assistant
  </p>

  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: 850, duration: 600 } }"
    class="flex gap-5 text-sm text-white/40 mt-4"
  >
    <span>LangGraph</span><span>·</span><span>Azure GPT-4o-mini</span><span>·</span><span>TypeScript</span><span>·</span><span>Jest</span>
  </div>
</div>

<!--
Welcome everyone. This talk is about a complete rewrite of Evercam's AI assistant — Copilot. Not just a refactor, but a ground-up rethink of how we build AI features that are reliable, testable, and don't cost a fortune to run. I'll walk you through what broke in v1, the insight that changed how we approached it, and the architecture we landed on. Let's get into it.
-->

---
transition: fade-out
layout: center
---

<h2 class="text-3xl font-bold text-center mb-8">What is Evercam Copilot?</h2>

<div class="grid grid-cols-2 gap-10 items-center max-w-4xl mx-auto">

<div class="space-y-3">
  <div v-click class="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm italic text-white/80">"How many trucks came through Gate B last Tuesday?"</div>
  <div v-click class="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm italic text-white/80">"Was there weather that delayed the pour on Friday?"</div>
  <div v-click class="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm italic text-white/80">"Show me a timelapse of the last 3 months."</div>
  <div v-click class="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-sm italic text-white/80">"Take me to smart search for the East site."</div>
</div>

<div v-click class="grid grid-cols-2 gap-3">
  <div class="flex flex-col items-center gap-2 p-4 rounded-xl bg-yellow-900/30 border border-yellow-500/30">
    <span class="text-3xl">🌤️</span>
    <span class="text-xs font-semibold text-yellow-300">Weather</span>
  </div>
  <div class="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-900/30 border border-blue-500/30">
    <span class="text-3xl">🚗</span>
    <span class="text-xs font-semibold text-blue-300">Vehicles</span>
  </div>
  <div class="flex flex-col items-center gap-2 p-4 rounded-xl bg-pink-900/30 border border-pink-500/30">
    <span class="text-3xl">🎬</span>
    <span class="text-xs font-semibold text-pink-300">Media</span>
  </div>
  <div class="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-900/30 border border-green-500/30">
    <span class="text-3xl">🔍</span>
    <span class="text-xs font-semibold text-green-300">Smart Search</span>
  </div>
  <div class="col-span-2 flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-900/30 border border-purple-500/30">
    <span class="text-3xl">🗺️</span>
    <span class="text-xs font-semibold text-purple-300">Navigate — 30+ dashboard routes</span>
  </div>
</div>

</div>

<!--
Copilot is a natural language interface layered on top of Evercam's data. Site managers and engineers can ask questions in plain English instead of clicking through dashboards. These are real questions our users ask — "how many trucks", "was there weather", "show me a timelapse". The five domains on the right are what the assistant can handle today. Each one connects to real data — cameras, detections, weather APIs, media creation. It's not a chatbot that generates text. It actually does things.
-->

---
layout: image-right
image: https://images.unsplash.com/photo-1581094651181-35942459ef62?w=900&q=80
transition: slide-up
---

# The First Build

### A system held together with tape

<div class="mt-5 space-y-5">

<div v-click class="flex gap-3 items-start">
  <span class="text-xl mt-0.5">🧠</span>
  <div>
    <div class="font-semibold text-red-400 text-sm">Leaking Memory</div>
    <div class="text-xs text-white/65 mt-0.5">Manual 6-message window. Follow-ups from 8 messages ago? Completely lost. Context from Project A bled into Project B.</div>
  </div>
</div>

<div v-click class="flex gap-3 items-start">
  <span class="text-xl mt-0.5">📅</span>
  <div>
    <div class="font-semibold text-red-400 text-sm">Date Hallucinations</div>
    <div class="text-xs text-white/65 mt-0.5">"Last Tuesday" → LLM guesses. Sometimes off by a week. A site manager quoted a wrong vehicle count in a client report.</div>
  </div>
</div>

<div v-click class="flex gap-3 items-start">
  <span class="text-xl mt-0.5">💸</span>
  <div>
    <div class="font-semibold text-red-400 text-sm">Every Message Was Expensive</div>
    <div class="text-xs text-white/65 mt-0.5">Full conversation + project context + system prompt re-injected every message. "Hello" cost the same as a complex query.</div>
  </div>
</div>

<div v-click class="flex gap-3 items-start">
  <span class="text-xl mt-0.5">🔧</span>
  <div>
    <div class="font-semibold text-red-400 text-sm">Routing in Prompt Strings</div>
    <div class="text-xs text-white/65 mt-0.5">A typo in a JSON key silently routed everything to the wrong agent for days. No tests caught it. We had minimal coverage.</div>
  </div>
</div>

</div>

<!--
Let me tell you what we were dealing with before. The first version was built fast and it worked — until it didn't. The memory issue was real: we had a 6-message sliding window, and anything outside that window was gone. We had a case where a user's context from Project A leaked into Project B. The date hallucinations were the worst — we had a site manager take a vehicle count from Copilot and put it in a client report, and it was wrong because the LLM guessed the date range. The routing bug was also painful — a typo in a prompt string, and the wrong agent ran silently for days with no error, no test failure, nothing. These weren't edge cases. These were regular patterns.
-->

---
layout: two-cols
layoutClass: gap-12
transition: slide-left
---

# The Old System

<div class="mt-4 space-y-4">

<div class="text-xs text-white/50 uppercase tracking-wider font-semibold mb-3">What happened on every message</div>

<div v-click class="flex items-center gap-3 p-3 rounded-lg bg-slate-800 border border-white/10">
  <span class="text-orange-400 font-mono text-xs w-5 text-center">1</span>
  <span class="text-sm">Inject last 6 messages + full project context</span>
</div>

<div v-click class="flex items-center gap-3 p-3 rounded-lg bg-red-900/40 border border-red-500/30">
  <span class="text-red-400 font-mono text-xs w-5 text-center">2</span>
  <span class="text-sm">LLM call — <span class="text-red-300 font-bold">20k–36k tokens per message</span></span>
</div>

<div v-click class="flex items-center gap-3 p-3 rounded-lg bg-slate-800 border border-white/10">
  <span class="text-orange-400 font-mono text-xs w-5 text-center">3</span>
  <span class="text-sm">LLM guesses the route (no type safety)</span>
</div>

<div v-click class="flex items-center gap-3 p-3 rounded-lg bg-red-900/40 border border-red-500/30">
  <span class="text-red-400 font-mono text-xs w-5 text-center">4</span>
  <span class="text-sm">Second LLM call — agent execution</span>
</div>

<div v-click class="flex items-center gap-3 p-3 rounded-lg bg-orange-900/40 border border-orange-500/30">
  <span class="text-orange-400 font-mono text-xs w-5 text-center">5</span>
  <span class="text-sm">Response — maybe hallucinated 🎲</span>
</div>

</div>

::right::

<div class="mt-14 space-y-5">

<div class="text-xs" v-click>

| Metric | Before |
|---|---|
| Prompt tokens / message | **20,245–35,913** |
| Completion tokens / message | **45–102** |
| Total cost (4 msgs) | **$0.20–$0.36** |
| Unit tests | **Sparse** |

</div>

<div v-click class="mt-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-sm">
  <div class="text-red-300 font-semibold mb-1">The root cause</div>
  <div class="text-white/65 text-xs">Treating the LLM as a Swiss Army knife — routing, memory, date logic, and response generation all in one pass. Errors in any step compound.</div>
</div>

<div v-click class="mt-3 text-xs text-white/50">
  Source: Azure <code>gpt-4o</code> usage logs, Apr 1 & Apr 8, 2026 (4 messages each session).
</div>

</div>

<!--
Here are the actual numbers. Up to 36,000 tokens per message. That's the entire project context, all messages, all tool definitions, re-injected every single time. Say "hello" — 20k tokens burned. The core problem is architectural: we were asking the LLM to do everything in one pass. Route the intent, resolve the dates, pick the right fields, run the tool, write the response. Any failure in that chain cascades. And because it was all in one prompt, there was nothing to test independently. That's what we set out to fix.
-->

---
layout: center
transition: fade
---

<div class="text-center max-w-2xl mx-auto">
  <div class="text-5xl mb-5">💡</div>
  <h2 class="text-4xl font-bold mb-8">The Key Insight</h2>

  <div
    v-motion
    :initial="{ opacity: 0, scale: 0.85 }"
    :enter="{ opacity: 1, scale: 1, transition: { duration: 600 } }"
    class="text-2xl font-light px-10 py-6 rounded-2xl border border-orange-400/40 bg-orange-400/10"
  >
    Use the LLM to <span class="text-orange-400 font-bold">generate text</span>.<br/>
    Use <span class="text-blue-400 font-bold">TypeScript</span> to make decisions.
  </div>

  <div v-click class="mt-8 text-white/55 text-base leading-relaxed">
    Routing rules in TypeScript. Date logic in pure functions.<br/>
    Field validation with Zod schemas. The LLM generates the response — nothing else.
  </div>

  <div v-click class="mt-6 grid grid-cols-3 gap-4 text-sm">
    <div class="p-3 rounded-lg bg-white/5 border border-white/10">
      <div class="text-orange-400 font-bold text-xs uppercase mb-1">Before</div>
      <div class="text-white/60 text-xs">LLM decides route, dates, fields, and writes the answer</div>
    </div>
    <div class="p-3 rounded-lg bg-white/5 border border-orange-400/20">
      <div class="text-blue-400 font-bold text-xs uppercase mb-1">After — TypeScript</div>
      <div class="text-white/60 text-xs">Routing, dates, validation, field collection</div>
    </div>
    <div class="p-3 rounded-lg bg-white/5 border border-orange-400/20">
      <div class="text-orange-400 font-bold text-xs uppercase mb-1">After — LLM</div>
      <div class="text-white/60 text-xs">Intent classification + response generation only</div>
    </div>
  </div>
</div>

<!--
This is the single idea that changed everything. Stop asking the LLM to be a decision engine — it's a text generator. Dates are math: pure functions, no LLM needed. Routing is a switch statement: TypeScript, not a prompt. Field validation is a Zod schema. The LLM should only do what it's good at — understanding intent and writing a natural-language response. The moment we drew this line clearly, the whole architecture became obvious.
-->

---
layout: two-cols
layoutClass: gap-10
transition: slide-up
---

# Why LangGraph?

<div class="mt-3 text-xs">
<div class="text-xs text-white/40 uppercase tracking-wider mb-3">Problems solved</div>

| Problem | Solution |
|---|---|
| LLM date hallucinations | Deterministic pre-processing |
| High tokens / message | Checkpointed messages |
| Manual 6-msg window | `messagesStateReducer` |
| No field collection | `interrupt()` → resume |
| Routing in prompts | Typed graph edges |
| "Hello" costs full LLM | Fast-path: <5ms, 0 tokens |
| Untestable monolith | 17 isolated, testable nodes |

</div>

::right::

<div class="mt-3 text-xs">
<div class="text-xs text-white/40 uppercase tracking-wider mb-3">Tech stack</div>

| Layer | Technology |
|---|---|
| Graph runtime | LangGraph JS |
| LLM | Azure OpenAI `gpt-4o-mini` |
| Structured output | `withStructuredOutput(Zod)` |
| Agent executor | LangChain ReAct |
| Checkpointing | `MemorySaver` |
| Tests | Jest (45+ cases) |

</div>

<div v-click class="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-white/70">
  <span class="text-blue-300 font-semibold">Philosophy: </span>
  Code-first, not prompt-driven. No silent fallbacks. Every error surfaces as a typed result.
</div>

<div v-click class="mt-3 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs text-white/70">
  <span class="text-orange-300 font-semibold">Key choice: </span>
  Graph recompiles per message (fresh SSE callbacks) but shares a single <code>MemorySaver</code> — state persists, connections don't.
</div>

<!--
LangGraph gave us a first-class primitive for every problem we had. State checkpointing replaced the manual message window. The interrupt/resume mechanism gave us field collection without any polling or timeout logic. Typed graph edges meant routing failures throw immediately rather than silently degrading. And splitting into 17 nodes meant each one could be unit tested in isolation. The key architectural note on the right: we rebuild the graph on every message so SSE streaming callbacks are always fresh, but the MemorySaver is shared — so conversation state persists across rebuilds. That's a subtle but important design.
-->

---
layout: center
transition: slide-left
class: px-6 py-3
---

<div class="flex flex-col items-baseline gap-3 mb-3">
  <h1 class="text-xl font-bold">The New Architecture</h1>
  <span class="text-xs text-white/35 tracking-wider">17 nodes · explicit state · deterministic flow</span>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-2">① Message Entry — Fast Path Check</div>

```mermaid {scale: 0.8}
flowchart TB
    MSG(["💬 User Message"]):::input
    FP{"Fast Path?"}:::decision
    INST["⚡ Instant Response\n< 5ms · 0 tokens"]:::fast
    CE["contextEnrichment\n📅 dates · 3-tier memory load"]:::process

    MSG --> FP
    FP -->|"greeting / datetime / capabilities"| INST
    FP -->|"everything else"| CE

    classDef input    fill:#1f2937,stroke:#6b7280,color:#e5e7eb
    classDef decision fill:#92400e,stroke:#f59e0b,color:#fef3c7
    classDef fast     fill:#14532d,stroke:#4ade80,color:#d1fae5
    classDef process  fill:#1e3a5f,stroke:#60a5fa,color:#dbeafe
```

<!--
Now let's walk through the architecture step by step. The very first thing that happens on every message — before the graph even initializes — is a fast-path check. Three regexes: greetings, capability questions, and "what time is it" style queries. If any match, we return an instant response in under 5 milliseconds with zero tokens burned. "Hello" should not cost money. After that, the first real node is contextEnrichment — no LLM, just setup. It resolves dates from the user's message, loads the three-tier memory, and snapshots state for the turn.
-->

---
layout: center
transition: slide-left
class: px-6 py-3
---

<div class="mb-3 flex flex-col items-baseline gap-0">
  <h1 class="text-xl font-bold">The New Architecture — Router</h1>
  <div class="text-xs text-white/35 tracking-wider mt-1">17 nodes · explicit state · deterministic flow</div>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-2">② Router — The Only LLM Decision Point</div>

```mermaid {scale: 0.8}
flowchart LR
    CE["contextEnrichment\n📅 dates · memory load"]:::process
    RT["router\n🤖 withStructuredOutput\nRouterDecision"]:::llm
    SAN["sanitize + validate\npure TypeScript"]:::process
    OUT["RouterDecision\n{ agent · toolHint · fields }"]:::success

    CE --> RT --> SAN --> OUT

    classDef process  fill:#1e3a5f,stroke:#60a5fa,color:#dbeafe
    classDef llm      fill:#3b0764,stroke:#c084fc,color:#f3e8ff
    classDef success  fill:#14532d,stroke:#4ade80,color:#d1fae5
```

<!--
The router is the only LLM call that makes a decision. And critically — it can't return free text. We use LangChain's withStructuredOutput with a Zod schema, so the LLM is forced to return a typed RouterDecision object. Agent type, tool hint, confidence, resolved fields, whether a chart was requested, whether there are multiple agents to chain. If the LLM tries to return anything malformed, LangChain throws immediately. After the LLM returns, pure TypeScript functions sanitize the output — validate project names exist, check exids with a regex, inject the working-memory project if the LLM missed it. The LLM's job here is classification only.
-->

---
layout: center
transition: slide-left
class: px-6 py-3
---

<div class="mb-3 flex flex-col items-baseline gap-0">
  <h1 class="text-xl font-bold">The New Architecture — Validation & Dispatch</h1>
  <div class="text-xs text-white/35 tracking-wider mt-1">17 nodes · explicit state · deterministic flow</div>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-2">③ Constraint Checking → Field Collection → Dispatch</div>

```mermaid {scale: 0.8}
flowchart LR
    RT["RouterDecision"]:::success
    VAL{"validation\nno LLM"}:::decision
    FC["fieldCollection\n⏸️ interrupt() if missing"]:::warn
    ER["errorResponse\n🚫 typed error"]:::err
    AD(["agentDispatch"]):::input

    RT --> VAL
    VAL -->|"valid ✅"| FC
    VAL -->|"clip > 60min\nfuture date\nbad timelapse"| ER
    FC --> AD

    classDef input    fill:#1f2937,stroke:#6b7280,color:#e5e7eb
    classDef decision fill:#92400e,stroke:#f59e0b,color:#fef3c7
    classDef warn     fill:#7f1d1d,stroke:#fbbf24,color:#fef9c3
    classDef err      fill:#7f1d1d,stroke:#f87171,color:#fee2e2
    classDef success  fill:#14532d,stroke:#4ade80,color:#d1fae5
```

<!--
After the router, we have two deterministic gates — no LLM in either. First is validation: checks hard constraints like clip duration over 60 minutes, future dates for media, invalid timelapse lengths. These are rules, not judgements — TypeScript, not a prompt. If validation fails, we go straight to an error response with a human-readable message. If it passes, fieldCollection checks whether we have everything we need — project, camera, date range. If anything's missing, the graph pauses using LangGraph's interrupt mechanism, asks the user, and resumes from the exact same checkpoint. No polling, no timeouts. Then agentDispatch routes to the right specialist.
-->

---
layout: center
transition: slide-left
class: px-6 py-3
---

<div class="mb-3 flex flex-col items-baseline gap-0">
  <h1 class="text-xl font-bold">The New Architecture — Specialist Subgraphs</h1>
  <div class="text-xs text-white/35 tracking-wider mt-1">17 nodes · explicit state · deterministic flow</div>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">④ Specialist Subgraphs — One Tool Each</div>

```mermaid {scale: 0.8}
flowchart TB
    AD(["agentDispatch"]):::input

    subgraph agents["Specialist Subgraphs — isolated state"]
      direction TB
      WA["🌤️ weather\ntoolHint → 1 of 3 tools"]:::agent
      VA["🚗 vehicle\ntoolHint → counts or detections"]:::agent
      MA["🎬 media\ntoolHint → clip or timelapse"]:::agent
      SA["🔍 smart search\nsmartSearch tool"]:::agent
    end

    AD -->|"conditional edge"| WA
    AD --> VA
    AD --> MA
    AD --> SA

    classDef input    fill:#1f2937,stroke:#6b7280,color:#e5e7eb
    classDef agent    fill:#78350f,stroke:#fbbf24,color:#fef9c3
```

<!--
Each specialist subgraph is its own isolated StateGraph with its own state type. The key design rule: each subgraph agent receives exactly one tool. Not a list of tools — one. This eliminates tool confusion entirely. The router already decided which tool via toolHint: for weather, is it hourly, current, or daily? For vehicle, counts or detections? For media, clip or timelapse? The subgraph just executes that one tool. The agent prompt is also much smaller because it doesn't need to explain tool selection logic — that's been moved upstream into TypeScript.
-->

---
layout: center
transition: slide-left
class: px-6 py-3
---

<div class="mb-3 flex flex-col items-baseline gap-0">
  <h1 class="text-xl font-bold">The New Architecture — Utility Agents</h1>
  <div class="text-xs text-white/35 tracking-wider mt-1">17 nodes · explicit state · deterministic flow</div>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">⑤ Non-Data Paths — Utility Agents</div>

```mermaid {scale: 0.8}
flowchart TB
    AD(["agentDispatch"]):::input

    DT["🧰 directToolHandler\nrenderCharts · searchDocumentation"]:::agent
    CN["💬 conversationalNode\nno LLM — canned fast responses"]:::fast
    NV["🗺️ navigationNode\nwithStructuredOutput → route URL"]:::agent
    MR["🧠 memoryRecall\n3-tier lookup before any LLM"]:::agent

    AD --> DT
    AD --> CN
    AD --> NV
    AD --> MR

    classDef input    fill:#1f2937,stroke:#6b7280,color:#e5e7eb
    classDef agent    fill:#78350f,stroke:#fbbf24,color:#fef9c3
    classDef fast     fill:#14532d,stroke:#4ade80,color:#d1fae5
```

<!--
Not everything goes through a data subgraph. Conversational node handles greetings and out-of-scope messages — no LLM, just canned responses from the fast-path router. Navigation uses structured output to return a typed route URL. Memory recall has a three-tier lookup: first tries to answer from in-state data like toolResults or workingMemory, then hits the episodic store, and only spins up a fallback agent as a last resort. DirectToolHandler is where charts and documentation search land.
-->

---
transition: slide-left
class: px-6 py-3
---

<div class="mb-3 flex flex-col items-baseline gap-0">
  <h1 class="text-xl font-bold">The New Architecture — Response & Memory</h1>
  <div class="text-xs text-white/35 tracking-wider mt-1">17 nodes · explicit state · deterministic flow</div>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">⑥ Multi-Agent Chaining → Assembly → Memory Write</div>

```mermaid {scale: 0.8}
flowchart LR
    SP(["specialist\nsubgraph"]):::input
    CAD["chainedAgentDispatch\n🔁 pop next from queue"]:::process
    DT["directToolHandler\n🧰 chart render"]:::process
    MR["memoryRecall\n🧠 cache hit"]:::process
    RA["responseAssembly\n📝 stitch results"]:::process
    MU["memoryUpdate\n💾 checkpoint + DB async"]:::success
    OUT(["✅ Response"]):::input

    SP -->|"pendingChainedAgents"| CAD
    CAD -.->|"route to subgraph"| SP
    SP -->|"chartRequested"| DT
    SP -->|"done"| RA
    MR --> RA
    DT --> RA
    RA --> MU --> OUT

    classDef input    fill:#1f2937,stroke:#6b7280,color:#e5e7eb
    classDef process  fill:#1e3a5f,stroke:#60a5fa,color:#dbeafe
    classDef success  fill:#14532d,stroke:#4ade80,color:#d1fae5
```

<!--
After a specialist finishes, we check three things in priority order: are there more agents in the queue? Is a chart requested? Or are we done? ChainedAgentDispatch pops the next agent from the queue and routes to that subgraph — it does NOT go back through agentDispatch. ResponseAssembly uses a turnResultOffset to slice only the current turn's results out of the accumulated toolResults array, since multi-turn conversations accumulate results indefinitely. MemoryUpdate writes messages to the checkpoint, episodic entries to the in-memory store, and fires an async Prisma write to the DB without blocking the response.
-->

---
layout: center
transition: slide-up
class: px-6 py-3
---

<h2 class="text-2xl font-bold text-center mb-5">Real Query Walkthrough</h2>
<div class="text-xs text-white/40 text-center mb-5 uppercase tracking-wider">"Show me vehicles on Gate B last Tuesday — and clip the last detection"</div>
<div class="text-xs">

```mermaid {scale: 0.45}
flowchart LR
    CE["📅 context · dates→ISO"]:::process
    RT["🤖 router · vehicle + chain:media"]:::llm
    FC["fieldCollection · ✅ resolved"]:::process
    VS["🚗 vehicleSubgraph · detections"]:::agent
    CD["chainedDispatch · ±5min · inject cam"]:::process
    MS["🎬 mediaSubgraph · createClip"]:::agent
    RA["assembly · vehicle+clip"]:::process

    CE --> RT --> FC --> VS --> CD --> MS --> RA

    classDef process  fill:#1e3a5f,stroke:#60a5fa,color:#dbeafe
    classDef llm      fill:#3b0764,stroke:#c084fc,color:#f3e8ff
    classDef agent    fill:#78350f,stroke:#fbbf24,color:#fef9c3
```

</div>

<!--
Let me make this concrete with a real query. "Show me vehicles on Gate B last Tuesday and clip the last detection." Here's what actually happens: contextEnrichment resolves "last Tuesday" to exact ISO dates before any LLM sees it. The router returns a structured decision: vehicle agent, with media queued as a chained agent, toolHint set to detections. FieldCollection is smart here — it skips asking for cameraExid for the media agent, because it knows the vehicle detection result will contain it. The vehicle subgraph runs, returns a detection array. ChainedAgentDispatch finds the latest detection, takes its timestamp, builds a ±5 minute clip window, and injects the cameraExid directly — the user never gets asked for it. The media subgraph runs with those pre-filled fields. ResponseAssembly stitches both results together. This is a two-agent chain that feels seamless to the user.
-->

---
layout: center
transition: fade-out
---

# 5 Key Innovations

<div class="grid grid-cols-1 gap-2 mt-3">

<div v-click class="flex gap-4 items-center p-3 rounded-lg bg-white/5 border border-white/10">
  <span class="text-2xl w-10 text-center flex-shrink-0">🕐</span>
  <div class="min-w-0">
    <span class="font-bold text-orange-300 text-sm">Deterministic Temporal Resolver — </span>
    <span class="text-xs text-white/65">16 regex patterns resolve dates to UTC <em>before</em> any LLM call. "Last Tuesday 9am" → <code class="text-xs">2026-03-31T09:00:00Z</code>. Zero date hallucinations from this layer.</span>
  </div>
</div>

<div v-click class="flex gap-4 items-center p-3 rounded-lg bg-white/5 border border-white/10">
  <span class="text-2xl w-10 text-center flex-shrink-0">⚡</span>
  <div>
    <span class="font-bold text-yellow-300 text-sm">Fast-Path Router — </span>
    <span class="text-xs text-white/65">Greetings, datetime, capabilities intercepted before the graph initializes. Zero tokens. Under 5ms. Two layers: before graph build and inside the router node.</span>
  </div>
</div>

<div v-click class="flex gap-4 items-center p-3 rounded-lg bg-white/5 border border-white/10">
  <span class="text-2xl w-10 text-center flex-shrink-0">🗂️</span>
  <div>
    <span class="font-bold text-blue-300 text-sm">Structured Routing — </span>
    <span class="text-xs text-white/65">Router returns a typed <code class="text-xs">RouterDecision</code> object, Zod-validated. Never free text. Malformed output throws immediately — no silent degradation.</span>
  </div>
</div>

<div v-click class="flex gap-4 items-center p-3 rounded-lg bg-white/5 border border-white/10">
  <span class="text-2xl w-10 text-center flex-shrink-0">⏸️</span>
  <div>
    <span class="font-bold text-purple-300 text-sm">Interrupt-Based Field Collection — </span>
    <span class="text-xs text-white/65">Graph <em>pauses</em> on missing fields, asks the user, resumes from exact checkpoint. No polling, no timeouts, no silent failures.</span>
  </div>
</div>

<div v-click class="flex gap-4 items-center p-3 rounded-lg bg-white/5 border border-white/10">
  <span class="text-2xl w-10 text-center flex-shrink-0">🧠</span>
  <div>
    <span class="font-bold text-green-300 text-sm">Three-Tier Memory — </span>
    <span class="text-xs text-white/65">LangGraph checkpoint for conversation history · in-memory episodic store (80 entries, scored retrieval) · Prisma DB for cross-session persistence.</span>
  </div>
</div>

</div>

<!--
Five things I'm most proud of. The temporal resolver took a lot of regex work but it was worth it — no date hallucinations from this layer, ever. The fast-path has two layers because the graph can also receive a Command resume after an interrupt, so the router node checks again internally. Structured routing sounds simple but it's a huge reliability win — the router cannot return garbage. Interrupt-based field collection is the most elegant piece — the graph literally pauses mid-execution, waits for user input, and resumes from the exact byte it stopped at. And the three-tier memory is what gives Copilot its "it knows me" quality.
-->

---
layout: center
transition: slide-up
---

# Three-Tier Memory

<div class="grid grid-cols-3 gap-4 mt-5">

<div class="p-4 rounded-xl bg-blue-900/30 border border-blue-500/30">
  <div class="text-blue-300 font-bold text-sm mb-3">Tier 1 — LangGraph Checkpoint</div>
  <div class="space-y-2">
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-blue-400">▸</span><span><strong class="text-white/90">Full message history</strong> — stored after every node</span></div>
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-blue-400">▸</span><span><strong class="text-white/90">workingMemory</strong> — current project, camera, last intent</span></div>
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-blue-400">▸</span><span><strong class="text-white/90">Resume from any checkpoint</strong> on interrupt or crash</span></div>
    <div class="mt-3 p-2 rounded bg-blue-900/50 text-xs text-blue-200">Scope: conversation</div>
  </div>
</div>

<div class="p-4 rounded-xl bg-green-900/30 border border-green-500/30">
  <div class="text-green-300 font-bold text-sm mb-3">Tier 2 — AgentMemoryStore</div>
  <div class="space-y-2">
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-green-400">▸</span><span><strong class="text-white/90">Episodic buffer</strong> — 80 interactions, BM25-scored retrieval</span></div>
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-green-400">▸</span><span><strong class="text-white/90">User preferences</strong> — temp unit, default camera</span></div>
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-green-400">▸</span><span><strong class="text-white/90">Smart search nav queue</strong></span></div>
    <div class="mt-3 p-2 rounded bg-green-900/50 text-xs text-green-200">Scope: session (in-memory)</div>
  </div>
</div>

<div class="p-4 rounded-xl bg-purple-900/30 border border-purple-500/30">
  <div class="text-purple-300 font-bold text-sm mb-3">Tier 3 — PersistentMemoryStore</div>
  <div class="space-y-2">
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-purple-400">▸</span><span><strong class="text-white/90">Prisma DB</strong> — <code class="text-xs">copilot_memories</code> table</span></div>
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-purple-400">▸</span><span><strong class="text-white/90">Hydrates on first message</strong> — loads last 20 per conversation</span></div>
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-purple-400">▸</span><span><strong class="text-white/90">firstUserMessage</strong> — permanent, survives restarts</span></div>
    <div class="mt-3 p-2 rounded bg-purple-900/50 text-xs text-purple-200">Scope: cross-session (DB)</div>
  </div>
</div>

</div>

<div v-click class="mt-5 grid grid-cols-3 gap-4">
  <div class="p-3 rounded-lg bg-white/5 text-center">
    <div class="text-orange-400 font-bold text-lg">$0.07</div>
    <div class="text-xs text-white/50">full test suite cost (Apr 8)</div>
  </div>
  <div class="p-3 rounded-lg bg-white/5 text-center">
    <div class="text-blue-400 font-bold text-lg">3.5k–4.1k</div>
    <div class="text-xs text-white/50">avg input tokens / message</div>
  </div>
  <div class="p-3 rounded-lg bg-white/5 text-center">
    <div class="text-green-400 font-bold text-lg">~95%</div>
    <div class="text-xs text-white/50">test pass rate (43/45)</div>
  </div>
</div>

<!--
The three-tier memory is what makes Copilot feel intelligent across time. Tier 1 is LangGraph's built-in checkpointing — it stores messages and working memory automatically after every node execution. This is what replaced our manual 6-message window. Tier 2 is an in-memory episodic buffer — up to 80 interactions, retrieved by BM25-style scoring with project and camera boosts. If you ask "which camera was that on?" it checks this store before doing anything else. Tier 3 is what makes memory survive server restarts — a Prisma table, hydrated at conversation start, written async so it never blocks a response. These numbers at the bottom are real — the entire test suite, including all 45 cases, cost 7 cents on April 8th.
-->

---
layout: center
transition: fade
---

<h2 class="text-4xl font-bold text-center mb-10">The Results</h2>

<div class="grid grid-cols-3 gap-6 max-w-3xl mx-auto">

  <div v-click class="p-4 rounded-2xl border border-green-500/40 bg-green-500/10 text-center">
    <div class="text-xl font-black text-green-400">3.6k–4.1k</div>
    <div class="text-sm mt-2 text-white/70">Avg tokens / message</div>
    <div class="text-xs mt-1 text-white/35">was 20k–36k</div>
  </div>

  <div v-click class="p-4 rounded-2xl border border-blue-500/40 bg-blue-500/10 text-center">
    <div class="text-xl font-black text-blue-400">Eliminated</div>
    <div class="text-sm mt-2 text-white/70">Date hallucinations</div>
    <div class="text-xs mt-1 text-white/35">from temporal layer</div>
  </div>

  <div v-click class="p-4 rounded-2xl border border-orange-500/40 bg-orange-500/10 text-center">
    <div class="text-xl font-black text-orange-400">&lt;5ms</div>
    <div class="text-sm mt-2 text-white/70">Trivial query latency</div>
    <div class="text-xs mt-1 text-white/35">greetings / datetime</div>
  </div>

  <div v-click class="p-4 rounded-2xl border border-purple-500/40 bg-purple-500/10 text-center">
    <div class="text-xl font-black text-purple-400">~95%</div>
    <div class="text-sm mt-2 text-white/70">Test pass rate</div>
    <div class="text-xs mt-1 text-white/35">43 / 45 cases</div>
  </div>

  <div v-click class="p-4 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 text-center">
    <div class="text-xl font-black text-yellow-400">17</div>
    <div class="text-sm mt-2 text-white/70">Isolated nodes</div>
    <div class="text-xs mt-1 text-white/35">each independently testable</div>
  </div>

  <div v-click class="p-4 rounded-2xl border border-pink-500/40 bg-pink-500/10 text-center">
    <div class="text-xl font-black text-pink-400">$0.00066</div>
    <div class="text-sm mt-2 text-white/70">Cost per message</div>
    <div class="text-xs mt-1 text-white/35">was $0.05–$0.09</div>
  </div>

</div>

<!--
The results are significant. Token count dropped from up to 36k to between 3.6k and 4.1k per message — roughly a 90% reduction. The temporal resolver eliminated date hallucinations from that layer entirely. Greetings are under 5ms. The test suite has 45 cases covering router edge cases, fast path, temporal resolution, validation, and conversation flow. 43 pass cleanly; 2 edge cases are known and logged. The cost number is striking — $0.00066 per message using gpt-4o-mini, versus $0.05–$0.09 with gpt-4o in the old system. That's roughly a 100x cost reduction per message.
-->

---
layout: center
transition: fade
---

<h2 class="text-3xl font-bold text-center mb-6">Old vs New — Overall</h2>

<div class="text-xs text-white/60 max-w-3xl mx-auto">
  <table class="w-full text-left">
    <thead>
      <tr class="text-white/50 border-b border-white/10">
        <th class="pr-3 pb-2">Metric</th>
        <th class="pr-3 pb-2">Old system (Azure gpt-4o)</th>
        <th class="pb-2">New system (gpt-4o-mini, Apr 8)</th>
      </tr>
    </thead>
    <tbody class="space-y-1">
      <tr class="border-b border-white/5">
        <td class="pr-3 py-2">Prompt tokens / msg</td>
        <td class="pr-3 py-2 text-red-400">20,245–35,913</td>
        <td class="py-2 text-green-400">3,600–4,100</td>
      </tr>
      <tr class="border-b border-white/5">
        <td class="pr-3 py-2">Completion tokens / msg</td>
        <td class="pr-3 py-2 text-red-400">45–102</td>
        <td class="py-2 text-green-400">98 (avg)</td>
      </tr>
      <tr class="border-b border-white/5">
        <td class="pr-3 py-2">Cost / message</td>
        <td class="pr-3 py-2 text-red-400">$0.051–$0.091</td>
        <td class="py-2 text-green-400">$0.00066</td>
      </tr>
      <tr class="border-b border-white/5">
        <td class="pr-3 py-2">Date hallucinations</td>
        <td class="pr-3 py-2 text-red-400">Occasional, silent</td>
        <td class="py-2 text-green-400">Eliminated (temporal layer)</td>
      </tr>
      <tr class="border-b border-white/5">
        <td class="pr-3 py-2">Routing failures</td>
        <td class="pr-3 py-2 text-red-400">Silent (wrong agent ran)</td>
        <td class="py-2 text-green-400">Throws immediately (Zod)</td>
      </tr>
      <tr>
        <td class="pr-3 py-2">Test coverage</td>
        <td class="pr-3 py-2 text-red-400">Sparse</td>
        <td class="py-2 text-green-400">45 cases · ~95% passing</td>
      </tr>
    </tbody>
  </table>
</div>

<div v-click class="mt-4 text-xs text-white/40 text-center">
  Source: Azure OpenAI usage logs Apr 1 & Apr 8, 2026 (old) · Jest test suite Apr 8, 2026 (new)
</div>

<!--
Here's the full comparison side by side. The numbers speak for themselves. Cost per message is 100x lower. Token count is down 90%. But the most important row is routing failures — in the old system, the wrong agent could run silently with no error surfaced. In the new system, a malformed router output throws immediately and the user gets a clean error message. That's the reliability story. The test coverage row is also important — going from sparse tests to 45 deterministic cases means we can confidently refactor without fear of regressions.
-->

---
layout: two-cols
layoutClass: gap-10
transition: slide-left
---

# Code Quality

<div class="mt-3">
<div class="text-xs text-white/40 uppercase tracking-wider mb-3">Before — Monoliths</div>

<div class="space-y-2">
  <div v-click class="flex justify-between items-center p-2 rounded bg-red-900/30 border border-red-500/20 text-xs">
    <span class="font-mono text-red-300">HierarchicalCopilotChat.ts</span>
    <span class="text-red-400 font-bold">1,557L</span>
  </div>
  <div v-click class="flex justify-between items-center p-2 rounded bg-red-900/30 border border-red-500/20 text-xs">
    <span class="font-mono text-red-300">agents/prompts.ts</span>
    <span class="text-red-400 font-bold">1,306L</span>
  </div>
  <div v-click class="flex justify-between items-center p-2 rounded bg-red-900/30 border border-red-500/20 text-xs">
    <span class="font-mono text-red-300">tools/smartSearch.ts</span>
    <span class="text-red-400 font-bold">432L</span>
  </div>
  <div v-click class="flex justify-between items-center p-2 rounded bg-red-900/30 border border-red-500/20 text-xs">
    <span class="font-mono text-red-300">tools/utils.ts</span>
    <span class="text-red-400 font-bold">384L</span>
  </div>
  <div v-click class="flex justify-between items-center p-2 rounded bg-red-900/30 border border-red-500/20 text-xs">
    <span class="font-mono text-red-300">agents/utils.ts</span>
    <span class="text-red-400 font-bold">172L</span>
  </div>
</div>
</div>

::right::

<div class="mt-14">
<div class="text-xs text-white/40 uppercase tracking-wider mb-3">After — Focused modules</div>

<div class="space-y-2">
  <div v-after class="p-2 rounded bg-green-900/30 border border-green-500/20 text-xs">
    <span class="font-mono text-green-300">temporalResolver.ts <span class="text-white/50">58L</span></span><br/>
    <span class="text-white/40">+ temporalDateUtils.ts (100L) + temporalPatterns.ts (282L)</span>
  </div>
  <div v-after class="p-2 rounded bg-green-900/30 border border-green-500/20 text-xs">
    <span class="font-mono text-green-300">toolFactory.ts <span class="text-white/50">201L</span></span><br/>
    <span class="text-white/40">+ anprDataProcessor.ts (46L) + weatherDataProcessor.ts (67L)</span>
  </div>
  <div v-after class="p-2 rounded bg-green-900/30 border border-green-500/20 text-xs">
    <span class="font-mono text-green-300">state.ts <span class="text-white/50">272L</span></span><br/>
    <span class="text-white/40">+ schemas.ts (re-export only)</span>
  </div>
  <div v-after class="p-2 rounded bg-green-900/30 border border-green-500/20 text-xs">
    <span class="font-mono text-green-300">router.ts <span class="text-white/50">151L</span></span><br/>
    <span class="text-white/40">+ routerPrompts.ts (202L) + routerValidation.ts + fastPathRouter.ts</span>
  </div>
  <div v-after class="p-2 rounded bg-green-900/30 border border-green-500/20 text-xs">
    <span class="font-mono text-green-300">smartSearch.ts <span class="text-white/50">306L</span></span><br/>
    <span class="text-white/40">+ smartSearchGeometry.ts (70L) + smartSearchQuery.ts</span>
  </div>
</div>

<div class="mt-4 p-3 rounded-lg bg-white/5 text-center text-xs">
  <span class="text-green-400 font-bold">Every file has a single responsibility</span> · Tests map 1:1 to modules
</div>
</div>

<!--
The code quality story mirrors the architecture story. The old codebase had files pushing 1,500 lines. When everything lives in one file, you can't test it, you can't reason about it, and you can't safely change it. The new structure splits everything by responsibility — date math in one file, date patterns in another, the router's prompts separate from its logic. The important thing isn't that the files are smaller, it's that each file has one reason to change. The temporal resolver is pure functions — you can test every date pattern in isolation without mocking anything. The router validation is three pure functions. That's what made 45 test cases possible.
-->

---
layout: center
transition: fade-out
---

# What Copilot Can Do Today

<div class="grid grid-cols-2 gap-4 mt-5">

<div v-click class="p-4 rounded-xl bg-yellow-900/25 border border-yellow-500/30">
  <div class="flex items-center gap-2 mb-2">
    <span class="text-xl">🌤️</span>
    <span class="font-bold text-yellow-300 text-sm">Weather Agent</span>
  </div>
  <div class="flex gap-2 flex-wrap">
    <span class="px-2 py-0.5 rounded bg-yellow-900/50 text-xs text-yellow-200 font-mono">getCurrentWeather</span>
    <span class="px-2 py-0.5 rounded bg-yellow-900/50 text-xs text-yellow-200 font-mono">getDailyWeather</span>
    <span class="px-2 py-0.5 rounded bg-yellow-900/50 text-xs text-yellow-200 font-mono">getHourlyWeather</span>
  </div>
</div>

<div v-click class="p-4 rounded-xl bg-blue-900/25 border border-blue-500/30">
  <div class="flex items-center gap-2 mb-2">
    <span class="text-xl">🚗</span>
    <span class="font-bold text-blue-300 text-sm">Vehicle Agent</span>
  </div>
  <div class="flex gap-2 flex-wrap">
    <span class="px-2 py-0.5 rounded bg-blue-900/50 text-xs text-blue-200 font-mono">getVehiclesCounts</span>
    <span class="px-2 py-0.5 rounded bg-blue-900/50 text-xs text-blue-200 font-mono">getVehiclesDetections</span>
  </div>
</div>

<div v-click class="p-4 rounded-xl bg-pink-900/25 border border-pink-500/30">
  <div class="flex items-center gap-2 mb-2">
    <span class="text-xl">🎬</span>
    <span class="font-bold text-pink-300 text-sm">Media Agent</span>
  </div>
  <div class="flex gap-2 flex-wrap">
    <span class="px-2 py-0.5 rounded bg-pink-900/50 text-xs text-pink-200 font-mono">createClip</span>
    <span class="px-2 py-0.5 rounded bg-pink-900/50 text-xs text-pink-200 font-mono">createTimelapse</span>
  </div>
</div>

<div v-click class="p-4 rounded-xl bg-green-900/25 border border-green-500/30">
  <div class="flex items-center gap-2 mb-2">
    <span class="text-xl">🔍</span>
    <span class="font-bold text-green-300 text-sm">Smart Search</span>
  </div>
  <div class="flex gap-2 flex-wrap">
    <span class="px-2 py-0.5 rounded bg-green-900/50 text-xs text-green-200 font-mono">smartSearch</span>
    <span class="px-2 py-0.5 rounded bg-green-900/50 text-xs text-green-200 font-mono">navigateToPage (30+ routes)</span>
  </div>
</div>

<div v-click class="col-span-2 p-4 rounded-xl bg-purple-900/25 border border-purple-500/30">
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-2">
      <span class="text-xl">🧰</span>
      <span class="font-bold text-purple-300 text-sm">Utility Tools</span>
    </div>
    <div class="flex gap-2 flex-wrap">
      <span class="px-2 py-0.5 rounded bg-purple-900/50 text-xs text-purple-200 font-mono">renderCharts</span>
      <span class="px-2 py-0.5 rounded bg-purple-900/50 text-xs text-purple-200 font-mono">searchDocumentation</span>
      <span class="px-2 py-0.5 rounded bg-purple-900/50 text-xs text-purple-200 font-mono">interrupt() field collection</span>
    </div>
  </div>
</div>

</div>

<!--
This is the current capability surface. Each box maps to a specialist subgraph. Weather handles current conditions, multi-day reports, and hour-by-hour breakdowns — the router picks the right one based on the query. Vehicle has two modes: counts for aggregate queries, detections for plate-level events. Media creates clips and timelapses. Smart search can run a detection query and then navigate the user to the results page automatically. The utility row is important — charts can be layered on top of any data agent, documentation search is live, and field collection uses the interrupt mechanism rather than a dedicated tool.
-->

---
layout: image-right
image: https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80
transition: slide-up
---

# What's Next

<div class="mt-5 space-y-7">

<div v-click>
  <div class="text-orange-400 font-bold text-xs uppercase tracking-widest mb-2">Short Term</div>
  <ul class="text-sm text-white/75 space-y-1">
    <li>▸ Full streaming for all response paths (nav, conversational)</li>
    <li>▸ Richer multi-agent chains (3+ agents, parallel dispatch)</li>
    <li>▸ User preference learning — remember temp units, default cameras</li>
  </ul>
</div>

<div v-click>
  <div class="text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">Medium Term</div>
  <ul class="text-sm text-white/75 space-y-1">
    <li>▸ Multi-project queries across all sites simultaneously</li>
    <li>▸ Proactive notifications and anomaly alerts</li>
    <li>▸ Report generation — export data summaries to PDF</li>
  </ul>
</div>

<div v-click>
  <div class="text-green-400 font-bold text-xs uppercase tracking-widest mb-2">Long Term</div>
  <div class="text-sm text-white/75">Copilot as the <em>primary interface</em> — not just an assistant, but the way you work with Evercam. No dashboards to navigate. Voice interface. Proactive, not reactive.</div>
</div>

</div>

<!--
Where do we go from here? Short term: there are two response paths that don't stream token-by-token yet — navigation and conversational. That's a quick win. Multi-agent chains currently support two agents in sequence; we want to generalize to arbitrary chains and potentially parallel dispatch. Medium term is about breadth — multi-project queries are the most-requested feature from site managers with multiple sites. Proactive alerts would flip the model from reactive to push. Long term — the vision is that Copilot becomes the primary way you interact with Evercam. Not a sidebar feature, but the interface itself. Voice input, proactive summaries, no dashboards required.
-->

---
layout: center
transition: fade
background: https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80
class: text-center
---

<div class="absolute inset-0 bg-black/70" />

<div class="relative z-10 max-w-2xl mx-auto">

  <div
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }"
    class="text-5xl font-black mb-6"
    style="background: linear-gradient(135deg, #f97316, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
  >
    A System We Can Trust
  </div>

  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: 400, duration: 700 } }"
    class="text-lg text-white/65 leading-relaxed"
  >
    Every step is code. Every step is testable. Every step is auditable.<br/>
    The LLM generates the response — everything else is deterministic TypeScript.
  </div>

  <div v-click class="mt-10 grid grid-cols-3 gap-5">
    <div class="text-center">
      <div class="text-3xl font-black text-orange-400">~90%</div>
      <div class="text-xs text-white/40 mt-1">Token reduction</div>
    </div>
    <div class="text-center">
      <div class="text-3xl font-black text-green-400">~95%</div>
      <div class="text-xs text-white/40 mt-1">Test pass rate</div>
    </div>
    <div class="text-center">
      <div class="text-3xl font-black text-blue-400">Zero</div>
      <div class="text-xs text-white/40 mt-1">Silent routing failures</div>
    </div>
  </div>

  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: 900, duration: 600 } }"
    class="mt-10 text-xs text-white/25 tracking-widest uppercase"
  >
    LangGraph · LangChain · Azure OpenAI gpt-4o-mini · TypeScript
  </div>

</div>

<!--
I'll leave you with this. The goal of v2 wasn't to build a smarter AI — it was to build a more trustworthy system. The LLM is still doing the hard part: understanding language and generating responses. But everything around it — routing, dates, validation, field collection, memory — is deterministic TypeScript that you can read, test, and reason about. A typo in a prompt no longer silently routes the wrong agent for days. A missing field no longer causes a crash. A date like "last Tuesday" no longer produces a hallucination. That's what "a system we can trust" means. Thank you — happy to take questions.
-->
