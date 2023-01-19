import { Map, GoogleApiWrapper } from 'google-maps-react'

const MapContainer = prop => {
    const defaultProps = {
        center: {
            lat: 10.870462432503459,
            lng: 106.79020788985841,
        },
        zoom: 11,
    }
    return (
        <Map
            zoom={defaultProps.zoom}
            initialCenter={defaultProps.center}
            google={prop.google}
        />
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer)
