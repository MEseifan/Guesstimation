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
    id: "us-passport-holders",
    kind: "numeric",
    prompt: "What percentage of Americans currently hold a valid passport? (Enter a whole number.)",
    unit: "%",
    answer: 48,
    reasoning:
      "US State Department figures put it around 48% in recent years — up from ~5% in 1990 and ~25% in 2000. Post-9/11 rules requiring passports for Canada/Mexico land travel drove most of the growth.",
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
    id: "helicopter-ride-americans",
    kind: "numeric",
    prompt: "What percentage of American adults have ever ridden in a helicopter? (Enter a whole number.)",
    unit: "%",
    answer: 10,
    reasoning:
      "Not well surveyed, but back-of-envelope: military veterans (~6% of adults, most exposed), tourist hotspots (Hawaii, Grand Canyon, NYC) account for a few percent more, plus medical airlift passengers and industry workers. Best estimate ~8–12%.",
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
    id: "global-internet-access",
    kind: "numeric",
    prompt: "What percentage of the world's population has internet access? (Enter a whole number.)",
    unit: "%",
    answer: 67,
    reasoning:
      "ITU's 2023 estimate: ~67% of humanity is online — about 5.4 billion people. Sub-Saharan Africa and South Asia hold most of the remaining offline population.",
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
    id: "us-divorce-rate",
    kind: "numeric",
    prompt: "What percentage of US first marriages end in divorce? (Enter a whole number.)",
    unit: "%",
    answer: 40,
    reasoning:
      "The famous '50%' stat was a projection from the peak-divorce 1980s. Actual lifetime divorce rate for first marriages has settled closer to 35–42% as divorce rates have fallen since 2000.",
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
    id: "plastic-recycled",
    kind: "numeric",
    prompt: "What percentage of all plastic ever produced has been recycled? (Enter a whole number.)",
    unit: "%",
    answer: 9,
    reasoning:
      "Geyer et al. (2017) estimated ~9% of all plastic ever made has been recycled. ~12% has been incinerated; the remaining ~79% sits in landfills or the environment.",
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
    id: "us-college-grad",
    kind: "numeric",
    prompt: "What percentage of Americans age 25+ have a bachelor's degree or higher? (Enter a whole number.)",
    unit: "%",
    answer: 38,
    reasoning:
      "US Census ACS 2022: ~37.9% of adults 25+ hold at least a bachelor's. In 1980 it was ~17%; the share has roughly doubled in 40 years.",
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
    id: "global-literacy",
    kind: "numeric",
    prompt: "What percentage of adults worldwide can read and write? (Enter a whole number.)",
    unit: "%",
    answer: 87,
    reasoning:
      "UNESCO estimates global adult literacy at ~87% in 2023. In 1970 it was ~56%. The lowest rates are in Sub-Saharan Africa and parts of South Asia.",
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
    id: "births-per-day",
    kind: "numeric",
    prompt: "How many babies are born worldwide on an average day?",
    unit: "births",
    answer: 385_000,
    reasoning:
      "~140 million births per year globally (UN) → ~385k/day, or ~4.4 per second. India and China alone account for roughly a third.",
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
    id: "us-gun-households",
    kind: "numeric",
    prompt: "What percentage of US households contain a firearm? (Enter a whole number.)",
    unit: "%",
    answer: 44,
    reasoning:
      "Pew Research 2023: ~32% of US adults personally own a gun, and ~44% live in a household with one. The share has been roughly flat since the 1990s.",
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
    id: "walmart-vs-military",
    kind: "comparison",
    prompt: "Which is larger?",
    optionA: "Walmart's worldwide headcount",
    optionB: "US active-duty military personnel",
    answer: "A",
    reasoning:
      "Walmart employs ~2.1 million people worldwide (~1.6M in the US). US active-duty military is ~1.3M. Walmart is the largest private employer in the world.",
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
    id: "ocean-floor-mapped",
    kind: "numeric",
    prompt: "What percentage of the ocean floor has been mapped in high resolution? (Enter a whole number.)",
    unit: "%",
    answer: 25,
    reasoning:
      "Seabed 2030 project: as of 2024 only ~25% of the ocean floor has modern, high-resolution bathymetry. The rest is known only from low-resolution satellite gravimetry.",
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
    id: "us-commute-time",
    kind: "numeric",
    prompt: "What is the average one-way commute time for an American worker, in minutes?",
    unit: "minutes",
    answer: 27,
    reasoning:
      "US Census ACS: ~27 minutes one-way, ~54 minutes round trip. New York and Maryland top out near 33 min; remote work has nudged the national number down slightly since 2020.",
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
    id: "global-smoking-adults",
    kind: "numeric",
    prompt: "What percentage of the world's adults smoke tobacco? (Enter a whole number.)",
    unit: "%",
    answer: 22,
    reasoning:
      "WHO: ~22% of adults globally smoked tobacco in 2022, down from ~33% in 2000. Men (~36%) smoke at roughly four times the rate of women (~8%).",
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
    id: "food-waste-global",
    kind: "numeric",
    prompt: "What percentage of food produced globally is wasted or lost? (Enter a whole number.)",
    unit: "%",
    answer: 33,
    reasoning:
      "FAO and UNEP put it at roughly one-third: ~14% is lost between harvest and retail, another ~17% is wasted at retail and in households.",
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
    id: "us-wedding-cost",
    kind: "numeric",
    prompt: "What is the average cost of a wedding in the United States (2024)?",
    unit: "dollars",
    answer: 33_000,
    reasoning:
      "The Knot's 2024 Real Weddings Study pegged the average at ~$33,000, excluding the ring and honeymoon. Median is lower (~$20k) because big-city megaweddings pull the mean up.",
  },
  {
    id: "global-life-expectancy",
    kind: "numeric",
    prompt: "What is the average life expectancy at birth, worldwide?",
    unit: "years",
    answer: 73,
    reasoning:
      "World Bank 2023: ~73.4 years globally. In 1950 it was ~47; gains came mostly from reducing infant mortality. Japan tops the list (~84), with several African countries in the low 60s.",
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
    id: "dead-vs-alive",
    kind: "comparison",
    prompt: "Which is greater?",
    optionA: "Humans alive on Earth right now",
    optionB: "Humans who have ever lived and died",
    answer: "B",
    reasoning:
      "PRB estimates ~117 billion humans have ever been born. About 8 billion are alive now — so ~109 billion have died. The dead outnumber the living by ~14×.",
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
    id: "mcdonalds-worldwide",
    kind: "numeric",
    prompt: "How many McDonald's restaurants operate worldwide?",
    unit: "restaurants",
    answer: 42_000,
    reasoning:
      "~42,000 locations in 100+ countries as of 2024. The US has ~13,500; China and Japan are the next largest markets.",
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
    id: "live-in-birth-state",
    kind: "numeric",
    prompt: "What percentage of Americans still live in the state where they were born? (Enter a whole number.)",
    unit: "%",
    answer: 58,
    reasoning:
      "US Census data: ~58% of Americans live in their state of birth. The share is highest in Louisiana and Michigan (~75%) and lowest in Nevada and Florida (~25%).",
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
