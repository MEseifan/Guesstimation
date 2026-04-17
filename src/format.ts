export function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1e15) return `${(n / 1e15).toPrecision(3)} quadrillion`;
  if (abs >= 1e12) return `${(n / 1e12).toPrecision(3)} trillion`;
  if (abs >= 1e9) return `${(n / 1e9).toPrecision(3)} billion`;
  if (abs >= 1e6) return `${(n / 1e6).toPrecision(3)} million`;
  if (abs >= 10_000) return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export function parseNumber(input: string): number | null {
  const trimmed = input.trim().toLowerCase().replace(/,/g, "").replace(/_/g, "");
  if (!trimmed) return null;

  const suffixes: Record<string, number> = {
    k: 1e3,
    thousand: 1e3,
    m: 1e6,
    mil: 1e6,
    million: 1e6,
    b: 1e9,
    bn: 1e9,
    billion: 1e9,
    t: 1e12,
    trillion: 1e12,
    q: 1e15,
    quadrillion: 1e15,
  };

  const match = trimmed.match(/^([+-]?\d*\.?\d+(?:e[+-]?\d+)?)\s*([a-z]+)?$/);
  if (!match) return null;
  const base = Number(match[1]);
  if (!Number.isFinite(base)) return null;
  const suffix = match[2];
  if (!suffix) return base;
  const mult = suffixes[suffix];
  if (!mult) return null;
  return base * mult;
}
