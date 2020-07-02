import React, {useState, Fragment} from 'react'

function Bullet(props) {

    const [text, setText] = useState(props.bullet.text);

    return (
        <div>
            <textarea onChange={e => setText(e.target.value)}>
                {text}
            </textarea>
        </div>
    )
}

export default Bullet
