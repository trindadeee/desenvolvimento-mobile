import React, { useEffect, useState } from 'react';
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
import Chat from './src/pages/chat/Chat';
import UserProfile from './src/pages/user/UserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import instance from './src/services/axios';

const baseURL = 'http://10.5.5.55:3259';



const App = (): JSX.Element => {
  const Stack = createNativeStackNavigator();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [jwtToken, setJwtToken] = useState('');

  const getProducts = async (token: any) => {
    try {
      // const token = await AsyncStorage.getItem('jwtToken');
      // setJwtToken(token || '');
      const response = await fetch(`${baseURL}/list-products`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      })
      const result = await response.json();

      setProducts(result)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const token = AsyncStorage.getItem('jwtToken');
    getProducts(token);
  }, []);

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
              <Icon onPress={() => navigation.navigate('user')} name="user" color= '#236B8E' size={24} />
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
              screenProps={products}
            />
          )}
        </Stack.Screen>
        <Stack.Screen options={{ title: 'Criar Usuário', headerTintColor: '#236B8E' }} name="createAccount" component={CreateAccount} />
        <Stack.Screen options={{ title: 'Recuperar Senha', headerTintColor: '#236B8E' }} name="forgotPassword" component={ForgotPassword} />
        <Stack.Screen options={{ title: 'Carrinho', headerTintColor: '#236B8E' }} name="shoppingCart" component={ShoppingCart} />
        <Stack.Screen options={{ title: 'Favoritos', headerTintColor: '#236B8E' }} name="favorites" component={Favorites} />
        <Stack.Screen options={{ title: 'Chat', headerTitleAlign: 'center', headerTintColor: '#236B8E' }} name="chat" component={Chat} />
        <Stack.Screen options={{ title: 'Perfil', headerTintColor: '#236B8E' }} name="user" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
