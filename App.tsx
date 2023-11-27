import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Home from './src/pages/home/Home';
import CreateAccount from './src/pages/createAccount/CreateAccount';
import ForgotPassword from './src/pages/forgotPassword/ForgotPassword';
import ShoppingCart from './src/pages/shoppingCart/ShoppingCart';
import Login from './src/pages/login/Login';
import Favorites from './src/pages/favorites/Favorites';

const App = (): JSX.Element => {
  const Stack = createNativeStackNavigator();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="login" component={Login} />
        <Stack.Screen
          options={({ navigation }) => ({
            title: 'PharmGo',
            headerTintColor: '#236B8E',
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerRight: () => (
              <Icon onPress={() => navigation.navigate('login')} name="logout" color= '#236B8E' size={24} />
            ),
            headerLeft: () => (
              <Icon
                onPress={() => navigation.navigate('shoppingCart', { shoppingCart })}
                name="shoppingcart"
                size={28}
                color='#236B8E'
              />
            ),
          })}
          name="home"
        >
          {() => (
            <Home
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          )}
        </Stack.Screen>
        <Stack.Screen options={{ title: 'Criar Usuário', headerTintColor: '#236B8E' }} name="createAccount" component={CreateAccount} />
        <Stack.Screen options={{ title: 'Recuperar Senha', headerTintColor: '#236B8E' }} name="forgotPassword" component={ForgotPassword} />
        <Stack.Screen options={{ title: 'Carrinho', headerTintColor: '#236B8E' }} name="shoppingCart" component={ShoppingCart} />
        <Stack.Screen options={{ title: 'Favoritos', headerTintColor: '#236B8E' }} name="favorites" component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
