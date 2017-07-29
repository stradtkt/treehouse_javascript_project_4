(function() {
	'use strict';
	var player1 = $('#player1');
	var player2 = $('#player2');
	var winner = '';


	//adding the start and end screens so the players can begin and at the end start a new game
	var startEnd = {
		// for the start screen
		//has the classes necessary to pop up the correct images for the beginning and end of the game
		start: "<div class='screen screen-start' id='start'><header><h1>Tic Tac Toe</h1>" + 
			   "<a href='#' class='button'>Play Game</a><br></header></div>",
		end: "<div class='screen screen-win' id='finish'><header><h1>Tic Tac Toe</h1>" + 
    		 "<p class='message'></p><a href='#' class='button'>New game</a></header></div>"
	}
	//appending the start and end screens to the body
	$('body').append(startEnd.start);
	$('body').append(startEnd.end);
	//hide the two so they appear at certain times
	$('#start, #finish').hide();
})();


	(function() {
		//show the start page
		$('#start').show();
		//when clicking the button on the start page
		$('.button').click(function() {
			//hide the start and the end page
			$('#start, #finish').hide();
			//show the board for the game
			$('#board').show();
			//each is iterating through the items with the class box-filled-1 and box-filled-2 and removing the class
			$('.box').each(function() {
				//setting the background image to none
				this.style.backgroundImage = "none";
				//removing the class for box-filled-1
				$(this).removeClass('box-filled-1');
				//removing the class for box-filled-2
				$(this).removeClass('box-filled-2');
			});
			
		$('li.players').removeClass('active');
		//setting person to the ul li tags in the html, storing the amount of turns
		var person = $('ul li');
		//getting the randomPlayer for the random number
		var randomPlayer = Math.floor(Math.random() * 2);
		//using the randomPlayer variable get the remaining amount the final product is if its player1 turn first or player2 turn first
		person.eq(randomPlayer % person.length).addClass('active');
			playGame();
		});
	})();


		//Appending players name to the page by what the user gives us
		//create buttonPrompt and attach it to the start screen button listen for a click
		var buttonPrompt = document.querySelector('.button').addEventListener('click', function() {
			//creating the function for as name that holds all the functionality
			var askName = function() {
				//name and secondName are the names for the players, name first and then secondName second
				var name = prompt("What is your name?", name);
				var secondName = prompt("Next players name?", secondName);
				//appending the two names and displaying it on their sides
				$('#player1-name').append(name);
				$('#player2-name').append(secondName);
			};
			//call the askName function with the name variable inside
			askName(name);
			return buttonPrompt;
		});



	var playGame = function() {
		//iterate over all the boxes on the board
		$('.box').each(function() {
		//when the mouse enters the square it would change to the appropriate background
		$(this).mouseenter(function() {
			//if the player one is active then put the o image else if is not active use the x image
			if($(player1).hasClass('active')) {
				this.style.backgroundImage = "url('img/o.svg')";
			} else {
				this.style.backgroundImage = "url('img/x.svg')";
			}
		});
		//when the mouse leaves the square erase the background image and give a background image of none
		$(this).mouseleave(function() {
			this.style.backgroundImage = "none";
		});
	});
	$('.box').click(function() {
		if($(player1).hasClass('active')) {
			//when the player1 has the active class check to see what class it has whether it is box-filled-1 or box-filled-2
			if($(this).hasClass('box-filled-1') === false && $(this).hasClass('box-filled-2') === false) {
				//adds the class of box-filled-1
				$(this).addClass('box-filled-1');
				//gives the square a background image
				this.style.backgroundImage = "url('img/o.svg')";
				//unbinds the mouse events from the user
				$(this).unbind('mouseenter mouseleave');
				checkWin();
				nextTurn();	
			}
		} else if($('#player2').hasClass('active')) {
			//checking to see whether there is a class on the box
			if($(this).hasClass('box-filled-1') === false && $(this).hasClass('box-filled-2') === false) {
				//gives player2 the active class
				$(this).addClass('box-filled-2');
				//gives it the background image of x
				this.style.backgroundImage = "url(img/x.svg)";
				//unbinds the mouse events
				$(this).unbind('mouseenter mouseleave');
				checkWin();
				nextTurn();
			}
		} else {
			console.log('You have no more turns');
		}
		});
	};




	var nextTurn = function() {
		//when it is the next turn if player1 is active remove the class and then add the active class to player2
		if($(player1).hasClass('active')) {
			$(player1).removeClass('active');
			$(player2).addClass('active');
		} else {
			//else remove the class on player 2 and then add the class of active to player1
			$(player2).removeClass('active');
			$(player1).addClass('active');
		}
	};


	var checkWin = function() {

		var win = [];
		//Loop over boxes and add currently placed piece
		$('.box').each(function(){
			//when box-filled-1 for player 1 it goes to the win array and pushes on a result that credits player1
			if ($(this).hasClass('box-filled-1')) {
				win.push("player1");
			//this is the same for player2
			} else if ($(this).hasClass('box-filled-2')) {
				win.push("player2");
			} else {
				win.push("empty");
			}
		});	
		//these are the winning possibilities for player 1 and player 2, when one of the players hits a combination they are made the winners
		if (win[0] !== "empty" && win[0] === win[1] && win[1] === win[2]) {
				winner = win[0];
				showWinner();
				//calls the function of showWinner to display the winner
			} else if (win[3] !== "empty" && win[3] === win[4] && win[4] === win[5]) {
				winner = win[3];
				showWinner();
			} else if (win[6] !== "empty" && win[6] === win[7] && win[7] === win[8]) {
				winner = win[6];
				showWinner();
			} else if (win[0] !== "empty" && win[0] === win[3] && win[3] === win[6]) {
				winner = win[0];
				showWinner();
			} else if (win[1] !== "empty" && win[1] === win[4] && win[4] === win[7]) {
				winner = win[1];
				showWinner();
			} else if (win[2] !== "empty" && win[2] === win[5] && win[5] === win[8]) {
				winner = win[2];
				showWinner();
			} else if (win[0] !== "empty" && win[0] === win[4] && win[4] === win[8]) {
				winner = win[0];
				showWinner();
			} else if (win[2] !== "empty" && win[2] === win[4] && win[4] === win[6]) {
				winner = win[2];
				showWinner();
			} else if (win.includes("empty") === false){
				winner = "Tie Game";
				showWinner();
			}
		console.log(win);
		
	};

	var showWinner = function() {
		if (winner === "player1") {
			//if player1 wins remove the class for the player2 win
			$("#finish").removeClass("screen-win-two");
			//removing the class from the tie if both players tie
			$("#finish").removeClass("screen-win-tie");
			//text for the player 1 victory
			$(".message").html("Player 1 wins!");
			//add the winner class to the player1
			$("#finish").addClass("screen-win-one");
			//show the finish screen
			$("#finish").show();
			//hide the board to show the winner 
			$("#board").hide();
		} else if (winner === "player2") {
			//removing the class off of a player1 victory
			$("#finish").removeClass("screen-win-one");
			//removing the tie screen
			$("#finish").removeClass("screen-win-tie");
			//showing text stating that player2 won the game
			$(".message").html("Player 2 wins!");
			//shows the winner screen for player2
			$("#finish").addClass("screen-win-two");
			//shows the finish screen
			$("#finish").show();
			//hides the board
			$("#board").hide();
		} else if (winner === "Tie Game") {
			//removing the class for a player1 win
			$("#finish").removeClass("screen-win-one");
			//removing the class for a player2 win
			$("#finish").removeClass("screen-win-two");
			//showing the text to the screen to show that the 2 players tied
			$(".message").html("It's a Tie!");
			//shows the screen for the two players tie
			$("#finish").addClass("screen-win-tie");
			//show the finish board
			$("#finish").show();
			//hide the board for the game
			$("#board").hide();
		}
	};










