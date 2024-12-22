document.querySelector("button").addEventListener("click", () => {
  playGame();
  document.querySelector("button").style.scale = "90%";
  setTimeout(() => (document.querySelector("button").style.scale = ""), 100);
});


function createGuessNum() {
  let guessNumber = [];
  while (guessNumber.length != 4) {
    const num = Math.round(Math.random() * 9);
    if (!guessNumber.includes(num)) {
      guessNumber.push(num);
    }
  }
  return guessNumber;
}

document.querySelectorAll('input[type="number"]').forEach((element) => {
  element.addEventListener("input", (ev) => {
    e = ev.target;
    if (isNaN(parseInt(e.value)) || e.value.length > 1) e.value = null;
  });
});

let guessNumber = createGuessNum();

function playGame() {
  document.querySelector(".image").innerHTML = "";

  let inputsNumber = Array.from(
    document.querySelectorAll('input[type="number"]')
  ).map((input) => +input.value);

  let result = checkResult(guessNumber, inputsNumber);

  let letter = document.createElement("p");

  if (result.bulls === 0 && result.cows === 0) {
    letter.textContent = "Сегодня не твой день";
    document.querySelector(".image").append(letter);
  } else if (result.bulls === 4) {
    letter.textContent = "Ты крутой";
    document.querySelector(".image").append(letter);
  } else {
    document.querySelector(".image").innerHTML =
      '<img src="./bull.png" alt="bull">'.repeat(result.bulls) +
      '<img src="./cow.png" alt="cow">'.repeat(result.cows);
  }
}

function checkResult(guessNumList, myNumList) {
  let res = { bulls: 0, cows: 0 };
  let guessed = [];

  for (let i = 0; i < 4; i++) {
    if (
      guessNumList.includes(myNumList[i]) &&
      !guessed.includes(myNumList[i])
    ) {
      res.cows++;
    }
    if (guessNumList.indexOf(myNumList[i]) == i) {
      res.bulls++;
      res.cows--;
    }
    guessed[i] = myNumList[i];
  }
  return res;
}
