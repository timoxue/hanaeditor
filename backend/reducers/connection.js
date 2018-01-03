import * as actionTypes from '../constant/connection'

const initialState = []

export default function connectionsInfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.CONNECTION_UPDATE:
            return action.data
        case actionTypes.CONNECTION_ADD:
            state.unshift(action.data)
            return state
        case actionTypes.CONNECTION_RM:
            return state.filter(item => {
                if(item.id !== action.data.id) {
                    return item
                }
            })
        default:
            return state
    }
}