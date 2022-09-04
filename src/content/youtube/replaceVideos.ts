import formatVideo from './formatVideo';
import topStreamQuery from './queries/topStreams';

// query and api stuff
var operationOverrides = {
	lastCursor: '',
	Endpoint: 'https://gql.twitch.tv/gql',
	ClientID: 'kimne78kx3ncx6brgo4mv6wki5h1ko',
	OldEndpoint:
		'/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',

	get getTopStreams() {
		return JSON.stringify([
			{
				query: topStreamQuery,
				variables: {
					operationName: 'GET_TOP_STREAMS',
					amount: 24,
					after: this.lastCursor,
				},
			},
		]);
	},
};

async function getResponseObjects(
	oldRequest: Request,
	newRequest: Request
): Promise<any[]> {
	// returns [responseObj, ResponseObj]
	let response;
	let originalResponse;

	// fetch responses
	await Promise.all([
		originalFetch(oldRequest),
		originalFetch(newRequest),
	]).then(async (res) => {
		// turn response to json obj and return res.json();
		const [oldResponse, newResponse] = res;
		originalResponse = oldResponse;
		await Promise.all([oldResponse.json(), newResponse.json()]).then(
			async (res) => {
				console.log(res);
				response = res;
			}
		);
	});
	return [...response, originalResponse];
}

async function formatResponse(oldResponse, newResponse) {
	let youtubeVideos =
		oldResponse.onResponseReceivedActions[0].appendContinuationItemsAction
			.continuationItems;
	const twitchVideos = newResponse[0].data.streams.edges;

	const remainder = youtubeVideos[24];
	youtubeVideos = youtubeVideos.slice(0, 24);

	let formattedVideos = youtubeVideos.map(async (video, index) => {
		let res = await formatVideo(video, twitchVideos[index].node);
		return res;
	});

	return await Promise.all(formattedVideos).then((res: any[]) => {
		formattedVideos = res;
		formattedVideos.push(remainder);
		return formattedVideos;
	});
}

function jsonResponse<T>(obj: T) {
	const response = new Response(JSON.stringify(obj));

	Object.defineProperties(response, {
		url: {
			value:
				'https://www.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false',
		},
		type: {
			value: 'basic',
		},
	});

	return response;
}

const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
	let [resource, config] = args;

	// only intercepts if the request url is the target endpoint
	if (
		typeof resource === 'object' &&
		resource.url.includes(operationOverrides.OldEndpoint)
	) {
		// Request Interceptor
		const oldRequest = resource;

		// Creating a new request to Twitch
		let headers = new Headers();
		headers.append('Accept', '*/*');
		headers.append('Client-Id', operationOverrides.ClientID);

		const init = {
			method: 'POST',
			headers: headers,
			body: operationOverrides.getTopStreams,
		};

		const newRequest = new Request(operationOverrides.Endpoint, init);

		// Response Interceptor
		let response;

		const [oldResponse, newResponse, oldResPromise] = await getResponseObjects(
			oldRequest,
			newRequest
		);

		let formattedRes = await formatResponse(oldResponse, newResponse).then(
			(res) => {
				return res;
			}
		);

		// replace videos in response with formatted response
		response = oldResponse;
		response.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems =
			formattedRes;

		// moves cursor to last stream so that it doesn't repeat twitch streams
		operationOverrides.lastCursor =
			newResponse[0].data.streams.edges[23].cursor;
		// return
		return jsonResponse(response);
	}
};
