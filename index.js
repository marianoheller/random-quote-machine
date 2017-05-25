
$(document).ready(function(){
    /*
    $("#button-quote").click( function(){
        getQuote();
    });
*/

    $('#button-quote').on('click', function(e) {
        e.preventDefault();
        $.ajax( {
        url: '/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data) {
            var post = data.shift(); // The data is an array of posts. Grab the first one.
            $('#quote-title').text(post.title);
            $('#quote-content').html(post.content);

            // If the Source is available, use it. Otherwise hide it.
            if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
            $('#quote-source').html('Source:' + post.custom_meta.Source);
            } else {
            $('#quote-source').text('');
            }
        },
        cache: false
        });
    });
});


function getQuote() {

    const corsUrl = "https://crossorigin.me/"
    const baseUrl = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

    //const requestUrl = `${baseUrl}?method=${method}&format=${format}&lang=${lang}`;

    axios.get( baseUrl , {
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}