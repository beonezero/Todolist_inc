import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "../reducers/todolist-reducer";
import {TodolistType} from "../App";

let todolistId_1: string
let todolistId_2: string

let initialState: TodolistType[]

beforeEach(() => {
    todolistId_1 = v1()
    todolistId_2 = v1()

    initialState = [
        {id: todolistId_1, title: "What to learn?", filter: "all"},
        {id: todolistId_2, title: "What to buy?", filter: "all"}
    ]
})

test('should be correction remove todolist', () => {

    const endState = todolistReducer(initialState, removeTodolistAC(todolistId_1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId_2);
});

test('should be correction add todolist', () => {

    const endState = todolistReducer(initialState, addTodolistAC("What doing?"))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What doing?");
});

test('should be correction change filter', () => {

    const endState = todolistReducer(initialState, changeTodolistFilterAC("completed", todolistId_1))

    expect(endState[0].filter).toBe("completed");
});

test('should be correction change title', () => {

    const endState = todolistReducer(initialState, changeTodolistTitleAC("How are you?", todolistId_2))

    expect(endState[1].title).toBe("How are you?");
});
