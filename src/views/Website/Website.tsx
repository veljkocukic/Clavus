import { SearchBox } from 'components/SearchBox/SearchBox'
import iphone from 'assets/images/iphone.png'
import macbook from 'assets/images/macbook.png'
import firstStep from 'assets/images/firstStep.png'
import secondStep from 'assets/images/secondStep.png'
import thirdStep from 'assets/images/thirdStep.png'
import fourthStep from 'assets/images/fourthStep.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faClose, faFile, faHandsPraying, faHeadset, faList } from '@fortawesome/free-solid-svg-icons'
import { Categories, currencies, ITaskState, priceTypes, siteInitialState, tasksValidation } from 'views/Tasks/tasksData'
import { useEffect, useRef, useState } from 'react'
import { Input } from 'components/Input'
import { TextArea } from 'components/TextArea'
import { checkValid } from 'utils/helpers'
import { ISelectValue, Select } from 'components/Select'
import { standardFieldValidation, validateSelect } from 'utils/validationUtils'
import { Button } from 'components/Button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useOnClickOutside } from 'utils/hooks/useClickOutside'
import { Wrapper } from '@googlemaps/react-wrapper'
import { AsyncSelect } from 'components/AsyncSelect'
import { Map } from 'views/WorkerMap/Map'
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface ISiteState extends Omit<ITaskState, 'category'> {
    category: {
        label: string | number
        value: string | number
    }
}

