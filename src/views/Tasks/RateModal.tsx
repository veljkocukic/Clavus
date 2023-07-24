import { Button } from 'components/Button'
import { TextArea } from 'components/TextArea'
import { rateAndComplete } from 'feautures/task/taskSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppDispatch } from 'store'

export const RateModal = ({ setOpenModal }: { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [state, setState] = useState<IRating>({ description: '', rating: null })
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams()

    const handleSubmit = async () => {

        if (!state.rating) {
            toast.warn('Posao mora biti ocenjen da bi se zavrsio')
            return
        }

        const resp = await dispatch(rateAndComplete({ id: Number(id), rating: state }))
        if (resp.meta.requestStatus === 'fulfilled') {
            setOpenModal(false)
        }
    }

    const handleRate = (rate: number) => {
        setState(prev => {
            const copy = structuredClone(prev)
            copy.rating = rate
            return copy
        })
    }

    const renderNumbers = () => {
        const ar = []
        for (let i = 1; i <= 5; i++) {
            const style = { color: '#0050d0' }
            ar.push(<h1 onClick={() => handleRate(i)} className='rate-number' style={state.rating == i ? style : null} >{i}</h1>)
        }
        return ar
    }

    const handleDesc = (e) => {
        setState(prev => {
            const copy = structuredClone(prev)
            copy.description = e.target.value
            return copy
        })
    }

    return <div className='modal-wrapper'>
        <div className='modal flex column w30' >
            <h2>Zavrsetak posla</h2>
            <div className='w100 flex just-center column align-center' >
                <p className='mt2' >Ocenite radnika</p>
                <div className='w100 flex align-center just-center pad1 gap3' >
                    {renderNumbers()}
                </div>
                <TextArea className='mt2 w100 h10' labelText='Detalji' value={state.description} onChange={handleDesc} name='description' />
                <div className='w100 flex align-center just-center mt5' >
                    <Button text='POTVRDI' onClick={handleSubmit} />
                </div>
            </div>
        </div>
    </div>
}

export interface IRating {
    description: string
    rating: number
}