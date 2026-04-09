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
<!-- fonts:
  sans: Inter, -apple-system, BlinkMacSystemFont, sans-serif
  # default
  weights: '200,400,600' -->

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
    <div class="font-semibold text-red-400 text-sm">Memory</div>
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
    <div class="font-semibold text-red-400 text-sm">High Tokens Every Request</div>
    <div class="text-xs text-white/65 mt-0.5">Full conversation + project context + system prompt re-injected every message. "Hello" cost the same as a complex query.</div>
  </div>
</div>

<div v-click class="flex gap-3 items-start">
  <span class="text-xl mt-0.5">🔧</span>
  <div>
    <div class="font-semibold text-red-400 text-sm">Routing in Prompt Strings</div>
    <div class="text-xs text-white/65 mt-0.5">A typo in a JSON key silently routed everything to the wrong agent for days. No tests caught it. We had minimal test coverage.</div>
  </div>
</div>

</div>

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
  <span class="text-sm">LLM call — <span class="text-red-300 font-bold">high token load</span></span>
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
| Prompt tokens / message | **20,245–35,913** (avg, sessions A/B) |
| Completion tokens / message | **45–102** (avg, sessions A/B) |
| Total cost (4 msgs) | **$0.204–$0.363** |
| Unit tests | **Sparse** |

</div>

<div v-click class="mt-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-sm">
  <div class="text-red-300 font-semibold mb-1">The root cause</div>
  <div class="text-white/65 text-xs">Treating the LLM as a Swiss Army knife — routing, memory, date logic, and response generation all in one pass. Errors in any step compound.</div>
</div>

<div v-click class="mt-3 text-xs text-white/50">
  Source: Azure `gpt-4o` usage screenshots from Apr 1, 2026 and Apr 8, 2026 (4 messages each).
</div>

</div>

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
</div>

---
layout: two-cols
layoutClass: gap-10
transition: slide-up
---

# Why LangGraph?

<div class="mt-3 text-sm">
<div class="text-xs text-white/40 uppercase tracking-wider mb-3">Problems solved</div>

| Problem | Solution |
|---|---|
| LLM date hallucinations | Deterministic pre-processing |
| High tokens / message | Checkpointed messages (lower prompt load) |
| Manual 6-msg window | `messagesStateReducer` (LangGraph) |
| No field collection | `interrupt()` → resume |
| Routing in prompts | Typed graph edges |
| Greetings cost full LLM | Fast-path: <5ms, 0 tokens |

</div>

::right::

<div class="mt-12 text-sm">
<div class="text-xs text-white/40 uppercase tracking-wider mb-3">Tech stack</div>

| Layer | Technology |
|---|---|
| Graph runtime | LangGraph JS |
| LLM | Azure OpenAI `gpt-4o-mini` (default) |
| Structured output | `withStructuredOutput(Zod)` |
| Agent executor | LangChain ReAct |
| Checkpointing | MemorySaver / PostgresSaver |
| Tests | Jest |

</div>

<div v-click class="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-white/70">
  <span class="text-blue-300 font-semibold">Philosophy: </span>
  Code-first, not prompt-driven. No silent fallbacks. Every error surfaces as a typed result.
</div>

---
layout: center
transition: slide-left
class: px-6 py-3
---

<div class="flex flex-col items-baseline gap-3 mb-3">
  <h1 class="text-xl font-bold">The New Architecture</h1>
  <span class="text-xs text-white/35 tracking-wider">17 nodes · explicit state · deterministic flow</span>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-2">① Input · Fast Path</div>

```mermaid {scale: 0.8}
flowchart TB
    MSG(["💬 User Message"]):::input
    FP{"Fast Path?"}:::decision
    INST["⚡ Instant Response\n< 5ms · 0 tokens"]:::fast
    CE["contextEnrichment\n📅 dates · memory load"]:::process

    MSG --> FP
    FP -->|"trivial"| INST
    FP -->|"complex"| CE

    classDef input    fill:#1f2937,stroke:#6b7280,color:#e5e7eb
    classDef decision fill:#92400e,stroke:#f59e0b,color:#fef3c7
    classDef fast     fill:#14532d,stroke:#4ade80,color:#d1fae5
    classDef process  fill:#1e3a5f,stroke:#60a5fa,color:#dbeafe
```

