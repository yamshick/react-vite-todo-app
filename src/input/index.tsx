import React from 'react'
import { todosSlice } from '../store/reducers/todos-slice'
import { useDispatch } from 'react-redux'
import './input.css'
import { STATUSES } from '../constants'

export const Input = () => {
    const [text, setText] = React.useState<string>('')

    const {addTodo} = todosSlice.actions
    const dispatch = useDispatch()

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(addTodo({id: Date.now(), text, status: STATUSES.TODO}))
            setText('')
        }
    }

    const onChange = (event) => {
        setText(event.target.value)
    }

    return (<input type='text' onKeyDown={onKeyDown} onChange={onChange} value={text}/>)
}