import React, { useEffect, useState } from 'react'
import { connect } from '../components/Websocket'

const useSocketConnection = () => {
    const connectWrapper = ({ playerName, getOnlinePlayers }) => connect({
        onOpen: () => console.log('open'),
        onClose: ({ reason }) => console.log('closed'),
        onMessage: ({ eventName, payload}) => {
            console.log({playerName})
            console.log('receiving message')
            console.log({eventName, payload})
            const isOnlinePlayerEvent = eventName === 'online-players';
                if (isOnlinePlayerEvent){
                    getOnlinePlayers(payload)
                }
        },
        playerName: { playerName },
    })

    const [gameStarted, setGameStarted] = useState(false);

return {
    connectWrapper,
    gameStarted,
    setGameStarted
    };
}
export default useSocketConnection
