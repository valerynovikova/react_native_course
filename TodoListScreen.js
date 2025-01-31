import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Realm from 'realm';
import { TodoSchema } from '../realm/schemas';
import TodoItem from '../components/TodoItem';

const TodoListScreen = () => {
  const [realm, setRealm] = useState(null);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    Realm.open({
      schema: [TodoSchema],
    }).then((realm) => {
      setRealm(realm);
      setTodos(realm.objects('Todo').sorted('_id', true));
    });

    return () => {
      if (realm) {
        realm.close();
      }
    };
  }, []);

  const addTodo = () => {
    if (title.trim() === '') return;
    realm.write(() => {
      realm.create('Todo', {
        _id: Date.now(),
        title: title,
        completed: false,
      });
    });
    setTitle('');
    setTodos(realm.objects('Todo').sorted('_id', true));
  };

  const toggleComplete = (id) => {
    realm.write(() => {
      const todo = realm.objectForPrimaryKey('Todo', id);
      todo.completed = !todo.completed;
    });
    setTodos(realm.objects('Todo').sorted('_id', true));
  };

  const deleteTodo = (id) => {
    realm.write(() => {
      const todo = realm.objectForPrimaryKey('Todo', id);
      realm.delete(todo);
    });
    setTodos(realm.objects('Todo').sorted('_id', true));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Добавить задачу"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Добавить" onPress={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onToggleComplete={toggleComplete}
            onDelete={deleteTodo}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TodoListScreen;
