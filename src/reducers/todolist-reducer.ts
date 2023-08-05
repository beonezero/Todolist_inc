import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type actionType = removeTodolistAC | addTodolistAC | changeTodolistFilterType | changeTodolistTitleType

export type removeTodolistAC = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}

export type addTodolistAC = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

type changeTodolistFilterType = {
    type: "CHANGE-TODOLIST-FILTER"
    value: FilterValuesType
    todolistId: string
}

type changeTodolistTitleType = {
    type: "CHANGE-TODOLIST-TITLE"
    newTitle: string
    todolistId: string
}

let initialState: TodolistType[] = []

export const todolistReducer = (todolist = initialState, action: actionType): TodolistType[] => {
    switch (action.type) {

        case "REMOVE-TODOLIST":
            return todolist.filter(tl => tl.id != action.todolistId)

        case "ADD-TODOLIST":
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...todolist]

        case "CHANGE-TODOLIST-FILTER":
            return todolist.map(tl => tl.id === action.todolistId
                ? {...tl, filter: action.value} : tl)

        case "CHANGE-TODOLIST-TITLE":
            return todolist.map(tl => tl.id === action.todolistId ? {...tl, title: action.newTitle} : tl)

        default:
            return todolist
    }
};


export const removeTodolistAC = (todolistId: string): removeTodolistAC => {
    return {type: "REMOVE-TODOLIST", todolistId} as const
}

export const addTodolistAC = (title: string): addTodolistAC => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()} as const
}

export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string): changeTodolistFilterType => {
    return {type: "CHANGE-TODOLIST-FILTER", value, todolistId} as const
}

export const changeTodolistTitleAC = (newTitle: string, todolistId: string): changeTodolistTitleType => {
    return {type: "CHANGE-TODOLIST-TITLE", newTitle, todolistId} as const
}