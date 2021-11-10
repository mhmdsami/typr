const wordInput = document.querySelector(".input");
const wordCount = document.querySelector(".word-count");
const wordsContainer = document.querySelector(".words-container");
const wordStartBtn = document.querySelector(".word-start-btn");
const quoteStartBtn = document.querySelector(".quote-start-btn");

const wordsAPI = count => (`https://random-word-api.herokuapp.com/word?number=${count}`);
const quoteAPI = 'https://api.quotable.io/random';


const getWords = async (count) => {
    const res = await fetch(wordsAPI(count));
    const words = await res.json();
    wordsContainer.innerText = ''
    words.forEach( (word, index) => {
        const wordSpan = document.createElement("span");
        wordSpan.innerText = word;
        if(index == 0){
            wordSpan.setAttribute("class", "focused")
        }
        wordsContainer.appendChild(wordSpan);
    });
}

const getQuote = async () => {
    const res = await fetch(quoteAPI);
    const data = await res.json();
    const quote = data["content"];
    words = quote.split(" ");
    wordsContainer.innerText = ''
    words.forEach( (word, index) => {
        const wordSpan = document.createElement("span");
        wordSpan.innerText = word;
        if(index == 0){
            wordSpan.setAttribute("class", "focused")
        }
        wordsContainer.appendChild(wordSpan);
    });
}

if(wordStartBtn){
    wordStartBtn.addEventListener("click", () => getWords(wordCount.value));
}
else{
    quoteStartBtn.addEventListener("click", () => getQuote());
}
