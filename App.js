import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  constructor(){
  super()
    this.state = {
      items: [
        { title: 'title1', content: 'content111111111111111111111', isDone: true },
        { title: 'title2', content: 'content11111111111111111111122222222', isDone: false },
        { title: 'title3', content: 'content11111111111111111111133333333', isDone: false },
        { title: 'title4', content: 'content1111111111111111111114444444', isDone: false },
        { title: 'title5', content: 'content11111111111111111111155555555', isDone: false },
        { title: 'title6', content: 'content1111111111111111111116666666666', isDone: true }
      ]
    }
  }

  renderItem = ({ item }) => (
    !item.isDone ? <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View> : null
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.items} renderItem={this.renderItem} />
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
});
