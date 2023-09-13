import { SearchBox } from 'components/SearchBox/SearchBox'
import { TopBar } from 'components/TopBar/TopBar'
import iphone from 'assets/images/iphone.png'
import macbook from 'assets/images/macbook.png'
import firstStep from 'assets/images/firstStep.png'
import secondStep from 'assets/images/secondStep.png'
import thirdStep from 'assets/images/thirdStep.png'
import fourthStep from 'assets/images/fourthStep.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faFile, faHandsPraying, faHeadset, faList } from '@fortawesome/free-solid-svg-icons'
import { Categories, currencies, ITaskState, priceTypes, tasksInitialState, tasksValidation } from 'views/Tasks/tasksData'
import { useState } from 'react'
import { Input } from 'components/Input'
import { TextArea } from 'components/TextArea'
import { checkValid } from 'utils/helpers'
import { ISelectValue, Select } from 'components/Select'
import { CheckBox } from 'components/TopBar/CheckBox'
import { standardFieldValidation, validateSelect } from 'utils/validationUtils'

export const Website = () => {
    const [categories, setCategories] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [invalidFields, setInvalidFields] = useState(tasksValidation)
    const [state, setState] = useState<ITaskState>(tasksInitialState)

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
        if (name == 'priceType') {
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
    return <div className='website-container' >
        <TopBar login className='bottom-shadow h5' />
        <main className='website-main' >
            <div className='website-title-search ' >
                <h1>Koja usluga vam je potrebna?</h1>
                <SearchBox className='w30 h4 mt3' selected={categories} setList={setCategories} fixedList={Categories} onOptionClick={() => setModalOpen(true)} />
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
                    Clavus je inovativna aplikacija koja donosi revoluciju u načinu kako ljudi pronalaze kvalifikovane majstore za obavljanje različitih zadataka i poslova. Bez obzira da li vam treba pomoć oko renoviranja kuće, popravke aparata, čišćenja dvorišta ili bilo kojeg drugog zadatka, naša aplikacija vam omogućava da brzo i jednostavno pronađete pravu osobu za posao.
                </p>
                <img src='https://images.unsplash.com/photo-1618090584176-7132b9911657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3028&q=80' alt='worker' />
            </div>
        </section>
        <section className='website-steps'>
            <p className='w100 web-secttion-title'>Kako Clavus funkcioniše</p>
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
            <p className='w100 web-secttion-title'>Prednosti Clavusa</p>
            <div className='web-card-container' >
                <div className='web-adv-card' >
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <h4>Brzo i efikasno</h4>
                    <p>Naša aplikacija vam štedi vreme i napore u potrazi za pouzdanim majstorima.</p>
                </div>
                <div className='web-adv-card' >
                    <FontAwesomeIcon icon={faHandsPraying} />
                    <h4>Sigurnost i pouzdanost:</h4>
                    <p>Svi majstori prošli su proveru i ocenjivanje od strane drugih korisnika.</p>
                </div>
                <div className='web-adv-card' >
                    <FontAwesomeIcon icon={faList} />
                    <h4>Širok spektar usluga</h4>
                    <p>Bilo da vam treba građevinski rad, električarske usluge, čišćenje ili nešto drugo, sigurno ćete pronaći odgovarajućeg majstora.</p>
                </div>
                <div className='web-adv-card' >
                    <FontAwesomeIcon icon={faFile} />
                    <h4>Transparentnost</h4>
                    <p>Cene i uslovi su jasno komunicirani unapred.</p>
                </div>
                <div className='web-adv-card' >
                    <FontAwesomeIcon icon={faHeadset} />
                    <h4>Kvalitetna podrška</h4>
                    <p>Naš tim podrške je tu da vam pomogne u svakom trenutku.</p>
                </div>
            </div>
        </section>
        {modalOpen && <div className='website-modal' tabIndex={1} onBlur={() => setModalOpen(false)} >
            <div>
                <div className='ct-form-container' >
                    <div className='ct-form-section' >
                        <Input invalid={checkValid(invalidFields, 'name')} className='w100' labelText='Naziv zadatka' name='name' value={state.name} type='text' onChange={handleChange} />
                        <TextArea className='w100 h10' name='description' labelText='Description' value={state.description} onChange={handleChange} />
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }} >
                            <Input invalid={checkValid(invalidFields, 'location')} className='w100' labelText='Lokacija' name='location' value={state.location} type='text' onChange={handleChange} />
                            <Input invalid={checkValid(invalidFields, 'date')} className='w100' labelText='Datum' name='date' value={state.date} type='date' onChange={handleChange} />
                        </div>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }} >
                            <Input invalid={checkValid(invalidFields, 'price')} className='w100' labelText='Cena' name='price' value={state.price} type='number' onChange={handleChange} />
                            <Select invalid={checkValid(invalidFields, 'currency')} className='w100' labelText='Valuta' name='currency' value={state.currency} options={currencies} onChange={handleSelect} />
                            <Select invalid={checkValid(invalidFields, 'priceType')} className='w100' labelText='Mera' name='priceType' value={state.priceType} options={priceTypes} onChange={handleSelect} />
                        </div>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', minHeight: '4rem' }} >
                            {state?.priceType && state?.priceType !== 'WHOLE' && <Input labelText='Kolicina' name='amount' value={state.amount} type='number' onChange={handleChange} />}
                            <CheckBox text='Rad bez nadgledanja' active={state.withoutMonitoring} onChange={handleCheck} name='withoutMonitoring' />
                        </div>
                    </div>
                    <div className='ct-form-section' >
                    </div>
                </div>
            </div>
        </div>}
        <footer className='web-footer' >
            <div className='flex w100 between center'>
                <h1>Clavus</h1>
                <h3>RADI NA CLAVUSU</h3>
            </div>
            <div className='footer-bottom' >
                © Clavus 2023.
            </div>
        </footer>
    </div>
}