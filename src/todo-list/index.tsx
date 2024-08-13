import { useSelector } from 'react-redux'
import { Todo } from './todo'
import { selectTodos } from '../store/selectors/todos-selectors'
import './todo-list.css'
import { selectFilter } from '../store/selectors/filters-selectors'
import { FILTERS } from '../constants'
import { ITodoItem } from '../store/reducers/todos-slice'

export const TodoList = () => {
    const todos = useSelector(selectTodos)
    const todoFilter = useSelector(selectFilter)

    return (<ul>{todos.filter((todo: ITodoItem) => todoFilter === FILTERS.ALL ? true : todo.status === todoFilter).map((todo: ITodoItem) => <Todo key={`${todo.id}`} todo={todo} />)}</ul>)
} 