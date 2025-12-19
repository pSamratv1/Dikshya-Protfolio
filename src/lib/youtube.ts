type YouTubeVideoData = {
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      maxres?: { url: string };
      high: { url: string };
    };
  };
  statistics: {
    viewCount: string;
    likeCount?: string;
    commentCount?: string;
  };
};

export async function getYouTubeVideo(videoId: string) {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
    { next: { revalidate: 3600 } } // cache for 1 hour
  );

  if (!res.ok) {
    throw new Error("Failed to fetch YouTube video data");
  }

  const data = await res.json();
  return data.items[0] as YouTubeVideoData;
}
