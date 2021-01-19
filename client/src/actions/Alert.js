export const SetAlert = (id , text , alert , page) => {

    const ObjAlert = {
        id,
        msg : text,
        alert,
        page
    }

    return {
        type : "SET_ALERT",
        payload : ObjAlert
    }

}

export const RemoveAlert = (id) => {
    return {
        type : "REMOVE_ALERT",
        payload : id
    }
}