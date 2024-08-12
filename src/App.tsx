import './App.css'
import { Filters } from './filters'
import { Input } from './input'
import { TodoList } from './todo-list'

function App() {
  return (
    <>
      <h1>Todo List</h1>
      <Input />
      <Filters />
      <TodoList />
    </>
  )
}

export default App
