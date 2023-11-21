import React, { useState } from 'react';
import { ScrollView, Text, View, Button, ToastAndroid, Pressable, TextInput, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
import { products } from '../api/product';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from '../login/LoginStyle';



const Home = ({ shoppingCart, setShoppingCart, favorites, setFavorites }: any) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const openToast = (message: string) => {
    ToastAndroid.show(message, 3000);
  };

  const removeFavorite = (product: any) => {
    const updatedFavorites = favorites.filter((fav: any) => fav.name !== product.name);
    setFavorites(updatedFavorites);
  };

  const addItemToCart = (cart: any, product: any) => {
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item: any) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setShoppingCart(updatedCart);
    } else {
      setShoppingCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const toggleFavorite = (product: any) => {
    const isFavorite = favorites.some((fav: any) => fav.name === product.name);
    if (isFavorite) {
      removeFavorite(product);
    } else {
      setFavorites([...favorites, product]);
    }
  };

  return (
    <ImageBackground style={styles.imageBack} source={require('pharmacy-mobile/assets/farmBackground.jpg')}>
    <ScrollView>
      <StatusBar backgroundColor='gray' />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
          }}
        />

        <Pressable
          onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
          style={({ pressed }: any) => ({
            padding: 10,
          })}
        >
          <Icon name="heart" size={28} color={showFavoritesOnly ? 'red' : 'black'} />
        </Pressable>
      </View>

      {products.map((product, i) => {
        const isFavorite = favorites.some((fav: any) => fav.name === product.name);

        if (
          (showFavoritesOnly && isFavorite) ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.price.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return (
            <Card key={i}>
              <Card.Title>{product.name}</Card.Title>
              <Card.Divider />
              <Card.Image source={{ uri: product.image }} style={{ width: '50%', left:'25%'}} />
              <View style={{ flexDirection: 'column', alignSelf: 'center', marginBottom: '8%', marginTop: '3%' }}>
                <Text style={{ fontSize: 16, marginEnd: '5%' }}>Preço: {product.price}</Text>
                <Text style={{ fontSize: 16 }}>Em estoque: {product.onStock}</Text>
              </View>
              <Icon
                onPress={() => {
                  toggleFavorite(product);
                }}
                name={isFavorite ? 'heart' : 'hearto'}
                size={28}
                color={isFavorite ? 'red' : 'black'}
                style={{marginBottom: 20, marginLeft: 10}}
              />
              <Pressable
                onPress={() => {
                  openToast('Item Adicionado com Sucesso!');
                  addItemToCart([...shoppingCart], product);
                }}
                style={({ pressed }: any) => ({
                  backgroundColor: pressed ? 'gold' : 'gray',
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 15,
                  marginBottom: 10,
                })}
              >
                <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Adicionar ao Carrinho</Text>
              </Pressable>
            </Card>
          );
        } else {
          return null;
        }
      })}
    </ScrollView>
    </ImageBackground>
  );
};

export default Home;
