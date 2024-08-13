import { useDispatch } from "react-redux"
import { ITodoItem, todosSlice } from "../../store/reducers/todos-slice"
import './todo.css'
import { STATUSES } from "../../constants"

const addZero = (timeItem: number) => {
    return String(timeItem).length === 1 ? `0${timeItem}` : timeItem
}

const getDate = (dateNow: Date) => {
    const date = new Date(dateNow)
    return `${date.toLocaleDateString()}    ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`
}

export const Todo = ({todo}: {todo: ITodoItem}) => {
    const dispatch = useDispatch()
    const {updateTodoStatus, deleteTodo} = todosSlice.actions

    const toggleStatus = () => {
        dispatch(updateTodoStatus({...todo, status: todo.status === STATUSES.DONE ? STATUSES.TODO : STATUSES.DONE}))
    }
    const onDelete = () => dispatch(deleteTodo(todo.id))

return (<li>
        <div className='todo'>
            <p className={todo.status === STATUSES.DONE ? 'done-todo' : ''}>{todo.text}</p>
            <div className="button-panel">
                <p>{getDate(todo.id)}</p>
                <p className='done-button' onClick={toggleStatus}>✓</p>
                <p className='delete-button' onClick={onDelete}>✗</p>
            </div>
        </div>
    </li>)
}