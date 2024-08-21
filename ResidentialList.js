import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaTimes } from 'react-icons/fa';

const ResidentialList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMedia, setSelectedMedia] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://theabhiestates.com/resiget.php');
            if (Array.isArray(response.data)) {
                setProperties(response.data);
            } else {
                setProperties([]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openModal = (mediaUrl, isImage) => {
        setSelectedMedia({ mediaUrl, isImage });
    };

    const closeModal = () => {
        setSelectedMedia(null);
    };

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Flat Properties</h1>
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {properties.map(property => (
                        <div key={property.ID} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <Carousel
                                autoPlay={true}
                                interval={2000}
                                infiniteLoop={true}
                            >
                                {Object.values(property.MediaFiles)
                                    .filter(media => media !== 'none')
                                    .map((media, index) => {
                                        const isImage = media.toLowerCase().endsWith('.jpg') || media.toLowerCase().endsWith('.jpeg') || media.toLowerCase().endsWith('.png');
                                        const mediaUrl = `https://theabhiestates.com/${media}`;
                                        return (
                                            <div key={index} className="w-full h-48 flex justify-center items-center cursor-pointer"
                                                 onClick={() => openModal(mediaUrl, isImage)}>
                                                {isImage ? (
                                                    <img
                                                        src={mediaUrl}
                                                        alt={`Property ${property.ID} Media ${index + 1}`}
                                                        className="object-contain"
                                                        onError={(e) => {
                                                            console.error(`Failed to load image for Property ${property.ID} Media ${index + 1}`, e);
                                                        }}
                                                    />
                                                ) : (
                                                    <video
                                                        src={mediaUrl}
                                                        muted
                                                        className="object-contain"
                                                        onError={(e) => {
                                                            console.error(`Failed to load video for Property ${property.ID}`, e);
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })}
                            </Carousel>
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{property.Location}</h2>
                                <p className="text-gray-700 mb-2">{property.Description}</p>
                                <p className="text-gray-800 font-bold">{property.Price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <p className="text-center">New properties are coming soon..! Stay tuned..</p>
                    <p className="text-center">Thank you🙏</p>
                </>
            )}

            {selectedMedia && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={handleBackgroundClick}>
                    <div className="relative p-4 max-w-screen-lg w-full flex flex-col justify-center items-center">
                        <button
                            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-50"
                            onClick={closeModal}
                        >
                            <FaTimes className="text-xl" />
                        </button>
                        {selectedMedia.isImage ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <img
                                    src={selectedMedia.mediaUrl}
                                    alt="Fullscreen"
                                    className="object-contain w-full h-full max-h-screen max-w-screen"
                                />
                            </div>
                        ) : (
                            <video
                                src={selectedMedia.mediaUrl}
                                controls
                                autoPlay
                                className="object-contain w-full h-full max-h-screen max-w-screen"
                            >
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResidentialList;
