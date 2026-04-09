---
theme: seriph
title: Copilot v2 — Q&A Reference
info: Technical questions and answers for the Copilot v2 presentation
class: text-center
drawings:
  persist: false
transition: slide-left
colorSchema: dark
---

<div class="absolute inset-0 bg-black/65" />

<div class="relative z-10 flex flex-col items-center justify-center h-full gap-4">
  <div
    v-motion
    :initial="{ opacity: 0, y: -30 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }"
    class="text-xs tracking-widest uppercase text-orange-400 font-semibold"
  >
    Evercam Labs · April 2026
  </div>

  <h1
    v-motion
    :initial="{ opacity: 0, scale: 0.92 }"
    :enter="{ opacity: 1, scale: 1, transition: { delay: 200, duration: 700 } }"
    class="text-5xl font-black leading-tight"
    style="background: linear-gradient(135deg, #f97316, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
  >
    Copilot v2 — Q&amp;A
  </h1>

  <p
    v-motion
    :initial="{ opacity: 0, y: 20 }"
    :enter="{ opacity: 1, y: 0, transition: { delay: 450, duration: 600 } }"
    class="text-xl text-white/65"
  >
    Technical questions you'll get — and how to answer them
  </p>

  <div
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1, transition: { delay: 850, duration: 600 } }"
    class="grid grid-cols-4 gap-3 mt-6 text-xs text-white/40"
  >
    <div class="px-3 py-1 rounded bg-white/5 border border-white/10">Architecture</div>
    <div class="px-3 py-1 rounded bg-white/5 border border-white/10">LangGraph</div>
    <div class="px-3 py-1 rounded bg-white/5 border border-white/10">Implementation</div>
    <div class="px-3 py-1 rounded bg-white/5 border border-white/10">Migration</div>
  </div>
</div>

---
layout: center
transition: fade
---

<h2 class="text-2xl font-bold text-center mb-6">Categories</h2>

<div class="grid grid-cols-2 gap-4 max-w-3xl mx-auto">

<div v-click class="p-4 rounded-xl bg-orange-900/25 border border-orange-500/30">
  <div class="text-orange-300 font-bold text-sm mb-2">🏗️ Architecture & Design</div>
  <div class="text-xs text-white/55 space-y-1">
    <div>▸ Why recompile the graph every message?</div>
    <div>▸ Why not use a smarter model?</div>
    <div>▸ What are SSE callbacks?</div>
    <div>▸ What happens when the router fails?</div>
    <div>▸ MemorySaver on server restart?</div>
  </div>
</div>

<div v-click class="p-4 rounded-xl bg-blue-900/25 border border-blue-500/30">
  <div class="text-blue-300 font-bold text-sm mb-2">⚙️ LangGraph Framework</div>
  <div class="text-xs text-white/55 space-y-1">
    <div>▸ Why does agentDispatch exist as a no-op?</div>
    <div>▸ interrupt() vs loopback edge?</div>
    <div>▸ Can you run nodes in parallel?</div>
    <div>▸ How does thread_id scope state?</div>
    <div>▸ What does .compile() do?</div>
  </div>
</div>

<div v-click class="p-4 rounded-xl bg-purple-900/25 border border-purple-500/30">
  <div class="text-purple-300 font-bold text-sm mb-2">🔧 Implementation</div>
  <div class="text-xs text-white/55 space-y-1">
    <div>▸ How does withStructuredOutput work?</div>
    <div>▸ Why temperature 0.2 not 0?</div>
    <div>▸ Why turnResultOffset?</div>
    <div>▸ Why one tool per subgraph?</div>
    <div>▸ What if the DB goes down?</div>
  </div>
</div>

<div v-click class="p-4 rounded-xl bg-green-900/25 border border-green-500/30">
  <div class="text-green-300 font-bold text-sm mb-2">🔄 LangChain → LangGraph</div>
  <div class="text-xs text-white/55 space-y-1">
    <div>▸ What was wrong with the old system?</div>
    <div>▸ Why not just use LangChain agents?</div>
    <div>▸ Are they competing frameworks?</div>
    <div>▸ What did LangGraph actually fix?</div>
  </div>
</div>

</div>