---
layout: center
transition: slide-left
class: px-6 py-3
---

<div class="mb-3 flex flex-col items-baseline gap-0">
  <h1 class="text-xl font-bold">The New Architecture — Validation → Dispatch</h1>
  <div class="text-xs text-white/35 tracking-wider mt-1">17 nodes · explicit state · deterministic flow</div>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-2">① Input · Routing · Validation</div>

```mermaid {scale: 0.8}
flowchart LR
    CE["contextEnrichment\n📅 dates · memory load"]:::process
    RT["router\n🤖 LLM → RouterDecision"]:::llm
    VAL{"validate\nrequired fields?"}:::decision

    CE --> RT --> VAL

    classDef decision fill:#92400e,stroke:#f59e0b,color:#fef3c7
    classDef process  fill:#1e3a5f,stroke:#60a5fa,color:#dbeafe
    classDef llm      fill:#3b0764,stroke:#c084fc,color:#f3e8ff
```

---
layout: center
transition: slide-left
class: px-6 py-3
---

<div class="mb-3 flex flex-col items-baseline gap-0">
  <h1 class="text-xl font-bold">The New Architecture — Agent Execution (Specialists)</h1>
  <div class="text-xs text-white/35 tracking-wider mt-1">17 nodes · explicit state · deterministic flow</div>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-2">① Validation Outcomes → Agent Dispatch</div>

```mermaid {scale: 0.8}
flowchart LR
    VAL{"validate\nrequired fields?"}:::decision
    FC["fieldCollection\n⏸️ interrupt() if missing"]:::warn
    ER["errorResponse\n🚫 typed error"]:::err
    AD(["agentDispatch"]):::input

    VAL -->|"valid ✅"| FC
    VAL -->|"invalid"| ER
    FC --> AD

    classDef input    fill:#1f2937,stroke:#6b7280,color:#e5e7eb
    classDef decision fill:#92400e,stroke:#f59e0b,color:#fef3c7
    classDef warn     fill:#7f1d1d,stroke:#fbbf24,color:#fef9c3
    classDef err      fill:#7f1d1d,stroke:#f87171,color:#fee2e2
```

---
layout: center
transition: slide-left
class: px-6 py-3
---

<div class="mb-3 flex flex-col items-baseline gap-0">
  <h1 class="text-xl font-bold">The New Architecture — Agent Execution (System)</h1>
  <div class="text-xs text-white/35 tracking-wider mt-1">17 nodes · explicit state · deterministic flow</div>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">② Agent Execution — Specialist Subgraphs</div>

```mermaid {scale: 0.8}
flowchart TB
    AD(["agentDispatch"]):::input

    subgraph agents["Specialist Subgraphs"]
      direction TB
      WA["🌤️ weather"]:::agent
      VA["🚗 vehicle"]:::agent
      MA["🎬 media"]:::agent
      SA["🔍 smart search"]:::agent
    end

    AD -->|"conditional edge × 8"| WA
    AD --> VA
    AD --> MA
    AD --> SA

    classDef input    fill:#1f2937,stroke:#6b7280,color:#e5e7eb
    classDef agent    fill:#78350f,stroke:#fbbf24,color:#fef9c3
```

---
layout: center
transition: slide-left
class: px-6 py-3
---

<div class="mb-3 flex flex-col items-baseline gap-0">
  <h1 class="text-xl font-bold">The New Architecture — Response</h1>
  <div class="text-xs text-white/35 tracking-wider mt-1">17 nodes · explicit state · deterministic flow</div>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">③ Agent Execution — System/Utility Agents</div>

```mermaid {scale: 0.8}
flowchart TB
    AD(["agentDispatch"]):::input

    DT["🧰 direct tool"]:::agent
    CN["💬 conversational"]:::agent
    NV["🗺️ navigation"]:::agent
    MR["🧠 memory recall"]:::agent

    AD --> DT
    AD --> CN
    AD --> NV
    AD --> MR

    classDef input    fill:#1f2937,stroke:#6b7280,color:#e5e7eb
    classDef agent    fill:#78350f,stroke:#fbbf24,color:#fef9c3
```

---
transition: slide-left
class: px-6 py-3
---

