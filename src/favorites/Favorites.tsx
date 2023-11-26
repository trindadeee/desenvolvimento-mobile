// Favorites.tsx
import React from 'react';
import { View, ScrollView, Text, ImageBackground } from 'react-native';
import { Card, Image } from 'react-native-elements';
import styles from './FavoritesStyle';

const Favorites = ({ route }: any) => {
  const { favorites = [] } = route?.params || {};
  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';

  return (
    <ImageBackground
      source={{ uri: backgroundImageUrl }}
      style={styles.imageBack}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardsContainer}>
          {favorites.map((favorite: any, index: any) => (
            <Card key={index} containerStyle={styles.cardContainer}>
              <Image
                source={{ uri: favorite.image }}
                style={styles.image}
              />
              <Text>{favorite.name}</Text>
              <Text>{favorite.price}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Favorites;
