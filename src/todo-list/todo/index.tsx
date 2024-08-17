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
  backgroundColor: 'white',
  cursor: 'move',
}

export interface TodoProps {
  id: any
  text: string
  index: number
  status: string
  moveTodo: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const Todo: FC<TodoProps> = ({ id, status, text, index, moveTodo }) => {
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

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveTodo(dragIndex, hoverIndex)

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