import React, {useState, Fragment} from 'react'

function Bullet(props) {

    const [text, setText] = useState(props.bullet.text);
    const [options, setOptions] = useState(false);

    const showOptions = () => {
        console.log('mouse enter')
        setOptions(true)
    }

    const hideOptions = () => {
        console.log('mouse exit')
        setOptions(false)
    }

    return (
        <div onMouseEnter={showOptions} onMouseLeave={hideOptions}>
            {options ? <span >x</span> : null}
            <textarea onChange={e => setText(e.target.value)}>
                {text}
            </textarea>
        </div>
    )
}

export default Bullet
