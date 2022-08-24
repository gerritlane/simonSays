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
	let nextButton = Math.floor(Math.random() * 4) + 1;
	simonButtonHistory.push(nextButton);
}

// Add new button, play back all previously played buttons
async function playBackButtonHistory () {
	await sleep(1000);
	playerButtonHistory = [];
	chooseNextButton();
	let bLen = simonButtonHistory.length;
	// Loop through Simon's memory of played buttons
	for (let i = 0; i < bLen; i++) {
		await sleep(1000);
		// Play the button 
		$('div.button').each( function(index) {
			if (index === simonButtonHistory[i]) {
				buttonEffects($(this), index);
			};
		});
	};
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

function checkPlayedButtons() {
	// TODO: Check if the most recent button played matches the corresponding button in Simon's history
	if (playerButtonHistory.length > simonButtonHistory.length) {
		alert('Game Over');
		simonButtonHistory = [];
		playerButtonHistory = [];
		playBackButtonHistory();
	}
	else if (playerButtonHistory.length === simonButtonHistory.length && playerButtonHistory.every((value, index) => value === simonButtonHistory[index])) {
		playBackButtonHistory();
	}
};

// Reset button animation
$("body").on( "webkitAnimationEnd oanimationend msAnimationEnd animationend",
	function(e) {
		$(e.target).removeClass("pressed");
	}
);

function playAudio (audioFile) {
	// Harcoded link due to github pages filesystem structure
	let audio = new Audio(`./audio/${audioFile}`);
	audio.play();
};

// Temp code for debugging
$('button.start-game').click( function() {
	playBackButtonHistory();
});