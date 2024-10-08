const emojis = [
  "😀",
  "😂",
  "😍",
  "😎",
  "😭",
  "😡",
  "😱",
  "😴",
  "🤔",
  "🤩",
  "🥳",
  "🤯",
];

let score = 0;
let topScore = localStorage.getItem("topScore")
  ? parseInt(localStorage.getItem("topScore"))
  : 0;
let clickedEmojis = new Set();

const scoreElement = document.getElementById("score");
const topScoreElement = document.getElementById("topScore");
topScoreElement.textContent = topScore;
const emojiGrid = document.getElementById("emojiGrid");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderEmojis() {
  emojiGrid.innerHTML = "";
  shuffle(emojis);
  emojis.forEach((emoji) => {
    const emojiElement = document.createElement("div");
    emojiElement.textContent = emoji;
    emojiElement.classList.add("emoji");
    emojiElement.addEventListener("click", handleEmojiClick);
    emojiGrid.appendChild(emojiElement);
  });
}

function handleEmojiClick(event) {
  const selectedEmoji = event.target.textContent;
  if (clickedEmojis.has(selectedEmoji)) {
    if (score > topScore) {
      topScore = score;
      localStorage.setItem("topScore", topScore);
    }
    localStorage.setItem("score", score);
    score = 0;
    clickedEmojis.clear();
    window.location.href = "gameover.html";
  } else {
    clickedEmojis.add(selectedEmoji);
    score++;
  }
  scoreElement.textContent = score;
  renderEmojis();
}

document.addEventListener("DOMContentLoaded", () => {
  renderEmojis();
});
