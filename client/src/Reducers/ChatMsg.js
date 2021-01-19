// const initaision = {
//     MSG : {
//         id,
//         email,
//         name,
//         photo,
//         text,
//         idfile,
//         type
//     },
//     DATA : [{
//         id,
//         email,
//         name,
//         photo,
//         text,
//         idfile,
//         type
//     },{
//         id,
//         email,
//         name,
//         photo,
//         text,
//         idfile,
//         type
//     }]
// }

const ChatMsg = (state = [] , action) => {
    
    switch(action.type){
        case "ADD_MSG" :
            const {id , email , name , photo , text , idfile , type , room , status , emojis , time} = action.payload;
            return [
                ...state,
                {
                    id,
                    email,
                    name,
                    photo,
                    text,
                    idfile,
                    type,
                    room,
                    status,
                    emojis,
                    time
                }
            ]
            
        default :
            return state
    }
}

export default ChatMsg;