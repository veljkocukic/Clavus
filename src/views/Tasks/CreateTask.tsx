/*eslint-disable*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { SearchBox } from 'components/SearchBox/SearchBox'
import { ISelectValue, Select } from 'components/Select'
import { TextArea } from 'components/TextArea'
import { CheckBox } from 'components/TopBar/CheckBox'
import { createTask } from 'feautures/task/taskSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppDispatch, RootState } from 'store'
import { checkValid } from 'utils/helpers'
import { standardFieldValidation, validateSelect } from 'utils/validationUtils'
import { Categories, colorCombinations, currencies, ITaskState, priceTypes, tasksInitialState, tasksValidation } from './tasksData'

export const CreateTask = () => {
    const [state, setState] = useState<ITaskState>(tasksInitialState)
    const [invalidFields, setInvalidFields] = useState(tasksValidation)
    const navigate = useNavigate()
    const { createdTaskId } = useSelector((state: RootState) => state.tasks)
    const dispatch = useDispatch<AppDispatch>()
    const [cats, setCats] = useState(Categories)
    const creatingTask: ITaskState = JSON.parse(localStorage.getItem('creatingTask'))


    // useEffect(() => {
    //     createdTaskId && navigate('/tasks/' + createdTaskId)
    // }, [createdTaskId])

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
            </div>}

    </div>

}