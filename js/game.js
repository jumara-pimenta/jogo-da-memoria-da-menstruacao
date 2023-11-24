const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const icons = [
  "abs_externo",
  "abs_interno",
  "app_menstrual",
  "bolsa_termica",
  "calendario",
  "ciclo",
  "coletor",
  "utero",
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 16) {
    clearInterval(this.loop);
    swal({
      title: `Parabéns, ${spanPlayer.innerHTML}! `,
      text: `Seu tempo foi de: ${timer.innerHTML} segundos`,
      icon: "success",
    });
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-icon");
  const secondCharacter = secondCard.getAttribute("data-icon");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (icon) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${icon}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-icon", icon);

  return card;
};

const loadGame = () => {
  const duplicateIcons = [...icons, ...icons];

  const shuffledArray = duplicateIcons.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((icon) => {
    const card = createCard(icon);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  startTimer();
  loadGame();
};
