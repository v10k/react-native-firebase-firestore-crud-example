import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import BoardScreen from './components/BoardScreen';
import BoardDetailScreen from './components/BoardDetailScreen';
import AddBoardScreen from './components/AddBoardScreen';
import EditBoardScreen from './components/EditBoardScreen';


const Menu = createStackNavigator(
  {
    Board: BoardScreen,
    BoardDetails: BoardDetailScreen,
    AddBoard: AddBoardScreen,
    EditBoard: EditBoardScreen,
  },
  {
    initialRouteName: 'Board',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3F3E3F',
      },
      headerTintColor: '#0BCCF7',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackTitle: null,
    },
  },
);

export default class App extends React.Component {
  render() {
    return <Menu />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// ignorar mensagem de erro android
console.ignoredYellowBox = ['Setting a timer'];