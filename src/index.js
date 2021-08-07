import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//class Square extends React.Component {      
// constructor(props) {                                                     /* Constructor for square to store current value. ('remember' it was clicked.) ***constructor in Square commented out because Square no longer keeps track of the game's state.*** */
//     super(props);
//     this.state = {
//        value: null,
//     };                                   
// }

//render() {
//    return (
//        <button
//            className="square"
//            onClick={() =>                                                // Tells React to set up click event listener. When the button is clicked, React will call the onClick event handler that is defined in the Square's render method.    
//                this.props.onClick()}                                     // This event handler calls this.props.onClick(). Which was specified by the Board on line 39.
//        >
//            {this.props.value}
//        </button>
//    );                                                                    // Passing {this.props.value} in <button> body shows index value in each square. onClick attribute with {() => alert('click')} shows an alert with message when square is clicked. 
//}                                                                         // Passing {this.state.value} in <button> body shows current state in each square. onClick attribute with {() => this.setState({value: 'X'})} shows an 'X' inide of square when clicked.
//}


function Square(props) {                                                    // This Square function component replaces the Square class component. Function components only have a render method and do not have their own state.                
    return (                                                                // Square function takes props as an input and returns what should be rendered instead of having to define a class which extends React.Component. (continued on lines 36-42.)
        <button className="square"                                          // onClick={() => this.props.onClick()} from the Square class component is changed to onClick={props.onClick} and {this.props.value} is changed to {props.value}.
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

                                                                            // State is now stored in the Board component instead of the individual Square components. Changes in Board's state will cause the Square components to automatically re-render. 
                                                                            // Keeping all the squares state in the Board's component is how a winner will be determined in the future.
                                                                            // Since the Square components no longer maintain state, the Square components receive values from the Board component and let the Board component know when they are clicked. The Square components are now controlled components.
                                                                            // Board is basically telling Square, "When I click you, let me know."
                                                                            // In handleClick we call .slice() to make a copy of the squares array to modify instead of the original array. Modifying the copies instead of original array will allow us to keep track of them and reuse them later. 
                                                                            // These immutable objects are easier to detect when they change. If the object being referenced is different then the previous, then the object has changed. 
                                                                            // Main benefit is that it helps build pure components. Easy change detection helps determine when a component requires re-rendering.

class Board extends React.Component {
    //constructor(props) {                                                  // constructor commented out so we can lift state from Board and into the top-class Game component. This is done to keep history in Game component to call moves back later.
    //    super(props);
    //    this.state = {
    //        squares: Array(9).fill(null),                                 // Declares shared state of child components. Sets Board's initial state to contain an array of 9 nulls, one for each square.
    //        xIsNext: true,                                                // Sets first move to 'X' by default.         
    //    };
    //}

                                                                              // Handle click commented out when moved to Game component.  
    //handleClick(i) {                                                        // This handleClick method defines what handleClick will do in onClick={() => this.handleClick(i)} in the renderSquare method below.
    //    const squares =
    //        this.state.squares.slice();                                     // .slice() makes a copy of the squares array to modify instead of modifying the original array.
    //    if (calculateWinner(squares) || squares[i]) {                       // returns early by ignoring a click if someone has already won or the square is already filled.
    //        return;
    //    }
    //    squares[i] = this.state.xIsNext ? 'X' : 'O';                        // If this.state.xIsNext is true then it's 'X's turn. If this.state.xIsNext is false then it is 'O's turn.                     
    //    this.setState({
    //        squares: squares,                                               // *** Need help with what this is ***
    //        xIsNext: !this.state.xIsNext,                                   // *** Need help with what this is ***
    //    });
    //}

    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() =>                                              // onClick={() => value={i}} gives each square a value based on index (0-8). Once the Board constructor is made 'X' will not appear onClick with value={i}.
                    this.props.onClick(i)} />                               // Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick() when a square is clicked.
        );                                                                  // The DOM <button> element's onClick attribute has a special meaning to React because it is a built in component. 
    }                                                                       // We could give any name to the Square's onClick prop or Board's handleClick method. (on[Event], handle[Event]).
                                                                            // We must pass value={this.state.squares[i]}. Each square will now recieve a value prop that will be either 'X', 'O', or null for empty squares. 
                                                                            // onClick is a function passed down from Board to Square. Square will call that function when a square is clicked. 
                                                                            // We are now passing down two props from Board to Square: value and onClick.*/

                                                                            // value={this.state.squares[i]} gets changed to value={this.props.squares[i]} and onClick={() => this.handleClick(i)} gets changed to onClick={() => this.props.onClick(i)} so that Board can receive props from the Game component.


                                                                            // *** Render method commented out after the game's status is rendered by the Game component. ***
    //render() {                                                              // Calling calculateWinner(squares) in Boards render function will check if a player has won.               
    //    const winner = calculateWinner(this.state.squares);                                                            
    //    let status;
    //    if (winner) {
    //        status = 'Winner: ' + winner;                                   // Displays text stating who winner is.
    //    } else {
    //        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');    // Displays text stating whos turn it is. 
    //    }

    render() {                                                                // <div className="status">{status}</div> commented out after the games status is render by the Game component.
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{                                                     // Allows us to remove the squares state from the child Board component. 
                squares: Array(9).fill(null)                                // Just like we "lifted" state from the Square component and gave it to the Board component, we are now lifting state from the Board component into the top-class Game component.
            }],
            stepNumber: 0,                                                  // Indicates the step we're currently viewing. 
            xIsNext: true,                                                  // Sets first move to 'X' by default.
        };
    }

    handleClick(i) {                                                        // This handleClick method defines what handleClick will do in onClick={() => this.handleClick(i)} in the renderSquare method below.
        const history = this.state.history.slice(0, this.state.stepNumber + 1);// If we go back to a certain move this ensures that all old history after is thrown away and new moves added.                                 // History of all moves.                       
        const current = history[history.length - 1];                        // Current move.
        const squares = current.squares.slice();                            // .slice() makes a copy of the squares array to modify instead of modifying the original array.
        if (calculateWinner(squares) || squares[i]) {                       // returns early by ignoring a click if someone has already won or the square is already filled.
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';                        // If this.state.xIsNext is true then it's 'X's turn. If this.state.xIsNext is false then it is 'O's turn.                     
        this.setState({
            history: history.concat([{
                squares: squares                                            // *** Need help with what this is ***
              }]),
              stepNumber: history.length,                                   // Updates step number to ensure we don't get stuck on showing the same move after a new one has been made.
            xIsNext: !this.state.xIsNext,                                   // *** Need help with what this is ***
        });
    }

    jumpTo(step) {                                                              // Updates state of stepNumber. Sets xIsNext to true if the step number is even. 
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }


    render() {                                                                      // This render function tells the Game component to use the most recent history entry to determine and display the game's status. 
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {                                 // Creates a <li> containing a <button> for each move in the game's history. <button> has on onClick handler that calls a method called this.jumpTo().
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
                <li clasName="moves" key={move}>
                    <button clasName="moves" onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
        <div className="container">
            <div className="game">
                <div className="game-board">
                    <Board
                    squares={current.squares}                                       // Game component is now rendering the game's status. Displays current history of each square on game board. onClick=onClick={(i) => this.handleClick(i)} calls the handleClick method. <div>{status}</> displays player turn and winner text to right of game board. <ol>{moves}</ol> displays move history to right of game board.
                    onClick={(i) => this.handleClick(i)} />                 
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol clasName="moves">{moves}</ol>
                </div>
            </div>
        </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);  

function calculateWinner(squares) {                                         // This helper function will check for a winner and return 'X', 'O', or null as appropriate.
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}