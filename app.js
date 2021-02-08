// DOM declarations
const userOptions = document.querySelector(".user-options");
const hardBlocks = document.querySelectorAll(".hard");
const easyBlocks = document.querySelectorAll(".easy");
const hardBtn = document.querySelector("#hard");
const easyBtn = document.querySelector("#easy");
const allBlocks = document.querySelectorAll(".color-block");
const refresh = document.querySelector("#refresh");
const gameTitle = document.querySelector("#game-title");
const colorBody = document.querySelector(".colors");
const rgbBtn = document.querySelector("#rgb");
const hexBtn = document.querySelector("#hex");

let mode = "hard";
let correct;

// running functions when starting page load

// append color
const appendColor = () => {
  for (let block of allBlocks) {
    block.style.backgroundColor = generateRandomRGB();
  }
};

// generate random rgb color
const generateRandomRGB = () => {
  const r = Math.round(Math.random() * 256);
  const g = Math.round(Math.random() * 256);
  const b = Math.round(Math.random() * 256);
  const color = `rgb(${r}, ${g}, ${b})`;

  return color;
};

// random answer picker
const correctAnswer = (mode) => {
  if (mode === "easy") {
    const index = Math.floor(Math.random() * easyBlocks.length);
    gameTitle.innerHTML = easyBlocks[index].style.backgroundColor;
    correct = easyBlocks[index].style.backgroundColor;
  } else if (mode === "hard") {
    const index = Math.floor(Math.random() * allBlocks.length);
    gameTitle.innerHTML = allBlocks[index].style.backgroundColor;
    correct = allBlocks[index].style.backgroundColor;
  }
};

//what happens ater correct answer
const win = (color) => {
  document.querySelector("nav").style.backgroundColor = color;
  for (let block of allBlocks) {
    block.style.backgroundColor = color;
  }
};

// user click event manager
userOptions.addEventListener("click", (e) => {
  if (e.target.id === "easy") {
    console.log(e.target.classList);
    if (e.target.classList.contains("active")) {
      return;
    }
    for (let block of hardBlocks) {
      block.style.display = "none";
    }
    e.target.classList.add("active");
    hardBtn.classList.remove("active");
    mode = "easy";
    correctAnswer(mode);
    checkTitle();
  }

  if (e.target.id === "hard") {
    if (e.target.classList.contains("active")) {
      return;
    }
    for (let block of allBlocks) {
      block.style.display = "block";
    }
    e.target.classList.add("active");
    easyBtn.classList.remove("active");
    mode = "hard";
    correctAnswer(mode);
    checkTitle();
  }

  if (e.target.id === "rgb") {
    if (e.target.classList.contains("active")) {
      return;
    }
    displayRgb(gameTitle);
    e.target.classList.add("active");
    hexBtn.classList.remove("active");
  }
  if (e.target.id === "hex") {
    if (e.target.classList.contains("active")) {
      return;
    }
    displayHex(gameTitle);
    e.target.classList.add("active");
    rgbBtn.classList.remove("active");
  }
  if (e.target.id === "refresh") {
    //will want to update game title here
    onPageLoad();
    checkTitle();
  }
});

// slecting the color

colorBody.addEventListener("click", (e) => {
  if (e.target.style.backgroundColor === correct) {
    win(gameTitle.innerHTML);
    refresh.innerHTML = "New Game?";
  } else {
    console.log(e);
    e.target.style.backgroundColor = "#232323";
  }
});

// generate colors on page load
const onPageLoad = () => {
  appendColor();
  correctAnswer(mode);
  refresh.innerHTML = "New Colors";
  document.querySelector("nav").style.backgroundColor = "steelblue";
};

// Hex mode and changes
const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

const displayHex = (title) => {
  let formattedArray = title.innerHTML.replace("rgb(", "").replace(")", "");
  const numVal = formattedArray.split(",").map((val) => {
    return parseInt(val);
  });
  const [r, g, b] = numVal;
  gameTitle.innerHTML = rgbToHex(r, g, b);
};

const displayRgb = (title) => {
  title.innerHTML = correct;
};

const checkTitle = () => {
  if (hexBtn.classList.contains("active")) {
    displayHex(gameTitle);
  } else if (rgbBtn.classList.contains("active")) {
    displayRgb(gameTitle);
  }
};

onPageLoad();
