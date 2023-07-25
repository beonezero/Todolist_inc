import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";
import {EditableSpan} from "./EditableSpan";

type TasksListPropsType = {
    todolistId: string
    tasks: Array<TaskType>
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (newTitle: string, taskId: string, todolistId: string) => void
}

export const TasksList = (props: TasksListPropsType) => {
    const tasksList = (props.tasks.length === 0)
        ? <p>Todolist is empty</p>
        : <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId);
                    }
                    const ChangeTaskTitleHandler = (title: string) => {
                        props.changeTaskTitle(title, t.id, props.todolistId)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} ChangeTitle={ChangeTaskTitleHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>

    return (
        <div>
            {tasksList}
        </div>
    );
};
