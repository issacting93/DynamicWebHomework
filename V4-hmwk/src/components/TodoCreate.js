import {useState} from 'react'
import useTodoContext from '../hooks/use-todo-context'

const TodoCreate = () => {
  const {createTodo} = useTodoContext()
  const [title, setTitle] = useState('')

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createTodo(title)
    setTitle('')
  }

  return (
    <form className="todo-create" onSubmit={handleSubmit}>
      <label className="todo-label" htmlFor="todo-title">
        Add a new todo
      </label>
      <div className="todo-create__controls">
        <input
          className="todo-input"
          id="todo-title"
          type="text"
          placeholder="Write your next task"
          value={title}
          onChange={handleChange}
        />
        <button className="todo-button todo-button--primary" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default TodoCreate
