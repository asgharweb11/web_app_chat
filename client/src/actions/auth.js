export const Login_Post = (data) => {
    return {
        type : "LOGIN_USER",
        payload : data
    }
}


export const Login_Get = data => {
    return {
        type : "LOGIN_USER",
        payload : data
    }
}

export const Logout = () => {
    return {
        type : "LOGOUT_USER",
        payload : null
    }
}



// -----------------------------------------------------------------------------------------


