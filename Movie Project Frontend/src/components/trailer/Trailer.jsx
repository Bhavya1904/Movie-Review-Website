import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';

const Trailer = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const key = params.ytTrailerId;

    useEffect(() => {
        // Reset states when trailer changes
        setLoading(true);
        setError(null);
    }, [key]);

    const handleReady = () => {
        setLoading(false);
    };

    const handleError = () => {
        setError('Error loading video');
        setLoading(false);
    };

    return (
        <div className="w-full h-screen bg-black">
            {loading && (
                <div className="flex items-center justify-center h-full">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            )}
            
            {error && (
                <div className="flex items-center justify-center h-full">
                    <div className="text-red-500 text-xl">{error}</div>
                </div>
            )}
            
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${key}`}
                    playing={true}
                    width="100%"
                    height="100%"
                    controls={true}
                    onReady={handleReady}
                    onError={handleError}
                    config={{
                        youtube: {
                            playerVars: {
                                autoplay: 1,
                                modestbranding: 1,
                                rel: 0
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Trailer;

