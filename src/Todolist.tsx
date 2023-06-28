import React, { ChangeEvent, KeyboardEvent } from "react"
import { FilterValuesType } from "./App"
import AddItemForm from "./AddItemForm"
import EditableSpan from "./EditableSpan"

type PropsType = {
    id: string,
    title: string,
    tasks: TaskType[],
    removeTask: (id: string, todolistId: string) => void,
    changeFilter: (value: FilterValuesType, todolistId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void,
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void,
    filter: FilterValuesType,
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (todolistId: string, newTitle: string) => void,
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}


export function Todolist(props: PropsType) {
    const onAllClickFilter = () => props.changeFilter("all", props.id)
    const onActiveClickFilter = () => props.changeFilter("active", props.id)
    const onCompletedClickFilter = () => props.changeFilter("completed", props.id)

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistItem = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return <div className="card">
        <div className="card_header">
            <h3 >
                <EditableSpan title={props.title} onChange={changeTodolistItem} />
            </h3>
            <button onClick={removeTodolist} className="btn">x</button>
        </div>

        <AddItemForm addItem={addTask} />

        <ul className="card_list">
            {props.tasks.map((t) => {
                const onRemoveHamdler = () => { props.removeTask(t.id, props.id) }
                
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                }
                const onChangeTitleHandler = (newValue: string) => {
                    props.changeTaskTitle(t.id, newValue, props.id)
                }

                return <li key={t.id} className={t.isDone ? "is-done" + " taskslist_item" : " taskslist_item"}>
                    <div>
                        <input type="checkbox"
                            className="checkbox"
                            checked={t.isDone}
                            onChange={onChangeStatusHandler}
                        />
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                    </div>
                    <button onClick={onRemoveHamdler} className="btn">х</button>
                </li>
            })
            }

        </ul>
        <div className="filter-btn-cont">
            <button className={props.filter === 'all'  ? "active-filter btn filter-btn" :  'btn filter-btn'} onClick={onAllClickFilter}>All</button>
            <button className={props.filter === 'active' ? "active-filter btn filter-btn" :  'btn filter-btn'} onClick={onActiveClickFilter}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter btn filter-btn" : 'btn filter-btn'} onClick={onCompletedClickFilter}>Completed</button>
        </div>
    </div>
}

export default Todolist


