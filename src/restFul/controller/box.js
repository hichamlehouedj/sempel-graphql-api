import {Box} from "./../../models";

const getBox = () => {
    try {
        return Box.findAll()
    } catch (error) {
        return new Error(error)
    }
}

export {getBox} 