---
layout: two-cols
layoutClass: gap-8
transition: slide-left
---

# Architecture — Part 1

<div class="mt-4 space-y-5">

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">Why recompile the graph every message?</div>
  <div class="text-xs text-white/65 leading-relaxed">SSE callbacks close over the HTTP response object — they're per-request. Reuse them and you're writing to a closed connection. The shared <code>MemorySaver</code> persists state across rebuilds. Graph construction is &lt;1ms — it's not expensive.</div>
</div>

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">Why not just use a smarter model?</div>
  <div class="text-xs text-white/65 leading-relaxed">GPT-4o still hallucinates dates. It still can't checkpoint state. It costs 100× more per message. Model intelligence doesn't fix architecture problems — it just makes them more expensive.</div>
</div>

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">What are SSE callbacks?</div>
  <div class="text-xs text-white/65 leading-relaxed">SSE = Server-Sent Events. Instead of returning the full response at once, the server pushes text chunks to the frontend as the LLM generates them — the typing effect. Callbacks are hooks (<code>onLLMMessageChunk</code>) that write each chunk to the HTTP response.</div>
</div>

</div>

::right::

<div class="mt-14 space-y-5">

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">What happens when the router returns garbage?</div>
  <div class="text-xs text-white/65 leading-relaxed"><code>withStructuredOutput</code> throws immediately — caught, returns a safe <code>missing_fields</code> fallback with <code>router_error</code>. User sees "try again". No silent wrong-agent execution.</div>
</div>

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">MemorySaver is in-memory — server restart?</div>
  <div class="text-xs text-white/65 leading-relaxed">Conversation history is lost but Tier 3 (Prisma DB) keeps episodic summaries. Swap <code>MemorySaver</code> for <code>PostgresSaver</code> for full persistence — one line change in <code>graphBuilder.ts</code>.</div>
</div>

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">What are the 2 failing test cases?</div>
  <div class="text-xs text-white/65 leading-relaxed">Smart_search without explicit "take me there" not chaining navigation. "Last week Monday" date parsing. Both known, logged, out of scope for this PR.</div>
</div>

</div>

---
layout: two-cols
layoutClass: gap-8
transition: slide-left
---

# Architecture — Part 2

<div class="mt-4 space-y-5">

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">Why LangGraph over CrewAI / AutoGen?</div>
  <div class="text-xs text-white/65 leading-relaxed"><code>interrupt()</code> + <code>Command({ resume })</code>, typed <code>StateGraph</code> with enforced state contracts, and <code>MemorySaver</code> are all first-class primitives. The others don't have them at this maturity level.</div>
</div>

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">How does interrupt/resume work with SSE?</div>
  <div class="text-xs text-white/65 leading-relaxed">Stream 1 runs until <code>interrupt()</code> — ends naturally. Check <code>getState().tasks[0].interrupts</code>, fire <code>onMissingFields()</code>, await user input, then Stream 2 with <code>Command({ resume })</code>. Two streams, seamless UX.</div>
</div>

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">What if the DB goes down?</div>
  <div class="text-xs text-white/65 leading-relaxed"><code>hydrate()</code> and <code>persistMemory()</code> both fail silently. Session continues with in-memory only. No crash — just no cross-session memory until DB recovers.</div>
</div>

</div>

::right::

<div class="mt-14 space-y-5">

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">How do you test LLM behaviour deterministically?</div>
  <div class="text-xs text-white/65 leading-relaxed">We don't test LLM output — we test around it. Temporal resolver, fast-path, validation, and chaining are pure functions. Router tests pass pre-built <code>RouterDecision</code> objects to bypass the LLM entirely.</div>
</div>

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">What is BM25?</div>
  <div class="text-xs text-white/65 leading-relaxed">BM25 is a lexical relevance ranking algorithm (term frequency + inverse document frequency with length normalization). It scores how well each memory entry matches the query, then returns the top hits.</div>
</div>

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">Why BM25 over embeddings for memory?</div>
  <div class="text-xs text-white/65 leading-relaxed">80 entries per session — embeddings add latency and cost for no real gain at this scale. BM25 runs in &lt;1ms in pure JS. Revisit at thousands of entries or when semantic similarity matters.</div>
