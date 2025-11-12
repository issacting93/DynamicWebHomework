import {useContext} from 'react'
import TodoContext from '../context/todos'

const useTodoContext = () => {
  return useContext(TodoContext)    
}

export default useTodoContext