export const Website = () => {
    const [categories, setCategories] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const modalRef = useRef()
    const [invalidFields, setInvalidFields] = useState(tasksValidation)
    const [state, setState] = useState<ISiteState>(siteInitialState)
    const [map, setMap] = useState(null)
    const navigate = useNavigate()
    const marker = useRef(null)

    useOnClickOutside(modalRef, () => setModalOpen(false))

    /*eslint-disable*/
    const [isMainIntersecting, setIsMainIntersecting] = useState(false)
    const mainRef = useRef(null)

    useEffect(() => {
        const mainObserver = new IntersectionObserver(([entry]) => {
            setIsMainIntersecting(entry.isIntersecting);
        });
        mainObserver.observe(mainRef.current);
        return () => mainObserver.disconnect();
    }, []);

    useEffect(() => {
        if (isMainIntersecting) {
            mainRef.current.querySelectorAll("div").forEach((e) => {
                e.classList.add("slide-in");
            });
        } else {
            mainRef.current.querySelectorAll("div").forEach((e) => {
                e.classList.remove("slide-in");
            })
        }
    }, [isMainIntersecting]);

    const handleCheck = (name: string) => {
        setState(prev => {
            const copy = { ...prev }
            copy[name] = !copy[name]
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

    const handleSubmit = () => {
        if (invalidFields.length > 0) {
            toast.warn('Sva polja moraju biti validna.')
            return
        }
        localStorage.setItem('creatingTask', JSON.stringify({ ...state, category: state.category.value }))
        navigate('auth/register')
    }

    const handleSearchSelect = (v: ISelectValue) => {
        setModalOpen(true)
        setState(prev => {
            const copy = structuredClone(prev)
            copy.category = v
            return copy
        })
    }



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


    return <div className='website-container' >
        <div className='website-top-bar'>
            <h1>Calaus</h1>
            <Button text='Prijava' onClick={() => navigate('/auth/prijava')} />
        </div>
        <main ref={mainRef} className='website-main' >
            <div className='website-title-search ' >
                <h1>Koja usluga vam je potrebna?</h1>
                <SearchBox className='w30 h4 mt3' onOptionClick={handleSearchSelect} selected={categories} setList={setCategories} fixedList={Categories} />
            </div>
            <div className='website-photos' >
                <img className='website-phone' src={iphone} />
                <img className='website-computer' src={macbook} />
            </div>
        </main>
        <section className='website-details' >
            <p className='w100 web-secttion-title'>Brzo i jednostavno do završenog posla</p>
            <div className=' flex between' >
                <p>
                    Calaus je inovativna aplikacija koja donosi revoluciju u načinu kako ljudi pronalaze kvalifikovane majstore za obavljanje različitih zadataka i poslova. Bez obzira da li vam treba pomoć oko renoviranja kuće, popravke aparata, čišćenja dvorišta ili bilo kojeg drugog zadatka, naša aplikacija vam omogućava da brzo i jednostavno pronađete pravu osobu za posao.
                </p>
                <img src='https://images.unsplash.com/photo-1618090584176-7132b9911657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3028&q=80' alt='worker' />
            </div>
        </section>
        <section className='website-steps'>
            <p className='w100 web-secttion-title'>Kako Calaus funkcioniše</p>
            <div className='website-single-step' >
                <h1>1.</h1>
                <div className='step-desc' >
                    <h3>Objavi zadatak</h3>
                    <p>Počnite tako što ćete postaviti detaljan opis zadatka koji treba obaviti. Možete dodati slike, rokove i druge specifične zahteve kako biste jasno definisali šta vam je potrebno.</p>
                </div>
                <div className='step-icon' >
                    <img src={firstStep} alt='' />
                </div>
            </div>
            <div className='website-single-step flex-row-reverse' >
                <h1>2.</h1>
                <div className='step-desc' >
                    <h3>Sačekaj i prihvati najbolju ponudu</h3>
                    <p> Naša aplikacija će automatski upariti vaš zadatak s majstorima koji su specijalizovani za tu vrstu posla. Možete pregledati profile majstora, pročitati recenzije drugih korisnika i odabrati osobu koja vam najviše odgovara.</p>
                </div>
                <div className='step-icon' >
                    <img src={secondStep} alt='' />
                </div>
            </div>
            <div className='website-single-step' >
                <h1>3.</h1>
                <div className='step-desc' >
                    <h3>Komunicirajte i dogovorite se</h3>
                    <p>Nakon što pronađete odgovarajućeg majstora, možete započeti razgovor s njim putem aplikacije. Dogovorite se oko cene, vremena izvršenja posla i drugih detalja..</p>
                </div>
                <div className='step-icon' >
                    <img src={thirdStep} alt='' />
                </div>
            </div>
            <div className='website-single-step flex-row-reverse' >
                <h1>4.</h1>
                <div className='step-desc' >
                    <h3>Plaćanje i ocena</h3>
                    <p> Nakon završetka posla, izvršite plaćanje putem aplikacije i ostavite ocenu majstora kako biste pomogli drugim korisnicima da pronađu kvalifikovane majstore.</p>
                </div>
                <div className='step-icon' >
                    <img src={fourthStep} alt='' />
                </div>
            </div>
        </section>
        <section className='website-advantages'>
            <p className='w100 web-secttion-title'>Prednosti Calausa</p>
            <div className='web-card-container' >
                <div className='web-adv-card' >
                    <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                    <h4>Brzo i efikasno</h4>
                    <p>Naša aplikacija vam štedi vreme i napore u potrazi za pouzdanim majstorima.</p>
                </div>
                <div className='web-adv-card' >
                    <FontAwesomeIcon icon={faHandsPraying as IconProp} />
                    <h4>Sigurnost i pouzdanost:</h4>
                    <p>Svi majstori prošli su proveru i ocenjivanje od strane drugih korisnika.</p>
                </div>
                <div className='web-adv-card' >
                    <FontAwesomeIcon icon={faList as IconProp} />
                    <h4>Širok spektar usluga</h4>
                    <p>Bilo da vam treba građevinski rad, električarske usluge, čišćenje ili nešto drugo, sigurno ćete pronaći odgovarajućeg majstora.</p>
                </div>
                <div className='web-adv-card' >
                    <FontAwesomeIcon icon={faFile as IconProp} />
                    <h4>Transparentnost</h4>
                    <p>Cene i uslovi su jasno komunicirani unapred.</p>
                </div>
                <div className='web-adv-card' >
                    <FontAwesomeIcon icon={faHeadset as IconProp} />
                    <h4>Kvalitetna podrška</h4>
                    <p>Naš tim podrške je tu da vam pomogne u svakom trenutku.</p>
                </div>
            </div>
        </section>
        {modalOpen && <div className='website-modal'  >
            <div ref={modalRef} >
                <div className='modal-top' >
                    <h3>Kreiranje oglasa za posao: {state.category.label} </h3>
                    <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faClose as IconProp} fontSize='1.3rem' onClick={() => setModalOpen(false)} />
                </div>
                <div className='ct-form-container'  >
                    <div className='ct-form-section' >
                        <Input invalid={checkValid(invalidFields, 'name')} className='w100' labelText='Naziv zadatka' name='name' value={state.name} type='text' onChange={handleChange} />
                        <TextArea className='w100 h10' name='description' labelText='Description' value={state.description} onChange={handleChange} />
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }} >
                            {/* <Input invalid={checkValid(invalidFields, 'location')} className='w100' labelText='Lokacija' name='location' value={state.location} type='text' onChange={handleChange} /> */}
                            <AsyncSelect name='location' className='w100' labelText='Lokacija' value={state.location} onChange={handleLocation} />
                            <Input invalid={checkValid(invalidFields, 'date')} className='w100' labelText='Datum' name='date' value={(state.date as unknown) as string} type='date' onChange={handleChange} />
                        </div>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }} >
                            <Input invalid={checkValid(invalidFields, 'price')} className='w100' labelText='Cena' name='price' value={state.price} type='number' onChange={handleChange} />
                            <Select invalid={checkValid(invalidFields, 'currency')} className='w100' labelText='Valuta' name='currency' value={state.currency} options={currencies} onChange={handleSelect} />
                            <Select invalid={checkValid(invalidFields, 'price_type')} className='w100' labelText='Mera' name='price_type' value={state.price_type} options={priceTypes} onChange={handleSelect} />
                        </div>
                        {state?.price_type && state?.price_type !== 'WHOLE' && <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', minHeight: '4rem' }} >
                            <Input labelText='Kolicina' name='amount' value={state.amount} type='number' onChange={handleChange} />
                        </div>}
                    </div>
                    <div className='w100 worker-map-container website-map' >
                        <Wrapper apiKey={'AIzaSyC3j4JIbnFi0TBd5hDDo1qqiht0jw_eGW4'} version='beta' libraries={['marker', 'places', 'geocoding']}>
                            <Map setMap={setMap} />
                        </Wrapper>
                    </div>
                </div>
                <div className='flex just-end mt1' ><Button text='Nastavi' onClick={handleSubmit} /></div>

            </div>
        </div>}
        <footer className='web-footer' >
            <div className='web-footer__wrapper'  >
                <div className='web-footer__main-info' >
                    <h1>Calaus</h1>
                    <p>Calaus vas povezuje sa radnicima iz <br /> sirokog spektra vestina. </p>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faInstagram as IconProp} />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faLinkedin as IconProp} />
                        </div>
                    </div>
                </div>
                <div className='web-footer__useful-links' >
                    <h3>Korisni linkovi</h3>
                    <a href='www.google.com' >O kompaniji</a>
                    <a href='www.google.com' >Otvorene pozicije</a>
                    <a href='www.google.com' >Kontakt</a>
                </div>
            </div>
            <div className='footer-bottom' >
                <p>© Calaus 2024.</p>
                <div>
                    <a href='www.google.com'>Politika Privatnosti</a>
                    <a href='www.google.com'></a>
                </div>
            </div>
        </footer >
    </div >
}