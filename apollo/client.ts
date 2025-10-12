// client.ts
import { useMemo } from 'react';
import { ApolloClient, ApolloLink, InMemoryCache, split, from, NormalizedCacheObject } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { getJwtToken } from '../libs/auth';
import { sweetErrorAlert } from '../libs/sweetAlert';
import { socketVar } from './store';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Function to set headers with JWT
function getHeaders() {
	const headers: Record<string, string> = {};
	const token = getJwtToken();
	if (token) headers['Authorization'] = `Bearer ${token}`;
	return headers;
}

// Custom WebSocket implementation to store socket globally
class LoggingWebSocket {
	private socket: WebSocket;

	constructor(url: string) {
		this.socket = new WebSocket(`${url}?token=${getJwtToken()}`);
		socketVar(this.socket);

		this.socket.onopen = () => console.log('WebSocket connected');
		this.socket.onmessage = (msg) => console.log('WebSocket message: ', msg.data);
		this.socket.onerror = (err) => console.log('WebSocket error: ', err);
	}

	send(data: string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView) {
		this.socket.send(data);
	}

	close() {
		this.socket.close();
	}
}

function createIsomorphicLink() {
	if (typeof window === 'undefined') return null;

	// HTTP link
	const httpLink = createUploadLink({
		uri: process.env.REACT_APP_API_GRAPHQL_URL, // e.g., https://72.60.197.203:4001/graphql
	});

	// WebSocket link for subscriptions
	const wsLink = new WebSocketLink({
		uri: process.env.REACT_APP_API_WS ?? 'wss://72.60.197.203:4001', // use WSS for HTTPS
		options: {
			reconnect: true,
			connectionParams: {
				headers: getHeaders(),
			},
		},
		webSocketImpl: LoggingWebSocket,
	});

	// Error handling
	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach(({ message }) => {
				if (!message.includes('input')) sweetErrorAlert(message);
			});
		}
		if (networkError) console.log('[Network error]:', networkError);
	});

	// Auth headers for each request
	const authLink = new ApolloLink((operation, forward) => {
		operation.setContext(({ headers = {} }) => ({
			headers: {
				...headers,
				...getHeaders(),
			},
		}));
		return forward(operation);
	});

	// Split links: subscriptions -> ws, others -> http
	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
		},
		wsLink,
		authLink.concat(httpLink as any), // cast because createUploadLink types are slightly different
	);

	return from([errorLink, splitLink]);
}

// Apollo Client initialization
function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: createIsomorphicLink()!,
		cache: new InMemoryCache(),
		resolvers: {},
	});
}

// Initialize Apollo with optional state
export function initializeApollo(initialState: any = null) {
	const _apolloClient = apolloClient ?? createApolloClient();

	if (initialState) _apolloClient.cache.restore(initialState);
	if (typeof window !== 'undefined' && !apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
}

// React hook for Apollo
export function useApollo(initialState: any) {
	return useMemo(() => initializeApollo(initialState), [initialState]);
}