<div class="mb-3 flex flex-col items-baseline gap-0">
  <h1 class="text-xl font-bold">The New Architecture — Memory</h1>
  <div class="text-xs text-white/35 tracking-wider mt-1">17 nodes · explicit state · deterministic flow</div>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">④ Response</div>

```mermaid {scale: 0.8}
flowchart LR
    AD(["agentDispatch"]):::input
    CAD["chainedAgentDispatch\n🔁 optional multi-agent"]:::process
    DT["directToolHandler\n🧰 charts / docs"]:::process
    MR["memoryRecall\n🧠 cache hit"]:::process
    RA["responseAssembly\n📝 stitch results"]:::process
    OUT(["✅ Response"]):::input

    AD --> CAD
    AD --> MR
    CAD -.->|"re-dispatch"| AD
    CAD --> DT
    CAD --> RA
    MR --> RA
    MR -.->|"fallback"| AD
    DT --> RA --> OUT

    classDef input    fill:#1f2937,stroke:#6b7280,color:#e5e7eb
    classDef process  fill:#1e3a5f,stroke:#60a5fa,color:#dbeafe
```

---
transition: slide-left
class: px-6 py-3
---

<div class="mb-3 flex flex-col items-baseline gap-0">
  <h1 class="text-xl font-bold">The New Architecture — Memory Update</h1>
  <div class="text-xs text-white/35 tracking-wider mt-1">17 nodes · explicit state · deterministic flow</div>
</div>

<div class="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">④ Memory</div>

```mermaid {scale: 0.8}
flowchart LR
    RA["responseAssembly\n📝 stitch results"]:::process
    CN["conversationalNode\n💬 fast response"]:::process
    NV["navigationNode\n🗺️ structured output"]:::process
    MU["memoryUpdate\n💾 checkpoint + store"]:::success
    OUT(["✅ Response"]):::input

    RA --> MU --> OUT
    CN --> MU
    NV --> MU

    classDef input    fill:#1f2937,stroke:#6b7280,color:#e5e7eb
    classDef process  fill:#1e3a5f,stroke:#60a5fa,color:#dbeafe
    classDef success  fill:#14532d,stroke:#4ade80,color:#d1fae5
```

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
    <span class="text-xs text-white/65">16 regex patterns resolve dates to UTC <em>before</em> any LLM call. "Last Tuesday 9am" → <code class="text-xs">2026-03-31T09:00:00Z</code>. Fewer date hallucinations.</span>
  </div>
</div>

<div v-click class="flex gap-4 items-center p-3 rounded-lg bg-white/5 border border-white/10">
  <span class="text-2xl w-10 text-center flex-shrink-0">⚡</span>
  <div>
    <span class="font-bold text-yellow-300 text-sm">Fast-Path Router — </span>
    <span class="text-xs text-white/65">Greetings, datetime, capabilities intercepted before the graph initializes. Zero tokens. Under 5ms.</span>
  </div>
</div>

<div v-click class="flex gap-4 items-center p-3 rounded-lg bg-white/5 border border-white/10">
  <span class="text-2xl w-10 text-center flex-shrink-0">🗂️</span>
  <div>
    <span class="font-bold text-blue-300 text-sm">Structured Routing — </span>
    <span class="text-xs text-white/65">Router returns a typed <code class="text-xs">RouterDecision</code> object, Zod-validated. Never free text. The graph cannot act on malformed output.</span>
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
    <span class="font-bold text-green-300 text-sm">Two-Tier Memory — </span>
    <span class="text-xs text-white/65">LangGraph checkpointing auto-manages conversation history. AgentMemoryStore holds 80-interaction episodic buffer + user preferences across sessions.</span>
  </div>
</div>

</div>

---
layout: center
transition: slide-up
---

# Two-Tier Memory

<div class="grid grid-cols-2 gap-6 mt-6">

<div class="p-5 rounded-xl bg-blue-900/30 border border-blue-500/30">
  <div class="text-blue-300 font-bold text-sm mb-3">Tier 1 — LangGraph Checkpointing</div>
  <div class="space-y-2">
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-blue-400">▸</span><span><strong class="text-white/90">Full message history</strong> — stored automatically after every node execution</span></div>
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-blue-400">▸</span><span><strong class="text-white/90">Resume from any checkpoint</strong> — on interrupt or crash</span></div>
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-blue-400">▸</span><span><strong class="text-white/90">MemorySaver</strong> (dev) → <strong class="text-white/90">PostgresSaver</strong> (prod)</span></div>
    <div class="mt-3 p-2 rounded bg-blue-900/50 text-xs text-blue-200">History cost reduced via checkpointed messages</div>
  </div>
