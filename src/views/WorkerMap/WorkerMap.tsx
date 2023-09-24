/*eslint-disable*/

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef, useState } from 'react'
import { Map } from './Map'
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Select } from 'components/Select'

export const WorkerMap = () => {
    const [map, setMap] = useState(null)
    const [editToggled, setEditToggled] = useState(false)
    const [city, setCity] = useState(null)
    const [markers, setMarkers] = useState([])
    const [currentPoints, setCurrentPoints] = useState([{ lat: 44.798354, lng: 20.360261, index: 0 },
    { lat: 44.866490, lng: 20.402774, index: 1 },
    { lat: 44.827307, lng: 20.538815, index: 2 },
    { lat: 44.758520, lng: 20.440185, index: 3 }])
    const [click, setClick] = useState([])
    const clickArea = useRef(null)
    const area = useRef(null)

    const polygonSettings = {
        fillColor: '#0454de',
        map,
        strokeWeight: 0.5,
        strokeColor: '#fff',
        clickable: true,
    }

    useEffect(() => {
        if (map) {
            area.current = new google.maps.Polygon({
                paths: [
                    ...currentPoints
                ],
                ...polygonSettings
            })
            // clickArea.current = new google.maps.Polygon({
            //     paths: [],
            //     fillColor: 'red',
            //     map
            // })
            // map.addListener('click', (e) => {
            //     setClick(prev => [...prev, ({ lat: e.latLng.lat(), lng: e.latLng.lng() })])
            // })
        }
    }, [map])

    // useEffect(() => {
    //     if (click.length > 0) {
    //         clickArea.current.setPath(click)
    //     }
    // }, [click])

    // useEffect(() => {
    //     area.current?.setPath(currentPoints)
    //     console.log(currentPoints)
    // }, [currentPoints])

    const handleEditToggle = () => {
        setEditToggled(prev => !prev)
        if (!editToggled) {
            currentPoints.forEach(e => {
                const content = document.createElement('div')
                content.className = 'wm-dot'
                const marker = new google.maps.marker.AdvancedMarkerElement({
                    position: { lat: e.lat, lng: e.lng },
                    map,
                    content,
                    gmpDraggable: true,
                })
                marker.addListener('dragend', (me) => {
                    const newPosition = { lat: Number(me.latLng.lat().toFixed(6)), lng: Number(me.latLng.lng().toFixed(6)) }
                    setCurrentPoints((prev) => {
                        let copy: any = [...prev]
                        copy[e.index] = { ...newPosition, index: e.index }
                        area.current?.setPath(copy)
                        return copy
                    })
                })
                setMarkers(prev => [...prev, marker])
            })
        } else {
            markers.forEach(m => m.setMap(null))
            setMarkers([])
        }
    }


    const handleCityChange = (value) => {
        setCity(value)
    }


    return <div className="page-content" >
        <div className='content-title-bar' >
            <p> Moja oblast rada</p>
            <div className='wh-map-options' onClick={handleEditToggle} >
                <FontAwesomeIcon icon={!editToggled ? faEdit : faCheck} />
                <p>{!editToggled ? "Izmeni oblast rada" : "Sačuvaj"}</p>
            </div>
        </div>
        <div className="worker-map-container">
            {editToggled && <div className='wm-city-select'>
                <Select labelText='Učitaj šemu za grad' name='city' value={city?.value}
                    options={[{ label: 'Beograd', value: 1 }]} onChange={handleCityChange} className='w100' />
            </div>}

            <Wrapper apiKey={'AIzaSyC3j4JIbnFi0TBd5hDDo1qqiht0jw_eGW4'} version='beta' libraries={['marker', 'places', 'geocoding']}>
                <Map setMap={setMap} />
            </Wrapper>
        </div>
    </div >
}