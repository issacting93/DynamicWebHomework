import TodoItem from './TodoItem'
import useTodoContext from '../hooks/use-todo-context'

const TodoList = () => {
  const {todos} = useTodoContext()
  if (!todos.length) {
    return (
      <div className="todo-list todo-list--empty">
        <p className="todo-muted">Nothing here yet. Add your first todo above.</p>
      </div>
    )
  }

  const renderedTodos = todos.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} />
  })

  return <div className="todo-list">{renderedTodos}</div>
}

export default TodoList
