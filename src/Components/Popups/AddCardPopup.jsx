import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { Context } from '../../Data/context'

const AddCardPopup = () => {

    const { addCard, setAddCard } = useContext(Context)

    const onClosePopup = () => {
        if (addCard === false) {
            setAddCard(true);
        } else {
            setAddCard(false);
        }
    };


    return (
        <div>
            <div className="popup_close">
                <button onClick={() => onClosePopup()}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
            <h2 className="popup_heading">Add Credit Card.</h2>
        </div>
    )
}

export default AddCardPopup
