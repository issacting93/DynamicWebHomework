import {useEffect} from 'react'
import useTodoContext from './hooks/use-todo-context'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const {fetchTodos} = useTodoContext()
  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  return (
    <div className="app-shell">
      <main className="todo-panel">
        <header className="todo-panel__header">
          <h1 className="todo-heading">Context  Todo List</h1> 
        </header>
        <section className="todo-panel__section">
          <TodoCreate />
        </section>
        <section className="todo-panel__section">
          <TodoList />
        </section>
      </main>
    </div>
  )
}

export default App
