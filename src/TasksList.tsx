import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";
import {EditableSpan} from "./EditableSpan";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Checkbox} from "@mui/material";

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
                        <Checkbox size={"small"}
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} ChangeTitle={ChangeTaskTitleHandler}/>
                        <DeleteForeverIcon onClick={onClickHandler}/>
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
