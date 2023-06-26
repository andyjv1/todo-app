import React from 'react'
import Button from './Button'

const Footer = ({ setActionsChosen, actionsChosen, color }) => {
    return (
        <footer
            className={(color === "light" ? '' : 'footer--dark')}>
            <div
                className={(color === "light" ? 'buttons' : 'buttons buttons--dark')}>
                <Button
                    setActionsChosen={setActionsChosen}
                    actionsChosen={actionsChosen}
                    setActions={"All"}
                />
                <Button
                    setActionsChosen={setActionsChosen}
                    actionsChosen={actionsChosen}
                    setActions={"Active"}
                />
                <Button
                    setActionsChosen={setActionsChosen}
                    actionsChosen={actionsChosen}
                    setActions={"Completed"}
                />
            </div>


            <p>Drag and drop to reorder list</p>
        </footer>
    )
}

export default Footer