</div>

<div v-click>
  <div class="text-orange-300 font-semibold text-sm mb-1">How does concurrent user isolation work?</div>
  <div class="text-xs text-white/65 leading-relaxed"><code>AgentMemoryStore</code> is instantiated per <code>conversationId</code> and cached in <code>chatInstances</code>. Each conversation has its own isolated store. No shared global state between users.</div>
</div>

</div>

---
layout: two-cols
layoutClass: gap-8
transition: slide-left
---

# LangGraph Framework

<div class="mt-4 space-y-5">

<div v-click>
  <div class="text-blue-300 font-semibold text-sm mb-1">What is LangGraph?</div>
  <div class="text-xs text-white/65 leading-relaxed">LangGraph is a stateful orchestration framework where typed nodes and edges define workflow control with built-in checkpointing and resume.</div>
</div>

<div v-click>
  <div class="text-blue-300 font-semibold text-sm mb-1">Why does agentDispatch exist as a no-op?</div>
  <div class="text-xs text-white/65 leading-relaxed">Because conditional fan-out after an <code>interrupt()</code> node is constrained, <code>agentDispatch</code> provides a clean passthrough for routing.</div>
</div>

<div v-click>
  <div class="text-blue-300 font-semibold text-sm mb-1">What is LangChain?</div>
  <div class="text-xs text-white/65 leading-relaxed">LangChain is the model and tools integration layer that standardizes prompting, tool-calling, and structured outputs across providers.</div>
</div>

</div>

::right::

<div class="mt-14 space-y-5">

<div v-click>
  <div class="text-blue-300 font-semibold text-sm mb-1">interrupt() vs loopback conditional edge?</div>
  <div class="text-xs text-white/65 leading-relaxed"><code>interrupt()</code> persists state and pauses execution cleanly, while loopback keeps the graph running and polling.</div>
</div>

<div v-click>
  <div class="text-blue-300 font-semibold text-sm mb-1">How does messagesStateReducer deduplicate?</div>
  <div class="text-xs text-white/65 leading-relaxed">It deduplicates by message <code>id</code> so parallel writes with the same message collapse to one entry.</div>
</div>

 </div>

---
layout: two-cols
layoutClass: gap-8
transition: slide-left
---

# LangGraph Framework (2/2)

<div class="mt-4 space-y-5">

<div v-click>
  <div class="text-blue-300 font-semibold text-sm mb-1">Can you run nodes in parallel?</div>
  <div class="text-xs text-white/65 leading-relaxed">Yes, LangGraph supports fan-out and fan-in patterns by connecting one node to multiple downstream nodes and then merging. </div>
</div>

<div v-click>
  <div class="text-blue-300 font-semibold text-sm mb-1">How does thread_id scope state?</div>
  <div class="text-xs text-white/65 leading-relaxed"><code>thread_id</code> namespaces checkpoints so each conversation has isolated graph state with no cross-talk.</div>
</div>

</div>

::right::

<div class="mt-14 space-y-5">

<div v-click>
  <div class="text-blue-300 font-semibold text-sm mb-1">What does .compile() do?</div>
  <div class="text-xs text-white/65 leading-relaxed"><code>.compile()</code> validates graph topology and binds runtime behavior like checkpointing into an executable graph.</div>
</div>

<div v-click>
  <div class="text-blue-300 font-semibold text-sm mb-1">How should I explain LangGraph fast?</div>
  <div class="text-xs text-white/65 leading-relaxed">Say: nodes are work, edges are control flow, and state is the typed memory shared across the run.</div>
</div>

</div>

---
layout: two-cols
layoutClass: gap-8
transition: slide-left
---

# Implementation

<div class="mt-4 space-y-5">

<div v-click>
  <div class="text-purple-300 font-semibold text-sm mb-1">How does withStructuredOutput enforce the schema?</div>
  <div class="text-xs text-white/65 leading-relaxed">LangChain adds a function-calling definition built from the Zod schema to the LLM request. The model is forced to call that function. LangChain then runs <code>zod.parse()</code> — if it fails, it throws.</div>
</div>

