import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolist-reducer";


export type TasksActionType = RemoveTaskACType | AddTaskACType | ChangeTaskTitleACType | ChangeTaskStatusACType | addTodolistAC | removeTodolistAC

type RemoveTaskACType = ReturnType<typeof removeTaskAC>

type AddTaskACType = ReturnType<typeof addTaskAC>

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

let initialState: TasksStateType = {}


export const taskReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {

        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case "ADD-TASK":
            return {...state, [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]}

        case "CHANGE-TASK-TITLE":
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title}: t)}

        case "CHANGE-TASK-STATUS":
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId? {...t, isDone: action.isDone}: t)}

        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}

        case "REMOVE-TODOLIST":
            let stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy


        default:
            return state
    }
};


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", title, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, todolistId: string, title: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, todolistId, title} as const
}

export const changeTaskStatusAC = (taskId: string, todolistId: string, isDone: boolean) => {
    return {type: "CHANGE-TASK-STATUS", taskId, todolistId, isDone} as const
}