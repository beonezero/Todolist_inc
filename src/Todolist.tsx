import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    todolistId: string
    todolistFilter: FilterValuesType
}

export const Todolist: FC<PropsType> = (props: PropsType) => {

    const tasksList = (props.tasks.length === 0)
        ? <p>Todolist is empty</p>
        : <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>

    const addTaskTodolist = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    const onAllClickHandler = () => props.changeTodolistFilter("all", props.todolistId);
    const onActiveClickHandler = () => props.changeTodolistFilter("active", props.todolistId);
    const onCompletedClickHandler = () => props.changeTodolistFilter("completed", props.todolistId);

    const deleteTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }


    return <div>
        <h3>{props.title}
        <button onClick={deleteTodolistHandler}>delete</button>
        </h3>
         <AddItemForm maxTasksTitleLength={15} addNewItem={addTaskTodolist}/>
        {tasksList}
        <div>
            <button className={props.todolistFilter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.todolistFilter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.todolistFilter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
