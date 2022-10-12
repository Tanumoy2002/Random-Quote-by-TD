const quoteText = document.querySelector(".quote"),
    authorName = document.querySelector(".author .name"),
    quoteBtn = document.querySelector("button"),
    soundBtn = document.querySelector(".sound"),
    copyBtn = document.querySelector(".copy"),
    twitBtn = document.querySelector(".twit");

console.log("Running");

// random quote function
function randomQuote() {
    speechSynthesis.cancel();
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote ....";
    // fetching random quote from the API and parsing it into at object
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.innerText = "New Quote";
        quoteBtn.classList.remove("loading");
    });
}

soundBtn.addEventListener("click", () => {
    // the speechSynthesisutterance is a web speech api that represents a speech request
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    speechSynthesis.speak(utterance); // speak method of speechSynthesis speaks the utterance
});

copyBtn.addEventListener("click", () => {
    // copying the quote text on copyBtn click
    navigator.clipboard.writeText(quoteText.innerText);
    alert("Copied Successfully");
});

twitBtn.addEventListener("click", () => {
    let twwetUrl = `https://twitter.com/internet/tweet?url=${quoteText.innerText}`;
    window.open(twwetUrl, "_blank"); // opening a new twitter tab 
});

quoteBtn.addEventListener("click", randomQuote);
