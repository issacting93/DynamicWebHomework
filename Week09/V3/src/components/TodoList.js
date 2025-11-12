import useTodosContext from '../hooks/use-todos-context'
import TodoItem from './TodoItem'

const TodoList = () => {
  const {todos} = useTodosContext()

  // renderedTodos is a variable that is used to render the todos in the list.
  const renderedTodos = todos.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} />
  }) 


  return <div>{renderedTodos}</div>
}

export default TodoList

// 