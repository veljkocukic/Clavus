/*eslint-disable*/

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Wrapper } from '@googlemaps/react-wrapper'
import { useEffect, useRef, useState } from 'react'
import { Map } from './Map'
import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons'
import { ISelectValue, Select } from 'components/Select'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'store'
import { updateAreaOfWork } from 'feautures/user/userSlice'
import { cityPolygons } from 'utils/data'
import { calculatePolygonCenter } from 'utils/helpers'

export const WorkerMap = () => {
    const [map, setMap] = useState(null)
    const [editToggled, setEditToggled] = useState(false)
    const [city, setCity] = useState(null)
    const [markers, setMarkers] = useState([])
    const [currentPoints, setCurrentPoints] = useState([])
    const [click, setClick] = useState([])
    const clickArea = useRef(null)
    const area = useRef(null)
    const dispatch = useDispatch<AppDispatch>()
    const user = JSON.parse(localStorage.getItem('user'))

    const polygonSettings = {
        fillColor: '#0454de',
        map,
        strokeWeight: 0.5,
        strokeColor: '#fff',
        clickable: true,
    }

    useEffect(() => {
        if (map) {
            if (!area.current) {
                area.current = new google.maps.Polygon({
                    paths:
                        user?.areaOfWork ?? []
                    ,
                    ...polygonSettings,
                })
            }

            currentPoints?.length < 1 && user.areaOfWork?.length > 0 && setCurrentPoints(user.areaOfWork?.map((p, index) => ({ ...p, index })))
            user.areaOfWork?.length > 0 && map.setCenter(calculatePolygonCenter(user?.areaOfWork))
            // clickArea.current = new google.maps.Polygon({
            //     paths: [],
            //     fillColor: 'red',
            //     map
            // })
            // map.addListener('click', (e) => {
            //     setClick(prev => [...prev, ({ lat: e.latLng.lat(), lng: e.latLng.lng() })])
            // })
        }
    }, [map, user])

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
            const forDispatch = currentPoints.map(p => ({ lat: p.lat, lng: p.lng }))
            dispatch(updateAreaOfWork(forDispatch))
            const localUser = JSON.parse(localStorage.getItem('user'))
            localUser.areaOfWork = forDispatch
            localStorage.setItem('user', JSON.stringify(localUser))
            markers.forEach(m => m.setMap(null))
            setMarkers([])
        }
    }


    const handleCityChange = (value: ISelectValue) => {
        setCity(value)
        const cityCoords = cityPolygons[value.value]
        area.current.setPath(cityCoords)
        const newPoints = cityCoords.map((c, index) => ({ ...c, index }))
        map.setCenter(calculatePolygonCenter(newPoints))
        setCurrentPoints(newPoints)
        let mks = []
        newPoints.forEach(e => {
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
            mks.push(marker)
        })
        setMarkers(prev => {
            prev.forEach(m => m.setMap(null))
            return mks
        })


    }

    const getOptions = () => {
        return Object.entries(cityPolygons).map(e => {
            let name = e[0]
            if (name.includes('_')) {
                name = name.split('_').join(' ')
            }
            return { label: name, value: e[0] }
        })
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
                    options={getOptions()} onChange={handleCityChange} className='w100' />
            </div>}

            <Wrapper apiKey={'AIzaSyC3j4JIbnFi0TBd5hDDo1qqiht0jw_eGW4'} version='beta' libraries={['marker', 'places', 'geocoding']}>
                <Map setMap={setMap} />
            </Wrapper>
        </div>
    </div >
}