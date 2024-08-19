import { useEffect, useState } from 'react'
import './header.css'
import { getDate } from '../todo-list/todo/button-panel'

interface IHeader {
    text: string
}


export const Header = ({text}: IHeader) => {
    const [date, setDate] = useState('')

    useEffect(() => {
        const interval = setInterval(() => setDate(getDate()), 1000)
        return () => {clearInterval(interval)}
    }, [])

    return (
    <div className='header-container'>
        <h1 className='header'>{text}</h1> 
        <h3 className='date'>{date}</h3>
    </div>
    )
}