</div>

<div class="p-5 rounded-xl bg-green-900/30 border border-green-500/30">
  <div class="text-green-300 font-bold text-sm mb-3">Tier 2 — AgentMemoryStore</div>
  <div class="space-y-2">
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-green-400">▸</span><span><strong class="text-white/90">Episodic Buffer</strong> — last 80 interactions, scored retrieval</span></div>
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-green-400">▸</span><span><strong class="text-white/90">Working Memory</strong> — last project, camera, intent in session</span></div>
    <div class="flex gap-2 text-xs text-white/70 items-start"><span class="text-green-400">▸</span><span><strong class="text-white/90">User Preferences</strong> — temp unit, default camera across sessions</span></div>
    <div class="mt-3 p-2 rounded bg-green-900/50 text-xs text-green-200">"Show yesterday's weather" — Copilot knows <strong>which project</strong> you're on</div>
  </div>
</div>

</div>

<div v-click class="mt-5 grid grid-cols-3 gap-4">
  <div class="p-3 rounded-lg bg-white/5 text-center">
    <div class="text-orange-400 font-bold text-lg">$0.07</div>
    <div class="text-xs text-white/50">test suite cost (Apr 8)</div>
  </div>
  <div class="p-3 rounded-lg bg-white/5 text-center">
    <div class="text-blue-400 font-bold text-lg">3.5k–4.1k</div>
    <div class="text-xs text-white/50">avg input tokens / msg</div>
  </div>
  <div class="p-3 rounded-lg bg-white/5 text-center">
    <div class="text-green-400 font-bold text-lg">2 / 45</div>
    <div class="text-xs text-white/50">edge-case failures</div>
  </div>
</div>

---
layout: center
transition: fade
---

<h2 class="text-4xl font-bold text-center mb-10">The Results</h2>

<div class="grid grid-cols-3 gap-6 max-w-3xl mx-auto">

  <div v-click class="p-4 rounded-2xl border border-green-500/40 bg-green-500/10 text-center">
    <div class="text-xl font-black text-green-400">3.6k–4.1k</div>
    <div class="text-sm mt-2 text-white/70">Avg tokens / message</div>
  </div>

  <div v-click class="p-4 rounded-2xl border border-blue-500/40 bg-blue-500/10 text-center">
    <div class="text-xl font-black text-blue-400">Reduced</div>
    <div class="text-sm mt-2 text-white/70">Date hallucinations</div>
  </div>

  <div v-click class="p-4 rounded-2xl border border-orange-500/40 bg-orange-500/10 text-center">
    <div class="text-xl font-black text-orange-400">&lt;5ms</div>
    <div class="text-sm mt-2 text-white/70">Trivial query latency</div>
  </div>

  <div v-click class="p-4 rounded-2xl border border-purple-500/40 bg-purple-500/10 text-center">
    <div class="text-xl font-black text-purple-400">95%+</div>
    <div class="text-sm mt-2 text-white/70">Test pass rate</div>
  </div>

  <div v-click class="p-4 rounded-2xl border border-yellow-500/40 bg-yellow-500/10 text-center">
    <div class="text-xl font-black text-yellow-400">Fewer</div>
    <div class="text-sm mt-2 text-white/70">Large files</div>
  </div>

  <div v-click class="p-4 rounded-2xl border border-pink-500/40 bg-pink-500/10 text-center">
    <div class="text-xl font-black text-pink-400">More</div>
    <div class="text-sm mt-2 text-white/70">Focused modules</div>
  </div>

</div>

---
layout: center
transition: fade
---

<h2 class="text-3xl font-bold text-center mb-6">Old vs New (Overall)</h2>

