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
import axios from 'axios';
import instance from './src/services/axios';

const baseURL = 'http://192.168.0.16:3000';

const App = (): JSX.Element => {
  const Stack = createNativeStackNavigator();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);


  // const getProducts = async () => {
  //   try {
  //     const response = await instance.get("/list-products");

  //     setProducts(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);


  const getProducts = async () => {
    try {
      const response = await fetch(`${baseURL}/list-products`);
      const result = await response.json();

      setProducts(result)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="login" component={Login} />
        <Stack.Screen
          options={({ navigation }) => ({
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerRight: () => (
              <Icon onPress={() => navigation.navigate('login')} name="logout" size={24} />
            ),
            headerLeft: () => (
              <Icon
                onPress={() => navigation.navigate('shoppingCart', { shoppingCart })}
                name="shoppingcart"
                size={28}
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
        <Stack.Screen options={{ title: 'Criar Usuário', headerTintColor: '#000' }} name="createAccount" component={CreateAccount} />
        <Stack.Screen options={{ title: 'Recuperar Senha', headerTintColor: '#000' }} name="forgotPassword" component={ForgotPassword} />
        <Stack.Screen options={{ title: 'Carrinho', headerTintColor: '#000' }} name="shoppingCart" component={ShoppingCart} />
        <Stack.Screen options={{ title: 'Favoritos', headerTintColor: '#000' }} name="favorites" component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
