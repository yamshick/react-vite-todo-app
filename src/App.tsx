import './App.css'
import { Header } from './components/header'
import { Filters } from './filters'
import { Input } from './input'
import { TodoList } from './todo-list'

function App() {
  return (
    <>
      <Header text='Todo List'/>
      <Input />
      <Filters />
      <TodoList />
    </>
  )
}

export default App
