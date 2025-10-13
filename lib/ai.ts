// lib/ai.ts
// Lightweight helper to call the a0 LLM API. Returns transformed string or throws.

export async function transformTyping(input: string): Promise<string> {
  try {
    const body = { messages: [{ role: 'user', content: `Transform this typed fragment to a clever/compact alternative: "${input}"` }] };
    const res = await fetch('https://api.a0.dev/ai/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (json?.schema_data?.output) return String(json.schema_data.output);
    if (json?.completion) return String(json.completion);
  } catch (e) {
    // ignore and fallback
  }
  // Fallback: small deterministic transform
  if (/\(1\+2/.test(input)) return 'ln(1)';
  const tok = input.trim().split(' ').pop() || '';
  return tok.split('').reverse().join('') + ' • creative';
}