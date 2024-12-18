"use client"

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface LocationPickerProps {
    onLocationChange: (location: { city: string; state: string; zip: string }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationChange }) => {
    const [showModal, setShowModal] = useState(false);
    const [showConsentModal, setShowConsentModal] = useState(false);
    const [zipCode, setZipCode] = useState('');
    const [location, setLocation] = useState({ city: '', state: '', zip: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedLocation = localStorage.getItem('userLocation');
        const hasAskedConsent = localStorage.getItem('locationConsent');

        if (savedLocation) {
            setLocation(JSON.parse(savedLocation));
        } else if (!hasAskedConsent) {
            // Automatically show consent modal if we haven't asked before
            setShowConsentModal(true);
        }
    }, []);

    const handleLocationConsent = async (consent: boolean) => {
        setShowConsentModal(false);
        localStorage.setItem('locationConsent', String(consent));

        if (consent) {
            await getCurrentLocation();
        } else {
            setError('Location access denied. Please enter ZIP code manually.');
            setShowModal(true);
        }
    };

    const requestLocationAccess = async () => {
        const hasConsent = localStorage.getItem('locationConsent');
        if (hasConsent === 'true') {
            await getCurrentLocation();
        } else {
            setShowConsentModal(true);
        }
    };

    const getCurrentLocation = async () => {
        setLoading(true);
        setError('');

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error('Geolocation is not supported'));
                    return;
                }
                navigator.geolocation.getCurrentPosition(
                    (pos) => resolve(pos),
                    (err) => {
                        switch (err.code) {
                            case err.PERMISSION_DENIED:
                                reject(new Error('Permission to access location was denied.'));
                                break;
                            case err.POSITION_UNAVAILABLE:
                                reject(new Error('Position unavailable.'));
                                break;
                            case err.TIMEOUT:
                                reject(new Error('Geolocation request timed out.'));
                                break;
                            default:
                                reject(new Error('An unknown error occurred.'));
                                break;
                        }
                    },
                    {
                        //enableHighAccuracy: true,
                        timeout: 500,  // Adjust timeout if needed
                        maximumAge: 0   // Don't use a cached location
                    }
                );
            });

            const { latitude, longitude } = position.coords;
            const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );

            if (!response.ok) throw new Error('Location service failed');

            const data = await response.json();
            const newLocation = {
                city: data.city || 'Unknown City',
                state: data.principalSubdivision || 'Unknown State',
                zip: data.postcode || ''
            };

            setLocation(newLocation);
            onLocationChange(newLocation);
            localStorage.setItem('userLocation', JSON.stringify(newLocation));
            setShowModal(false);
        } catch (err) {
            console.error('Location error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unable to detect location';
            setError(errorMessage);
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleZipCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (zipCode.length !== 5) {
            setError('Please enter a valid 5-digit ZIP code');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
            if (!response.ok) throw new Error('Invalid ZIP code');

            const data = await response.json();
            const newLocation = {
                city: data.places[0]['place name'],
                state: data.places[0]['state abbreviation'],
                zip: zipCode
            };

            setLocation(newLocation);
            onLocationChange(newLocation);
            localStorage.setItem('userLocation', JSON.stringify(newLocation));
            setShowModal(false);
        } catch (err) {
            setError('Invalid ZIP code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200"
            >
                <MapPin className="h-5 w-5 text-yellow-400" />
                <div className="text-left">
                    <div className="text-xs text-gray-400">Deliver to</div>
                    <div className="text-sm font-medium text-white">
                        {loading ? (
                            'Detecting...'
                        ) : location.city ? (
                            `${location.city}, ${location.state}`
                        ) : (
                            'Select location'
                        )}
                    </div>
                </div>
            </button>

            {/* Location Consent Modal */}
            {showConsentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowConsentModal(false)} />
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative z-50">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Enable Location Services</h3>
                        <div className="text-gray-600 mb-6">
                            <p className="mb-2">Allow AfroTransact to access your location? This helps us provide:</p>
                            <ul className="list-disc ml-6 mt-2 space-y-1">
                                <li>Accurate delivery estimates</li>
                                <li>Local deals and offers</li>
                                <li>Nearby service providers</li>
                                <li>Better shopping experience</li>
                            </ul>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button
                                onClick={() => handleLocationConsent(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                            >
                                Not Now
                            </Button>
                            <Button
                                onClick={() => handleLocationConsent(true)}
                                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg"
                            >
                                Allow Access
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Location Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative z-50">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                        >
                            ×
                        </button>

                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose your location</h3>

                        <div className="space-y-6">
                            <button
                                onClick={requestLocationAccess}
                                disabled={loading}
                                className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium p-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
                            >
                                <Navigation className="h-5 w-5" />
                                <span>{loading ? 'Detecting...' : 'Use my current location'}</span>
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">or enter ZIP code</span>
                                </div>
                            </div>

                            <form onSubmit={handleZipCodeSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Enter ZIP code"
                                    value={zipCode}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setZipCode(value.slice(0, 5));
                                    }}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-900 bg-white"
                                />

                                {error && (
                                    <p className="text-red-500 text-sm">{error}</p>
                                )}

                                <Button
                                    type="submit"
                                    disabled={loading || zipCode.length !== 5}
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    {loading ? 'Updating...' : 'Update location'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default LocationPicker