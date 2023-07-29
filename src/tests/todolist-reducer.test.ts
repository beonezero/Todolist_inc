import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "../reducers/todolist-reducer";
import {TodolistType} from "../App";

test('should be correction remove todolist', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistId_1, title: "What to learn?", filter: "all"},
        {id: todolistId_2, title: "What to buy?", filter: "all"}
    ]

    const endState = todolistReducer(initialState, removeTodolistAC(todolistId_1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId_2);
});

test('should be correction add todolist', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistId_1, title: "What to learn?", filter: "all"},
        {id: todolistId_2, title: "What to buy?", filter: "all"}
    ]
    const endState = todolistReducer(initialState, addTodolistAC("What doing?"))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What doing?");
});

test('should be correction change filter', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistId_1, title: "What to learn?", filter: "all"},
        {id: todolistId_2, title: "What to buy?", filter: "all"}
    ]

    const endState = todolistReducer(initialState, changeTodolistFilterAC("completed", todolistId_1))

    expect(endState[0].filter).toBe("completed");
});

test('should be correction change title', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const initialState: TodolistType[] = [
        {id: todolistId_1, title: "What to learn?", filter: "all"},
        {id: todolistId_2, title: "What to buy?", filter: "all"}
    ]

    const endState = todolistReducer(initialState, changeTodolistTitleAC("How are you?", todolistId_2))

    expect(endState[1].title).toBe("How are you?");
});
