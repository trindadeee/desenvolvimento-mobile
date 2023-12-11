import React, { useState } from 'react';
import { View, ScrollView, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Card, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './FavoritesStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = ({ favorites, setFavorites }: any) => {
  const baseURL = 'http://192.168.0.16:3000';

  const backgroundImageUrl = 'https://img.freepik.com/vetores-premium/molecula-de-pesquisa-de-dna-de-formacao-medica-abstrata_230610-1390.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696550400&semt=ais';


  const removeFavorite = async (id: number) => {
    const userId = await AsyncStorage.getItem('userId');
    const updatedFavorites = (favorites || []).filter((item: { id: number }) => item._id !== id);
    setFavorites(updatedFavorites)

    try {
      await fetch(`${baseURL}/remove-favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: id
        })
      })
    } catch (err) {
      console.error(err)
    }
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
              <Image
                source={{ uri: favorite.image }}
                style={styles.image}
              />
              <Text style={{ fontSize: 14, color: '#236B8E', fontWeight: 'bold', paddingVertical: 2}}>{favorite.name}</Text>
              <Text style={{ fontSize: 14, color: '#236B8E', fontWeight: 'bold', paddingVertical: 2}}>R${favorite.price}.00</Text>
              <TouchableOpacity onPress={() => removeFavorite(favorite._id)}>
                <Icon name="heart" size={27} color="#ff0000" />
              </TouchableOpacity>
            </Card>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Favorites;
