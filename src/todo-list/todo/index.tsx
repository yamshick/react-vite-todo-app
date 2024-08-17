import type { Identifier, XYCoord } from 'dnd-core'
import { useDispatch, useSelector } from "react-redux"
import { todosSlice } from "../../store/reducers/todos-slice"
import type { FC } from 'react'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { FILTERS, STATUSES } from "../../constants"
import { ButtonPanel } from "./button-panel"
import './todo.css'
import { selectFilter } from '../../store/selectors/filters-selectors'

export const ItemTypes = {
    CARD: 'card',
  }

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

export interface CardProps {
  id: any
  text: string
  index: number
  status: string
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const Card: FC<CardProps> = ({ id, status, text, index, moveCard }) => {
    const filter = useSelector(selectFilter)
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
//   return (
//     <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
//       {text}
//     </div>
//   )

    const dispatch = useDispatch()
    const {updateTodoStatus, deleteTodo} = todosSlice.actions

    const toggleStatus = () => {
        dispatch(updateTodoStatus({id, status: status === STATUSES.DONE ? STATUSES.TODO : STATUSES.DONE}))
    }
    const onDelete = () => dispatch(deleteTodo(id))

return (<li>
        <div className='todo' ref={ref} style={filter === FILTERS.ALL ? { ...style, opacity } : {}} data-handler-id={FILTERS.ALL ? handlerId : () => {}}>
            <p className={status === STATUSES.DONE ? 'done-todo' : ''}>{text}</p>
            <ButtonPanel todoId={id} toggleStatus={toggleStatus} onDelete={onDelete}/>
        </div>
    </li>)

}

// import React from "react"
// import { useDispatch } from "react-redux"
// import { ITodoItem, todosSlice } from "../../store/reducers/todos-slice"
// import './todo.css'
// import { STATUSES } from "../../constants"
// import { ButtonPanel } from "./button-panel"

// export const Todo = React.memo(({todo}: {todo: ITodoItem}) => {
//     const dispatch = useDispatch()
//     const {updateTodoStatus, deleteTodo} = todosSlice.actions

//     const toggleStatus = () => {
//         dispatch(updateTodoStatus({id: todo.id, status: todo.status === STATUSES.DONE ? STATUSES.TODO : STATUSES.DONE}))
//     }
//     const onDelete = () => dispatch(deleteTodo(todo.id))

// return (<li>
//         <div className='todo'>
//             <p className={todo.status === STATUSES.DONE ? 'done-todo' : ''}>{todo.text}</p>
//             <ButtonPanel todoId={todo.id} toggleStatus={toggleStatus} onDelete={onDelete}/>
//         </div>
//     </li>)
// })