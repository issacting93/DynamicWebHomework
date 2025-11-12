import {createContext, useState, useCallback} from 'react'
import axios from 'axios'
const TodoContext = createContext()

const Provider = ({children}) => {
  const [todos, setTodos] = useState([])

  const fetchTodos = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/todos')
    setTodos(response.data)
  }, [])
  // telling react that fetch todos is this ONE SINGLE STABLE ALWAYS IN YTHE SAME SLOT IN MEMORY FetchTodos
  // const stableFetchTodos = useCallback(fetchTodos, [])

  const createTodo = async (title) => {
    const response = await axios.post('http://localhost:3001/todos', {
      title,
    })

    const updatedTodos = [...todos, response.data]
    setTodos(updatedTodos)
  }

  const deleteTodoById = async (id) => {
    // delete from DB
    await axios.delete(`http://localhost:3001/todos/${id}`)
    // update our local state theb same way we did
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(updatedTodos)
  }

  const editTodoById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/todos/${id}`, {
      title: newTitle,
    })
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          ...response.data,
        }
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  return (
    <TodoContext.Provider
      value={{todos, fetchTodos, createTodo, deleteTodoById, editTodoById}}
    >
      {children}
    </TodoContext.Provider>
  )
}

export {Provider}
export default TodoContext
