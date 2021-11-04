// TODO hér vantar að sækja viðeigandi föll úr öðrum modules
import { show, createButtons, updateResultScreen } from './lib/ui.js';
import { checkGame, computerPlay} from './lib/rock-paper-scissors.js';
import { el } from './lib/helpers.js';
/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
 export const MAX_BEST_OF = 10;

/** Fjöldi leikja sem á að spila í núverandi umferð */
let totalRounds;

/** Númer umferðar í núverandi umferð */
let currentRound = 1;

/** Sigrar spilara í núverandi umferð */
let playerWins = 0;

/** Töp spilara í núverandi umferð */
let computerWins = 0;

/**
 * Fjöldi sigra spilara í öllum leikjum. Gætum reiknað útfrá `games` en til
 * einföldunar höldum við utan um sérstaklega.
 */
let totalWins = 0;

/**
 * Utanumhald um alla spilaða leiki, hver leikur er geymdur á forminu:
 *
 * ```
 * {
 *   player: 2,
 *   computer: 1,
 *   win: true,
 * }
 * ```
 */
const games = [];

/**
 * Uppfærir stöðu eftir að spilari hefur spilað.
 * Athugar hvort leik sé lokið, uppfærir stöðu skjá með `updateResultScreen`.
 * Birtir annað hvort `Næsti leikur` takka ef leik er lokið eða `Næsta umferð`
 * ef spila þarf fleiri leiki.
 *
 * @param {number} player Það sem spilari spilaði
 */
function playRound(player) {
  console.log(player)
  // Komumst að því hvað tölva spilaði og athugum stöðu leiks
  const computer = computerPlay().toString();
  const result = checkGame(player, computer);
  if (result === 1) {
    playerWins++;
  }
  if (result === -1) {
    computerWins++;
  }
  // Uppfærum result glugga áður en við sýnum, hér þarf að importa falli
  updateResultScreen({
    player: player.toString(),
    computer,
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  });
  if (result !== 0) {
    currentRound++;
  }
const done = (playerWins / totalRounds>0.5)||(computerWins / totalRounds > 0.5)
  // Uppfærum teljara ef ekki jafntefli, verðum að gera eftir að við setjum titil

const finishGamebutton = document.querySelector('.finishGame');
const nextRoundbutton = document.querySelector('.nextRound');
if (done) {
  finishGamebutton.classList.remove('hidden');
  nextRoundbutton.classList.add('hidden');
} else {
  finishGamebutton.classList.add('hidden');
  nextRoundbutton.classList.remove('hidden');
}
  // Ákveðum hvaða takka skuli sýna
  // Sýnum niðurstöðuskjá
  show('result')
}

/**
 * Fall sem bregst við því þegar smellt er á takka fyrir fjölda umferða
 * @param {Event} e Upplýsingar um atburð
 */
function round(e) {
  totalRounds = e.target.innerHTML
  show("play")
}

// Takki sem byrjar leik
document
  .querySelector('.start button')
  .addEventListener('click', () => show('rounds'))




// Búum til takka
createButtons(MAX_BEST_OF, round);
document
  .querySelector('button.rock')
  .addEventListener('click', () => playRound('3'))
document
  .querySelector('button.paper')
  .addEventListener('click', () => playRound('2'))
document
  .querySelector('button.scissor')
  .addEventListener('click', () => playRound('1'))
// Event listeners fyrir skæri, blað, steinn takka
// TODO


/**
 * Uppfærir stöðu yfir alla spilaða leiki þegar leik lýkur.
 * Gerir tilbúið þannig að hægt sé að spila annan leik í framhaldinu.
 */
function finishGame() {
  games.push({
    player: playerWins,
    computer: computerWins,
    win: playerWins>computerWins,
  })
  // Bætum við nýjasta leik
  if (playerWins>computerWins) {
    totalWins++;
  }
  // Uppfærum stöðu

const gamesPlayed = document.querySelector('.games__played').textContent = games.length;
const gamesWins = document.querySelector('.games__wins').textContent = (totalWins.toString());
const gamesLosses = document.querySelector('.games__losses').textContent = games.length-totalWins;
const gamesWinRatio = (gamesWins/gamesPlayed) * 100;
const gamesLossRatio = (gamesLosses/gamesPlayed) * 100;
document.querySelector('.games__winratio').textContent = gamesWinRatio.toFixed(2);
document.querySelector('.games__lossratio').textContent = gamesLossRatio.toFixed(2);
  // Bætum leik við lista af spiluðum leikjum
let resultText = '';
if (playerWins>computerWins) {
  resultText = `Þú vannst ${playerWins}-${computerWins}`; 
}
else {
  resultText = `Þú tapaðir ${playerWins}-${computerWins}`; 
}
document.querySelector('.games__list').appendChild(el('li',resultText));
  // Núllstillum breytur
playerWins=0;
computerWins=0;
currentRound=1;
  // Byrjum nýjan leik!
show('start')
}

// Næsta umferð og ljúka leik takkar
document.querySelector('button.finishGame').addEventListener('click', finishGame);
// TODO takki sem fer með í næstu umferð
document.querySelector('button.nextRound').addEventListener('click', () => show('play'));
