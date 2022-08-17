import { useEffect, useState } from "react";
import { connect } from "../components/Websocket";

const useSocketConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  const connectWrapper = ({ playerName, getOnlinePlayers }) =>
    connect({
      onOpen: () => {
        console.log("open");
      },
      onClose: ({ reason }) => {
        console.log({ closedReason: reason });
      },
      onMessage: ({ eventName, payload }) => {
        const isOnlinePlayerEvent = eventName === "online-players";

        if (isOnlinePlayerEvent) {
          getOnlinePlayers(payload);
        }
      },
      playerName: { playerName },
    });

  return {
    connectWrapper,
    isConnected,
    setIsConnected,
  };
};

export default useSocketConnection;
