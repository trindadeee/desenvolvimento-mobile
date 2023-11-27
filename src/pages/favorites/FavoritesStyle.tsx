import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  imageBack: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
  },
  cardsContainer: {
    flexDirection: 'row', // Alinha os cards lado a lado
    flexWrap: 'wrap', // Permite que os cards quebrem para a linha seguinte, se necessário
    justifyContent: 'space-around', // Espaçamento igual entre os cards
    padding: 10,
  },
  cardContainer: {
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
  },
});

export default styles;