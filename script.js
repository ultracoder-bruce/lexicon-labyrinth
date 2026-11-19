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

const wordElement = document.querySelector("#word");
const pronunciationElement = document.querySelector("#pronunciation");
const partElement = document.querySelector("#part-of-speech");
const definitionElement = document.querySelector("#definition");
const exampleElement = document.querySelector("#example");
const numberElement = document.querySelector("#word-number");
const generateButton = document.querySelector("#generate-button");
const copyButton = document.querySelector("#copy-button");

let currentIndex = -1;
let wordsShown = 0;

function showRandomWord() {
  let nextIndex;

  do {
    nextIndex = Math.floor(Math.random() * entries.length);
  } while (entries.length > 1 && nextIndex === currentIndex);

  currentIndex = nextIndex;
  wordsShown += 1;

  const entry = entries[currentIndex];
  wordElement.textContent = entry.word;
  pronunciationElement.textContent = entry.pronunciation;
  partElement.textContent = entry.part;
  definitionElement.textContent = entry.definition;
  exampleElement.textContent = entry.example;
  numberElement.textContent = `NO. ${String(wordsShown).padStart(3, "0")}`;
  copyButton.textContent = "▢ Copy";
}

async function copyCurrentWord() {
  const entry = entries[currentIndex];
  const text = `${entry.word} (${entry.part}) — ${entry.definition}`;

  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "✓ Copied!";
  } catch {
    copyButton.textContent = "Copy unavailable";
  }
}

generateButton.addEventListener("click", showRandomWord);
copyButton.addEventListener("click", copyCurrentWord);

showRandomWord();
