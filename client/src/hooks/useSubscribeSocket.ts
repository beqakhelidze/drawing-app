import { useEffect, useRef } from 'react';
import { type Socket } from 'socket.io-client';

import useSocketStore from '../store/useSocketStore';

const useSubscribeSocket = (
	subscriptionName: string,
	callback: (data: any) => void
) => {
	const socket = useSocketStore((state) => state.socket) as Socket;
	const callbackRef = useRef(callback);
	callbackRef.current = callback;


	useEffect(() => {
		socket?.on(subscriptionName, (payload: unknown) => {
			callbackRef.current(payload);
		});
		return () => {
			socket?.off(subscriptionName);
		};
	}, [subscriptionName, socket]);
};

export default useSubscribeSocket;