<div class="text-xs text-white/60 max-w-3xl mx-auto">
  <table class="w-full text-left">
    <thead>
      <tr class="text-white/50">
        <th class="pr-3">Metric</th>
        <th class="pr-3">Old system (Azure gpt-4o)</th>
        <th>New system (tests 2026-04-08)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="pr-3">Prompt tokens / msg</td>
        <td class="pr-3">20,245–35,913</td>
        <td>4,265</td>
      </tr>
      <tr>
        <td class="pr-3">Completion tokens / msg</td>
        <td class="pr-3">45–102</td>
        <td>98</td>
      </tr>
      <tr>
        <td class="pr-3">Total tokens / msg</td>
        <td class="pr-3">20,290–36,015</td>
        <td>4,364</td>
      </tr>
      <tr>
        <td class="pr-3">Cost / msg</td>
        <td class="pr-3">$0.051–$0.091</td>
        <td>$0.00066</td>
      </tr>
      <tr>
        <td class="pr-3">Sample size</td>
        <td class="pr-3">8 msgs (Apr 1 & Apr 8, 2026)</td>
        <td>106 msgs (Prompt guide + Router edge + Project memory)</td>
      </tr>
    </tbody>
  </table>
</div>

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
    <span class="font-mono text-red-300">agents/HierarchicalCopilotChat.ts</span>
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
    <span class="text-white/40">+ schemas.ts (2L)</span>
  </div>
  <div v-after class="p-2 rounded bg-green-900/30 border border-green-500/20 text-xs">
    <span class="font-mono text-green-300">router.ts <span class="text-white/50">151L</span></span><br/>
    <span class="text-white/40">+ routerPrompts.ts (202L)</span>
  </div>
  <div v-after class="p-2 rounded bg-green-900/30 border border-green-500/20 text-xs">
    <span class="font-mono text-green-300">smartSearch.ts <span class="text-white/50">306L</span></span><br/>
    <span class="text-white/40">+ smartSearchTypes.ts (2L) + smartSearchGeometry.ts (70L)</span>
  </div>
</div>

<div class="mt-4 p-3 rounded-lg bg-white/5 text-center text-xs">
  <span class="text-green-400 font-bold">New modules extracted</span> · APIs preserved · test pass rate ~95%
</div>
</div>

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
  </div>
</div>

<div v-click class="col-span-2 p-4 rounded-xl bg-purple-900/25 border border-purple-500/30">
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-2">
      <span class="text-xl">🗺️</span>
      <span class="font-bold text-purple-300 text-sm">Utility Tools</span>
    </div>
    <div class="flex gap-2 flex-wrap">
      <span class="px-2 py-0.5 rounded bg-purple-900/50 text-xs text-purple-200 font-mono">navigateToPage (30+ routes)</span>
      <span class="px-2 py-0.5 rounded bg-purple-900/50 text-xs text-purple-200 font-mono">renderCharts</span>
      <span class="px-2 py-0.5 rounded bg-purple-900/50 text-xs text-purple-200 font-mono">fileSearch</span>
      <span class="px-2 py-0.5 rounded bg-purple-900/50 text-xs text-purple-200 font-mono">requestMissingFields</span>
    </div>
  </div>
</div>

</div>

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
    <li>▸ PostgreSQL persistence for production</li>
    <li>▸ Document search + report generation</li>
    <li>▸ Streaming for all response paths</li>
  </ul>
</div>

<div v-click>
  <div class="text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">Medium Term</div>
  <ul class="text-sm text-white/75 space-y-1">
    <li>▸ Multi-project queries across all sites</li>
    <li>▸ Proactive notifications & anomaly alerts</li>
    <li>▸ Voice interface</li>
  </ul>
</div>

<div v-click>
  <div class="text-green-400 font-bold text-xs uppercase tracking-widest mb-2">Long Term</div>
  <div class="text-sm text-white/75">Copilot as the <em>primary interface</em> — not just an assistant, but the way you work with Evercam. No dashboards to navigate.</div>
</div>

</div>

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
      <div class="text-3xl font-black text-orange-400">Lower</div>
      <div class="text-xs text-white/40 mt-1">Token cost</div>
    </div>
    <div class="text-center">
      <div class="text-3xl font-black text-green-400">All</div>
      <div class="text-xs text-white/40 mt-1">Tests passing</div>
    </div>
    <div class="text-center">
      <div class="text-3xl font-black text-blue-400">Reduced</div>
      <div class="text-xs text-white/40 mt-1">Hallucinations</div>
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
