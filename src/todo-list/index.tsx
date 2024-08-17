// import { selectTodos } from '../store/selectors/todos-selectors'
import { useSelector } from 'react-redux'
import { selectFilter } from '../store/selectors/filters-selectors'
import update from 'immutability-helper'
import { FILTERS } from '../constants'
import type { FC } from 'react'
import { useCallback, useState, useMemo } from 'react'

import { Card } from './todo'
import './todo-list.css'

const style = {
//   width: 400,
}

export interface Item {
  id: number
  text: string,
  status: string
}

export interface ContainerState {
  cards: Item[]
}

const initialCards = [
    {
      id: 1,
      text: 'Write a cool JS library',
      status: "TODO"
    },
    {
      id: 2,
      text: 'Make it generic enough',
      status: "TODO"
    },
    {
      id: 3,
      text: 'Write README',
      status: "TODO"
    },
    {
      id: 4,
      text: 'Create some examples',
      status: "TODO"
    },
    {
      id: 5,
      text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      status: "TODO"
    },
    {
      id: 6,
      text: '???',
      status: "TODO"
    },
    {
      id: 7,
      text: 'PROFIT',
      status: "TODO"
    },
  ]

export const TodoList: FC = () => {
    const [cards, setCards] = useState(initialCards)

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      setCards((prevCards: any) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex] as Item],
          ],
        }),
      )
    }, [])

    const todoFilter = useSelector(selectFilter)

    const filteredTodos = useMemo(() => cards.filter((todo: any) => todoFilter === FILTERS.ALL ? true : todo.status === todoFilter), [todoFilter, cards])

    const renderCard = useCallback(
      (card: { id: number; text: string, status: string }, index: number) => {
        return (
          <Card
            key={card.id}
            index={index}
            id={card.id}
            text={card.text}
            status={card.status}
            moveCard={moveCard}
          />
        )
      },
      [],
    )

    return (
        <ul style={style}>{filteredTodos.map((card, i) => renderCard(card, i))}</ul>
    )
}

// import { useSelector } from 'react-redux'
// import { Todo } from './todo'
// import { selectTodos } from '../store/selectors/todos-selectors'
// import './todo-list.css'
// import { selectFilter } from '../store/selectors/filters-selectors'
// import { FILTERS } from '../constants'
// import { ITodoItem } from '../store/reducers/todos-slice'
// import { useMemo } from 'react'

// export const TodoList = () => {
//     const todos = useSelector(selectTodos)
    // const todoFilter = useSelector(selectFilter)

    // const filteredTodos = useMemo(() => todos.filter((todo: ITodoItem) => todoFilter === FILTERS.ALL ? true : todo.status === todoFilter), [todoFilter, todos])

//     return (<ul>{filteredTodos.map((todo: ITodoItem) => <Todo key={`${todo.id}`} todo={todo} />)}</ul>)
// } 