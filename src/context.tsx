import { ReactElement, createContext, useContext, useReducer } from "react"

export type Status = 'pending' | 'done' | 'inProgress'

export type Todo = {
  id: number
  content: string
  status: Status
}

type Todos = Todo[]

const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const UPDATE_TODO = 'UPDATE_TODO'


type AddTodo = (content: Todo['content']) => void
type ToggleTodo = (status: Todo['status'], id: Todo['id']) => void
type UpdateTodo = (editValue: Todo['content'], id: Todo['id']) => void

type InitialState = {
  todos: Todos
  addTodo: AddTodo
  toggleTodo: ToggleTodo
  updateTodo: UpdateTodo
}

const initialState = {
  todos: [],
  addTodo: () => { },
  toggleTodo: () => { },
  updateTodo: () => { }
}

const TodoContext = createContext<InitialState>(initialState)

type Action =
  | { type: typeof ADD_TODO, content: Todo['content'] }
  | { type: typeof TOGGLE_TODO, status: Todo['status'], id: Todo['id'] }
  | { type: typeof UPDATE_TODO, editValue: Todo['content'], id: Todo['id'] }

const todoReducer = (state: Todos, action: Action): Todos => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.length + 1,
          content: action.content,
          status: 'pending'
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo) => action.id === todo.id ? { ...todo, status: action.status } : todo)
    case UPDATE_TODO:
      return state.map((todo) => action.id === todo.id ? { ...todo, content: action.editValue } : todo)
    default:
      return state
  }
}

export const TodoProvider = ({ children }: { children: ReactElement }) => {

  const initialReducerState: Todos = []
  const [todos, dispatch] = useReducer(todoReducer, initialReducerState)

  const addTodo: AddTodo = (content) => {
    dispatch({ type: ADD_TODO, content })
  }
  const toggleTodo: ToggleTodo = (status, id) => {
    dispatch({ type: TOGGLE_TODO, status, id })
  }
  const updateTodo: UpdateTodo = (editValue, id) => {
    dispatch({ type: UPDATE_TODO, editValue, id })
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        updateTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => useContext(TodoContext)