import generateJoke from "./generateJoke";
import "./styles/main.scss";
import laughing from "./assets/laughing.svg";

// Initial Load
generateJoke();

const laughImg = document.getElementById("laughImg");
laughImg.src = laughing;

// Fetch a new joke on button click
const jokeBtn = document.getElementById("jokeBtn");
jokeBtn.addEventListener("click", () => {
    generateJoke();
});
