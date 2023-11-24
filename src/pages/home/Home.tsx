import React, { useState } from 'react';
import { ScrollView, View, Pressable, TextInput, ImageBackground, ToastAndroid } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import styles from '../login/LoginStyle';
import { products } from '../api/product';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
              color: 'black',
              fontWeight: 'bold',
              fontSize: 17
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

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {products.map((product, i) => {
            const isFavorite = favorites.some((fav: any) => fav.name === product.name);

            if (
              (showFavoritesOnly && isFavorite) ||
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.price.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return (
                <Card key={i} containerStyle={{ backgroundColor: 'transparent' }}>
                  <Card.Image source={{ uri: product.image }} />
                  <Text>{product.name}</Text>
                  <Text>{product.price}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Pressable 
                        onPress={() => {
                        openToast('Item Adicionado com Sucesso!');
                        addItemToCart([...shoppingCart], product);
                        }}>
                      <FontAwesome name="cart-plus" size={28} color="black" />
                      </Pressable>
                      <Pressable onPress={() => toggleFavorite(product)}>
                        <Icon 
                          onPress={() => {
                          toggleFavorite(product);
                          }}
                          name={isFavorite ? 'heart' : 'hearto'}
                          size={28}
                          color={isFavorite ? 'red' : 'black'}
                          style={{marginBottom: 20, marginLeft: 10}}
                          /> 
                      </Pressable>
                    </View>
                  </Card>
                  );
                } else {
                return null;
              }
              })}
          </View>
        </ScrollView>
      </ImageBackground>
    );
};

export default Home;
