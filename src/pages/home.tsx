import React from 'react';
import { Modal, Button } from 'antd';
import { createMachine } from 'xstate';
import icon from "./../jpg/free-icon-play-7477009.png";
import ReactPlayer from 'react-player';

const videoMachine = createMachine({
    id: 'video',
    initial: 'stopped',
    states: {
        playing: {
            on: {
                PAUSE: 'paused',
                CLOSE: 'stopped',
                ENDED: 'stopped'
            }
        },
        paused: {
            on: {
                PLAY: 'playing',
                CLOSE: 'stopped',
            }
        },
        stopped: {
            on: {
                OPEN: 'playing',
                RESTART: 'playing'
            }
        }
    }
});

const sizeMachine = createMachine({
    id: 'size',
    initial: 'normal',
    states: {
        normal: {
            on: {
                TOGGLE_SIZE: 'fullSize',
            },
        },
        fullSize: {
            on: {
                TOGGLE_SIZE: 'normal',
            },
        },
    },
});

const video = 'https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8';

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [videoState, sendVideo] = React.useReducer((state, event) => videoMachine.transition(state, event), videoMachine.initialState);
    const [sizeState, sendSize] = React.useReducer((state, event) => sizeMachine.transition(state, event), sizeMachine.initialState);

    const showModal = () => {
        setIsModalOpen(true);
        sendVideo({ type: 'OPEN' }); 
    };

    const handlePauseStart = () => {
        if (videoState.matches('playing')) {
            sendVideo({ type: 'PAUSE' }); 
        } else {
            sendVideo({ type: 'PLAY' }); 
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        sendVideo({ type: 'CLOSE' }); 
    };

    const toggleSize = () => {
        sendSize({ type: 'TOGGLE_SIZE' }); 
    };

    const handleEnded = () => {
        sendVideo({ type: 'ENDED' });
        sendVideo({ type: 'RESTART' }); 
    };

    return (
      <>
        <div className='closed-modal'>
          <img className='HomeImgPlayer' src={icon} alt="player" onClick={showModal} />
          <Modal 
            title="PLAYER" 
            open={isModalOpen} 
            onCancel={handleCancel} 
            footer={null} 
            width={1000}
            className={`HomePlayerModalStyle ${sizeState.matches('fullSize') ? 'full-size' : 'normal-size'}`}
          >
            <div className='HomePlayerDiv'>
              <ReactPlayer
                url={video}
                playing={videoState.matches('playing')} 
                width="100%"
                height="100%"
                loop={true}
                controls={false}
                onEnded={handleEnded} 
              />
              <div className="controls">
                <Button onClick={handlePauseStart}>
                  {videoState.matches('playing') ? 'Пауза' : 'Старт'} 
                </Button>
                <Button onClick={toggleSize}>
                  {sizeState.matches('fullSize') ? 'Уменьшить размер' : 'Увеличить размер'} 
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </>
    );
};

export default Home;
