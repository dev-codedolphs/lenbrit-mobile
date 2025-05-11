import { combineReducers } from "redux";
import authSlice from "../screens/auth/redux/Slice";

const rootReducer = combineReducers({
   auth: authSlice.reducer,
})
export default rootReducer;