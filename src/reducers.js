import { actions, directions, size } from './constants'
import store from './store'
import { move } from './actions'
import initialState from './initialState'

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export const state = (state = initialState, action) => {
    switch (action.type) {
        case actions.MOVE:
            let s = snake(state.snake, action)
            const newBlock = s[s.length - 1]
            let isGameOver = state.isGameOver || s.slice(0, s.length - 1).find((v) => v.x === newBlock.x && v.y === newBlock.y) !== undefined
            if (isGameOver) {
                s[s.length - 1].isBroken = true
            }
            let newFoodX = { ...state.food }
            if (newBlock.x === state.food.x && newBlock.y === state.food.y) {
                s = [state.snake[0], ...s]
                while (s.find((v) => v.x === newFoodX.x && v.y === newFoodX.y)) {
                    newFoodX = {
                        x: getRndInteger(0, size.X),
                        y: getRndInteger(0, size.Y)
                    }
                }
            }
            return {
                ...state,
                snake: s,
                food: newFoodX,
                isGameOver: isGameOver,
                highScore: Math.max(state.highScore, s.length)
            }
        case actions.SET_DIRECTION: {
            return {
                ...state,
                direction: direction(state.direction, action)
            }
        }
        case actions.RESTART: { 
            return {
                ...initialState,
                highScore: state.highScore
            }
        }
        default: return state
    }
}

export const direction = (state, action) => {
    switch (action.type) {
        case actions.SET_DIRECTION: {
            switch (action.direction) {
                case directions.DOWN:
                    if (state !== directions.UP) {
                        return action.direction
                    }
                    return state
                case directions.UP:
                    if (state !== directions.DOWN) {
                        return action.direction
                    }
                    return state
                case directions.LEFT:
                    if (state !== directions.RIGTH) {
                        return action.direction
                    }
                    return state
                case directions.RIGTH:
                    if (state !== directions.LEFT) {
                        return action.direction
                    }
                    return state
                default: return state
            }
        }
        default: return state
    }
}

export const food = (state, action) => {
    switch(action.type) {
        case actions.MOVE_FOOD: 
            return state
        default: return state
    }
}

export const snake = (state, action) => {
    switch (action.type) {
        case actions.MOVE: {
            let moveX = 0, moveY = 0;
            switch (action.direction) {
                case directions.DOWN:
                    moveY++;
                    break
                case directions.RIGTH: 
                    moveX++;
                    break
                case directions.LEFT: 
                    moveX--;
                    break
                case directions.UP: 
                    moveY--;
                    break
                default: break
            }
            let newBlock = {
                x: (state[state.length - 1].x + moveX) < 0 ? size.X - 1 : (state[state.length - 1].x + moveX) % size.X,
                y: (state[state.length - 1].y + moveY) < 0 ? size.Y - 1 : (state[state.length - 1].y + moveY) % size.Y
            }
            return state.concat(newBlock).slice(1, state.length + 1) 
        }
        default: return state
    }
}