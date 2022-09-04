import commonUtil from '../utils/commonUtils';

// helper functions
function nestContent(trackingParams: string, content: any) {
	const response = {
		richItemRenderer: {
			content: {
				videoRenderer: content,
			},
			trackingParams: trackingParams,
		},
	};
	return response;
}

// main function
async function formatVideo(youtubeVideo, twitchEquivalent) {
	if (youtubeVideo.richItemRenderer === undefined) {
		return youtubeVideo;
	}

	const oldContent = youtubeVideo.richItemRenderer.content.videoRenderer;
	let newContent = oldContent; // to return

	const trackingParams: string = youtubeVideo.richItemRenderer.trackingParams;
	try {
		// individual stuff from twitch
		const title = twitchEquivalent.title;
		const viewCount = `${commonUtil.display(
			twitchEquivalent.viewersCount,
			1
		)} Viewers`;
		const channel = twitchEquivalent.broadcaster.displayName;
		const channelUrl = `https://www.twitch.tv/${twitchEquivalent.broadcaster.displayName}/`;
		const category = twitchEquivalent.game.name;
		const profileImageURL = twitchEquivalent.broadcaster.profileImageURL;

		// get thumbnail given height + width
		function getThumbnail(
			width: string | number,
			height: string | number
		): String {
			let thumbnail = twitchEquivalent.previewImageURL;
			thumbnail = thumbnail.replace('{width}', width);
			thumbnail = thumbnail.replace('{height}', height);

			return thumbnail;
		}

		// replacing thumbnails
		const thumbnails = {
			thumbnail: {
				thumbnails: [
					{
						...oldContent.thumbnail.thumbnails[0],
						url: getThumbnail(
							oldContent.thumbnail.thumbnails[0].width,
							oldContent.thumbnail.thumbnails[0].height
						),
					},
				],
			},
			richThumbnail: {
				movingThumbnailRenderer: {
					...oldContent.richThumbnail.movingThumbnailRenderer,
					movingThumbnailDetails: {
						...oldContent.richThumbnail.movingThumbnailRenderer
							.movingThumbnailDetails,
						thumbnails: {
							...oldContent.richThumbnail.movingThumbnailRenderer
								.movingThumbnailDetails.thumbnails[0],
							url: getThumbnail(
								oldContent.richThumbnail.movingThumbnailRenderer
									.movingThumbnailDetails.thumbnails[0].width,
								oldContent.richThumbnail.movingThumbnailRenderer
									.movingThumbnailDetails.thumbnails[0].height
							),
						},
					},
					enableOverlay: false,
				},
			},
		};

		// change titles
		newContent.title.runs[0].text = title;
		newContent.title.accessibility.accessibilityData.label = title;
		newContent.descriptionSnippet.runs[0].text = title;

		// change channels
		newContent.longBylineText.runs[0].text = channel;
		newContent.longBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url =
			channelUrl;
		newContent.longBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl =
			channelUrl;
		newContent.navigationEndpoint.commandMetadata.webCommandMetadata.url =
			channelUrl;
		newContent.ownerText.runs[0].text = channel;
		newContent.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url =
			channelUrl;
		newContent.ownerText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl =
			channelUrl;
		newContent.shortBylineText.runs[0].text = channel;
		newContent.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url =
			channelUrl;
		newContent.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl =
			channelUrl;
		newContent.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url =
			channelUrl;
		newContent.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.navigationEndpoint.browseEndpoint.canonicalBaseUrl =
			channelUrl;
		newContent.inlinePlaybackEndpoint.commandMetadata.webCommandMetadata.url =
			channelUrl;

		// change categories and labels
		newContent.publishedTimeText.simpleText = category;
		newContent.lengthText.accessibility.accessibilityData.label = 'LIVE';
		newContent.lengthText.simpleText = 'LIVE';
		newContent.viewCountText.simpleText = viewCount;
		newContent.shortViewCountText.accessibility.accessibilityData.label =
			viewCount;
		newContent.shortViewCountText.simpleText = viewCount;
		newContent.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.text.accessibility.accessibilityData.label =
			'LIVE';
		newContent.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.text.simpleText =
			'LIVE';

		// profile picture
		newContent.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0].url =
			profileImageURL;

		newContent = {
			...newContent,
			...thumbnails,
		};

		newContent = nestContent(trackingParams, newContent);
		console.log('test');
		return newContent;
	} catch {
		console.log('catch');
		return nestContent(trackingParams, oldContent);
	}
}

export default formatVideo;
