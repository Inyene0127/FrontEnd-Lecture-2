import { useState } from 'react'
import { connect } from '../components/Websocket'

const useSocketConnection = () => {
    const connectWrapper = ({ playerName, getOnlinePlayers }) => connect({
        onOpen: () => {},
        onClose: () => {},
        onMessage: ({ eventName, payload}) => {
            const isOnlinePlayerEvent = eventName === 'online-players';
                if (isOnlinePlayerEvent){
                    getOnlinePlayers(payload)
            }
        },
        playerName: { playerName },
    })
    const [isConnected, setIsConnected] = useState(false);

return {
    connectWrapper,
    isConnected,
    setIsConnected
    };
}
export default useSocketConnection
