import { useState, useImperativeHandle } from "react"

const Togglabel = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => (setVisible(!visible))

    useImperativeHandle(props.ref, () => {
        return { toggleVisibility }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button type="button" onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>

            <div style={showWhenVisible}>
                {props.children}
                <button type="button" onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
}

export default Togglabel