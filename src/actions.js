import {actions} from './constants'

export const move = (direction) => ({
    type: actions.MOVE,
    direction: direction
})

export const setDirection = (direction) => ({
    type: actions.SET_DIRECTION,
    direction: direction
})

export const restart = () => ({
    type: actions.RESTART
})