import { useSelector } from 'react-redux'
import { Todo } from './todo'
import { selectTodos } from '../store/selectors/todos-selectors'

export const TodoList = () => {
    const {todos} = useSelector(selectTodos)
    console.log(todos)
    return (<ul>{todos.map(todo => <Todo key={todo.id} todo={todo} />)}</ul>)
} 