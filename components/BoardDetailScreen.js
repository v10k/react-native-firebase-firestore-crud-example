import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { List, ListItem, Text, Card, Button } from 'react-native-elements';
import firebase from '../Firebase';

class BoardDetailScreen extends Component {
  static navigationOptions = {
    title: 'Gerenciador de nota',
  };
  constructor() {
    super();
    this.state = {
      isLoading: true,
      board: {},
      key: ''
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('boards').doc(JSON.parse(navigation.getParam('boardkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("Documento não existe !");
      }
    });
  }
  deleteBoard(key) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    firebase.firestore().collection('boards').doc(key).delete().then(() => {
      console.log("Documento deletado com sucesso!");
      this.setState({
        isLoading: false
      });
      navigation.navigate('Board');
    }).catch((error) => {
      console.error("Erro ao deletar documento: ", error);
      this.setState({
        isLoading: false
      });
    });
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text h3>{this.state.board.title}</Text>
            </View>
            <View>
              <Text h5>{this.state.board.description}</Text>
            </View>
            <View>
              <Text h4>{this.state.board.author}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              leftIcon={{name: 'edit', color: '#0BCCF7'}}
              buttonStyle={{ backgroundColor: '#3F3E3F' }}
              title='Editar'
              onPress={() => {
                this.props.navigation.navigate('EditBoard', {
                  boardkey: `${JSON.stringify(this.state.key)}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              leftIcon={{name: 'delete', color: '#0BCCF7'}}
              buttonStyle={{ backgroundColor: '#3F3E3F' }}
              title='Deletar'
              onPress={() => this.deleteBoard(this.state.key)} />
          </View>
        </Card>
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
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailButton: {
    marginTop: 10
  }
})

export default BoardDetailScreen;
