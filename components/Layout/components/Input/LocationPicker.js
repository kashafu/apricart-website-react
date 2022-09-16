import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import PlacesAutocomplete from './PlacesAutocomplete';
let defaultLocation = {
    lat: 24.917122827062762,
    lng: 67.09610049861793
}

export default function LocationPicker({ label, onChangeLatitude, onChangeLongitude, startingLocation }) {
    const [mapref, setMapRef] = useState(null);
    const [centerLocation, setCenterLocation] = useState({
        lat: 24.917122827062762,
        long: 67.09610049861793
    })

    const handleOnLoad = map => {
        setMapRef(map)
    }

    const handleCenterChanged = () => {
        if (mapref) {
            const newCenter = mapref.getCenter()
            setCenterLocation({
                lat: newCenter.lat(),
                lng: newCenter.lng()
            })
            onChangeLatitude(newCenter.lat())
            onChangeLongitude(newCenter.lng())
        }
    }

    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        >
            {/* <PlacesAutocomplete /> */}
            <GoogleMap
                // center={startingLocation.lat != '' && startingLocation.lng != '' ? startingLocation : defaultLocation}
                center={defaultLocation}
                zoom={15}
                onLoad={handleOnLoad}
                onCenterChanged={handleCenterChanged}
                mapContainerStyle={{ width: '100%', height: '100%' }}
            >
                <Marker
                    position={centerLocation}
                    draggable={false}
                />
            </GoogleMap>
        </LoadScript>
    )
}