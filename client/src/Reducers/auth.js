

const auth = (state = {} , action) => {
    switch(action.type){
        case "LOGIN_USER" : 
            const {name , last_name , email , token} = action.payload;
            return state = {
                    ...state,
                    name,
                    last_name, 
                    email,
                    room : "100100000000",
                    token,
                    iduser : "",
                    loading : false,
                    authenticator : true
                }
        case "LOGOUT_USER" : 
                localStorage.removeItem("token");
                return state = {
                    name : '',
                    last_name : '', 
                    email : '',
                    room : "",
                    token : '',
                    iduser : "",
                    loading : false,
                    authenticator : false
                }
        default :
            return state;
    }
}

export default auth;