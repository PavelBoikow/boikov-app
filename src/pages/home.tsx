import React, { useState } from 'react';
import { Button, Modal } from 'antd';

import icon from "./../jpg/free-icon-play-7477009.png";

const Home: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    return (
      <>
        <div className='closed-modal'>
          <img className='HomeImgPlayer' src={icon} alt="player" onClick={showModal}/>
          <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </div>
      </>
    );
};

export default Home;