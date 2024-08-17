import { useDispatch, useSelector } from 'react-redux'
import { selectFilter } from '../store/selectors/filters-selectors'
import update from 'immutability-helper'
import { FILTERS } from '../constants'
import type { FC } from 'react'
import { useCallback, useState, useMemo, useEffect } from 'react'

import { Card } from './todo'
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
    const storeCards = useSelector(selectTodos)
    const {setTodos: storeSetCards} = todosSlice.actions
    const dispatch = useDispatch()
    const [cards, setCards] = useState(storeCards)


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

    useEffect(() => {
        console.log({cards})
        dispatch(storeSetCards(cards))
    }, [cards])

    useEffect(() => {setCards(storeCards)}, [storeCards])
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
        <ul>{filteredTodos.map((card: any, i: number) => renderCard(card, i))}</ul>
    )
}