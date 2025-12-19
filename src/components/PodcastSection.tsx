import React from "react";
import YouTubeCard from "./YoutubeCard";

const PodcastSection = () => {
  const videos = [
    {
      videoId: "GwxBsTwETeI",
      title: "Finding Clarity in Chaos: The Art of Slow Growth",
      description:
        "Jay Parmar is a dynamic leadership coach who breaks down why 'hustle culture' is destroying our creativity. We discuss mindfulness, strategic pauses, and building a legacy.",
      views: 12400,
      likes: 840,
      comments: 42,
    },
    {
      videoId: "C83cm-JDpts",
      title: "He Grew Up on Free School Meals",
      description:
        "Imran's commitment to mission over money faced its ultimate test in 2025 when another corporation approached Tape UK with a valuation so astronomical that most would have accepted without hesitation.",
      views: 12400,
      likes: 840,
      comments: 42,
    },
    {
      videoId: "FMGvpe4IhFM",
      title: "Toxic Positivity, Burnout & Beyond",
      description:
        "In this real-talk episode, psychologist and mindset coach Maija Morton dives into the messy truths behind toxic positivity, burnout, anxiety, and the spiritual side of mindset work. If you’ve ever felt like the “positive vibes only” chorus isn’t landing, this episode is for you.",
      views: 12400,
      likes: 840,
      comments: 42,
    },
    {
      videoId: "Gd9Oh5jI4Hc",
      title: "What Motherhood & Spirituality Really Teach Us",
      description:
        "In this inspiring episode, we sit down with Janaki Pun to explore the deeper connections between spirituality, motherhood, gentle parenting, and nature. Known for her wisdom and grounded perspective, Janaki shares powerful insights on how parenting is not just about raising children, but also about raising ourselves.",
      views: 12400,
      likes: 840,
      comments: 42,
    },
  ];

  return (
    <section id="podcast" className="podcast-section container">
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
        <div className="card-container-spacer">
          {videos.map((video, index) => (
            <YouTubeCard
              key={index}
              videoId={video.videoId}
              title={video.title}
              description={video.description}
              views={video.views}
              likes={video.likes}
              comments={video.comments}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
