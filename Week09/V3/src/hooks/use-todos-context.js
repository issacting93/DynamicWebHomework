import {useContext} from 'react'
import TodosContext from '../context/todos'

const useTodosContext = () => {
  return useContext(TodosContext)
}

export default useTodosContext


// What this allows us to do is to reuse the context in multiple components without having to repeat the same code over and over again.
//Note to self, useful to simplify the code and make it more readable.
