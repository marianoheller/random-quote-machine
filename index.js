
const quotes = [];
const cantQuotesRequest = 10;
const minCantQuotes = 8;
let flagPublishQuote = true;

$(document).ready(function(){

    getQuotes();

    $("#button-quote").click( function() {
        flagPublishQuote = true;
        publishQuote();
        if ( quotes.length < minCantQuotes) {   getQuotes();   }
        
    });

    $("#twitter-share-button").click( function() {
        const quote = $("#quote").html();
        const author = $("#author").html();
        `http://twitter.com/share?text=${quote}&url=${author}&hashtags=RandomQuoteMachine,FreeCodeCamp`

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
    $("#quote").html( quote );
    $("#author").html( author );
    flagPublishQuote = false;
}