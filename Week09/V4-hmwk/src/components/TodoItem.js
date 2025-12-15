import {useState} from 'react'
import TodoEdit from './TodoEdit'
import useTodoContext from '../hooks/use-todo-context'

const TodoItem = ({todo}) => {
  const {deleteTodoById, editTodoById} = useTodoContext()
  const [showEdit, setShowEdit] = useState(false)

  const handleDelete = () => {
    deleteTodoById(todo.id)
  }

  const handleEdit = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = (id, newTitle) => {
    editTodoById(todo.id, newTitle)
    setShowEdit(false)
  }

  const handleCancel = () => {
    setShowEdit(false)
  }

  const content = showEdit ? (
    <TodoEdit todo={todo} onSubmit={handleSubmit} onCancel={handleCancel} />
  ) : (
    <>
      <span className="todo-item__title">{todo.title}</span>
      <div className="todo-item__actions">
        <button className="todo-button" type="button" onClick={handleEdit}>
          Edit
        </button>
        <button
          className="todo-button todo-button--destructive"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </>
  )

  return (
    <article className={`todo-item${showEdit ? ' todo-item--editing' : ''}`}>
      {content}
    </article>
  )
}

export default TodoItem
