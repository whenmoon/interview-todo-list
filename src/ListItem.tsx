import { Button, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { Status, Todo, useTodoContext } from "./context"
import './styles.css'
import { ChangeEventHandler, useState } from "react"

export const ListItem = ({ todo }: { todo: Todo }) => {

  const { updateTodo, toggleTodo } = useTodoContext()

  const [isEditing, setIsEditing] = useState(false)

  const [editValue, setEditValue] = useState(todo.content)

  const handleValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEditValue(event.target.value)
  }

  const handleEdit = () => {
    setIsEditing((prevState) => !prevState)
  }

  const handleSubmit = () => {
    if (editValue !== todo.content) {
      updateTodo(editValue, todo.id)
    }
    setIsEditing((prevState) => !prevState)
  }

  const handleStatusChange = (event: SelectChangeEvent<Status>) => {
    toggleTodo(event.target.value as Status, todo.id)
  }

  return (
    <li className="list-item">
      <div>
        {todo.content}
      </div>
      <div className="select">
        <Select label="Status" onChange={handleStatusChange} value={todo.status}>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="inProgress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </div>
      {!isEditing && <Button onClick={handleEdit}>Edit</Button>}
      {
        isEditing &&
        <>
          <TextField onChange={handleValue} value={editValue} />
          <Button onClick={handleSubmit}>Submit</Button>
        </>
      }
    </li>
  )
}