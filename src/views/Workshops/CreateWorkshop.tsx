import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Wrapper } from '@googlemaps/react-wrapper'
import { AsyncSelect } from 'components/AsyncSelect'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { ISelectValue, Select } from 'components/Select'
import { CheckBox } from 'components/TopBar/CheckBox'
import { useRef, useState } from 'react'
import { TaskMap } from 'views/Tasks/TaskMap'
import { ServicesModal } from './ServicesModal'
import { days, IWorkshopState, workshopsInitialState, workshopTypes } from './workshopsData'

export const CreateWorkshop = () => {
    /*eslint-disable*/
    const [state, setState] = useState<IWorkshopState>(workshopsInitialState)
    const [modalOpen, setModalOpen] = useState(false)
    const marker = useRef(null)

    const [map, setMap] = useState(null)
    const handleSubmit = () => {
        return null
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        // if (!(type == 'textarea')) {
        //     standardFieldValidation(e, setInvalidFields)
        // }
        setState((prev) => {
            const copy = { ...prev }
            copy[name] = type == 'number' ? Number(value) : value
            return copy
        })
    }

    const handleLocation = (value: ISelectValue) => {
        const geocoder = new google.maps.Geocoder()
        const infowindow = new google.maps.InfoWindow()

        // setInvalidFields(prev => {
        //     let copy = structuredClone(prev)
        //     copy = copy.filter(f => f !== 'location')
        //     return copy
        // })

        geocoder
            .geocode({ placeId: value.value as string })
            .then(({ results }) => {
                if (results[0]) {
                    map.setZoom(11)
                    map.setCenter(results[0].geometry.location)

                    setState((prev) => {
                        const copy = structuredClone(prev)
                        copy.location = {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng(),
                            label: value.label,
                            value: value.value,
                        }
                        return copy
                    })

                    marker.current = new google.maps.Marker({
                        map,
                        position: results[0].geometry.location,
                        crossOnDrag: true,
                        draggable: true,
                    })
                    marker.current.addListener

                    infowindow.setContent(results[0].formatted_address)
                    infowindow.open(map, marker.current)
                } else {
                    window.alert('No results found')
                }
            })
            .catch((e) => window.alert('Geocoder failed due to: ' + e))

        // const marker = new google.maps.marker.AdvancedMarkerElement({
        //     position: { lat: Number(position.latitude), lng: Number(position.longitude) },
        //     map,
        //     content,
        // })
    }

    const WorkDayInput = ({ name, dayState, value }) => {
        const { from, to, checked } = dayState

        const handleChange = () => {
            setState((prev) => {
                const copy = { ...prev }
                copy.days[value].checked = !copy.days[value].checked
                return copy
            })
        }

        return (
            <div className='work-day-input'>
                <div className='check'>
                    <CheckBox text='' active={checked} name='day' onChange={handleChange} />
                    <p className={checked ? 'enabled' : 'disabled'}>{name}</p>
                </div>
                <div className={`time ${checked ? 'enabled' : 'disabled'}`}>
                    <input type='time' />
                    <input type='time' />
                </div>
            </div>
        )
    }

    const handleSelect = (value: ISelectValue, name: string) => {
        setState(prev => {
            const copy = { ...prev }
            copy[name] = value.value
            return copy
        })
    }

    return (
        <div className='page-content'>
            <div className='content-title-bar'>
                <p>
                    <span>Kreiranje radnje: </span>
                </p>
                {<Button text='Potvrdi' onClick={handleSubmit} icon={faCheckCircle as IconProp} />}
            </div>
            <div className='page-subtitle'>
                <p>Unesite detalje</p>
            </div>
            <div className='ws-form-container'>
                <div className='ws-form-section'>
                    <Input
                        className='w100'
                        labelText='Naziv radnje'
                        name='name'
                        value={state.name}
                        type='text'
                        onChange={handleChange}
                    />
                    <AsyncSelect
                        name='location'
                        className='w100'
                        labelText='Lokacija'
                        value={state?.location}
                        onChange={handleLocation}
                    />
                    <Select
                        className='w100'
                        labelText='Tip'
                        name='type'
                        value={state.type}
                        options={workshopTypes}
                        onChange={handleSelect}
                    />
                    <Button text='Usluge' className='mt1' onClick={() => setModalOpen(true)} />
                </div>
                <div className='ws-form-section'>
                    <div className='work-time-wrapper'>
                        <p>Radno vreme</p>
                        {days.map((d) => (
                            <WorkDayInput value={d.value} name={d.label} dayState={state.days[d.value]} />
                        ))}
                    </div>
                </div>
                <div className='ws-form-section'>
                    <Wrapper
                        apiKey={'AIzaSyC3j4JIbnFi0TBd5hDDo1qqiht0jw_eGW4'}
                        version='beta'
                        libraries={['marker', 'places', 'geocoding']}
                    >
                        <TaskMap map={map} setMap={setMap} />
                    </Wrapper>
                </div>
            </div>
            {modalOpen && <ServicesModal services={state.services} setState={setState} setModalOpen={setModalOpen} />}
        </div>
    )
}
