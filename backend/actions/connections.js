import * as actionTypes from '../constant/connection'

export function update(data) {
    return {
        type: actionTypes.CONNECTION_UPDATE,
        data
    }
}

export function add(item) {
    return {
        type: actionTypes.CONNECTION_ADD,
        data: item
    }
}

export function rm(item) {
    return {
        type: actionTypes.CONNECTION_RM,
        data: item
    }
}