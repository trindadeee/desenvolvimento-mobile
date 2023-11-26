import React, { useState } from 'react';
import { ScrollView, View, Pressable, TextInput, ToastAndroid, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'; // Importe o hook useNavigation
import styles from '../login/LoginStyle';
import { products } from '../api/product';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';

const Home = ({ shoppingCart, setShoppingCart, favorites, setFavorites }: any) => {
  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const navigation = useNavigation(); // Use o hook useNavigation para obter o objeto de navegação

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
      // Adicione o produto aos favoritos
      setFavorites([...favorites, { ...product }]);
    }
  };

  return (
    <ImageBackground
      source={{ uri: backgroundImageUrl }}
      style={styles.imageBack}
    >
      <ScrollView>
        <StatusBar backgroundColor="#236B8E" />

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
            onPress={() => {
              setShowFavoritesOnly(!showFavoritesOnly);
              // Navegue para a página de favoritos ao pressionar o botão
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

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {products.map((product, i) => {
            const isFavorite = favorites.some((fav: any) => fav.name === product.name);

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
    </ImageBackground>
  );
};

export default Home;

