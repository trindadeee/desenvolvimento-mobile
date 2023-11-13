import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "./src/pages/login/Login";
import CreateAccount from "./src/pages/createAccount/CreateAccount";
import ForgotPassword from "./src/pages/forgotPassword/ForgotPassword";
import Home from "./src/pages/home/Home";
import Icon from "react-native-vector-icons/AntDesign";
import ShoppingCart from "./src/pages/shoppingCart/ShoppingCart";
import { useState } from "react";
import Favorites from "./src/pages/favorites/Favorites";

const App = (): JSX.Element => {

  const Stack = createNativeStackNavigator();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [favorites, setFavorites] = useState([])
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name ='login' component={Login}></Stack.Screen>
        <Stack.Screen options={({navigation}) => {
          return {
            headerBackVisible: false, 
            headerTitleAlign: 'center',
            headerRight: () => (<Icon onPress={() =>(navigation.navigate('login'))} name="logout" size={24}></Icon>),
            headerLeft: () => (<Icon onPress={() =>(navigation.navigate('shoppingCart', {shoppingCart}))} name="shoppingcart" size={28}></Icon>)
          }
        }}name ='home'>
          {
            () => (
              <Home shoppingCart = {shoppingCart} setShoppingCart = {setShoppingCart} favorites = {favorites} setFavorites = {setFavorites}></Home>
            )
          }
         </Stack.Screen>
        <Stack.Screen options={{title:'Criar Usuário', headerTintColor:'#000' }} name ='createAccount' component={CreateAccount}></Stack.Screen>
        <Stack.Screen options={{title:'Recuperar Senha', headerTintColor:'#000' }} name ='forgotPassword' component={ForgotPassword}></Stack.Screen>
        <Stack.Screen options={{title:'Carrinho de Compras', headerTintColor:'#000' }} name ='shoppingCart' component={ShoppingCart}></Stack.Screen>
        <Stack.Screen options={{title:'Meus Favoritos', headerTintColor:'#000' }} name ='favorites'>
        {
          () => (
          <Favorites favorites = {favorites} setFavorites = {setFavorites}></Favorites>
          )
        }

        </Stack.Screen>
      </Stack.Navigator> 
    </NavigationContainer>
  )
}


export default App
