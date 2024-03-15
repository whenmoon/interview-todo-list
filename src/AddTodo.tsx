import { Button, TextField } from "@mui/material"

import './styles.css'
import { ChangeEventHandler, useState } from "react"
import { useTodoContext } from "./context"

export const AddTodo = () => {
  const [value, setValue] = useState('')

  const { addTodo } = useTodoContext()

  const handleValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }

  const handleAdd = () => {
    addTodo(value)
  }

  return (
    <div className="add-todo">
      <TextField value={value} onChange={handleValueChange} />
      <Button onClick={handleAdd}>
        Add Todo
      </Button>
    </div>
  )
}