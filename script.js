(function(){
    let apiQuotes = []
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

    function getRandomArbitrary(max) {
        return Math.floor(Math.random()  * max)
    }

    function newQuote() {
        const quoteItem = apiQuotes[getRandomArbitrary(apiQuotes.length)]

        Elquote.textContent = quoteItem.text ? quoteItem.text : 'Unknown'
        Elauthor.textContent = quoteItem.author ? quoteItem.author : 'Unknown'
        quoteItem.text.length > 50 ? Elquote.classList.add('long-quote') : Elquote.classList.remove('long-quote')

        complete() 
    }

    // get quotes from API
    async function getQuotes() {
        loading()
        
        const apiUrl  = 'https://type.fit/api/quotes'
        ElquoteContainer.classList.remove('hidde')
    
        try {
            const response = await fetch(apiUrl);
            apiQuotes = await response.json();
            setTimeout(()=>{
                newQuote()
            },1000)
        } catch (error) {
            // Catch  Error Here
        }
    }

    function postTweetQuote() {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${Elquote.innerText} - ${Elauthor.innerText}`;
        window.open(twitterUrl, '_blank')
    }

    ElbtnNewQuote.addEventListener('click', newQuote)
    ElbtnTwitter.addEventListener('click', postTweetQuote)
    
    getQuotes()
}())