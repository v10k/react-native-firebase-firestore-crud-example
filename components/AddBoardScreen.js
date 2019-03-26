import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../Firebase';

class AddBoardScreen extends Component {
  static navigationOptions = {
    title: 'Adicionar nota',
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      title: '',
      description: '',
      author: '',
      isLoading: false,
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveBoard() {
    this.setState({
      isLoading: true,
    });
    this.ref.add({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: '',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error ao adicionar documento: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              style={styles.textForm}
              placeholder={'Título'}
              placeholderTextColor="#000" 
              value={this.state.title}
              onChangeText={(text) => this.updateTextInput(text, 'title')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              style={styles.textForm}
              multiline={true}
              numberOfLines={4}
              placeholder={'Descrição'}
              placeholderTextColor="#000" 
              value={this.state.description}
              onChangeText={(text) => this.updateTextInput(text, 'description')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              style={styles.textForm}
              placeholder={'Autor'}
              placeholderTextColor="#000" 
              value={this.state.author}
              onChangeText={(text) => this.updateTextInput(text, 'author')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save',  color: '#0BCCF7'}}
            buttonStyle={{ backgroundColor: '#3F3E3F' }}
            title='Salvar nota'
            onPress={() => this.saveBoard()} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 10,
    padding: 5,
  },
  textForm: {
    fontSize: 14,
    lineHeight: 2,
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default AddBoardScreen;
