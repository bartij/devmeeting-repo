import React from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage } from 'react-native';
import { Constants } from 'expo';

const textKey = 'textKey';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      note: '',
    }
  }

  componentWillMount(){
    AsyncStorage.getItem(textKey).then(text => { this.setState({ note: text })})
  }

  textChanged = (text) => {
    this.setState({
      note: text,
    })
  }

  submit = (event) => {
    console.log('sadasdasdsaddsasdasda', event.nativeEvent);
    this.setState({
      note: event.nativeEvent.text,
    })
    AsyncStorage.setItem(textKey, event.nativeEvent.text)
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter text"
          returnKeyType="done"
          value={this.state.value}
          onChangeText={this.textChanged}
          onSubmitEditing={this.submit}
          style={styles.input}
        />
        <View>
          <Text style={styles.title}>{this.state.note}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  item: {
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  content: {
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
  }
});