<div v-click>
  <div class="text-purple-300 font-semibold text-sm mb-1">Why temperature 0.2 and not 0?</div>
  <div class="text-xs text-white/65 leading-relaxed">At 0 the model becomes rigid — repeats the same wrong classification for edge cases. 0.2 keeps routing deterministic for clear intents while allowing slight variance on ambiguous queries.</div>
</div>

<div v-click>
  <div class="text-purple-300 font-semibold text-sm mb-1">Why turnResultOffset instead of clearing toolResults?</div>
  <div class="text-xs text-white/65 leading-relaxed"><code>toolResults</code> uses an append reducer — you can't clear it mid-graph. The offset snapshots <code>toolResults.length</code> at turn start. <code>responseAssembly</code> slices from that offset. History stays intact.</div>
</div>

</div>

::right::

<div class="mt-14 space-y-5">

<div v-click>
  <div class="text-purple-300 font-semibold text-sm mb-1">Why one tool per subgraph agent?</div>
  <div class="text-xs text-white/65 leading-relaxed">Multiple tools = LLM must decide which to call = another chance for the wrong tool. Tool selection was already done by the router via <code>toolHint</code>. One tool = zero tool confusion.</div>
</div>

<div v-click>
  <div class="text-purple-300 font-semibold text-sm mb-1">What's the Q:|P:|D:|CTX: format?</div>
  <div class="text-xs text-white/65 leading-relaxed">Compact query strings keep agent prompts small. Subgraph only needs: question, project, date range, context. Passing full state would bloat the prompt. Also parseable back into structured fields for episodic memory.</div>
</div>

<div v-click>
  <div class="text-purple-300 font-semibold text-sm mb-1">What if primary agent errors in a chain?</div>
  <div class="text-xs text-white/65 leading-relaxed"><code>chainedAgentDispatch</code> checks <code>primaryAgentHasResults</code>. Error = no results = chain is cleared, go straight to <code>responseAssembly</code> which surfaces the error. No half-executed chains.</div>
</div>

</div>

---
layout: center
transition: slide-up
---

# LangChain → LangGraph — Why We Migrated

<div class="mt-5 max-w-3xl mx-auto space-y-4">

<div v-click class="p-4 rounded-xl bg-white/5 border border-white/10">
  <div class="text-green-300 font-semibold text-sm mb-1">What was wrong with the old LangChain system?</div>
  <div class="text-xs text-white/65">One 1,557-line class. LLM controlled routing via prompts — a typo silently broke it for days. Manual 6-message window with context bleed. Missing fields required full restart. All tools in one agent causing confusion. Nothing testable in isolation.</div>
</div>

<div v-click class="p-4 rounded-xl bg-white/5 border border-white/10">
  <div class="text-green-300 font-semibold text-sm mb-1">Are LangChain and LangGraph competing?</div>
  <div class="text-xs text-white/65">No — they're complementary. LangGraph orchestrates (what runs and when). LangChain ReAct agents execute inside subgraphs (how a specific task gets done). We still use LangChain — just inside each specialist subgraph with one tool.</div>
</div>

<div v-click class="text-xs mt-2">

| Problem | LangChain | LangGraph |
|---|---|---|
| Flow control | LLM decides via ReAct | TypeScript graph edges |
| State persistence | Manual 6-msg window | `MemorySaver` checkpoints |
| Missing fields | Restart from scratch | `interrupt()` → resume |
| Tool selection | LLM picks from all | Router decides, one tool per agent |
| Routing failures | Silent wrong agent | Throws immediately (Zod) |
| Testability | Only end-to-end | Each node in isolation |

</div>

</div>

---
layout: center
transition: slide-left
---

# LangGraph Basics — Quick Reference

<div class="grid grid-cols-2 gap-4 mt-5 max-w-3xl mx-auto text-xs">

<div v-click class="p-3 rounded-lg bg-blue-900/25 border border-blue-500/20">
  <div class="text-blue-300 font-bold mb-1">What is a node?</div>
  <div class="text-white/60">Async function that reads state and returns a partial update. No framework magic inside.</div>
</div>

<div v-click class="p-3 rounded-lg bg-orange-900/25 border border-orange-500/20">
  <div class="text-orange-300 font-bold mb-1">What is an edge?</div>
  <div class="text-white/60">Connection between nodes. Static (always A→B) or conditional (TypeScript function decides at runtime).</div>
