import { useState } from 'react';
import { Autocomplete, GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { PlacesAutocomplete } from './PlacesAutocomplete'

let defaultLocation = {
    lat: 24.917122827062762,
    lng: 67.09610049861793
}

export default function LocationPicker({ onChangeLatitude, onChangeLongitude, center }) {
    const libraries = ['places']
    const [mapref, setMapRef] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null)
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
            libraries={libraries}
        >
            <GoogleMap
                center={defaultLocation}
                // center={center}
                zoom={15}
                onLoad={handleOnLoad}
                onCenterChanged={handleCenterChanged}
                mapContainerStyle={{ width: '100%', height: '100%' }}
            >
                <Autocomplete
                    onLoad={(autocomplete) => {
                        setAutocomplete(autocomplete)
                    }}
                    onPlaceChanged={() => {
                        console.log(autocomplete.getPlace().geometry.location.lat())
                        console.log(autocomplete.getPlace().geometry.location.lng())
                    }}
                >
                    <input
                        type="text"
                        placeholder="Customized your placeholder"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: "absolute",
                            left: "50%",
                            marginLeft: "-120px"
                        }}
                    />
                </Autocomplete>
                <Marker
                    position={centerLocation}
                    draggable={false}
                />
            </GoogleMap>
        </LoadScript>
    )
}