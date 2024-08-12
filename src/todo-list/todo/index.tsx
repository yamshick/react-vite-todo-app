import { useDispatch } from "react-redux"
import { todosSlice } from "../../store/reducers/todos-slice"
import './todo.css'

export const Todo = ({todo}) => {
    const dispatch = useDispatch()
    const {deleteTodo} = todosSlice.actions

    const onDelete = () => dispatch(deleteTodo(todo.id))
    return (<li>
        <div>
            <p>{todo.text}</p>
            <p className='delete-button' onClick={onDelete}>x</p>
        </div>
    </li>)
}