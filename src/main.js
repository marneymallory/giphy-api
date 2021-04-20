import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// API URL template: api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&limit=1&q=searchterm
// start with a successful search for just one word

$(document).ready(function() {
  $('#search-submit-btn').click(function(event) {
    event.preventDefault();
    let searchTerms = $('#search-terms').val();
    let urlSearchTerms = `&q=${searchTerms}`;
    $('#search-terms').val("");
    let promise = new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      const url = `http://api.giphy.com/v1/gifs/search?&api_key=${process.env.API_KEY}&limit=1${urlSearchTerms}`;
      console.log(url);
      
      console.log(request);
      
      request.onload = function () {
        
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }  
      request.open("GET", url, true);
      request.send();
    });
    
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('#search-results').html("");
      $('#search-results').html(`<img src="${body.data[0].images.fixed_height.url}"> alt="${body.data[0].title}"`).show();
    },
    function (error){
      console.log(error);
    });
  });
    
  });
