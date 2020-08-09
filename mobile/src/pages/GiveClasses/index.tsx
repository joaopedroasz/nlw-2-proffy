import React from "react";
import { View, Text, ImageBackground } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import giveClassesBackgroundImage from "../../assets/images/give-classes-background.png";

import styles from "./styles";

function GiveClasses() {
  const { goBack } = useNavigation();

  function handleNavigateBackToLandinPage() {
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={giveClassesBackgroundImage}
        style={styles.content}
        resizeMode="contain"
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma WEB.
        </Text>
      </ImageBackground>

      <RectButton
        style={styles.okButton}
        onPress={handleNavigateBackToLandinPage}
      >
        <Text style={styles.okButtonText}>Tudo bem!</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
