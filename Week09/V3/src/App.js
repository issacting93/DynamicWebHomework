import {useEffect} from 'react'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import useTodosContext from './hooks/use-todos-context'

function App() {
  const {fetchTodos} = useTodosContext()
  // const fetchTodos = () => {}

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos]) // We are gonna create a hook that we can reuse to use-todos-context.js
  // the three things always have to repeat are
  // use context, import todocontext, and use the hook in the component

  return (
    <div>
      <TodoCreate />
      <TodoList />
    </div>
  )
}

export default App
