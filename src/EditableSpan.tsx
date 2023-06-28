import React, { ChangeEvent } from "react";

type EditableSpanType = {
    title:string,
    onChange:(newValue:string) => void 
}

function EditableSpan(props: EditableSpanType){
    let [editMode, setEditMode] = React.useState(false)
    let [title, setTitle] = React.useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (editMode 
            ? <input onBlur={activateViewMode} 
                    onChange={onChangeTitleHandler} 
                    autoFocus 
                    value={title} 
                    className="editable-input"/>

            : <span onDoubleClick={activateEditMode} tabIndex={0}>{props.title}</span>)
}





export default EditableSpan