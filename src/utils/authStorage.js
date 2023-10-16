import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:auth`);
    return accessToken ? JSON.parse(accessToken) : [];
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    const currentAccessToken = await this.getAccessToken();
    const newAccessToken = [...currentAccessToken, accessToken];

    await AsyncStorage.setItem(
      `${this.namespace}:auth`,
      JSON.stringify(newAccessToken)
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:auth`);
  }
}

export default AuthStorage;
