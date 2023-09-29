/*eslint-disable*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Wrapper } from '@googlemaps/react-wrapper'
import { AsyncSelect } from 'components/AsyncSelect'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { SearchBox } from 'components/SearchBox/SearchBox'
import { ISelectValue, Select } from 'components/Select'
import { TextArea } from 'components/TextArea'
import { CheckBox } from 'components/TopBar/CheckBox'
import { createTask } from 'feautures/task/taskSlice'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppDispatch } from 'store'
import { checkValid } from 'utils/helpers'
import { standardFieldValidation, validateSelect } from 'utils/validationUtils'
import { TaskMap } from './TaskMap'
import { Categories, colorCombinations, currencies, ITaskState, priceTypes, tasksInitialState, tasksValidation } from './tasksData'

export const CreateTask = () => {
    const [state, setState] = useState<ITaskState>(tasksInitialState)
    const [invalidFields, setInvalidFields] = useState(tasksValidation)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [cats, setCats] = useState(Categories)
    const creatingTask: ITaskState = JSON.parse(localStorage.getItem('creatingTask'))
    const [map, setMap] = useState(null)
    const marker = useRef(null)
    useEffect(() => {
        if (creatingTask) {
            setState(creatingTask)
            localStorage.removeItem('creatingTask')
        }
    }, [])

    const handleSubmit = async () => {

        if (invalidFields.length > 0) {
            toast.warn('Polja moraju biti validna')
            return
        }
        const resp = await dispatch(createTask(state))
        if (resp.meta.requestStatus === 'fulfilled') {
            navigate('/tasks/' + resp.payload.id)
        }
    }

    const setCategory = (c) => {
        setState(prev => {
            const copy = { ...prev }
            copy.category = c
            return copy
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        if (!(type == 'textarea')) {
            standardFieldValidation(e, setInvalidFields)
        }
        setState(prev => {
            const copy = { ...prev }
            copy[name] = type == 'number' ? Number(value) : value
            return copy
        })
    }

    const handleSelect = (value: ISelectValue, name: string) => {
        validateSelect(value, name, setInvalidFields)
        if (name == 'price_type') {
            setInvalidFields(prev => {
                let copy = [...prev]
                if (value.value === 'WHOLE') {
                    copy = copy.filter(f => f !== 'WHOLE')
                } else {
                    copy = [...copy, 'amount']
                }
                return copy
            })
        }
        setState(prev => {
            const copy = { ...prev }
            copy[name] = value.value
            return copy
        })
    }

    const handleCheck = (name: string) => {
        setState(prev => {
            const copy = { ...prev }
            copy[name] = !copy[name]
            return copy
        })
    }


    // CREATE COLOR SHUFFLE
    const renderCards = () => {
        return cats.map((c, i) => {
            return <div key={i} className='card-wrapper cursor-pointer' onClick={() => setCategory(c.value)} >
                <div className='card-icon-text' style={{ backgroundColor: colorCombinations[0].backgroundColor }}>
                    <FontAwesomeIcon icon={c.icon} color={colorCombinations[0].iconColor} />
                    <p>{c.label}</p>
                </div>
            </div>
        })
    }

    useEffect(() => {
        if (map) {
            const geocoder = new google.maps.Geocoder();
            const handleLocation = c => {
                geocoder.geocode({
                    location: c.latLng
                }).then(v => {
                    let label = v.results[0].formatted_address
                    if (label.includes('+')) {
                        let splitted = label.split(' ')
                        splitted = splitted.filter(w => !w.includes('+'))
                        label = splitted.join(' ')
                    }
                    setState(prev => {
                        const copy = structuredClone(prev)
                        copy.location = { value: v.results[0].place_id, label, lat: c.latLng.lat(), lng: c.latLng.lng() }
                        return copy
                    })

                })
            }

            marker?.current && marker.current.addListener('dragend', handleLocation)
        }

    }, [marker, marker.current, map])

    const handleLocation = (value: ISelectValue) => {
        const geocoder = new google.maps.Geocoder();
        const infowindow = new google.maps.InfoWindow();


        setInvalidFields(prev => {
            let copy = structuredClone(prev)
            copy = copy.filter(f => f !== 'location')
            return copy
        })

        geocoder
            .geocode({ placeId: value.value as string })
            .then(({ results }) => {
                if (results[0]) {
                    map.setZoom(11);
                    map.setCenter(results[0].geometry.location);

                    setState(prev => {
                        const copy = structuredClone(prev)
                        copy.location = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng(), label: value.label, value: value.value }
                        return copy
                    })

                    marker.current = new google.maps.Marker({
                        map,
                        position: results[0].geometry.location,
                        crossOnDrag: true,
                        draggable: true
                    });
                    marker.current.addListener

                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker.current);
                } else {
                    window.alert("No results found");
                }
            })
            .catch((e) => window.alert("Geocoder failed due to: " + e));



        // const marker = new google.maps.marker.AdvancedMarkerElement({
        //     position: { lat: Number(position.latitude), lng: Number(position.longitude) },
        //     map,
        //     content,
        // })

    }


    useEffect(() => {
        if (map) {
            map.addListener('click', e => {
                const position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
                if (!marker.current) {
                    marker.current = new google.maps.Marker({
                        map, position, crossOnDrag: true,
                        draggable: true
                    })
                }
                marker.current.setPosition(position)
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ location: position }, (results, status) => {
                    if (status === 'OK') {
                        if (results[0]) {
                            // Extract the address and other details
                            const placeDetails = results[0];
                            let label = placeDetails.formatted_address
                            if (label.includes('+')) {
                                let splitted = label.split(' ')
                                splitted = splitted.filter(w => !w.includes('+'))
                                label = splitted.join(' ')
                            }
                            setState(prev => {
                                const copy = structuredClone(prev)
                                copy.location = { value: placeDetails.place_id, label, ...position }
                                return copy
                            })
                        }
                    } else {
                        console.error('Geocoder failed due to: ' + status);
                    }
                })
            })
        }
    }, [map])

    return <div className='page-contetnt' >
        <div className='content-title-bar' >
            <p><span>Kreiranje zadatka</span></p>
            {state.category && <Button text='Potvrdi' onClick={handleSubmit} />}

        </div>
        <div className='page-subtitle' >
            {!state.category ?
                <>
                    <p>Izaberite kategoriju:</p>
                    <SearchBox sortList={(r) => setCats([...r])} fixedList={Categories} />
                </> :
                <>
                    <p>Unesite detalje:</p>
                </>}
        </div>
        {!state.category ? <div className='ct-cards-container' >
            {renderCards()}
        </div> :
            <div className='ct-form-container' >
                <div className='ct-form-section' >
                    <Input invalid={checkValid(invalidFields, 'name')} className='w100' labelText='Naziv zadatka' name='name' value={state.name} type='text' onChange={handleChange} />
                    <TextArea className='w100 h10' name='description' labelText='Description' value={state.description} onChange={handleChange} />
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }} >
                        {/* <Input invalid={checkValid(invalidFields, 'location')} className='w100' labelText='Lokacija' name='location' value={state.location} type='text' onChange={handleChange} /> */}
                        <AsyncSelect name='location' className='w100' labelText='Lokacija' value={state.location} onChange={handleLocation} />
                        <Input invalid={checkValid(invalidFields, 'date')} className='w100' labelText='Datum' name='date' value={state.date} type='datetime-local' onChange={handleChange} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }} >
                        <Input invalid={checkValid(invalidFields, 'price')} className='w100' labelText='Cena' name='price' value={state.price} type='number' onChange={handleChange} />
                        <Select invalid={checkValid(invalidFields, 'currency')} className='w100' labelText='Valuta' name='currency' value={state.currency} options={currencies} onChange={handleSelect} />
                        <Select invalid={checkValid(invalidFields, 'price_type')} className='w100' labelText='Mera' name='price_type' value={state.price_type} options={priceTypes} onChange={handleSelect} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', minHeight: '4rem' }} >
                        {state?.price_type && state?.price_type !== 'WHOLE' && <Input labelText='Kolicina' name='amount' value={state.amount} type='number' onChange={handleChange} />}
                        <CheckBox text='Rad bez nadgledanja' active={state.withoutMonitoring} onChange={handleCheck} name='withoutMonitoring' />
                    </div>
                </div>
                <div className='ct-form-section' >
                    <Wrapper apiKey={'AIzaSyC3j4JIbnFi0TBd5hDDo1qqiht0jw_eGW4'} version='beta' libraries={['marker', 'places', 'geocoding']}>
                        <TaskMap map={map} setMap={setMap} />
                    </Wrapper>
                </div>
            </div>}

    </div>

}