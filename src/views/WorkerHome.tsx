import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ISelectValue, Select } from 'components/Select'
import { Pagination } from 'components/Pagionation';
import { useEffect, useRef, useState } from 'react';
import { SearchBox } from 'components/SearchBox/SearchBox';
import { Button } from 'components/Button';
import { Categories } from './Tasks/tasksData';
import { AppDispatch, RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { addBioAndCat } from 'feautures/user/userSlice';
import { getWorkerTasks } from 'feautures/task/taskSlice';
import { handleNameCase, handlePagination } from 'utils/helpers';
import { Wrapper } from '@googlemaps/react-wrapper';
import { Map } from './WorkerMap/Map';
import { cityPolygons } from 'utils/data';
import { JobCard } from 'components/TopBar/JobCard';

export const WorkerHome = () => {
    /*eslint-disable*/
    const user: any = JSON.parse(localStorage.getItem('user'))
    const [params, setParams] = useState<any>({ limit: 9, page: 1, sort: 'DATE_D' })
    const [modalOpen, setModalOpen] = useState(false)
    const [bio, setBio] = useState(user?.bio || '')
    const [categories, setCategories] = useState([])
    const { allWorkerTasks, totalPagesWT } = useSelector((state: RootState) => state.tasks)
    const [map, setMap] = useState(null)
    const [city, setCity] = useState(null)
    const [markers, setMarkers] = useState([])
    const [currentPoints, setCurrentPoints] = useState([])
    const area = useRef(null)
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        user.categories.length > 0 && dispatch(getWorkerTasks(params))
    }, [params, modalOpen])

    useEffect(() => {
        if (user.categories.length < 1) {
            setModalOpen(true)
        }
    }, [])

    const polygonSettings = {
        fillColor: '#007ddd',
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
        }
    }, [map, user])

    const options = [
        {
            label: 'Datumu (najskoriji)',
            value: 'DATE_D'
        },
        {
            label: 'Datumu (najkasniji)',
            value: 'DATE_A'
        },
        {
            label: 'Ceni (najviša)',
            value: 'PRICE_D'
        },
        {
            label: 'Ceni (najniža)',
            value: 'PRICE_A'
        }
    ]

    const handleSort = (value: ISelectValue) => {
        setParams((prev: any) => {
            let copy = structuredClone(prev)
            copy.sort = value.value
            return copy
        })
    }

    const handleBioModal = async () => {
        if (categories.length > 0) {
            const cats = categories.map(c => c.value)
            localStorage.setItem('user', JSON.stringify({ ...user, categories: cats }))
            await dispatch(addBioAndCat({ bio, categories: cats, areaOfWork: currentPoints.map(p => ({ lat: p.lat, lng: p.lng })) }))
        }
        setModalOpen(false)
    }

    const handleRemoveCat = (cat) => {
        setCategories(prev => {
            let copy = structuredClone(prev)
            copy = copy.filter(ct => ct.value !== cat.value)
            return copy
        })
    }


    const handleCityChange = (value: ISelectValue) => {
        setCity(value)
        const cityCoords = cityPolygons[value.value]
        area.current.setPath(cityCoords)
        const newPoints = cityCoords.map((c, index) => ({ ...c, index }))
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
            <p><span>Zdravo, </span>{handleNameCase(user?.name)}</p>
        </div>
        <div className='page-subtitle' >
            <p>Poslovi iz vaših kategorija</p>
            <Select className='w15' options={options} labelText='Sortiraj po:' onChange={handleSort} name='filter' value={params.sort} />
        </div>
        <div className="worker-home-grid" >
            {allWorkerTasks?.map(wt => <JobCard category={wt.category} id={wt.id} key={wt.id} name={wt.name} location={wt.location} date={wt.date} price={1500} />)}
        </div>
        <Pagination pageCount={totalPagesWT} setPage={(page) => handlePagination(page, setParams, 9)} forcePage={1} />

        {modalOpen && <div className='worker-home-modal' >
            <div  >
                <div className='flex between w100'>
                    <div className='flex column gap1 w100' >
                        <h1>Dobrodošli u tim! 🎉 </h1>
                        <div className='flex w100 between align-center' >
                            <p style={{ fontSize: '1.3rem' }} >Odaberite svoje oblasti rada kako biste nastavili.</p>
                            {/* <Select labelText='Grad rada' name='city' value={city?.value} invalid={!city}
                            options={[{ label: 'Beograd', value: 1 }]} onChange={(value) => setCity(value)} /> */}
                        </div>
                    </div>
                    <Button className='h2' text='Završi' onClick={handleBioModal} />

                </div>
                <div className='flex between w100 gap3 center mt2' style={{ height: 'calc(100% - 5rem)' }}>
                    <div className='search-categories-container w100 mt3 h100' >
                        <div className='w100 '>
                            <p>Izaberite oblasti rada:</p>
                            <SearchBox selected={categories} setList={setCategories} fixedList={Categories} className='w100' />
                            <p className='mt2' >Odabrane oblasti: </p>
                            <div className='selected-categories-grid' >
                                {categories.map(c => <div key={c.value} onClick={() => handleRemoveCat(c)} className='selected-category-item' > <FontAwesomeIcon icon={c.icon} /> {c.label}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className='w100 worker-map-container ' >
                        <div className='wm-city-select'>
                            <Select labelText='Učitaj šemu za grad' name='city' value={city?.value}
                                options={getOptions()} onChange={handleCityChange} className='w100' />
                        </div>
                        <Wrapper apiKey={'AIzaSyC3j4JIbnFi0TBd5hDDo1qqiht0jw_eGW4'} version='beta' libraries={['marker', 'places', 'geocoding']}>
                            <Map setMap={setMap} />
                        </Wrapper>
                    </div>
                </div>

            </div>
        </div>}
    </div>

}


