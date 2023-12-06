import React from 'react';
import { View, ScrollView, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Card, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './FavoritesStyle';

const Favorites = ({ favorites, setFavorites }: any) => {
  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  const removeFavorite = (id: number) => {
    const updatedFavorites = (favorites || []).filter((item: { id: number }) => item.id !== id);
    setFavorites(updatedFavorites)
  };

  return (
    <ImageBackground
      source={{ uri: backgroundImageUrl }}
      style={styles.imageBack}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardsContainer}>
          {favorites.map((favorite: any, index: any) => (
            <Card key={index} containerStyle={styles.cardContainer}>
              <TouchableOpacity onPress={() => removeFavorite(favorite.id)}>
                <Icon name="heart" size={24} color="#ff0000" />
              </TouchableOpacity>
              <Image
                source={{ uri: favorite.image }}
                style={styles.image}
              />
              <Text style={{ fontSize: 14, color: '#236B8E', fontWeight: 'bold' }}>{favorite.name}</Text>
              <Text style={{ fontSize: 14, color: '#236B8E', fontWeight: 'bold' }}>{favorite.price}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Favorites;


