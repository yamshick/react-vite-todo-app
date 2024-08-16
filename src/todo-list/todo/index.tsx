import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { ITodoItem, todosSlice } from "../../store/reducers/todos-slice"
import './todo.css'
import { STATUSES } from "../../constants"
import { ButtonPanel } from "./button-panel"

export const Todo = React.memo(({todo}: {todo: ITodoItem}) => {
    const dispatch = useDispatch()
    const {updateTodoStatus, deleteTodo} = todosSlice.actions

    const toggleStatus = useCallback(() => {
        dispatch(updateTodoStatus({id: todo.id, status: todo.status === STATUSES.DONE ? STATUSES.TODO : STATUSES.DONE}))
    }, [dispatch, todo.id, todo.status])

    const onDelete = useCallback(() => dispatch(deleteTodo(todo.id)), [dispatch, todo.id])

return (<li>
        <div className='todo'>
            <p className={todo.status === STATUSES.DONE ? 'done-todo' : ''}>{todo.text}</p>
            <ButtonPanel todoId={todo.id} toggleStatus={toggleStatus} onDelete={onDelete}/>
        </div>
    </li>)
})