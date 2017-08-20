
const quotes = [];
const cantQuotesRequest = 10;
const minCantQuotes = 8;
let flagPublishQuote = true;

$(document).ready(function(){

    getQuotes();

    $("#new-quote").click( function() {
        flagPublishQuote = true;
        publishQuote();
        if ( quotes.length < minCantQuotes) {   getQuotes();   }
        
    });

    $("#tweet-quote").click( function() {
        const quote = $("#text").html();
        const author = $("#author").html();
        const targetUrl = `http://twitter.com/share?text=${quote}&url=${author}&hashtags=RandomQuoteMachine,FreeCodeCamp`;
        //window.location.href = targetUrl;
        var win = window.open( targetUrl, '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
        }
    });


});

function getQuotes() {

    const baseUrl = `https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=${cantQuotesRequest}`;

    axios.get( baseUrl , {
        headers: {
            'X-Mashape-Key': "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
            'Content-Type': "application/x-www-form-urlencoded",
            'Accept': "application/json"
        },
        
    })
    .then(function (response) {
        pushQuotes(response );
        publishQuote();
    })
    .catch(function (error) {
        console.log(error);
        throw Error(error);
    });
}


function pushQuotes( response ) {
    const { data } = response;
    data.forEach( (singleQuote) => {
        quotes.push(singleQuote);
    });
} 

function publishQuote() {
    if ( !flagPublishQuote ) {   return;   }
    if ( !quotes ) {   return;   }
    const { quote, author } = quotes.shift()
    $("#text").html( quote );
    $("#author").html( author );
    flagPublishQuote = false;
}