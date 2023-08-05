import {combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "../reducers/task-reducer";
import {todolistReducer} from "../reducers/todolist-reducer";

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolist: todolistReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

//window.store = store