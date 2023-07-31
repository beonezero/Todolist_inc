import {v1} from "uuid";
import {
    addTodolistAC, removeTodolistAC, todolistReducer
} from "../reducers/todolist-reducer";
import {TasksStateType, TodolistType} from "../App";
import {taskReducer} from "../reducers/task-reducer";

test('should be equals', () => {

    const startTasksState: TasksStateType = {}
    const startTodolistState: TodolistType[] = []

    const action = addTodolistAC("What?")

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistState = todolistReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)

    const idFromTasks = keys[0]
    const idFromTodolist = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolist).toBe(action.todolistId)
});

test('should be correction remove todolist and task', () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const initialState: TasksStateType = {
        [todolistId_1]: [
            {id: "1", title: "HTML&CSS", isDone: true},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "ReactJS", isDone: false},
            {id: "4", title: "Rest API", isDone: false},
            {id: "5", title: "GraphQL", isDone: false}
        ],
        [todolistId_2]: [
            {id: "6", title: "Magnetic whiteboard", isDone: true},
            {id: "7", title: "Ball", isDone: true},
            {id: "8", title: "Costume", isDone: false},
            {id: "9", title: "Eat", isDone: false},
            {id: "10", title: "Dentist", isDone: false}
        ]}

    const action = removeTodolistAC(todolistId_1)

    const endState = taskReducer(initialState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1);
    expect(endState[todolistId_1]).not.toBeDefined()
});

