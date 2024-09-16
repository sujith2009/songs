import { View, Text, StyleSheet } from "react-native";
import React from "react";

const favorite = () => {
  // Access the favoriteSongs array from the context

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text>Your Favorite Songs</Text>
      </View>
    </View>
  );
};

export default favorite;
const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
  },
});
