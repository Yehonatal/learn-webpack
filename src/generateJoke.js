import axios from "axios";

function generateJoke() {
    const config = {
        headers: {
            Accept: "application/json",
        },
    };

    axios.get(process.env.API_URL, config).then((response) => {
        const jokeElement = document.getElementById("joke");
        jokeElement.innerHTML = response.data.joke;
    });
}

export default generateJoke;
