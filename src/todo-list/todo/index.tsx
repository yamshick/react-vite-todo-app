import { useDispatch } from "react-redux"
import { todosSlice } from "../../store/reducers/todos-slice"
import './todo.css'
import { STATUSES } from "../../constants"

export const Todo = ({todo}) => {
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
                <p>{(new Date(todo.id)).toLocaleDateString()}</p>
                <p className='done-button' onClick={toggleStatus}>✓</p>
                <p className='delete-button' onClick={onDelete}>✗</p>
            </div>
        </div>
    </li>)
}