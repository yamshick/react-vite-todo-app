import { useDispatch } from "react-redux"
import { todosSlice } from "../../store/reducers/todos-slice"

export const Todo = ({todo}) => {
    const dispatch = useDispatch()
    const {deleteTodo} = todosSlice.actions

    const onDelete = () => dispatch(deleteTodo(todo.id))
    return (<li>
        <p>{todo.text}</p>
        <p onClick={onDelete}>x</p>
    </li>)
}