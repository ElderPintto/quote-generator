(function(){
    const ElContainer = document.querySelector('#container')
    const Elloader = document.querySelector('#loader')
    const Elquote = document.querySelector('#quote')
    const Elauthor = document.querySelector('#author')
    const ElbtnNewQuote = document.querySelector('#new-quote')
    const ElbtnTwitter = document.querySelector('#twitter')

    let outLoop = 10

    function showLoadingSpinner() {
        Elloader.hidden = false;
        ElContainer.hidden = true;
    }

    function removeLoadSpinner() {
        ElContainer.hidden = false;
        Elloader.hidden = true;
    }

    function newQuote(quoteItem) {
        Elquote.textContent = quoteItem.quoteText ? quoteItem.quoteText : 'Unknown'
        Elauthor.textContent = quoteItem.quoteAuthor ? quoteItem.quoteAuthor : 'Unknown'
        quoteItem.quoteText.length > 120 ? Elquote.classList.add('long-quote') : Elquote.classList.remove('long-quote')

        removeLoadSpinner() 
    }

    // get quotes from API
    async function getQuote() {
        showLoadingSpinner()
        ElbtnTwitter.hidden = false
        const proxyUrl = 'https://warm-everglades-01381.herokuapp.com/';
        const apiUrl =
          'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
        try {
            const response = await fetch(proxyUrl + apiUrl);
            apiQuotes = await response.json();
            newQuote(apiQuotes)
        } catch (error) {
            // Catch  Error Here
            console.log(error)
            outLoop--
            
            if(!outLoop) {
                removeLoadSpinner() 
                Elquote.textContent = "Error!   :("
                ElbtnTwitter.hidden = true
                return
            }
            getQuote()
        }
    }

    function postTweetQuote() {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${Elquote.innerText} - ${Elauthor.innerText}`;
        window.open(twitterUrl, '_blank')
    }

    ElbtnNewQuote.addEventListener('click', getQuote)
    ElbtnTwitter.addEventListener('click', postTweetQuote)
    
    getQuote()
}())