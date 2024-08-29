import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen'; // Đảm bảo đường dẫn đúng với file welcome.js
import TeacherListScreen from './TeacherListScreen'; // Đảm bảo đúng đường dẫn
import DeletedScreen from './DeletedScreen'; // Đảm bảo đúng đường dẫn
import AddUser from './AddUser'; // Đảm bảo đúng đường dẫn
import EditUser from './EditUser'; // Đảm bảo đúng đường dẫn
import SuccessScreen from './SuccessScreen'; // Đảm bảo đúng đường dẫn
import TeacherDetailsScreen from './TeacherDetailsScreen'; // Đảm bảo đúng đường dẫn
const slides = [
  {
    key: 'one',
    title: 'New mobile management',
    image: require('./assets/Intro1.png'),
    titleStyle: {
      color: '#00214E',
      fontSize: 23,
    },
    backgroundColor: '#fff',
  },
  {
    key: 'two',
    title: 'Try new management',
    text: 'Lorem ipsum dolor sit amet consectetur. Eget sit nec et euismod. Consequat urna quam felis interdum quisque. Malesuada adipiscing tristique ut eget sed.',
    image: require('./assets/Intro2.png'),
    backgroundColor: '#f2f2f2',
  }
];

const Stack = createStackNavigator();

const App = () => {
  const [showRealApp, setShowRealApp] = useState(false);

  const _renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Image source={item.image} style={styles.image} />
        <Text style={[styles.title, item.titleStyle]}>{item.title}</Text>
        {item.text && <Text style={styles.text}>{item.text}</Text>}
      </View>
    );
  };

  const _onDone = () => {
    setShowRealApp(true);
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.buttonText}>Next</Text>
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.buttonText}>Skip</Text>
      </View>
    );
  };
  const _renderGettingStartedButton = () => {
    return (
      <View style={styles.gettingStartedButton}>
        <Text style={styles.gettingStartedText}>Getting Started</Text>
      </View>
    );
  };
  if (showRealApp) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={
          {
            headerShown: false
          }
        }>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TeacherListScreen" component={TeacherListScreen} />
          <Stack.Screen name="DeletedScreen" component={DeletedScreen} />
          <Stack.Screen name="AddUser" component={AddUser} />
          <Stack.Screen name="EditUser" component={EditUser} />
          <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
          <Stack.Screen name="TeacherDetailsScreen" component={TeacherDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        renderDoneButton={_renderGettingStartedButton}
        showSkipButton={true}
        showwNextButton={true}

      />
    );
  }
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginHorizontal: 40,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  gettingStartedButton: {
    width: 320,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    bottom: 30,
  },
  gettingStartedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
