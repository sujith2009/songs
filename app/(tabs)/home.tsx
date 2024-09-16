import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
export default function home() {
  const [header] = useState("Irai Alaigal");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(loggedIn === "true");
    };
    checkLoginStatus();
  }, []);
  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    alert("Logout Success");

    setIsLoggedIn(false);
    // Perform any logout operations (e.g., clearing tokens)
    router.push("/login"); // Redirect to login page
  };

  return (
    <>
      <View style={styles.containerFluid}>
        <View style={styles.profileMainContainer}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.img}
              source={require(".././../assets/images/mu.png")}
            />
            <View>
              <Text style={{ color: Colors.light.white }}>Welcome,</Text>
              <Text
                style={{
                  color: Colors.light.white,
                  fontSize: 17,
                  fontFamily: "monospace",
                  fontWeight: "900",
                }}
              >
                {header}
              </Text>
            </View>
          </View>
          {isLoggedIn ? (
            <Text style={styles.logout} onPress={handleLogout}>
              Logout
            </Text>
          ) : (
            <Text style={styles.login}>
              <Link href={"/login"}>Login</Link>
            </Text>
          )}
        </View>
      </View>
      {/*--10 BUTTONS INCLUDE-*/}

      {/* <MainBtn /> */}

      <View style={styles.button}>
        <Text style={styles.headerOne}>பாடல்கள்</Text>
        <View style={styles.allButtons}>
          <View style={styles.buttonContainer}>
            <Link
              href={"/firstsong"}
              style={{ textAlign: "center", color: "#fff" }}
            >
              வருகை
            </Link>
          </View>
          <View style={styles.buttonContainer}>
            <Link
              href={"/secondsong"}
              style={{ textAlign: "center", color: "#fff" }}
            >
              தியானம்
            </Link>
          </View>
          <View style={styles.buttonContainer}>
            <Link
              href={"/threesong"}
              style={{ textAlign: "center", color: "#fff" }}
            >
              காணிக்கை
            </Link>
          </View>
          <View style={styles.buttonContainer}>
            <Link
              href={"/foursong"}
              style={{ textAlign: "center", color: "#fff" }}
            >
              திருவிருந்து
            </Link>
          </View>
          <View style={styles.buttonContainer}>
            <Link
              href={"/fifthsong"}
              style={{ textAlign: "center", color: "#fff" }}
            >
              நன்றி
            </Link>
          </View>
        </View>
        {/*---Images--*/}
        <View style={styles.jesusMain}>
          <Image
            source={require("./.././../assets/images/jesus.png")}
            style={styles.jesusImg}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerFluid: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#ff7f36",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileMainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  login: {
    color: Colors.light.white,
    fontWeight: "800",
    fontSize: 15,
    fontFamily: "monospace",
    backgroundColor: "#FFB22C",
    padding: 5,
    borderRadius: 2,
  },
  jesusMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  jesusImg: {
    width: 200,
    height: 200,
  },
  headerOne: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "700",
  },
  allButtons: {
    gap: 8,
  },
  button: {
    display: "flex",
    padding: 20,
    gap: 5,
    backgroundColor: "#F8EDE3",
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "#FFB22C",
    textAlign: "center",
    borderRadius: 50,
    overflow: "hidden",
    width: "100%",
    padding: 10,
  },
  logout: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff", // Customize logout style
  },
});
