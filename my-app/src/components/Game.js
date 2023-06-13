import React, { useState } from 'react';
import { Board } from './Board';
import './Game.css';
import { calculateWinner } from '../logics';
import PropTypes from 'prop-types';
export const Game = () => {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);
	const winner = calculateWinner(board);
	const isBoardFull = board.every((square) => square !== null);

	const handleClick = (index) => {
		const boardCopy = [...board];
		if (winner || boardCopy[index]) return;
		boardCopy[index] = xIsNext ? 'X' : 'O';
		setBoard(boardCopy);
		setXIsNext(!xIsNext);
	};

	const startNewGame = () => {
		return (
			<button className="start" onClick={() => setBoard(Array(9).fill(null))}>
				Начать заново
			</button>
		);
	};

	return (
		<React.StrictMode>
			<div className="wrapper">
				{startNewGame()}
				<Board squares={board} click={handleClick} />
				<p className="info">
					{winner
						? 'Победитель ' + winner
						: isBoardFull
						? 'Ничья'
						: 'Сейчас очередь ' + [xIsNext ? 'X' : 'O']}
				</p>
			</div>
		</React.StrictMode>
	);
};
Game.propTypes = {
	squares: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
	click: PropTypes.func.isRequired,
	winner: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	isBoardFull: PropTypes.bool.isRequired,
	startNewGame: PropTypes.func.isRequired,
};
