const addZero = (timeItem: number) => {
    return String(timeItem).length === 1 ? `0${timeItem}` : timeItem
}

export const getDate = (dateNow?: Date) => {
    const date = new Date(dateNow || Date.now())
    return `${date.toLocaleDateString()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`
}

interface IButtonPanel {
    todoId: Date,    
    toggleStatus: () => void, 
    onDelete: () => void
} 

export const ButtonPanel = ({todoId, toggleStatus, onDelete}: IButtonPanel) => {
    return (<div className="button-panel">
        <p>{getDate(todoId)}</p>
        <p className='done-button' onClick={toggleStatus}>✓</p>
        <p className='delete-button' onClick={onDelete}>✗</p>
    </div>)
}