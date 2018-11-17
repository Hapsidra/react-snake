import React, { Component, Props } from 'react';
import './App.css';
import { size, directions } from '../constants'
import { connect } from 'react-redux'
import store from '../store'
import { restart, move, setDirection } from '../actions'



class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      let newDirection = directions.RIGTH
      switch(event.code) {
          case 'ArrowDown':
              newDirection = directions.DOWN
              break
          case 'ArrowLeft': 
              newDirection = directions.LEFT
              break
          case 'ArrowRight': 
              newDirection = directions.RIGTH
              break
          case 'ArrowUp': 
              newDirection = directions.UP
              break
          default: break
      }
      store.dispatch(setDirection(newDirection))
    })

    this.interval = setInterval(() => {
      store.dispatch(move(store.getState().direction))
    }, 150)

    store.subscribe(()=> {
      if (store.getState().isGameOver) {
        clearInterval(this.interval)
      }
    })
  }

  restart() {
    store.dispatch(restart())
    this.interval = setInterval(() => {
      store.dispatch(move(store.getState().direction))
    }, 150)
  }

  render() {
    const state = this.props.state
    const snake = state.snake
    if (state.isGameOver) {
      return <div className="gameOver">
        <h2>Game Over</h2>
        {snake.length >= state.highScore ? <p>new high score! {snake.length}</p> : <p>your score: {snake.length}, high score: {state.highScore}</p>}
        <button onClick={this.restart.bind(this)}>Play again</button>
      </div>
    }
    let a = new Array(size.X)
    for (let i = 0; i < size.X; i++) {
      a[i] = new Array(size.Y).fill('e')
    }
    for (let i = 0;i<this.props.state.snake.length; i++) {
      const b = snake[i];
      a[b.y][b.x] = 'c';
    }
    const food = this.props.state.food
    a[food.y][food.x] = 'f';

    return <div><span className="scorePanel"><p className="score">score: {snake.length}</p><p className="highScore">high score: {state.highScore}</p></span>
        {a.map((line, i) => 
        <p className="mapLine" key={i}>{line.map((block, j) => <b className={block} key={j}></b>)}</p>)}
        </div>
  }
}

export default connect(
  state => ({
    state: state
  })
)(App);
