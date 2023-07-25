import React, {FC} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {TasksList} from "./TasksList";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (newTitle: string, taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTodolistTitle: (newTodolistTitle: string, todolistId: string) => void
    todolistId: string
    todolistFilter: FilterValuesType
}

export const Todolist: FC<PropsType> = (props: PropsType) => {

    const addTaskTodolist = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const deleteTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const onAllClickHandler = () => props.changeTodolistFilter("all", props.todolistId);
    const onActiveClickHandler = () => props.changeTodolistFilter("active", props.todolistId);
    const onCompletedClickHandler = () => props.changeTodolistFilter("completed", props.todolistId);

    const ChangeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }


    return <div>
        <h3><EditableSpan title={props.title} ChangeTitle={ChangeTodolistTitleHandler}/>
            <button onClick={deleteTodolistHandler}>delete</button>
        </h3>
        <AddItemForm maxTasksTitleLength={15} addNewItem={addTaskTodolist}/>
        <TasksList changeTaskTitle={props.changeTaskTitle} todolistId={props.todolistId} changeTaskStatus={props.changeTaskStatus} removeTask={props.removeTask} tasks={props.tasks}/>

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
