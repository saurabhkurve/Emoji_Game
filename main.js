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
    gameOver();
  } else {
    clickedEmojis.add(selectedEmoji);
    score++;
    scoreElement.textContent = score;
    if (score === 12) {
      gameOver();
    } else {
      renderEmojis();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderEmojis();
});

function gameOver() {
  if (score > topScore) {
    topScore = score;
    localStorage.setItem("topScore", topScore);
  }
  localStorage.setItem("score", score);
  window.location.href = "gameover.html";
}

