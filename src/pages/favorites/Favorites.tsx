import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';

const Favorites = ({favorites, setFavorites}: any) => {
  return (
    <ScrollView>
    {favorites.map((favorite: any, index: number) => (
      <Card key={index}>
        <Card.Title>{favorite.name}</Card.Title>
        <Text>Price: {favorite.price}</Text>
        <Text>Quantity: {favorite.quantity}</Text>
      </Card>
    ))}
  </ScrollView>
  )
}

export default Favorites