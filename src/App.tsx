import './App.css'
import AllTodos from './components/AllTodos'
import TodayTodos from './components/TodayTodos';
import WeekTodos from './components/ThisWeekTodos';
import MonthTodos from './components/ThisMonthTodos';
import UrgentTodos from './components/UrgentTodos';
import TodoGroupMenu from './components/TodoGroupMenu';
import { User } from './classes'
import { useState, useEffect } from 'react'

function App() {
  const user = new User('Jeff');
  const defaultList = user.listOfLists.get(`${user.name}'s List`);
  if (!defaultList) return;
  const myTodo = defaultList?.createTodo();
  if (!myTodo) return;
  myTodo.description = "a new todo";

  const [selectedGroup, setSelectedGroup] = useState("All Todos");
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  defaultList.createTodo("Groceries");
  defaultList.createTodo("Send Email");
  defaultList.createTodo("Take out Trash");
  defaultList.createTodo("Super long title that nobody should be trying to write here");

  function toggleMenu() {
    setIsMenuVisible((prev) => !prev);
  }

  function handleDocumentClick(event: MouseEvent) {
    if (!event.target) return;
    const target = event.target as HTMLElement;
    console.log(target);
    if (!target.classList.contains('todoGroupMenu') && 
    !target.classList.contains('todoGroup') && 
    !target.classList.contains('todoGroupMenuOption')) {
      setIsMenuVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  }, []);

  function filterTodos(group: string) {
    switch (group) {
      case "All Todos":
        return <AllTodos list={defaultList}/>
      case "Today":
        return <TodayTodos list={defaultList}/>
      case "This Week":
        return <WeekTodos list={defaultList}/>
      case "This Month":
        return <MonthTodos list={defaultList}/>
      case "Urgent":
        return <UrgentTodos list={defaultList}/>
    }
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement
    if (target) {
      console.log(target);
      if (target.textContent) {
        setSelectedGroup(target.textContent);
      }
    }
  }

  const todoComponent = filterTodos(selectedGroup);

  return (
    <>
      <h1>Lister</h1>
      <h2 className="listTitle">{defaultList.title}</h2>
      <div className="todoGroupContainer">
        <h3 onClick={toggleMenu} className="todoGroup">{selectedGroup}</h3>
        {isMenuVisible && (
            <TodoGroupMenu handleClick={handleClick}/>
        )}
      </div>
      {todoComponent}
    </>
  )
}

export default App