</div>

<div v-click class="p-3 rounded-lg bg-purple-900/25 border border-purple-500/20">
  <div class="text-purple-300 font-bold mb-1">What is state?</div>
  <div class="text-white/60">Typed shared object. Every node reads from it and writes partial updates back via reducers.</div>
</div>

<div v-click class="p-3 rounded-lg bg-green-900/25 border border-green-500/20">
  <div class="text-green-300 font-bold mb-1">What is a reducer?</div>
  <div class="text-white/60">Rule for how a field updates: last-write-wins, append, shallow merge, or dedup by id.</div>
</div>

<div v-click class="p-3 rounded-lg bg-yellow-900/25 border border-yellow-500/20">
  <div class="text-yellow-300 font-bold mb-1">What is a subgraph?</div>
  <div class="text-white/60">Full StateGraph used as a node. Has its own isolated state. Used for each specialist agent.</div>
</div>

<div v-click class="p-3 rounded-lg bg-pink-900/25 border border-pink-500/20">
  <div class="text-pink-300 font-bold mb-1">What is a checkpointer?</div>
  <div class="text-white/60">Snapshots full state after every node. MemorySaver = in-memory. PostgresSaver = DB-backed. One-line swap.</div>
</div>

<div v-click class="p-3 rounded-lg bg-red-900/25 border border-red-500/20">
  <div class="text-red-300 font-bold mb-1">What is interrupt()?</div>
  <div class="text-white/60">Pauses graph mid-node, checkpoints state, suspends. Resume with Command({ resume: value }) from exact point.</div>
</div>

<div v-click class="p-3 rounded-lg bg-white/5 border border-white/10">
  <div class="text-white/60 font-bold mb-1">What is START / END?</div>
  <div class="text-white/50">Built-in entry and exit node names. A graph can have multiple paths to END.</div>
</div>

</div>

---
transition: fade
class: text-center
---
<div
  v-motion
  :initial="{ opacity: 0, y: 20 }"
  :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }"
  class="text-3xl font-black mb-8"
  style="background: linear-gradient(135deg, #f97316, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
>
  One Sentence Per Answer
</div>

<div class="mx-auto flex gap-4 w-full justify-between">

  <div class="space-y-3 text-left w-1/2">
    <div v-click class="w-[34rem] max-w-full flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
      <span class="text-orange-400 font-bold w-28 flex-shrink-0">Why recompile?</span>
      <span class="text-white/65">SSE callbacks are per-request — the MemorySaver is what persists state, not the graph instance.</span>
    </div>
    <div v-click class="w-[34rem] max-w-full flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
      <span class="text-orange-400 font-bold w-28 flex-shrink-0">Router fails?</span>
      <span class="text-white/65">withStructuredOutput throws → caught → safe missing_fields fallback. Never silent.</span>
    </div>
    <div v-click class="w-[34rem] max-w-full flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
      <span class="text-orange-400 font-bold w-28 flex-shrink-0">interrupt()?</span>
      <span class="text-white/65">Graph checkpoints and suspends mid-node. Resume with Command. No restart, no polling.</span>
    </div>
  </div>
  <div class="mx-auto w-1/2 space-y-3 text-left">
    <div v-click class="w-[34rem] max-w-full flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
      <span class="text-orange-400 font-bold w-28 flex-shrink-0">One tool?</span>
      <span class="text-white/65">Tool selection already done by router. One tool = zero tool confusion in the subgraph.</span>
    </div>
    <div v-click class="w-[34rem] max-w-full flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
      <span class="text-orange-400 font-bold w-28 flex-shrink-0">LangChain?</span>
      <span class="text-white/65">Still used inside subgraphs. LangGraph orchestrates. LangChain executes. Complementary.</span>
    </div>
    <div v-click class="w-[34rem] max-w-full flex gap-3 items-start p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
      <span class="text-orange-400 font-bold w-28 flex-shrink-0">DB down?</span>
      <span class="text-white/65">hydrate() and persistMemory() fail silently. Session continues in-memory. No crash.</span>
    </div>
  </div>
</div>



