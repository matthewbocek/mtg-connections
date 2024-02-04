import "./style.css";
import { wrapGrid } from "animate-css-grid";

const imageContext = require.context("./assets", false, /\.(jpg|jpeg|png)$/);
const { forceGridAnimation } = wrapGrid(document.querySelector(".cards"), {
  duration: 1500,
});

function getChecked() {
  const checkedCardsQuery = ".cards input:checked";
  return document.querySelectorAll(checkedCardsQuery);
}

function updateSelected(e) {
  // limit to 4 selected
  if (e.target.checked && getChecked().length > 4) {
    e.preventDefault();
  }
}

function submit() {
  const checked = getChecked();
  if (checked.length !== 4) {
    return;
  }

  const guess = Array.from(checked)
    .map((el) => el.getAttribute("id"))
    .sort();

  const solution = solutions.find((s) =>
    s.items.every((val, idx) => val === guess[idx])
  );

  if (solution) {
    checked.forEach((box) => box.remove());
    guess.forEach(
      (id) =>
        (document.querySelector(
          `label[for="${id}"]`
        ).className = `solved-${solution.hard}`)
    );

    forceGridAnimation();
    return;
  }

  checked.forEach((box) => (box.checked = false));
}

function component() {
  const cardGrid = document.querySelector(".cards");

  cards.forEach((c) => {
    const box = document.createElement("input");
    box.setAttribute("type", "checkbox");
    box.setAttribute("id", c);
    box.addEventListener("click", updateSelected);
    cardGrid.appendChild(box);

    const label = document.createElement("label");
    label.setAttribute("for", c);
    const image = document.createElement("img");
    image.src = imageContext(`./${c}.jpg`);
    label.appendChild(image);
    cardGrid.appendChild(label);
  });

  document.querySelector("#submitBtn").addEventListener("click", submit);
}

const cards = [
  "1bfba7a0-d5ca-4197-9e58-21f28345f1a6",
  "316a2d2f-ca94-463f-ada4-2b12bce6312f",
  "33f51f18-41af-4a2c-a353-48bebd697599",
  "356af156-a059-416c-b78b-d9058b742818",
  "3875f73d-6108-488b-bd34-4cf2c23ce6b3",
  "57d230fc-d382-40b4-bdbd-5fe880fa16bf",
  "69db0298-f6d5-450f-add3-a28c0a43f33f",
  "6c44738c-706f-40b2-a09d-b21cd0889049",
  "6eb97a96-2c56-4638-b971-00cdf1eafd43",
  "8e48a2f3-9c30-4187-868e-33dbf5e279fc",
  "9ad5f9f2-282a-4ee0-a259-cc24404ddf6f",
  "bb6e37a1-0dfd-4b8a-83d1-8f6d99123516",
  "dc409ded-41f3-4f14-8199-72a9fe98bac0",
  "f06edd53-f3ac-44b0-a087-5670ba8f0fa5",
  "f6879321-9a61-4c4f-9513-81ad5684c99e",
  "fc9a7c57-bc83-4965-b670-144a0019b466",
];

const solutions = [
  {
    hard: 2,
    name: "Blue",
    items: [
      "69db0298-f6d5-450f-add3-a28c0a43f33f",
      "1bfba7a0-d5ca-4197-9e58-21f28345f1a6",
      "fc9a7c57-bc83-4965-b670-144a0019b466",
      "6c44738c-706f-40b2-a09d-b21cd0889049",
    ].sort(),
  },
  {
    hard: 3,
    name: "Black",
    items: [
      "6eb97a96-2c56-4638-b971-00cdf1eafd43",
      "9ad5f9f2-282a-4ee0-a259-cc24404ddf6f",
      "33f51f18-41af-4a2c-a353-48bebd697599",
      "356af156-a059-416c-b78b-d9058b742818",
    ].sort(),
  },
  {
    hard: 1,
    name: "White",
    items: [
      "bb6e37a1-0dfd-4b8a-83d1-8f6d99123516",
      "dc409ded-41f3-4f14-8199-72a9fe98bac0",
      "316a2d2f-ca94-463f-ada4-2b12bce6312f",
      "f06edd53-f3ac-44b0-a087-5670ba8f0fa5",
    ].sort(),
  },
  {
    hard: 4,
    name: "Green",
    items: [
      "8e48a2f3-9c30-4187-868e-33dbf5e279fc",
      "f6879321-9a61-4c4f-9513-81ad5684c99e",
      "3875f73d-6108-488b-bd34-4cf2c23ce6b3",
      "57d230fc-d382-40b4-bdbd-5fe880fa16bf",
    ].sort(),
  },
];

component();
