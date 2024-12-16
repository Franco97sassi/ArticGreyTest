import React from 'react';

interface VideoProps {
  video: {
    id: string;
    mediaContent: {
      sources: Array<{ url: string }>;
    };
  };
}

const InitialVideo: React.FC<VideoProps> = ({ video }) => {
  // Asumiendo que `video.mediaContent.sources[0].url` es el enlace al archivo de video
  const videoUrl = video?.mediaContent?.sources[0]?.url;

  return (
    <div className="initial-video">
      {videoUrl ? (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      ) : (
        <p>Video no disponible</p>
      )}
    </div>
  );
};

export default InitialVideo;
