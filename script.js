const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show laoding
function loading(){
    loader.hidden= false;
    quoteContainer.hidden=true;
}

// hide loading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}
// before fetching api code checking if there is a static quote in html or not
    if(quoteText.innerText!==''){
        complete();
    }
// Get Quote from API
async function getQuote(){
    loading();
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const proxyUrl = 'https://stormy-citadel-86919.herokuapp.com/';
        const response = await fetch(proxyUrl +apiUrl);
        const data = await response.json();
        // if the author is blank then put unkown
        if(data.quoteAuthor ===''){
            authorText.innerText='unkown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        // reduce the font size of long quotes 
        if(data.quoteText.lenght > 120){
            quoteText.classList.add('long-quote');
        }
        // in case of the previous quote is long and new one is short
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // stop loader and show the quote
        complete();
    } 
    
    catch(error){
        getQuote();
      
    }
}

// tweet quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl , '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click' , getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// on Load to make function declared before calling at firist thime if there is no static quote in html
//  getQuote();
