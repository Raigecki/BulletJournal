import React, {useState, Fragment} from 'react'

function Bullet(props) {

    const [text, setText] = useState(props.bullet.text);

    return (
        <Fragment>
            <textarea onChange={e => setText(e.target.value)}>
                {text}
            </textarea>
        </Fragment>
    )
}

export default Bullet
