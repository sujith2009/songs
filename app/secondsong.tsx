import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";
import AntDesign from "@expo/vector-icons/AntDesign";

const BlinkingIcon = () => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();

    // Clean up the animation when component unmounts
    return () => blink.stop();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <MaterialIcons name="mic-none" size={30} color="#fff" />
    </Animated.View>
  );
};

const secondsong = () => {
  const [listen, setListen] = useState(false);
  const [song, setSong] = useState<Song[]>([]);
  const [loadingText, setLoadingtext] = useState<boolean>(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          "https://67bc-49-37-209-109.ngrok-free.app/api/song"
        );
        const json = await response.json();

        if (Array.isArray(json.song)) {
          const filteredSongs = json.song
            .filter((song: Song) => song.id >= 124 && song.id <= 214)
            .map((song: Song) => ({
              ...song,
              song_title: song.song_title.substring(0, 20), // Truncate to 20 characters
            }));

          setTimeout(() => {
            setSong(filteredSongs); // Set the state with the filtered songs
            setLoadingtext(false);
          }, 1000);
        } else {
          console.error("Expected an array but got:", json.song);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  interface Song {
    id: number;
    song_title: string;
    song_audio: string;
  }
  const playSongs = async (song: Song) => {
    //   try {
    //     const { sound } = await Audio.Sound.createAsync(
    //       { uri: song.song_audio } // Load the audio from the given URI
    //     );
    //     await sound.playAsync(); // Play the audio
    //     console.log("Playing song:", song.song_title);
    //   } catch (error: unknown) {
    //     console.error("Error playing song:", error);
    //   }
    try {
      // Stop the currently playing sound if any
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      // Create and play the new sound
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: song.song_audio,
      });
      setSound(newSound);
      setCurrentSong(song);
      await newSound.playAsync();
      console.log("Playing song:", song.song_title);
    } catch (error: unknown) {
      console.error("Error playing song:", error);
    }
  };
  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
      setCurrentSong(null);
    }
  };

  const displaySongs = ({ item }: { item: Song }) => {
    return (
      <View style={styles.songsContainer}>
        <Pressable
          onPress={() => playSongs(item)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialCommunityIcons name="music-circle" size={25} color="black" />
          <Text
            style={[
              styles.songTitle,
              item.id === currentSong?.id && styles.selectText,
            ]}
          >
            {item.song_title}
          </Text>
        </Pressable>
        <Pressable style={{ marginLeft: 4 }}>
          <MaterialIcons name="favorite-border" size={24} color="black" />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
    );
  };
  const showListen = () => {
    setListen(true);
  };
  const closeIcons = () => {
    setListen(false);
  };
  return (
    <View style={styles.container}>
      <Pressable>
        <Pressable style={styles.inputContainer}>
          <Pressable>
            <MaterialIcons name="search" color={"black"} size={23} />
          </Pressable>
          <TextInput placeholder="Search your song" />

          {/*-Mic Functionality Start--*/}
          <Pressable onPress={showListen}>
            <MaterialIcons name="mic" color={"black"} size={23} />
          </Pressable>
          {/*-Mic Functionality End--*/}
        </Pressable>
      </Pressable>
      {/*------------------Listening Data--------------*/}
      {listen ? (
        <View style={styles.mainListening}>
          <View style={styles.Listening}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#fff" }}>Listening...</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              {/* <MaterialIcons name="mic-none" size={30} color="#fff" /> */}
              <BlinkingIcon />
            </View>
          </View>
          <View style={styles.closeIcon}>
            <MaterialIcons
              name="close"
              size={24}
              color="#fff"
              onPress={closeIcons}
            />
          </View>
        </View>
      ) : null}
      {/*------------------Listening Data End--------------*/}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {loadingText ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <FlatList
            style={{ marginTop: 18 }}
            data={song}
            keyExtractor={(item) => item.id.toString()}
            renderItem={displaySongs}
          />
        )}
      </View>
      {/*---Bottom Song Display---*/}
      <View style={styles.bottomContainer}>
        {currentSong && (
          <View style={styles.controlsContainer}>
            <MaterialCommunityIcons
              name="music-circle"
              size={24}
              color="black"
            />
            <Text style={styles.songTitle}>{currentSong.song_title}</Text>
            <Pressable onPress={stopPlayback} style={styles.controlButton}>
              <AntDesign name="pausecircle" size={24} color="#E32636" />
            </Pressable>
            <View>
              <Pressable>
                <Text>Show Lyrics</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default secondsong;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFE9D0",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFC96F",
    padding: 9,
    borderRadius: 50,
    height: 38,
    justifyContent: "space-between",
  },
  Listening: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 130,
    backgroundColor: "#FF6969",
    padding: 20,
    borderRadius: 100,
  },
  mainListening: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
  mic: {
    fontSize: 50,
    color: "#FF6969",
  },
  closeIcon: {
    marginTop: 5,
    backgroundColor: "orange",
    borderRadius: 50,
  },

  songsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between", // Distributes space evenly between items
    alignItems: "center", // Centers items vertically
    paddingHorizontal: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "orange",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  songTitle: {
    fontSize: 13,
    marginLeft: 8,
  },
  controlButton: {
    padding: 8,
  },
  noSong: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "orange",
  },
  selectText: {
    color: "red",
  },
});
