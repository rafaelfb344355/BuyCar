import React from 'react';
import { StyleSheet, Text, View , ImageBackground} from 'react-native';
import Constants from 'expo-constants';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';

import { NavigationContainer } from '@react-navigation/native';
import { Assets, createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';

const store = createStore(reducer);

const Stack = createStackNavigator();

const myOptions = {
  title: 'app teste',
 
  headerTintColor: 'rgb(0, 0, 0)',
  headerStyle: {
    backgroundColor: 'rgb(172, 172, 172)',
  },
};
function App() {
  return (
    <View style={styles.container}>
 <ImageBackground source={require('./assets/ModelX.jpeg')}
      style ={styles.image}
      />
   

      <Stack.Navigator> 
     
        <Stack.Screen name="Home" component={Home} options={myOptions} />

      {/*  <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{ ...myOptions, title: 'Funcionário' }}
        /> 
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...myOptions, title: 'Perfil do Funcionário' }}
        />*/}
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
  },
  image:{
width : '100%',
height : '100%',
resizeMode: 'cover',
position: 'absolute',
  },
});
