import React from 'react';
import Modal from 'react-modal';

import './Login.css'
import logo from "../../assets/images/svg/twitter_logo.svg";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function Login() {

  return (
    <div className="background">
      <Modal
        isOpen={true}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img className="logo" src={logo} alt="logo" />
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
}

export default Login