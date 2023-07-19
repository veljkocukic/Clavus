import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { SearchBox } from 'components/SearchBox/SearchBox'
import { ISelectValue, Select } from 'components/Select'
import { TextArea } from 'components/TextArea'
import { CheckBox } from 'components/TopBar/CheckBox'
import { createTask } from 'feautures/task/taskSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { AppDispatch } from 'store'
import { standardFieldValidation, validateSelect } from 'utils/validationUtils'
import { Categories, colorCombinations, currencies, ITaskState, priceTypes, tasksInitialState, tasksValidation } from './tasksData'

export const CreateTask = () => {

    const [state, setState] = useState<ITaskState>(tasksInitialState)
    const [invalidFields, setInvalidFields] = useState(tasksValidation)
    const dispatch = useDispatch<AppDispatch>()


    const handleSubmit = () => {
        if (invalidFields.length > 0) {
            toast.warn('Polja moraju biti validna')
            return
        }
        dispatch(createTask(state))
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
        return Categories.map((c, i) => {
            return <div key={i} className='card-wrapper cursor-pointer' onClick={() => setCategory(c.value)} >
                <div className='card-icon-text' style={{ backgroundColor: colorCombinations[0].backgroundColor }}>
                    <FontAwesomeIcon icon={c.icon} color={colorCombinations[0].iconColor} />
                    <p>{c.name}</p>
                </div>
            </div>
        })
    }

    return <div className='page-contetnt' >
        <div className='content-title-bar' >
            <p><span>Kreiranje zadatka</span></p>
        </div>
        <div className='page-subtitle' >
            {!state.category ? <><p>Izaberite kategoriju:</p>
                <SearchBox /></> : <><p>Unesite detalje:</p>
                <Button text='Potvrdi' onClick={handleSubmit} />
            </>}
        </div>
        {!state.category ? <div className='ct-cards-container' >
            {renderCards()}
        </div> :
            <div className='ct-form-container' >
                <div className='ct-form-section' >
                    <Input className='w100' labelText='Naziv zadatka' name='name' value={state.name} type='text' onChange={handleChange} />
                    <Input className='w100' labelText='Lokacija' name='location' value={state.location} type='text' onChange={handleChange} />
                    <Input className='w100' labelText='Datum' name='date' value={state.date} type='date' onChange={handleChange} />
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }} >
                        <Input className='w100' labelText='Cena' name='price' value={state.price} type='number' onChange={handleChange} />
                        <Select className='w100' labelText='Valuta' name='currency' value={state.currency} options={currencies} onChange={handleSelect} />
                        <Select className='w100' labelText='Mera' name='priceType' value={state.priceType} options={priceTypes} onChange={handleSelect} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', minHeight: '4rem' }} >
                        {state?.priceType !== 'WHOLE' && <Input labelText='Kolicina' name='amount' value={state.amount} type='number' onChange={handleChange} />}
                        <CheckBox text='Rad bez nadgledanja' active={state.withoutMonitoring} onChange={handleCheck} name='withoutMonitoring' />
                    </div>
                </div>
                <div className='ct-form-section' >
                    <TextArea className='w100 h15' name='description' labelText='Description' value={state.description} onChange={handleChange} />
                </div>
            </div>}

    </div>

}