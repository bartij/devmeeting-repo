import React from 'react';
import { StyleSheet, Text, View, TextInput, AsyncStorage, TouchableOpacity, Button } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons'

const textKey = 'textKey';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      notes: [],
      value: '',
    }
  }

  componentWillMount(){
    AsyncStorage.getItem(textKey).then(notes => { this.setState({ notes: JSON.parse(notes) || [] })})
  }

  textChanged = (text) => {
    this.setState({
      value: text,
    })
  }

  submit = (event) => {
    console.log('submit', event.nativeEvent);
    this.setState(state => ({
      notes: [...state.notes, state.value]
    }), () => { AsyncStorage.setItem(textKey, JSON.stringify(this.state.notes))})
  }

  onRemove = (index) => {
    this.setState(state => ({
      notes: this.state.notes.filter((note, ind) => ind !== index),
    }))
  }

  onEdit = (index) => {
    this.setState(state => ({
      notes: this.state.notes.map((note, ind) => {
        if(ind === index) {
          return this.state.value;
        }
        return note;
      } ),
    }))
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
          { this.state.notes.map((note, index) =>
            <View style={styles.listItem}>
              <Text style={styles.title}>{note}</Text>
              <Button
                onPress={() => this.onRemove(index)}
                style={styles.removeButton}
                title='Remove'
              />
              <Button
                onPress={() => this.onEdit(index)}
                style={styles.removeButton}
                title='Replace'
              />
            </View>
          )}
        </View>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
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
  listItem: {
    paddingHorizontal: 10,
    flexDirection: 'column',
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
  },
  removeButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderRadius: 3,
  }
});
