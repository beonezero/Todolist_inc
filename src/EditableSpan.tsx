import React, {ChangeEvent, FC, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    ChangeTitle: (title: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = ({title, ChangeTitle}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [localTitle, setLocalTitle] = useState<string>(title)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        ChangeTitle(localTitle)
    }

    return (
        editMode
        ? <input autoFocus={true} onBlur={offEditMode} value={localTitle} onChange={onChangeInputHandler}/>
        : <span onDoubleClick={onEditMode}>{title}</span>
    );
};