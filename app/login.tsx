import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  GestureResponderEvent,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(true);
  const passwordVisibleData = () => {
    setPasswordVisible(!passwordVisible);
  };

  //FormsubmitButton
  const LOGIN_API = "https://41a9-49-37-209-109.ngrok-free.app/api/login";

  const handleLogin = async () => {
    try {
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (data.message === "Login successful") {
          await AsyncStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
          alert("Login Success");
          router.push("/home"); // Navigate to home page on successful login
        } else {
          console.error("Login failed:", data.message);
        }
      } else {
        const text = await response.text();
        console.log("Non-JSON response:", text);
      }
    } catch (error) {
      console.error("There was an error with the login operation:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Link href={"/home"}>
          <MaterialIcons name="arrow-back" style={styles.arrowBack} />
        </Link>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>

      {/*----FORM METHOD ------*/}
      <View style={styles.formContainer}>
        {/*--Email--*/}
        <View style={styles.inputContainer}>
          <MaterialIcons name="mail" size={25} color={"gray"} />
          <TextInput
            style={styles.textInput}
            keyboardType="email-address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        {/*----*/}
        {/*--Password--*/}
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={25} color={"gray"} />

          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            secureTextEntry={passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={passwordVisibleData}>
            <MaterialIcons
              name={passwordVisible ? "visibility" : "visibility-off"}
              size={25}
              color={"gray"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.formButton} onPress={handleLogin}>
          <Text style={styles.submitButton}>Login</Text>

          {error ? <Text>{error}</Text> : null}
        </TouchableOpacity>
        {/* <Text style={styles.continueWith}>or continue with</Text> */}
        <View style={styles.signupContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <Text style={styles.signupText}>
            <Link href={"/signup"}>Sign up</Link>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
    flex: 1,
    backgroundColor: "#F8EDE3",
  },
  backButton: {
    height: 35,
    width: 35,
    backgroundColor: "#FFB22C",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowBack: {
    fontSize: 20,
    color: "#fff",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ff7f36",
  },
  formContainer: {
    marginTop: 1,
  },
  inputContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 100,
    borderColor: "gray",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: "serif",
    color: "gray",
  },
  formButton: {
    borderRadius: 100,
    overflow: "hidden",
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#ff7f36",
    padding: 10,
    fontFamily: "serif",
    color: "#fff",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  // continueWith: {
  //   textAlign: "center",
  //   color: "gray",
  //   marginVertical: 20,
  //   fontFamily: "serif",
  // },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 2,
  },
  accountText: {
    fontFamily: "serif",
    color: "gray",
    paddingRight: 5,
  },
  signupText: {
    fontFamily: "serif",
    fontSize: 15,
    fontWeight: "700",
  },
});
