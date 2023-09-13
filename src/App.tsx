import './App.css'
import { User } from './logic'

function App() {
  const user = new User();
  const myList = user.listOfLists.get('My List');
  if (!myList) return;
  const myTodo = myList?.createTodo();
  if (!myTodo) return;
  myTodo.description = "a new todo";


  return (
    <>
      <h1>Lister</h1>
      <h2>username: {user.name}</h2>
      <h3>listname: {myList.title}</h3>
      <ul>
        <li>todo id: {myTodo.id}</li>
        <li>todo title: {myTodo.title}</li>
        <li>todo description: {myTodo.description}</li>
        <li>todo date: {myTodo.dueDate.toString()}</li>
        <li>todo urgent?: {myTodo.urgent.toString()}</li>
        <li>todo complete?: {myTodo.complete.toString()}</li>
        <li>todo parent list?: {myTodo.parentList?.title.toString()}</li>
      </ul>
    </>
  )
}

export default App
