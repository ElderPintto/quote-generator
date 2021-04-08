(function(){
    const ElquoteContainer = document.querySelector('#quote-container')
    const Elloader = document.querySelector('#loader')
    const Elquote = document.querySelector('#quote')
    const Elauthor = document.querySelector('#author')
    const ElbtnNewQuote = document.querySelector('#new-quote')
    const ElbtnTwitter = document.querySelector('#twitter')

    function loading() {
        Elloader.hidden = false;
        ElquoteContainer.hidden = true;
    }

    function complete() {
        ElquoteContainer.hidden = false;
        Elloader.hidden = true;
    }

    function newQuote(quoteItem) {
        Elquote.textContent = quoteItem.quoteText ? quoteItem.quoteText : 'Unknown'
        Elauthor.textContent = quoteItem.quoteAuthor ? quoteItem.quoteAuthor : 'Unknown'
        quoteItem.quoteText.length > 50 ? Elquote.classList.add('long-quote') : Elquote.classList.remove('long-quote')

        complete() 
    }

    // get quotes from API
    async function getQuotes() {
        loading()
        
        const proxyUrl = 'https://warm-everglades-01381.herokuapp.com/';
        const apiUrl =
          'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
        try {
            const response = await fetch(proxyUrl + apiUrl);
            apiQuotes = await response.json();
            setTimeout(()=>{
                newQuote(apiQuotes)
            },1000)
        } catch (error) {
            // Catch  Error Here
        }
    }

    function postTweetQuote() {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${Elquote.innerText} - ${Elauthor.innerText}`;
        window.open(twitterUrl, '_blank')
    }

    ElbtnNewQuote.addEventListener('click', getQuotes)
    ElbtnTwitter.addEventListener('click', postTweetQuote)
    
    getQuotes()
}())