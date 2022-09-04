const topStreamQuery = `
query GetTopStreams($amount: Int!, $after: Cursor!) {
	streams(first: $amount, after: $after) {
	  edges {
		cursor
		node {
		  id
		  title
		  viewersCount
		  language
		  previewImageURL
		  broadcaster {
			profileImageURL(width: 70)
			displayName
		  }
		  tags {
			id
			localizedName
		  }
		  game {
			name
		  }
		}
	  }
	}
  } 
`;

export default topStreamQuery;
