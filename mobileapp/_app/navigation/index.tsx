import Login from '../screens/Login';
import Registration from '../screens/Registration';
import Profile from '../screens/Profile';
import {PaperProvider, theme} from '../theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function Root() {
  const Stack = createNativeStackNavigator();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
