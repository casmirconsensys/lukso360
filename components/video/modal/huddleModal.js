import React from 'react';
 
function huddleModal({ closeModal }) {
  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <button onClick={() => closeModal(false)}>X</button>
            <div className='title'>
                <h1>Join Lobby</h1>
                <div className='Body'>
                    <p>Enter the Lobby...</p>
                    <div className='footer'>
                        <button>Close</button>
                        <button>Join</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>

  )
}

export default huddleModal