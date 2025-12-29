import React from "react";
import YouTubeCard from "./YoutubeCard";

// 1. Define Props matching the DB structure
interface Podcast {
  id: string;
  videoId: string;
  title: string;
  description: string;
  views: number;
  likes: number;
  comments: number;
}

interface PodcastProps {
  data: Podcast[];
}

const PodcastSection = ({ data }: PodcastProps) => {
  return (
    <section className="podcast-section container">
      <div className="podcast-container">
        {/* Header: Clean, Minimal, aligned to baseline */}
        <div className="podcast-header">
          <div className="header-left">
            <span className="eyebrow fade-in-up">The Podcasts</span>
            <h2 className="cursive fade-in-up delay-1">Niche with Dikshya</h2>
          </div>
          <div className="header-right">
            <a
              href="https://youtube.com/@Nichewithdikshya" // Replace with actual channel link
              target="_blank"
              rel="noopener noreferrer"
              className="cta-link"
            >
              View Channel <span className="arrow">→</span>
            </a>
          </div>
        </div>

        {/* The Hero Card */}
        {/* Dynamic Cards */}
        <div className="card-container-spacer">
          {data && data.length > 0 ? (
            data.map((video, index) => (
              <YouTubeCard
                key={video.id} // Use DB ID
                videoId={video.videoId}
                title={video.title}
                description={video.description}
                views={video.views}
                likes={video.likes}
                comments={video.comments}
                index={index}
              />
            ))
          ) : (
            <p className="text-center text-gray-400">No podcasts added yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
