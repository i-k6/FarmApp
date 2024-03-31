import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';

const ToDo = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Load todo list data from AsyncStorage when component mounts
    loadTodoList();
  }, []);

  useEffect(() => {
    // Save todo list data to AsyncStorage whenever it changes
    saveTodoList();
  }, [todoList]);

  const loadTodoList = async () => {
    try {
      const storedTodoList = await AsyncStorage.getItem('@todoList');
      if (storedTodoList !== null) {
        setTodoList(JSON.parse(storedTodoList));
      }
    } catch (error) {
      console.error('Error loading todo list', error);
    }
  };

  const saveTodoList = async () => {
    try {
      await AsyncStorage.setItem('@todoList', JSON.stringify(todoList));
    } catch (error) {
      console.error('Error saving todo list', error);
    }
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodoList([...todoList, newTodo]);
      setNewTodo('');
      Alert.alert('Task Added', 'The task has been successfully added.');
    } else {
      Alert.alert('Invalid Task', 'Please enter a valid task.');
    }
  };

  const deleteTodo = (index) => {
    Alert.alert(
      'Remove Task',
      'Are you sure you want to remove this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const updatedTodoList = todoList.filter((_, i) => i !== index);
            setTodoList(updatedTodoList);
            Alert.alert('Task Removed', 'The task has been successfully removed.');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const deleteAllTodos = () => {
    Alert.alert(
      'Remove All Tasks',
      'Are you sure you want to remove all tasks?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove All',
          style: 'destructive',
          onPress: () => {
            setTodoList([]);
            Alert.alert('All Tasks Removed', 'All tasks have been successfully removed.');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.myTasks}>
          <Text style={styles.title}>Todo Airdrops Today</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newTodo}
              onChangeText={text => setNewTodo(text)}
              placeholder="Add new todo"
              placeholderTextColor="#d7e6f7"
            />
            <Button title="Add" onPress={addTodo} style={styles.addButton} />
          </View>
          <View style={styles.myListContainer}>
            {todoList.map((todo, index) => (
              <View key={index} style={styles.todoItemContainer}>
                <Text style={styles.todoItem}>{todo}</Text>
                <TouchableOpacity onPress={() => deleteTodo(index)}>
                  <Text style={styles.deleteButton}>x</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Remove All" onPress={deleteAllTodos} color={Colors.PRIMARY} />
          </View>
        </View>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    borderRadius: 20,
  },
  myTasks: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    borderRadius: 30,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
    backgroundColor: Colors.CIRCLE_COLOR,
    padding: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    padding: 10,
    color: '#000', // Text color
    backgroundColor: '#d7e6f7', // Background color
  },
  addButton: {
    borderRadius: 10,
  },
  myListContainer: {
    marginBottom: 20,
  },
  todoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  todoItem: {
    flex: 1,
  },
  deleteButton: {
    color: 'red',
    fontSize: 20,
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 20,
  },
});

export default ToDo;
