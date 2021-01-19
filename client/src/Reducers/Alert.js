
const Alert = (state = [] , action) => {
    switch(action.type){
        case "SET_ALERT":
            return [...state ,{
                id : action.payload.id,
                msg : action.payload.msg,
                type : action.payload.alert,
                page : action.payload.page
            }]
        case "REMOVE_ALERT" : 
            return state.filter(log => log.id !== action.payload)
        default :
            return state
    }
}

export default Alert;


