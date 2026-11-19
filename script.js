const entries = [
  {
    word: "flummoxle",
    pronunciation: "/ˈflʌm.ɒk.səl/",
    part: "verb",
    definition: "To forget why you walked into a room, then confidently blame the room.",
    example: "“I went to get my keys and flummoxled for eleven minutes.”"
  },
  {
    word: "snackcident",
    pronunciation: "/ˈsnæk.sɪ.dənt/",
    part: "noun",
    definition: "An unexpected event in which a snack mysteriously disappears while you were “just checking the bag.”",
    example: "“The crisps are gone. It was a total snackcident.”"
  },
  {
    word: "procrasti-nap",
    pronunciation: "/prəˈkræs.tɪ.næp/",
    part: "noun",
    definition: "A brief rest taken to avoid a task that will be waiting, unimpressed, when you wake up.",
    example: "“I’ll answer those emails after my procrasti-nap.”"
  },
  {
    word: "wobblegob",
    pronunciation: "/ˈwɒb.əl.ɡɒb/",
    part: "noun",
    definition: "The tiny, unearned confidence boost you get from carrying three grocery bags in one trip.",
    example: "“I made it up the stairs without a second trip. Pure wobblegob.”"
  },
  {
    word: "glitterguilt",
    pronunciation: "/ˈɡlɪt.ə.ɡɪlt/",
    part: "noun",
    definition: "The sinking realization that your craft project has permanently redecorated the entire house.",
    example: "“The card looks lovely. The sofa has glitterguilt.”"
  },
  {
    word: "sockspiracy",
    pronunciation: "/sɒkˈspɪr.ə.si/",
    part: "noun",
    definition: "The organized disappearance of socks that leaves every laundry load with one suspicious survivor.",
    example: "“Another single sock? The sockspiracy deepens.”"
  },
  {
    word: "mumbelievable",
    pronunciation: "/ˌmʌm.bɪˈliː.və.bəl/",
    part: "adjective",
    definition: "So surprising that all you can do is mumble “well, would you look at that.”",
    example: "“The cat opened the cupboard. Mumbelievable.”"
  },
  {
    word: "chairish",
    pronunciation: "/ˈtʃeə.rɪʃ/",
    part: "adjective",
    definition: "A state of being technically on your feet but emotionally committed to the nearest chair.",
    example: "“I should go dancing, but I’m feeling chairish.”"
  }
];

// Mix a familiar everyday word with a nonsense ending to invent fresh compounds.
const wordRoots = [
  { word: "snack", pronunciation: "snack", scenario: "one quick trip to the snack cupboard", action: "grab one tiny snack" },
  { word: "sock", pronunciation: "sock", scenario: "a supposedly normal laundry load", action: "match the laundry" },
  { word: "chair", pronunciation: "chair", scenario: "sitting down for just one minute", action: "sit down for a second" },
  { word: "inbox", pronunciation: "in-box", scenario: "opening one work email", action: "check one message" },
  { word: "glitter", pronunciation: "glit-ter", scenario: "a small, contained craft project", action: "make a quick card" },
  { word: "coffee", pronunciation: "cof-fee", scenario: "a quick coffee break", action: "make a cup of coffee" },
  { word: "pigeon", pronunciation: "pij-eon", scenario: "making eye contact with a confident pigeon", action: "walk past a pigeon" },
  { word: "calendar", pronunciation: "cal-en-dar", scenario: "checking what day it is", action: "check the calendar" },
  { word: "pajama", pronunciation: "pa-ja-ma", scenario: "putting on comfortable clothes before dinner", action: "change into comfy clothes" },
  { word: "plant", pronunciation: "plant", scenario: "promising a houseplant you will water it tomorrow", action: "water the plants" },
  { word: "umbrella", pronunciation: "um-brel-la", scenario: "leaving home under a suspiciously clear sky", action: "check the weather" },
  { word: "leftover", pronunciation: "left-o-ver", scenario: "saving leftovers for a future version of yourself", action: "put away dinner" }
];

