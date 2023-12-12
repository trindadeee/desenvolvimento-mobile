// Home.tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Pressable, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import styles from './HomeStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import {FAB} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// let products: Array<any> = [];

const baseURL = 'http:// 10.0.0.111:3000';

const Home = ({ shoppingCart, setShoppingCart, favorites, setFavorites, screenProps }: any) => {


  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  const products = screenProps;

  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const navigation = useNavigation();

  useEffect( () => {
    getUserData();
  }, [])

  const openToast = (message: string) => {
    ToastAndroid.show(message, 2000);
  };

  const openChat =() => {
    navigation.navigate('chat');
  };

  const removeFavorite = async (product: any) => {
    const updatedFavorites = favorites.filter((fav: any) => fav._id !== product._id);
    setFavorites(updatedFavorites);

    try {
      await fetch(`${baseURL}/remove-favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: product._id
        })
      })
    } catch (err) {
      console.error(err)
    }
  };

  const addItemToCart = (cart: any, product: any) => {
    const existingItem = cart.find((item: any) => item._id === product._id);

    if (existingItem) {
      const updatedCart = cart.map((item: any) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setShoppingCart(updatedCart);
    } else {
      setShoppingCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const toggleFavorite = async (product: any) => {
    
    const isFavorite = favorites.some((fav: any) => fav._id === product._id);
    if (isFavorite) {
      removeFavorite(product);
    } else {
      setFavorites([...favorites, { ...product }]);
      try {
        await fetch(`${baseURL}/add-favorite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            productId: product._id,
            description: product.description,
            image: product.image,
            name: product.name,
            price: product.price
          })
        })
      } catch (err) {
        console.error(err)
      }
    }
  };

  const getFavorites = async (userId: any) => {
    try {
      const response = await fetch(`${baseURL}/list-favorites?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const favorites = await response.json()
      setFavorites(favorites)
    } catch (err) {
      console.error(err);
    }
  }

  const getUserData = async () => {
    const userId = await AsyncStorage.getItem('userId');
    setUserId(userId);
    getFavorites(userId);
  }

  return (
    <ImageBackground
      source={{ uri: backgroundImageUrl }}
      style={styles.imageBack}
    >
      <ScrollView>
        <StatusBar backgroundColor="#236B8E"/>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
               {/* Barra de pesquisa */}
            <TextInput
            placeholder="Search products..."
            value={searchTerm}
            onChangeText={(text: string) => setSearchTerm(text)}
            style={{
              flex: 1,
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              borderRadius: 20,
              padding: 10,
              margin: 10,
              color: 'black',
              fontWeight: 'bold',
              fontSize: 17
            }}
          />
          <Pressable
            onPress={() => {
              setShowFavoritesOnly(!showFavoritesOnly);
              navigation.navigate('favorites', { favorites })
            }}
            style={({ pressed }) => ({
              padding: 10,
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <Icon name="heart" size={28} color="#236B8E" />
          </Pressable>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {products.filter((product: any) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((product: any, i: any) => {
            const isFavorite = favorites.some((fav: any) => fav._id === product._id);

            return (
              <Card key={i} containerStyle={{borderRadius: 15, width: '40%', height:'23%', maxHeight: 'auto'}}>
                <Card.Image source={{ uri: product.image }} />
                <View style={{flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                  <Text>{product.name}</Text>
                  <Text>R${product.price}.00</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                  <Pressable
                    onPress={() => {
                      openToast('Item Adicionado com Sucesso!');
                      addItemToCart([...shoppingCart], product);
                    }}
                  >
                    <FontAwesome name="cart-plus" size={28} color="#236B8E" />
                  </Pressable>
                  <Pressable onPress={() => toggleFavorite(product)}>
                    <Icon
                      onPress={() => toggleFavorite(product)}
                      name={isFavorite ? 'heart' : 'hearto'}
                      size={28}
                      color={isFavorite ? 'red' : '#236B8E'}
                      style={{ marginBottom: 20, marginLeft: 10 }}
                    />
                  </Pressable>
                </View>
              </Card>
            );
          })}
        </View>
      </ScrollView>
      <FAB
      style={styles.fab}
      visible={true}
      icon={{name:'chat', color:'white'}}
      color='#236B8E'
      onPress={() => openChat()}

      />
    </ImageBackground>
  );
};

export default Home;
