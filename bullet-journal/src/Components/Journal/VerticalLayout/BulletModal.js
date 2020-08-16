import React, {useState} from 'react'

const overlayStyle = {
    display: 'block'
    ,position: 'fixed'
    ,zIndex: 1
    ,left: 0
    ,top: 0
    ,width: '100%'
    ,height: '100%'
    ,lineHeight: '100%'
    ,overflow: 'auto'
    ,backgroundColor: 'rgb(0, 0, 0)'
    ,backgroundColor: 'rgba(0, 0, 0, 0.4)'
}

const contentStyle = {
    position: 'relative'
    ,backgroundColor: '#fefefe'
    ,borderRadius: '10px'
    ,border: '1px solid #888'
    ,width: '80%' 
    ,margin: '10%'
    ,verticalAlign: 'middle'
    ,boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    ,webkitAnimationName: 'animatetop'
    ,webkitAnimationDuration: '0.5s'
    ,animationName: 'animatetop'
    ,animationDuration: '0.5s'
}

const headerStyle = {
    borderRadius: '0.5em 0.5em 0px 0px'
    ,backgroundColor: '#8fcbff'
    ,textAlign: 'center'
    ,height: '2.5em'
    ,color: 'white'
    ,fontSize: '1em'
    ,lineHeight: '2em'
}

const bodyStyle = {
    padding: '10px',
    textAlign: 'center'
}

const confirmButtonStyle = {
    left: 0
    ,right: 0
    ,color: '#fff'
    ,backgroundColor: '#4287f5'
    ,height: '25%'
    ,width: '40%'
    ,padding: '6px 12px'
    ,fontSize: '1.5em'
    ,textAlign: 'center'
    ,border: '1px solid transparent'
    ,borderRadius: '10px'
}

const cancelButtonStyle = {
    left: 0
    ,right: 0
    ,color: '#fff'
    ,height: '25%'
    ,width: '40%'
    ,padding: '6px 12px'
    ,fontSize: '1.5em'
    ,textAlign: 'center'
    ,border: '1px solid transparent'
    ,borderRadius: '10px'
}

const closeIconStyle = {
    color: 'white'
    ,float: 'right'
    ,fontSize: '2em'
    ,fontWeight: 'bold'
    ,marginRight: '0.5em'
}

const closeIconHover = {
    color: '#000'
    ,textDecoration: 'none'
    ,cursor: 'pointer'
}

function BulletModal() {

    const [showModal, setShowModal] = useState(true)
    console.log(showModal)
    return (
        showModal ? 
            <div style={overlayStyle}>
                
                <div style={contentStyle}>
        
                    <div style={headerStyle}>
                        <span></span>
                        <span 
                            style={closeIconStyle} 
                            onClick={() => setShowModal(false)}
                        >&times;</span>
                    </div>
        
                    <div style={bodyStyle}>
                        <input type="hidden" id="rowIndex" />
            
                        <select class="form-control" id="selectCategory">
                        <optgroup>
                            <option value="none" selected disabled>--Select Category--</option>
                            <option value="food">Work</option>
                            <option value="water">Casual</option>
                        </optgroup>
                        </select>
            
                        <textarea class="form-control" placeholder="To do..." />

                        <br />
                        <input type="button" value="Save"
                        style={confirmButtonStyle} onclick="addRecord()" />
                        <input type="button"  value="Cancel"
                        style={cancelButtonStyle} onclick="deleteRecord()" />
        
                    </div> {/**modal body div*/}
        
                    <div class="modal-footer"> </div>

                </div> {/**modal content div */}
        
            </div>
        : null
    )
}

export default BulletModal