const wordEndings = [
  { word: "spiracy", pronunciation: "spir-a-cy", effect: "a committee meeting chaired by your missing keys" },
  { word: "nesia", pronunciation: "nee-zhuh", effect: "forgetting the one thing you came here to do" },
  { word: "quake", pronunciation: "quake", effect: "a tiny crisis with wildly disproportionate paperwork" },
  { word: "ology", pronunciation: "ol-o-gy", effect: "a surprisingly advanced science nobody asked to study" },
  { word: "magnet", pronunciation: "mag-net", effect: "attracting every minor inconvenience in the room" },
  { word: "shuffle", pronunciation: "shuf-fle", effect: "rearranging your plans without asking permission" },
  { word: "whirl", pronunciation: "whirl", effect: "a five-minute task becoming an afternoon expedition" },
  { word: "gremlin", pronunciation: "grem-lin", effect: "a tiny invisible assistant making everything slightly worse" },
  { word: "glitch", pronunciation: "glitch", effect: "your brain buffering at the least convenient moment" },
  { word: "drift", pronunciation: "drift", effect: "wandering off-task with absolutely no memory of the route" },
  { word: "storm", pronunciation: "storm", effect: "a dramatic debate between you and your to-do list" },
  { word: "zen", pronunciation: "zen", effect: "an accidental moment of peace you immediately start questioning" }
];

const definitionTemplates = [
  (root, ending) => `The peculiar phenomenon where ${root.scenario} somehow becomes ${ending.effect}.`,
  (root, ending) => `A condition caused by ${root.scenario}, usually ending in ${ending.effect}.`,
  (root, ending) => `The moment you realize ${root.scenario} has triggered ${ending.effect}.`
];
const exampleTemplates = [
  (root, word) => `“I was only going to ${root.action}, but then ${word} happened.”`,
  (root, word) => `“This was supposed to take a minute. Classic ${word}.”`,
  (root, word) => `“I blame the ${word}; I only meant to ${root.action}.”`
];

const wordElement = document.querySelector("#word");
const pronunciationElement = document.querySelector("#pronunciation");
const partElement = document.querySelector("#part-of-speech");
const definitionElement = document.querySelector("#definition");
const exampleElement = document.querySelector("#example");
const numberElement = document.querySelector("#word-number");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");

let currentEntry = null;
let currentIndex = -1;
let wordsShown = 0;
const generatedWords = new Set();

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function showWord(entry) {
  currentEntry = entry;
  wordsShown += 1;

  wordElement.textContent = entry.word;
  pronunciationElement.textContent = entry.pronunciation;
  partElement.textContent = entry.part;
  definitionElement.textContent = entry.definition;
  exampleElement.textContent = entry.example;
  numberElement.textContent = `NO. ${String(wordsShown).padStart(3, "0")}`;
  copyButton.textContent = "▢ Copy";
}

function showRandomWord() {
  let nextIndex;

  do {
    nextIndex = Math.floor(Math.random() * entries.length);
  } while (entries.length > 1 && nextIndex === currentIndex);

  currentIndex = nextIndex;
  showWord(entries[currentIndex]);
}

function generateWord() {
  let combinations = wordRoots.flatMap((root) =>
    wordEndings.map((ending) => ({ root, ending, word: `${root.word}${ending.word}` }))
  ).filter((combination) => !generatedWords.has(combination.word));

  // Once every combination has appeared, start a new round of inventions.
  if (combinations.length === 0) {
    generatedWords.clear();
    combinations = wordRoots.flatMap((root) =>
      wordEndings.map((ending) => ({ root, ending, word: `${root.word}${ending.word}` }))
    );
  }

  const combination = pickRandom(combinations);
  generatedWords.add(combination.word);

  return {
    word: combination.word,
    pronunciation: `/${combination.root.pronunciation}·${combination.ending.pronunciation}/`,
    part: "noun",
    definition: pickRandom(definitionTemplates)(combination.root, combination.ending),
    example: pickRandom(exampleTemplates)(combination.root, combination.word)
  };
}

function showGeneratedWord() {
  showWord(generateWord());
}

async function copyCurrentWord() {
  if (!currentEntry) return;

  const text = `${currentEntry.word} (${currentEntry.part}) — ${currentEntry.definition}`;

  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "✓ Copied!";
  } catch {
    copyButton.textContent = "Copy unavailable";
  }
}

generateButton.addEventListener("click", showGeneratedWord);
copyButton.addEventListener("click", copyCurrentWord);

showRandomWord();
