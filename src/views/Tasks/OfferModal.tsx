import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { ISelectValue, Select } from 'components/Select'
import { TextArea } from 'components/TextArea'
import { createJobOffer } from 'feautures/jobOffer/jobOfferSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch } from 'store'
import { checkValid } from 'utils/helpers'
import { standardFieldValidation, validateSelect } from 'utils/validationUtils'
import { currencies, offerModalInvalidFields, priceTypes } from './tasksData'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export const OfferModal = ({ price, price_type, currency, amount, setOpenModal }: IOfferModal) => {
    const [state, setState] = useState<IJobOffer>({
        price,
        price_type,
        currency,
        amount,
        description: ''
    })
    const [invalidFields, setInvalidFields] = useState(offerModalInvalidFields)
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()


    const handleSubmit = async () => {
        const resp = await dispatch(createJobOffer({ id: Number(id), jobOffer: state }))
        if (resp.meta.requestStatus === 'fulfilled') {
            setOpenModal(false)
        }
    }

    const handleDescription = (e) => {
        setState(prev => {
            const copy = structuredClone(prev)
            copy.description = e.target.value
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

    return <div className='modal-wrapper' >
        <div className='send-offer-modal'  >
            <div className='modal-top' >
                <h3>Ponuda za posao</h3>
                <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faClose as IconProp} fontSize='1.3rem' onClick={() => setOpenModal(false)} />
            </div>
            <TextArea className='w100 h10 mt1' labelText='Detalji:' name='description' onChange={handleDescription} value={state?.description} />
            <div className='w100 flex align-center between mt1 gap1'  >
                <Input invalid={checkValid(invalidFields, 'price')} className='w100' labelText='Cena' name='price' value={state?.price} type='number' onChange={handleChange} />
                <Select invalid={checkValid(invalidFields, 'currency')} className='w100' labelText='Valuta' name='currency' value={state?.currency} options={currencies} onChange={handleSelect} />
                <Select invalid={checkValid(invalidFields, 'price_type')} className='w100' labelText='Mera' name='price_type' value={state?.price_type} options={priceTypes} onChange={handleSelect} />
            </div>
            <div className='w100 flex align-center between mt2 gap1' >
                {state?.price_type && state?.price_type !== 'WHOLE' && <Input labelText='Kolicina' name='amount' value={state?.amount} type='number' onChange={handleChange} />}
                <h2>≈ {state?.price && (state?.price * (state?.amount ?? 1) + ' ' + state?.currency)}</h2>
            </div>
            <div className='w100 flex just-center mt5'><Button className='send-offer-modal' text='Pošalji prijavu' onClick={handleSubmit} /></div>
        </div>
    </div>
}

export interface IJobOffer {
    description: string
    price: number
    price_type: string
    currency: string
    amount?: number
}

interface IOfferModal extends Omit<IJobOffer, 'description'> {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}