/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';

export default function index() {
    return (
        <Provider store={Store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => index);