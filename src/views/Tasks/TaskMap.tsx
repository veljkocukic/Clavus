/*eslint-disable*/
import { AsyncSelect } from 'components/AsyncSelect';
import { useEffect, useRef, useState } from 'react'

export const TaskMap = ({ map, setMap }) => {
    const mapRef = useRef(null)
    const [query, setQuery] = useState('');
    const [autocompleteService, setAutocompleteService] = useState(null);
    const [places, setPlaces] = useState([]);

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
            mapTypeIds: ["roadmap", "satellite"],
        },
    }

    useEffect(() => {
        setMap(new google.maps.Map(mapRef.current, mapOptions))
    }, [])

    useEffect(() => {
        if (query && map) {
            const service = new google.maps.places.AutocompleteService();
            service.getQueryPredictions({ input: query }, (predictions, status) => {
                if (status === 'OK' && predictions) {
                    setPlaces(predictions);
                }
            });
        }
    }, [query, map]);

    return <div className="ct-map-container" ref={mapRef} />

}