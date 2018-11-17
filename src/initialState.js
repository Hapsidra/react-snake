import { directions } from './constants'

const initialSnake = [
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
    { x: 13, y: 10 }
]

const initialFood = { x: 3, y: 4 }

const initialState = { snake: initialSnake, direction: directions.RIGTH, food: initialFood, isGameOver: false, highScore: initialSnake.length  }

export default initialState