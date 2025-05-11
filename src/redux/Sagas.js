import authFlow from '../screens/auth/redux/Saga';
import { spawn } from 'redux-saga/effects';

export default function* rootSaga() {
    yield spawn(authFlow)
}