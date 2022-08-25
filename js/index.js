//	TO-DO:	Add game-over sound and correct guess sound
//  TO-DO:	Rename variables for legibility

// List of sounds for buttons. # of buttons should match # of audio files
const audioFileList = [
	'beep_1.wav',
	'beep_2.wav',
	'beep_3.wav',
	'beep_4.wav',
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

let simonButtonHistory = [];
let playerButtonHistory = [];

function chooseNextButton () {
	// Choose next button
	let nextButton = Math.floor(Math.random() * 4);
	simonButtonHistory.push(nextButton);
}

// Add new button, play back all previously played buttons
async function simonsTurn () {

	await sleep(600);
	$('.score').removeClass('correct');
	$('.score').removeClass('wrong');
	playerButtonHistory = []; // New turn implied, clear player history
	
	chooseNextButton();
	let simonCount = simonButtonHistory.length;

	// Loop through Simon's memory of played buttons
	for (let i = 0; i < simonCount; i++) {
		await sleep(1000);
		// Play the button 
		$('div.button').each( function(index) {
			if (index === simonButtonHistory[i]) {
				buttonEffects($(this), index);
			};
		});
	};
	$('.score').text(`${simonCount}`);
};

// Add on-click to buttons
$('div.button').each( function(index) {
	$(this).click( function() {
		buttonEffects($(this), index);
		playerButtonHistory.push(index);
		checkPlayedButtons();
	});
});

function buttonEffects(button, buttonIndex) {
	playAudio(audioFileList[buttonIndex]);
	button.addClass("pressed");
};

async function checkPlayedButtons() {
	// TODO: Check if the most recent button played matches the corresponding button in Simon's history
	await sleep(400);
	let playerCount = playerButtonHistory.length;
	let simonCount = simonButtonHistory.length;
	if (playerCount > simonCount) {
		playAudio('wrong.wav');
		$('.score').addClass('wrong');
		newGame();
	}
	else if (playerCount === simonCount && playerButtonHistory.every((value, index) => value === simonButtonHistory[index])) {
		playAudio('correct.wav');
		$('.score').addClass('correct');
		simonsTurn();
	}
};

// Reset button animation
$('body').on( 'webkitAnimationEnd oanimationend msAnimationEnd animationend',
	function(e) {
		$(e.target).removeClass('pressed');
	}
);

function playAudio (audioFile) {
	// Harcoded link due to github pages filesystem structure
	let audio = new Audio(`./audio/${audioFile}`);
	audio.play();
};

// Temp code for debugging
$('button.start-game').click( function() {
	newGame();
});

function newGame () {
	simonButtonHistory = [];
	playerButtonHistory = [];
	$('.score').text('0');
	$('.score').removeClass('correct');
	simonsTurn();
}