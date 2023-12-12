import AsyncStorage from "@react-native-async-storage/async-storage";

const storageService = {
    save: async (key: string, value: string) => {
        await AsyncStorage.setItem(key, value);
    },
    get: async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return JSON.parse(value)
        }catch (err) {
            return null
        }
    }
}

export default storageService