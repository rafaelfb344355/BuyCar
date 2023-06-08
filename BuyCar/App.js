import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import Home from './screens/Home';
import CreateCar from './screens/CreateCar';
import Cars from './screens/Cars';
import Map from './screens/Map';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';

const store = createStore(reducer);

const Stack = createStackNavigator();

const myOptions = {
  title: 'Carros No Pátio',
  headerTintColor: 'white',
  headerStyle: {
    
    backgroundColor: 'rgb(116, 1, 224)',
  },
};
function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={myOptions} />
        <Stack.Screen
          name="Create"
          component={CreateCar}
          options={{ ...myOptions, title: 'Novo Carro' }}
        />
        <Stack.Screen
          name="Car"
          component={Cars}
          options={{ ...myOptions, title: 'Sobre' }}
        />
         <Stack.Screen
          name="Map"
          component={Map}
          options={{ ...myOptions, title: 'Filias Proximas' }}
        />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
});
