import { useDispatch, useSelector } from 'react-redux'
import { selectFilter } from '../store/selectors/filters-selectors'
import update from 'immutability-helper'
import { FILTERS } from '../constants'
import type { FC } from 'react'
import { useCallback, useState, useMemo, useEffect } from 'react'

import { Todo } from './todo'
import './todo-list.css'
import { selectTodos } from '../store/selectors/todos-selectors'
import { todosSlice } from '../store/reducers/todos-slice'


export interface Item {
  id: number
  text: string,
  status: string
}

export interface ContainerState {
  cards: Item[]
}

export const TodoList: FC = () => {
    const storeTodos = useSelector(selectTodos)
    const {setTodos: storeSetTodos} = todosSlice.actions
    const dispatch = useDispatch()
    const [todos, setTodos] = useState(storeTodos)


    const moveTodo = useCallback((dragIndex: number, hoverIndex: number) => {
      setTodos((prevCards: Item[]) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        }),
      )
    }, [])

    useEffect(() => {
        dispatch(storeSetTodos(todos))
    }, [todos])

    useEffect(() => {setTodos(storeTodos)}, [storeTodos])
    const todoFilter = useSelector(selectFilter)

    const filteredTodos = useMemo(() => todos.filter((todo: Item) => todoFilter === FILTERS.ALL ? true : todo.status === todoFilter), [todoFilter, todos])

    const renderTodo = useCallback(
      (todo: { id: number; text: string, status: string }, index: number) => {
        return (
          <Todo
            key={todo.id}
            index={index}
            id={todo.id}
            text={todo.text}
            status={todo.status}
            moveTodo={moveTodo}
          />
        )
      },
      [],
    )

    return (
        <ul>{filteredTodos.map((todo: Item, i: number) => renderTodo(todo, i))}</ul>
    )
}