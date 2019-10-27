import React, { Component } from 'react';
import { randomWord } from './words';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong: 6,
		images: [img0, img1, img2, img3, img4, img5, img6],
	};

	constructor(props) {
		super(props);
		this.state = {
			nWrong: 0,
			guessed: new Set(),
			answer: randomWord(),
		};
		this.handleGuess = this.handleGuess.bind(this);
	}

	reset = () => {
		this.setState({
			nWrong: 0,
			guessed: new Set(),
			answer: randomWord(),
		});
	};

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		let word = this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
		console.log(this.state.answer);
		return word;
	}

	/** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(evt) {
		let ltr = evt.target.value;
		this.setState(st => ({
			guessed: st.guessed.add(ltr),
			nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
		}));
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons() {
		return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
			<button key={ltr} value={ltr} onClick={this.handleGuess} disabled={this.state.guessed.has(ltr)}>
				{ltr}
			</button>
		));
	}

	/** render: render game */
	render() {
		let isOver = this.state.nWrong >= this.props.maxWrong;
		let isWinner = this.guessedWord().join('') === this.state.answer;
		let gameState = this.generateButtons();
		if (isWinner) gameState = <h2>You Win!</h2>;
		if (isOver) gameState = <h2>You lose!</h2>;
		return (
			<div className='Hangman'>
				<h1>Hangman</h1>
				<img
					src={this.props.images[this.state.nWrong]}
					alt={`${this.state.nWrong}/${this.props.maxWrong} wrong guesses`}
				/>
				<h3>Number wrong: {this.state.nWrong}</h3>
				<p className='Hangman-word'>{!isOver ? this.guessedWord() : this.state.answer}</p>
				<p className='Hangman-btns'>{gameState}</p>
				<button id='reset' onClick={this.reset}>
					Restart
				</button>
			</div>
		);
	}
}

export default Hangman;
