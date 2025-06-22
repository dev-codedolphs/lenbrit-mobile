import authFlow from '../screens/auth/redux/Saga';
import userFlow from '../screens/redux/Saga';
import { spawn } from 'redux-saga/effects';

export default function* rootSaga() {
    yield spawn(authFlow)
    yield spawn(userFlow)
}