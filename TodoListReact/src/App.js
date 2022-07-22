import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';


const LOCAL_STORAGE_KEY  = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  //On page load, add todos from local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  //Anytime the todos array is edited, save it to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name == '') return
    console.log(name)
    todoNameRef.current.value = null
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
  }
  //never directly modify a state variable. make a copy then change
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id == id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  } //pass then function down into our todoList

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" style="text-align: center"/>
      <button onClick={handleAddTodo} style="text-align: center">Add Todo</button>
      <button onClick={handleClearTodos} style="text-align: center">Clear Complete</button>
      <div style="text-align: center">{todos.filter(todo => !todo.complete).length} left to do.</div>

    </>
  )
}

export default App;
