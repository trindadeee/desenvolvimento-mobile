import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  imageBack: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: '10%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#236B8E',
    marginBottom: 5,
  },
  email: {
    color: '#236B8E',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#236B8E',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#236B8E',
  },
  label: {
    color: '#236B8E',
    marginBottom: 5,
  }
});

export default styles;