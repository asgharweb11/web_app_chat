import { combineReducers } from "redux";
import authentication from "./auth";
import Alert from "./Alert";
import Msg from "./ChatMsg"
import Rooms from "./Rooms"

const allsReducers = combineReducers({
    auth : authentication,
    Alert,
    Msg,
    Rooms
});

export default allsReducers;