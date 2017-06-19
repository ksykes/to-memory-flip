var cardPair = [];
var counter = 0;
var numOfPairs = 0;
var time = 0;
var intervalCleared = false;
$ (function(){
	// this sets up the time function
	function timeSetup(cb) {
		var seconds = Math.floor(time % 60);
		seconds = ("0" + seconds).slice(-2);
		var minutes = Math.floor(time / 60) % 60;
		minutes = ("0" + minutes).slice(-2);
		$('.seconds .digit').html(seconds);
		$('.minutes .digit').html(minutes);
		if( cb !== undefined) {
			cb();
		}
		time -= 1;
	}
	// this calls the function and sets the initial time (00:00)
	// timeSetup();
	// create array of cards
	var cardArray = [
		{
			img: "assets/drake.svg",
			caption: "Drake",
			dataAttribute: "a"
		},
		{
			img: "assets/drake.svg",
			caption: "Drake",
			dataAttribute: "a"
		},
		{
			img: "assets/raccoon.svg",
			caption: "trash panda",
			dataAttribute: "b"
		},
		{
			img: "assets/raccoon.svg",
			caption: "trash panda",
			dataAttribute: "b"
		},
		{
			img: "assets/streetcar.svg",
			caption: "broken streetcar",
			dataAttribute: "c"
		},
		{
			img: "assets/streetcar.svg",
			caption: "broken streetcar",
			dataAttribute: "c"
		},
		{
			img: "assets/capybara.svg",
			caption: "High Park capybara",
			dataAttribute: "d"
		},
		{
			img: "assets/capybara.svg",
			caption: "High Park capybara",
			dataAttribute: "d"
		},
		{
			img: "assets/bike.svg",
			caption: "scavenged bike frame",
			dataAttribute: "e"
		},
		{
			img: "assets/bike.svg",
			caption: "scavenged bike frame",
			dataAttribute: "e"
		},
		{
			img: "assets/beer.svg",
			caption: "park beers",
			dataAttribute: "f"
		},
		{
			img: "assets/beer.svg",
			caption: "park beers",
			dataAttribute: "f"
		},
		{
			img: "assets/jay.svg",
			caption: "beisbol birds",
			dataAttribute: "g"
		},
		{
			img: "assets/jay.svg",
			caption: "beisbol birds",
			dataAttribute: "g"
		},
		{
			img: "assets/durian.svg",
			caption: "mysterious Chinatown fruit",
			dataAttribute: "h"
		},
		{
			img: "assets/durian.svg",
			caption: "mysterious Chinatown fruit",
			dataAttribute: "h"
		},
		{
			img: "assets/nachos.svg",
			caption: "Sneaky Dees nachos",
			dataAttribute: "i"
		},
		{
			img: "assets/nachos.svg",
			caption: "Sneaky Dees nachos",
			dataAttribute: "i"
		},
		{
			img: "assets/bible.svg",
			caption: "Dundas Square preacher",
			dataAttribute: "j"
		},
		{
			img: "assets/bible.svg",
			caption: "Dundas Square preacher",
			dataAttribute: "j"
		}

	];

	// use _.shuffle to shuffle the array
	var shuffledArray = _.shuffle(cardArray);
	// forEach over the array of shuffled cards
	shuffledArray.forEach(function (arrayItem){
		// using jquery dynamically generate the whole li
		$("ul").append(`<li class="card" data-cardnum="${arrayItem.dataAttribute}"><div class="flip-container"><div class="flip back"><img src="${arrayItem.img}"><p class="caption tk-museo-sa">${arrayItem.caption}</p></div><div class="flip front"></div></div></li>`);
	});
	// because you've just created the li's, use event delegation in your click listener below to listen for the eventual list

// User selects a card - that card flips over. User selects a second card - that card flips over.
	$("ul").on("click", "li", function(){

		var $flipContainer = $(this).children('.flip-container');
		// Find child of .card with class .flip-container
		// Add class of flipped
		if ($flipContainer.hasClass('flipped') === false) {
			counter = counter + 1;
			var cardNumber = $(this).data('cardnum');
			cardPair.push(cardNumber);

			$flipContainer.addClass("flipped");
			if (counter === 2){
				if (cardPair[0] === cardPair[1]){
					// If they match, increase numOfPairs by 1
					numOfPairs = numOfPairs + 1;
					$(`li[data-cardnum=${cardNumber}]`).addClass("matched");
					cardPair = [];
					counter = 0;
				} else {
					// if the cards don't match, have them flip back over
					setTimeout(function() {
						$(".flip-container").removeClass("flipped");
					}, 500);
					cardPair = [];
					counter = 0;
				}
			}
		}
	});


	// upon clicking the play button, timer is set to 1:30sec
	$(".play-btn").on("click", function() {
		time=10;
		numOfPairs = 0;

		$("li").removeClass("matched");
		$(".flipped").removeClass('flipped');

		countdown = window.setInterval(function() {
			timeSetup(function(){
				if (time === 0 && numOfPairs !== 10) {
					clearInterval(countdown);
					intervalCleared = true;
					$("li").removeClass("matched");
					setTimeout(function() {
						// alert("You lose!")
						swal("You must be from out of town.")
					},0);
					numOfPairs = 0;
				}
			// if pairs = 10, you win alert
				if (numOfPairs === 10) {
					clearInterval(countdown);
					intervalCleared = true;
					setTimeout(function() {
						// alert("You won!")
						swal("Way to go!")
					},0);
					numOfPairs = 0;
					// if time = 0 and pairs do not = 10, you lose alert
				}
			});

		},1000);
	})

	// add click to image credits
	$('.fa-hand-o-up').on('click', function() {
		$(this).toggleClass('iconTransform');
		$('.artists').toggleClass('artistsDisplay');
	})

}); // end of doc ready
