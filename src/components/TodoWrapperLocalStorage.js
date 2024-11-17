import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapperLocalStorage = () => {
    // Initialize state with localStorage data or an empty array
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        // Check if savedTodos exists, if so parse it, otherwise return an empty array
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    // Update localStorage whenever the todos array changes
    useEffect(() => {
        // If the todos array changes, save it to localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]); // This hook will run when the `todos` state changes

    const addTodo = (todo) => {
        const newTodos = [
            ...todos,
            { id: uuidv4(), task: todo, completed: false, isEditing: false }
        ];
        setTodos(newTodos); // Updating state will trigger the useEffect and save it to localStorage
    };

    const toggleComplete = (id) => {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    const deleteTodo = (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
    };

    const editTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        ));
    };

    const editTask = (task, id) => {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        );
        setTodos(newTodos);
    };

    return (
        <div className="TodoWrapper">
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
                ) : (
                    <Todo
                        task={todo}
                        key={todo.id}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                )
            ))}

            {/* Footer for developer credit */}
            <div className="developer-credit" style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#777' }}>
                Developed by Rahul Choudhary
            </div>
        </div>
    );
};
