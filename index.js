const section = document.querySelector("section");
const attemptsText = document.querySelector(".attempts");
const resetBtn = document.getElementById("button");
let attempts = 0;
let currentScore = 0;

attemptsText.textContent = `Attempts: ${attempts}`;

const getData = () => [
  { imgSrc: "./images/baseball.jpg", name: "baseball" },
  { imgSrc: "./images/basketball.jpg", name: "basketball" },
  { imgSrc: "./images/cycling.jpg", name: "cycling" },
  { imgSrc: "./images/running.jpg", name: "running" },
  { imgSrc: "./images/skiing.jpg", name: "skiing" },
  { imgSrc: "./images/swimming.jpg", name: "swimming" },
  { imgSrc: "./images/table-tennis.jpg", name: "table-tennis" },
  { imgSrc: "./images/voleyball.jpg", name: "voleyball" },
  { imgSrc: "./images/baseball.jpg", name: "baseball" },
  { imgSrc: "./images/basketball.jpg", name: "basketball" },
  { imgSrc: "./images/cycling.jpg", name: "cycling" },
  { imgSrc: "./images/running.jpg", name: "running" },
  { imgSrc: "./images/skiing.jpg", name: "skiing" },
  { imgSrc: "./images/swimming.jpg", name: "swimming" },
  { imgSrc: "./images/table-tennis.jpg", name: "table-tennis" },
  { imgSrc: "./images/voleyball.jpg", name: "voleyball" },
];
const randomizeData = () => {
  const data = getData();
  data.sort(() => Math.random() - 0.5);
  return data;
};

const cardGenerator = () => {
  const cardData = randomizeData();
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const cardFace = document.createElement("img");
    cardFace.src = item.imgSrc;
    const cardBack = document.createElement("div");
    card.classList = "card";
    cardFace.classList = "card-face";
    cardBack.classList = "card-back";
    section.append(card);
    card.append(cardFace);
    card.append(cardBack);
    card.setAttribute("name", item.name);
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggle-card");
      checkCards(e);
    });
  });
};
cardGenerator();
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
      attempts++;
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggle-card"), 1000);
      });
      attempts++;
      attemptsText.textContent = `Attempts: ${attempts}`;
    }
  }
  const toggleCards = document.querySelectorAll(".toggle-card");
  if (toggleCards.length === 16) {
    currentScore = attempts;
    restart();
    attemptsText.textContent = `You won with ${currentScore} attempts`;
  }
};

const restart = () => {
  section.style.pointerEvents = "none";
  let cardData = randomizeData();
  let cards = document.querySelectorAll(".card");
  let faces = document.querySelectorAll(".card-face");
  cardData.forEach((card, index) => {
    cards[index].classList.remove("toggle-card");
    cards[index].setAttribute("name", card.name);
    cards[index].style.pointerEvents = "all";
    setTimeout(() => (faces[index].src = card.imgSrc), 1000);
  });
  attempts = 0;
  attemptsText.textContent = `Attempts: ${attempts}`;
  setTimeout(() => (section.style.pointerEvents = "all"), 1000);
};

resetBtn.addEventListener("click", restart);
