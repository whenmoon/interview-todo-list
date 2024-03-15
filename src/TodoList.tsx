import { ListItem } from "./ListItem"
import { useTodoContext } from "./context"

export const TodoList = () => {
  const { todos } = useTodoContext()

  return (
    <ul>{todos.map((todo) => <ListItem todo={todo} />)}</ul>
  )
}