import {v1} from "uuid";
import {TasksStateType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "../reducers/task-reducer";
import {addTodolistAC} from "../reducers/todolist-reducer";

let todolistId_1 : string
let todolistId_2 : string

let initialState: TasksStateType

beforeEach(()=>{
    todolistId_1 = v1()
   todolistId_2 = v1()

    initialState = {
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
})

test('should be correction remove task', () => {

    const endState: TasksStateType = taskReducer(initialState, removeTaskAC("3",todolistId_1))

    expect(endState[todolistId_1].length).toBe(4);
    expect(endState[todolistId_1][2].id).toBe("4");
});


test('should be correction add task', () => {

    const endState: TasksStateType = taskReducer(initialState, addTaskAC("linseed oil", todolistId_2))

    expect(endState[todolistId_2].length).toBe(6);
    expect(endState[todolistId_2][0].title).toBe("linseed oil");
});

test('should be correction change title for task', () => {


    const endState: TasksStateType = taskReducer(initialState, changeTaskTitleAC("8", todolistId_2, "Blazer"))

    expect(endState[todolistId_2].length).toBe(5);
    expect(endState[todolistId_2][2].title).toBe("Blazer");
    expect(endState[todolistId_2][2].id).toBe("8");
});

test('should be correction change status for task', () => {


    const endState: TasksStateType = taskReducer(initialState, changeTaskStatusAC("3", todolistId_1, true))

    expect(endState[todolistId_1].length).toBe(5);
    expect(endState[todolistId_1][2].isDone).toBe(true);
    expect(endState[todolistId_2][2].isDone).toBe(false);
    expect(endState[todolistId_1][2].id).toBe("3");
});

test('should be correction add empty array task', () => {


    const action = addTodolistAC("Work")
    const endState: TasksStateType = taskReducer(initialState, action)

    const keys = Object.keys(endState)

    const newKey = keys.find(k => k !== todolistId_1 && k !== todolistId_2)

    if(!newKey){
        throw Error("new key should be added")
    }


    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

});