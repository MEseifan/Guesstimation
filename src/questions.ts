export type NumericQuestion = {
  id: string;
  kind: "numeric";
  prompt: string;
  unit?: string;
  answer: number;
  /** Short reasoning shown after the reveal. */
  reasoning: string;
  /** A human-friendly source or year so players trust the number. */
  source?: string;
};

export type ComparisonQuestion = {
  id: string;
  kind: "comparison";
  prompt: string;
  optionA: string;
  optionB: string;
  /** "A" if option A is the larger / correct answer, "B" otherwise. */
  answer: "A" | "B";
  reasoning: string;
  source?: string;
};

export type Question = NumericQuestion | ComparisonQuestion;

export const QUESTIONS: Question[] = [
  {
    id: "piano-tuners-nyc",
    kind: "numeric",
    prompt: "How many piano tuners work in New York City?",
    unit: "tuners",
    answer: 150,
    reasoning:
      "NYC ~8M people, ~1 piano per 30 households of 2.5 = ~100k pianos. Tuned every 2 years, a tuner handles ~800/yr → ~60 tuners. Concert halls, schools, churches push it to roughly 100–200.",
  },
  {
    id: "heartbeats-lifetime",
    kind: "numeric",
    prompt: "How many times does the average human heart beat in an 80-year lifetime?",
    unit: "beats",
    answer: 3_000_000_000,
    reasoning:
      "~70 beats/min × 60 × 24 × 365 × 80 ≈ 2.9 billion. A useful round number: roughly 3 billion.",
  },
  {
    id: "people-in-flight",
    kind: "numeric",
    prompt: "How many people are in the air on commercial flights at a typical peak moment?",
    unit: "people",
    answer: 1_300_000,
    reasoning:
      "~100k flights per day worldwide, average ~2.5 hr each → 100k × 2.5/24 ≈ 10,400 planes aloft on average. At ~150 pax/plane that's ~1.5M. Peak hours push toward 1.3–1.4M.",
  },
  {
    id: "breaths-per-day",
    kind: "numeric",
    prompt: "How many breaths does an average adult take per day?",
    unit: "breaths",
    answer: 20_000,
    reasoning: "~14 breaths/min × 60 × 24 ≈ 20,000.",
  },
  {
    id: "blinks-lifetime",
    kind: "numeric",
    prompt: "How many times does an average person blink in their lifetime (80 years, awake 16 hr/day)?",
    unit: "blinks",
    answer: 500_000_000,
    reasoning:
      "~15 blinks/min × 60 × 16 × 365 × 80 ≈ 420M. Rounding up for variance gives ~500M.",
  },
  {
    id: "sleep-minutes-lifetime",
    kind: "numeric",
    prompt: "How many minutes does an average person spend sleeping in an 80-year life?",
    unit: "minutes",
    answer: 14_000_000,
    reasoning: "8 hr × 60 × 365 × 80 ≈ 14 million minutes — roughly a third of life.",
  },
  {
    id: "hair-head",
    kind: "numeric",
    prompt: "How many hairs are on an average human head?",
    unit: "hairs",
    answer: 100_000,
    reasoning:
      "Scalp ≈ 500 cm², density ≈ 200 hairs/cm² → ~100k. Blondes have more (~150k), redheads fewer (~90k).",
  },
  {
    id: "tennis-balls-school-bus",
    kind: "numeric",
    prompt: "How many tennis balls fit inside a standard school bus (ignoring seats)?",
    unit: "tennis balls",
    answer: 500_000,
    reasoning:
      "Bus interior ≈ 12m × 2.4m × 2m ≈ 58 m³ = 58M cm³. A tennis ball has volume ~150 cm³; sphere packing is ~74% efficient → ~280k. Account for squish and rounding: ~300k–500k is defensible.",
  },
  {
    id: "steps-lifetime",
    kind: "numeric",
    prompt: "How many miles does an average person walk in their lifetime?",
    unit: "miles",
    answer: 75_000,
    reasoning:
      "~5,000 steps/day × 365 × 80 ≈ 146M steps. At ~2,000 steps per mile → ~73,000 miles, nearly 3× around the Earth.",
  },
  {
    id: "words-spoken-day",
    kind: "numeric",
    prompt: "How many words does the average person speak in a day?",
    unit: "words",
    answer: 16_000,
    reasoning:
      "A UT Austin study recorded ~16k words/day, with little difference between men and women.",
  },
  {
    id: "cells-human",
    kind: "numeric",
    prompt: "How many cells are in the adult human body?",
    unit: "cells",
    answer: 37_000_000_000_000,
    reasoning:
      "Best current estimate ~37 trillion (Bianconi et al. 2013). Red blood cells alone contribute ~25 trillion.",
  },
  {
    id: "bacteria-human",
    kind: "numeric",
    prompt: "How many bacteria live in or on the average human body?",
    unit: "bacteria",
    answer: 38_000_000_000_000,
    reasoning:
      "Sender et al. 2016 revised the old 10:1 myth: ratio is ~1:1, about 38 trillion bacteria to 30 trillion human cells.",
  },
  {
    id: "grains-sand-vs-stars",
    kind: "comparison",
    prompt: "Which is greater?",
    optionA: "Grains of sand on all Earth's beaches",
    optionB: "Stars in the observable universe",
    answer: "B",
    reasoning:
      "Sand on beaches: ~7.5 × 10^18. Stars in the observable universe: ~10^22–10^24 — thousands of times more.",
  },
  {
    id: "ants-vs-humans-biomass",
    kind: "comparison",
    prompt: "Which has greater total biomass on Earth?",
    optionA: "All living humans",
    optionB: "All living ants",
    answer: "A",
    reasoning:
      "Humans ~0.06 gigatonnes C. Ants ~0.02 Gt C (Schultheiss 2022). Humans win — termites come closer but still lose.",
  },
  {
    id: "libraries-vs-mcds",
    kind: "comparison",
    prompt: "Which is there more of in the United States?",
    optionA: "Public libraries",
    optionB: "McDonald's restaurants",
    answer: "A",
    reasoning: "~17,000 public library outlets vs ~13,500 McDonald's in the US.",
  },
  {
    id: "trees-vs-stars-milkyway",
    kind: "comparison",
    prompt: "Which is greater?",
    optionA: "Trees on Earth",
    optionB: "Stars in the Milky Way",
    answer: "A",
    reasoning:
      "Trees on Earth: ~3 trillion (Crowther 2015). Stars in the Milky Way: ~100–400 billion. Trees win by ~10×.",
  },
  {
    id: "youtube-hours-minute",
    kind: "numeric",
    prompt: "How many hours of video are uploaded to YouTube every minute (2024 est.)?",
    unit: "hours",
    answer: 500,
    reasoning: "YouTube reports ~500 hours of video uploaded per minute, steady since ~2020.",
  },
  {
    id: "cars-world",
    kind: "numeric",
    prompt: "How many cars (passenger vehicles) exist in the world?",
    unit: "cars",
    answer: 1_500_000_000,
    reasoning:
      "~1.45 billion motor vehicles worldwide, of which ~1.1 billion are passenger cars. Including light trucks: ~1.5B.",
  },
  {
    id: "pizza-us-day",
    kind: "numeric",
    prompt: "How many pizzas are sold in the United States on an average day?",
    unit: "pizzas",
    answer: 3_000_000,
    reasoning:
      "~350M US population; ~3B pizzas/yr sold → ~8M/day. But Americans also eat ~1 slice/week frozen/homemade — commercial slice estimates land around 100M slices/day ≈ 12M pizzas. The commonly cited figure is ~3M commercial pizzas/day — reasonable range 3–12M.",
  },
  {
    id: "chickens-world",
    kind: "numeric",
    prompt: "How many chickens are alive on Earth at any given moment?",
    unit: "chickens",
    answer: 33_000_000_000,
    reasoning:
      "~70B chickens slaughtered per year, average lifespan ~6 weeks → steady-state population ~70B × (6/52) ≈ 8B broilers, plus ~8B layers, plus backyard flocks → ~25–35B.",
  },
  {
    id: "languages-world",
    kind: "numeric",
    prompt: "How many distinct living languages are spoken in the world today?",
    unit: "languages",
    answer: 7100,
    reasoning:
      "Ethnologue lists ~7,164 living languages. About 40% are endangered; a handful go extinct every year.",
  },
  {
    id: "roads-us-miles",
    kind: "numeric",
    prompt: "How many miles of public roads are in the United States?",
    unit: "miles",
    answer: 4_200_000,
    reasoning:
      "US Federal Highway Administration reports ~4.2 million miles of public roads. Only ~48k of those are interstates.",
  },
  {
    id: "atoms-grain-sand",
    kind: "numeric",
    prompt: "Order of magnitude: how many atoms are in a single grain of sand? (Answer as a number.)",
    unit: "atoms",
    answer: 50_000_000_000_000_000_000,
    reasoning:
      "Grain ≈ 0.5mm cube → ~1.25 × 10^-4 cm³. Quartz density 2.65 g/cm³ → ~3.3 × 10^-4 g. Molar mass SiO₂ = 60 g/mol → 5.5 × 10^-6 mol × 6 × 10^23 × 3 atoms/unit ≈ 10^19.",
  },
  {
    id: "seconds-30-years",
    kind: "numeric",
    prompt: "How many seconds has a person been alive on their 30th birthday?",
    unit: "seconds",
    answer: 946_080_000,
    reasoning:
      "30 × 365.25 × 24 × 60 × 60 ≈ 9.46 × 10^8. Useful memory hook: π × 10^7 seconds per year.",
  },
  {
    id: "global-emails-day",
    kind: "numeric",
    prompt: "How many emails are sent worldwide on an average day?",
    unit: "emails",
    answer: 350_000_000_000,
    reasoning:
      "Radicati Group estimates ~347B emails/day in 2024, trending up. ~85% is spam or automated.",
  },
  {
    id: "planet-surface-water",
    kind: "numeric",
    prompt: "What percentage of Earth's surface is covered by water? (Enter a whole number.)",
    unit: "%",
    answer: 71,
    reasoning: "Oceans cover ~361M km² of Earth's 510M km² surface → about 71%.",
  },
  {
    id: "pacific-vs-all-land",
    kind: "comparison",
    prompt: "Which has greater surface area?",
    optionA: "The Pacific Ocean",
    optionB: "All of Earth's land combined",
    answer: "A",
    reasoning:
      "Pacific: ~165M km². All land on Earth: ~149M km². The Pacific is larger than every continent combined.",
  },
  {
    id: "ping-pong-olympic-pool",
    kind: "numeric",
    prompt: "How many ping-pong balls would fill an Olympic swimming pool?",
    unit: "balls",
    answer: 180_000_000,
    reasoning:
      "Pool: 50 × 25 × 2 m = 2,500 m³ = 2.5 × 10^9 cm³. Ball volume (d=4cm) ≈ 33.5 cm³, packing efficiency ~74% → ~5.5 × 10^7. But balls are smaller than that — with 40mm balls and realistic packing, ~150–200M.",
  },
  {
    id: "jellybeans-bathtub",
    kind: "numeric",
    prompt: "How many standard jellybeans fit inside a standard bathtub?",
    unit: "jellybeans",
    answer: 110_000,
    reasoning:
      "Tub volume ~300L = 300,000 cm³. Jellybean ≈ 2 cm³; packing ~65% → ~100,000. A classic fair question — winning guesses tend to land 80–130k.",
  },
  {
    id: "twitter-vs-sms",
    kind: "comparison",
    prompt: "Which is greater — daily volume, globally?",
    optionA: "Tweets/posts on X (Twitter) per day",
    optionB: "SMS text messages sent per day",
    answer: "B",
    reasoning:
      "X: ~500M posts/day. SMS: ~20+ billion/day globally (though declining vs. chat apps). SMS still wins by ~40×.",
  },
];
