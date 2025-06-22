import { combineReducers } from "redux";
import authSlice from "../screens/auth/redux/Slice";
import userSlice from "../screens/redux/Slice";

const rootReducer = combineReducers({
   auth: authSlice.reducer,
   user: userSlice.reducer,
})
export default rootReducer;