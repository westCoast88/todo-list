import React from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { TaskType } from './Todolist';
import { v1 } from 'uuid'
import AddItemForm from './AddItemForm';

export type FilterValuesType = "all" | "completed" | "active";
type todoListType = { id: string, title: string, filter: FilterValuesType }
type tasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  const todoList1 = v1()
  const todoList2 = v1()
  const todoList3 = v1()

  let [todolists, setTodoLists] = React.useState<Array<todoListType>>([
    { id: todoList1, title: 'Список фильмов', filter: 'all' },
    { id: todoList2, title: 'Список покупок', filter: 'all' },
    { id: todoList3, title: 'Дела на сегодня', filter: 'all' },
  ])

  let [tasksObj, setTasks] = React.useState<tasksStateType>({
    [todoList1]: [
    { id: v1(), title: 'Страх и ненависть в ЛВ', isDone: false },
    { id: v1(), title: 'Настоящий детектив', isDone: true },
    { id: v1(), title: 'Отступники', isDone: true },
    { id: v1(), title: 'Далласский клуб покупателей', isDone: false },
    { id: v1(), title: 'Омерзительная восьмёрка', isDone: false },
    { id: v1(), title: 'Мальтийский сокол', isDone: false },
  ],
    [todoList2]: [
    { id: v1(), title: 'Хлеб', isDone: false },
    { id: v1(), title: 'Молоко', isDone: false },
    { id: v1(), title: 'Лопасть от вентилятора', isDone: true },
    { id: v1(), title: 'Черешня', isDone: false },
    { id: v1(), title: 'Перо полярной совы', isDone: false },
  ],
    [todoList3]: [
    { id: v1(), title: 'Оформить отчёт', isDone: true },
    { id: v1(), title: 'Дочитать книгу', isDone: false },
    { id: v1(), title: 'Подебажить проект', isDone: false },
  ]
  })

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(t => { return t.id !== id })
    tasksObj[todolistId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.filter(tl => tl.id === todolistId)[0]

    if (todolist) {
      console.log(todolist)
      todolist.filter = value
      setTodoLists([...todolists])
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)

    if (task) {
      task.isDone = isDone
      tasksObj[todolistId] = tasks
      setTasks({ ...tasksObj })
    }
  }

  function removeTodolist(todolistId: string) {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodoLists(filteredTodolist)
    delete tasksObj[todolistId]
    setTasks({ ...tasksObj })
  }

  function addTodoList(title: string) {
    let todoList: todoListType = {
      id: v1(),
      filter: 'all',
      title: title,
    }
    setTodoLists([todoList, ...todolists])
    setTasks({ ...tasksObj, [todoList.id]: [] })
  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)

    if (task) {
      task.title = newTitle
      tasksObj[todolistId] = tasks
      setTasks({ ...tasksObj })
    }
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === todolistId)

    if (todolist) {
      todolist.title = newTitle
      setTodoLists([...todolists])
    }
  }


  return (
    <div className="App">
      <div className='container'>
        <div className='container_addBlock'>
          <h2>Добавить список</h2>
          <AddItemForm addItem={addTodoList} />
        </div>

        {todolists.map((tl) => {

          let tasksForTodoList = tasksObj[tl.id]

          if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
          }
          if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone !== true)
          }

          return <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
        })}
      </div>

    </div>
  );
}

export default App;


