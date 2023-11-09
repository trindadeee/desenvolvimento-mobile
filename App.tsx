import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Login from "./src/pages/login/Login";
import CreateAccount from "./src/pages/createAccount/CreateAccount";
import ForgotPassword from "./src/pages/forgotPassword/ForgotPasswor";
import Home from "./src/pages/home/Home";
import  Icon  from "react-native-vector-icons/AntDesign";


const App = (): JSX.Element => {
const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name="Login" component={Login}></Stack.Screen>
        <Stack.Screen options={{title:'Cancelar', headerTintColor:'#000'}} name="CreateAccount" component={CreateAccount}></Stack.Screen>
        <Stack.Screen  options={{title:'Cancelar', headerTintColor:'#000'}} name="ForgotPassword" component={ForgotPassword}></Stack.Screen>
        <Stack.Screen options={{
          headerBackVisible: false, 
          headerTitleAlign:'center',
          title: 'Bem Vindo(a)!', //colocar nome da pagina que aparece na parte superior
          headerRight: () => (
            <Icon name="logout" size={24}></Icon>),
          headerLeft: () => (<Icon name= "shoppingcart" size= {28}></Icon>),
        }} name="Home" component={Home}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    
    
  );
};



export default App;
