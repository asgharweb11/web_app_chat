import { array } from "prop-types"

const Rooms = (state = {} , action) => {
    switch(action.type) {
        case "Add_Room" : 
            const {title , avator , idchat , room} = action.payload
            return state = {
                ...state,
                data : [
                    {...state.data},
                    {
                        title,
                        avator,
                        idchat,
                        room
                    }
                ]
            }
        default : 
            return state
    }

}

export default Rooms;