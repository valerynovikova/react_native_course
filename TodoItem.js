import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TodoItem = ({ item, onToggleComplete, onDelete }) => {
  return (
    <View style={styles.todoItem}>
      <Text
        style={[
          styles.todoText,
          { textDecorationLine: item.completed ? 'line-through' : 'none' },
        ]}
        onPress={() => onToggleComplete(item._id)}
      >
        {item.title}
      </Text>
      <Button title="Удалить" onPress={() => onDelete(item._id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoText: {
    fontSize: 18,
  },
});

export default TodoItem;
