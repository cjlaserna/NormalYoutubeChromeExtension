## thumbnails

- on youtube, thumbnails are in arrays
  richItemRenderer.content.videoRenderer.thumbnail.

- on twitch
  data.streams.edges.node.previewImageURL

## runs

- richItemRenderer.content.videoRenderer.thumbnail.runs => set as "..."

## accessibility

- richItemRenderer.content.videoRenderer.thumbnail.accessibility.accessibilityData.label --> set as Twitch title , which is data.streams.edges.node.title

## descriptionSnippet

- richItemRenderer.content.videoRenderer.thumbnail.descriptionSnippet.runs (text array) --> set as Twitch title , which is data.streams.edges.node.title

## longBylineText

- richItemRenderer.content.videoRenderer.thumbnail.longBylineText.runs[0]
- {text: set as twitch user --> data.streams.edges.node.broadcaster.displayName}

- {navigationEndpoint:

  - leave clickTrackingParams alone
  - commandMetaData.webCommandMetadata {

    - url: /c/ (twitch user => data.streams.edges.node.broadcaster.displayName)

  - \*\*\*leave web page type alone
  - \*\*\* leave rootVe alone
  - \*\*\* leave apiUrl alone
    }

- browse endpoint
- leave browseID alone
- canonicalBaseUrl is same as webCommandMetadata url
  }

## richItemRenderer.content.videoRenderer.publishedTimeText

- simple text => change to stream category which is,
  data.streams.edges.node.game.name

## lengthtext

- richItemRenderer.content.videoRenderer.lengthText
  change richItemRenderer.content.videoRenderer.lengthText.accessibility.accessibilityData.label
  to "LIVE"

- richItemRenderer.content.videoRenderer.lengthText.simpleText -> "LIVE"

## viewCountText

viewcounttext.simpletext =>
data.streams.edges.node.viewersCount

## navigationEndpoint

- \*\*\* leave clickTrackingParams
- commandMetadata -> commandMetadata {

  - url: 'twitch.tv/' + channel display name, which is
    data.streams.edges.node.broadcaster.displayName

  - \*\*\* webpagetype left alone
  - \*\*\* rootve left alone
    }

- \*\*\*watchEndpoint left alone

## ownerBadges

left alone

## ownerText

- runs[0]
  .text changed to display name

## navigationEndpoint

- clickTrackingParams stays same
- commandMetadata.webCommandMetadata{
  - url -> 'twitch.tv/' + channel display name, which is
    data.streams.edges.node.broadcaster.displayName
  - \*\*\_webpagetype stays the same
  - \*\* rootve stays the same
    \*\*\* api url stays the same
    }

## browseendpoint

- \*\*\*browseid stays the same
- canonicalBaseUrl changed to -> 'twitch.tv/' + channel display name, which is
  data.streams.edges.node.broadcaster.displayName

## trackingParams stays the same

## showActionMenu stays the same

## shortViewCountText

data.streams.edges.node.viewersCount

## menu stays the same

## channelThumbnailSupportedRenderers

.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0]
changed to data.streams.edges.node.previewImageURL

- navigationEndpoint
  - clickTrackingParams stays same
  - commandMetadata
    - url: display name + url
    - webpagetype stays the same
    - api url stays the same
  - browse endpoint
    - browse id stays
    - canonical url same as prev
- accessibility stays the same

## thumbnail overlays

- thumbnailOverlayTimeStatusRenderer
  - timestamp changes to "LIVE"
  - thumbnailOverlayToggleButtonRenderer stays the same

## rich thumb

- prev img

## inlinePlaybackEndpoint

- stays the same

# tracking params stays the same
