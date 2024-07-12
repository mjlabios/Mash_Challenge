import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Root from './navigation/index';
import store from './redux/store';
import {LogBox} from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Root />
      </GestureHandlerRootView>
    </Provider>
  );
}
