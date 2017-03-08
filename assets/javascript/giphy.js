$(document).ready(function(){

	var emos = ['sad', 'happy', 'awkward'];

	function displayEmoGiphys(button, i){ 

		var emote = $(button).attr('data-name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emote + "&api_key=dc6zaTOxFJmzC&limit=6";
		
		$.ajax({url: queryURL, method: 'GET'})

		.done(function(response) {

			var emoDiv = $('<div class="emo">');

			var rating = response.data[i].rating;

			var p_rating = $('<p>').text( "Rating: " + rating);

			emoDiv.append(p_rating);


			var emoImage = $("<img>");
			
			//STORING SOURCE URL'S IN THE EMOIMAGE OBJECT
            emoImage.staticUrl = response.data[i].images.original_still.url; 
			emoImage.animatedUrl = response.data[i].images.original.url;
			emoImage.isAnimated = false;
			
			emoImage.attr('src', emoImage.staticUrl);
			emoImage.attr('alt', 'emo image');
			emoImage.css('width', '200px')
			//emoImage.css('float: left')
			emoImage.on('click', function(){imageClicked(emoImage);}); 
			
			emoDiv.append(emoImage);
			$('#emoView').prepend(p_rating);
			$('#emoView').prepend(emoImage);
			
		});

	}

	function displayMultipleEmoGiphys(){
		for (var i=0; i < 9; i++){
			displayEmoGiphys(this, i) 
		}
	}

	function renderButtons(){ 

		$('#buttonsView').empty();

		
		for (var i = 0; i < emos.length; i++){

		    var a = $('<button>') 
		    a.addClass('emote'); 
		    a.attr('data-name', emos[i]); 
		    a.text(emos[i]); 
		    $('#buttonsView').append(a); 
		}
	}

	 

	$('#addEmo').on('click', function(){

		var emote = $('#emo-input').val().trim();

		emos.push(emote);
		
		renderButtons();

		return false;
	});

	
	$(document).on('click', '.emote', displayMultipleEmoGiphys);

	renderButtons();



	function imageClicked(image) { 
		if(image.isAnimated) { 
			image.attr('src',image.staticUrl);
			image.isAnimated = false;
		}
		else {
			image.attr('src',image.animatedUrl); 
			image.isAnimated = true;
		}
		
	
	}
});
