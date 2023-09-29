import { useEffect, useRef } from 'react'

export const Map = ({ setMap }) => {
    const mapRef = useRef(null)

    const mapOptions = {
        zoom: 12,
        mapId: 'edb85e684ae3d8a6',
        center: {
            lat: 44.80,
            lng: 20.44,
        },
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'satellite'],
        },
    }

    useEffect(() => {
        setMap(new google.maps.Map(mapRef.current, mapOptions))
    }, [])


    return <div className="wh-map" ref={mapRef} />
}