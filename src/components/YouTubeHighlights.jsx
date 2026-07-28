import { useEffect, useState } from "react";

function YouTubeHighlights({ player, player2 }) {
  const [playerVideos, setPlayerVideos] = useState([]);
  const [player2Videos, setPlayer2Videos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    if (!player && !player2) {
      setPlayerVideos([]);
      setPlayer2Videos([]);
      setError("");
      return;
    }

    async function getHighlights() {
      if (!apiKey) {
        setError("YouTube API key is missing.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        async function fetchPlayerVideos(selectedPlayer) {
          if (!selectedPlayer) {
            return [];
          }

          const searchQuery = encodeURIComponent(
            `${selectedPlayer.displayName} NFL highlights`
          );

          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&q=${searchQuery}&key=${apiKey}`
          );

          if (!response.ok) {
            throw new Error(
              "Unable to load YouTube highlights."
            );
          }

          const data = await response.json();

          return data.items ?? [];
        }

        const [firstPlayerVideos, secondPlayerVideos] =
          await Promise.all([
            fetchPlayerVideos(player),
            fetchPlayerVideos(player2)
          ]);

        setPlayerVideos(firstPlayerVideos);
        setPlayer2Videos(secondPlayerVideos);
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load YouTube highlights."
        );
      } finally {
        setLoading(false);
      }
    }

    getHighlights();
  }, [player, player2, apiKey]);

  if (!player && !player2) {
    return null;
  }

  function renderVideos(videos, playerName) {
    if (videos.length === 0) {
      return (
        <p className="highlights-message">
          No highlights found for {playerName}.
        </p>
      );
    }

    return (
      <div className="highlights-grid">
        {videos.map((video) => {
          const videoId = video.id?.videoId;
          const thumbnail =
            video.snippet?.thumbnails?.medium?.url;

          if (!videoId) {
            return null;
          }

          return (
            <article
              className="highlight-card"
              key={videoId}
            >
              {thumbnail && (
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch ${video.snippet.title} on YouTube`}
                >
                  <img
                    className="highlight-thumbnail"
                    src={thumbnail}
                    alt={video.snippet.title}
                  />
                </a>
              )}

              <div className="highlight-content">
                <h3>{video.snippet.title}</h3>

                <p>{video.snippet.channelTitle}</p>

                <a
                  className="watch-highlight-button"
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Highlight
                </a>
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <section className="highlights-section">
      <div className="highlights-heading">
        <div>
          <p className="section-eyebrow">
            WATCH THE FILM
          </p>

          <h2>Player Highlights</h2>
        </div>
      </div>

      {loading && (
        <p className="highlights-message">
          Loading highlights...
        </p>
      )}

      {error && (
        <p className="highlights-error">
          {error}
        </p>
      )}

      {!loading && !error && player && (
        <div className="player-highlights-group">
          <h2>{player.displayName}</h2>

          {renderVideos(
            playerVideos,
            player.displayName
          )}
        </div>
      )}

      {!loading && !error && player2 && (
        <div className="player-highlights-group">
          <h2>{player2.displayName}</h2>

          {renderVideos(
            player2Videos,
            player2.displayName
          )}
        </div>
      )}
    </section>
  );
}

export default YouTubeHighlights;