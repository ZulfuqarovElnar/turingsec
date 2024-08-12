declare module 'socket.io-client' {
  import { ManagerOptions, SocketOptions } from 'socket.io-client/build/esm-manager';
  import { Socket as ClientSocket } from 'socket.io-client/build/esm-socket';

  export { ManagerOptions, SocketOptions, ClientSocket };

  export interface SocketOptions {
    query?: {
      [key: string]: string;
    };
    forceNew?: boolean;
    multiplex?: boolean;
    reconnection?: boolean;
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
    reconnectionDelayMax?: number;
    randomizationFactor?: number;
    timeout?: number;
    autoConnect?: boolean;
    parser?: any;
    [key: string]: any;
  }

  export function io(uri?: string, opts?: Partial<ManagerOptions & SocketOptions>): ClientSocket;
}
