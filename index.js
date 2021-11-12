const wordInput = document.querySelector(".input");
const wordCount = document.querySelector(".word-count");
const wordsContainer = document.querySelector(".words-container");
const wordStartBtn = document.querySelector(".word-start-btn");
const quoteStartBtn = document.querySelector(".quote-start-btn");

const wordsAPI = count => (`https://random-word-api.herokuapp.com/word?number=${count}`);
const quoteAPI = 'https://api.quotable.io/random';

let interval = 0;

const startTimer = () => {
    ++interval;
};

const getWords = async count => {
    const res = await fetch(wordsAPI(count));
    const words = await res.json();
    wordsContainer.innerText = null;
    let wordLength = 0;
    words.forEach((word, index) => {
        const wordSpan = document.createElement("span");
        wordSpan.innerText = word;
        if(index == 0){
            wordSpan.setAttribute("class", "focused")
        }
        wordsContainer.appendChild(wordSpan);
        wordLength += word.length;
    });

    let timer = setInterval(startTimer, 1000);
    let i = 0;
    wordInput.addEventListener("input", () => {
        words.forEach(() => {
            let word = words[i];
            const focusedSpan = document.querySelector(".focused");
            if(word == wordInput.value && word != words[words.length - 1]){
                focusedSpan.nextSibling.setAttribute("class", "focused");
                focusedSpan.removeAttribute("class", "focused");
                wordInput.value = null;
                i++;
            }else if(word == wordInput.value && word == words[words.length - 1]){
                focusedSpan.removeAttribute("class", "focused");
                wordInput.value = null;
                clearInterval(timer);
                wordsContainer.innerText = `${(words.length * 60 / interval).toFixed()} WPM`;
                interval = 0;
                i++;
            }
        });
    });
}

const getQuote = async () => {
    const res = await fetch(quoteAPI);
    const data = await res.json();
    const quote = data["content"];
    const words = quote.split(" ");
    wordsContainer.innerText = null;
    let wordLength = 0;
    words.forEach( (word, index) => {
        const wordSpan = document.createElement("span");
        wordSpan.innerText = word;
        if(index == 0){
            wordSpan.setAttribute("class", "focused")
        }
        wordsContainer.appendChild(wordSpan);
        wordLength += word.length;
    });

    let timer = setInterval(startTimer, 1000);
    let i = 0;
    wordInput.addEventListener("input", () => {
        words.forEach(() => {
            let word = words[i];
            const focusedSpan = document.querySelector(".focused");
            if(word == wordInput.value && word != words[words.length - 1]){
                focusedSpan.nextSibling.setAttribute("class", "focused");
                focusedSpan.removeAttribute("class", "focused");
                wordInput.value = null;
                i++;
            }else if(word == wordInput.value && word == words[words.length - 1]){
                focusedSpan.removeAttribute("class", "focused");
                wordInput.value = null;
                clearInterval(timer);
                wordsContainer.innerText = `${(words.length * 60 / interval).toFixed()} WPM`;
                interval = 0;
                i++;
            }
        });
    });
}


if(wordStartBtn){
    wordStartBtn.addEventListener("click", () => {
        wordStartBtn.innerText = "Restart";
        getWords(wordCount.value);
    });
}
else{
    quoteStartBtn.addEventListener("click", () => {
        quoteStartBtn.innerText = "Restart";
        getQuote();
    });
}
