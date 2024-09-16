import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  GestureResponderEvent,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Link, router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { useRouter } from "expo-router";

// import axios from "axios";

const signup = () => {
  const API_URL = "https://41a9-49-37-209-109.ngrok-free.app/api/register";
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email address";
  };
  const validateName = () => {
    return username === "" ? "Name is required" : "";
  };

  const validatePassword = () => {
    // const passwordRegex="":"invalid password";
    // return password.length >= 6 ? "" : "Password must be at least 6 characters";
    if (password === "") {
      return "Password is required";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return "";
  };
  const validateForm = () => {
    const emailError = validateEmail();
    const usernameError = validateName();
    const passwordError = validatePassword();

    setErrors({
      email: emailError,
      username: usernameError,
      password: passwordError,
    });
    return !emailError && !usernameError && !passwordError;
  };

  //HandleChange
  const handleChange = (field: Field, value: string) => {
    if (field === "username") setUsername(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = async () => {
    const formSubmit = async () => {
      if (validateForm()) {
        console.log("Form is valid, submitting...");
        setLoading(true);

        try {
          const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              email,
              password,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const contentType = response.headers.get("content-type");

          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log("Response data:", data);
            alert("Register Sucess");
            router.push("/login");
          } else {
            const text = await response.text();
            console.log("Non-JSON response:", text);
          }
        } catch (error) {
          console.error("There was an error with the fetch operation:", error);
        } finally {
          setLoading(false); // Stop loading
        }
      } else {
        console.log("Form has errors.");
      }
    };

    // Call formSubmit when handleSubmit is triggered
    formSubmit();
  };

  type Field = "username" | "email" | "password";
  const [passwordVisible, setPasswordVisible] = useState(true);
  //Password visible
  const passwordVisibleData = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Link href={"/home"}>
          <MaterialIcons name="arrow-back" style={styles.arrowBack} />
        </Link>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>Started</Text>
      </View>

      {/*----FORM METHOD ------*/}
      <View style={styles.formContainer}>
        {/*---Number-*/}
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="supervised-user-circle"
            size={25}
            color={"gray"}
          />
          <TextInput
            value={username}
            onChangeText={(text) => handleChange("username", text)}
            style={styles.textInput}
            placeholder="Enter your name"
          />
        </View>
        {errors.username ? (
          <Text style={styles.errorText}>{errors.username}</Text>
        ) : null}
        {/*--Email--*/}
        <View style={styles.inputContainer}>
          <MaterialIcons name="mail" size={25} color={"gray"} />
          <TextInput
            value={email}
            onChangeText={(text) => handleChange("email", text)}
            style={styles.textInput}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
        {/*--Password--*/}
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={25} color={"gray"} />

          <TextInput
            value={password}
            onChangeText={(text) => handleChange("password", text)}
            style={styles.textInput}
            placeholder="Enter your password"
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity onPress={passwordVisibleData}>
            <MaterialIcons
              name={passwordVisible ? "visibility" : "visibility-off"}
              size={25}
              color={"gray"}
            />
          </TouchableOpacity>
        </View>
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        <TouchableOpacity style={styles.formButton} onPress={handleSubmit}>
          <Text style={styles.submitButton}>Sign Up</Text>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </TouchableOpacity>
        {/* <Text style={styles.continueWith}>or continue with</Text> */}
        <View style={styles.signupContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <Text style={styles.signupText}>
            <Link href={"/login"}>Login</Link>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default signup;
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
  errorText: {
    color: "red",
    // marginBottom: 10,
  },
});
