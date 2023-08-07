import {AppRootStateType} from "../state/store";
import {TasksStateType, TodolistType} from "../App";

export const todolistsSelector = (state: AppRootStateType): TodolistType[] => state.todolists