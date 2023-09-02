const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes =[];

function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden= true;
}

function hideLoading() {
    quoteContainer.hidden= false;
    loader.hidden= true;
}

// Show New Quote
function newQuote(){
    showLoading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    //Check if Author field is blank and replace it with "Unknown"
    if (!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
// check Quote length to determin styling
if (quote.text.length>120) {
    quoteText.classList.add('long-quote');
} else {
    quoteText.classList.remove('long-quote');
}
// Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    hideLoading();
}


// Get Quotes From API
async function getQuotes() {
    showLoading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        //throw new Error('ooops');//--> this for testing errors throw error purposely
    } catch(error){
        console.log(error) //for the error test.
        // Catch Error
        getQuotes()
    }
}

// Tweet Quote 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
    window.open(twitterUrl, '_blank');//open new tab 

}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load 
getQuotes();
