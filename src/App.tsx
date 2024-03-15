import { AddTodo } from './AddTodo'
import './App.css'
import { TodoList } from './TodoList'
import { TodoProvider } from './context'

function App() {
  return (
    <TodoProvider>
      <>
        <AddTodo />
        <TodoList />
      </>
    </TodoProvider>
  )
}

export default App
