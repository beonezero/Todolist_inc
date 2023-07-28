import {TodolistType} from "../App";
import {v1} from "uuid";

export type actionType = removeTodolistAC | addTodolistAC

type removeTodolistAC = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}

type addTodolistAC = {
    type: "ADD-TODOLIST"
    title: string
}

export const todolistReducer = (todolist: TodolistType[], action: actionType): TodolistType[] => {
    switch (action.type) {

        case "REMOVE-TODOLIST":
            return todolist.filter(tl => tl.id != action.todolistId)

        case "ADD-TODOLIST":
            const newTodolistId = v1()
            return [{id: newTodolistId, title: action.title, filter: "all"}, ...todolist]

        default:
            return todolist
    }
};


export const removeTodolistAC = (todolistId: string): removeTodolistAC => {
    return {type: "REMOVE-TODOLIST", todolistId}
}

export const addTodolistAC = (title: string): addTodolistAC => {
    return {type: "ADD-TODOLIST", title}
}