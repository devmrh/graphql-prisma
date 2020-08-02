import React from 'react';
import styled from 'styled-components';




const CloseIcon = styled.div`
    color: #000000;
    padding: 10px;
    cursor: pointer;
    backgroundColor: transparent;
    border: 0;
    position: absolute;
    top: 0.3rem;
    right: 0.5rem;
`

const Modal = (props) => {
  const { closeModal } = props;

  // const closeicon = () => (
  //   <div
  //   onClick={closeModal}
  //   style={{
  //     color: '#000000',
  //     padding: '10px',
  //     cursor: 'pointer',
  //     backgroundColor: 'transparent',
  //     border: 0,
  //     position: 'absolute',
  //     top: '0.3rem',
  //     right: '0.5rem',
  //   }}
  //   >
  //     X
  //     </div>
  // );



  return (
    <div className="overlay">
      <div className="content">
        <CloseIcon onClick={closeModal}>X</CloseIcon>
        {props.children}
      </div>
    </div>
  );
};


export default Modal;