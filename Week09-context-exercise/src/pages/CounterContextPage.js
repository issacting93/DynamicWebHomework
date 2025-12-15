import {useState} from 'react'
import Panel from '../components/Panel'
import Button from '../components/Button'

// We will refactor this simpler counter page
// to consume the Context we create instead of defining
// local state and functions. The coolest part about
// Context is with some new hooks we will learn, we can
// now share values directly with a component
// without prop drilling
const CounterContextPage = () => {

  const {count, handleIncrement, handleDecrement} = useContext(CounterContext)

  // We can take the logic out of the component and put it in the context.
  // We can now share values directly with a component without prop drilling

  // Two ways we can share values with a component:


  return (
    <Panel>
      <h1>Count is currently {count}</h1>
      <div className="flex flex-row">
        <Button success rounded onClick={handleIncrement} className="mr-4">
          Increment
        </Button>
        <Button danger rounded onClick={handleDecrement}>
          Decrement
        </Button>
      </div>
    </Panel>
  )
}

export default CounterContextPage
