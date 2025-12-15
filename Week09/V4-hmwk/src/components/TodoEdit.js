import {useState} from 'react'

const TodoEdit = ({todo, onSubmit, onCancel}) => {
  const [title, setTitle] = useState(todo.title)

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(todo.id, title)
  }

  return (
    <form className="todo-edit" onSubmit={handleSubmit}>
      <label className="todo-label" htmlFor={`todo-edit-${todo.id}`}>
        Update your todo
      </label>
      <div className="todo-edit__controls">
        <input
          className="todo-input"
          id={`todo-edit-${todo.id}`}
          type="text"
          value={title}
          onChange={handleChange}
        />
        <button className="todo-button todo-button--primary" type="submit">
          Save
        </button>
        {onCancel ? (
          <button className="todo-button" type="button" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default TodoEdit
