import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { IService, IWorkshopState } from './workshopsData'

export const ServicesModal = ({ setModalOpen, setState, services }: IServiceModal) => {
    const removeService = (id: number | string) => {
        setState((prev: IWorkshopState) => {
            const copy = structuredClone(prev)
            copy.services = copy.services.filter((c) => c.id !== id)
            return copy
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number | string) => {
        const { name, value, type } = e.target
        setState((prev: IWorkshopState) => {
            const copy = structuredClone(prev)
            const index = copy.services.findIndex((s) => s.id == id)
            copy.services[index][name] = type == 'number' ? Number(value) : value
            return copy
        })
    }

    const handleAdd = () => {
        setState((prev: IWorkshopState) => {
            const copy = structuredClone(prev)
            copy.services.push({
                id: 'new' + services.length,
                price: null,
                name: null,
            })
            return copy
        })
    }

    return (
        <div className='modal-wrapper'>
            <div className='services-modal'>
                <div className='modal-top'>
                    <h3>Usluge</h3>
                    <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        icon={faClose as IconProp}
                        fontSize='1.3rem'
                        onClick={() => setModalOpen(false)}
                    />
                </div>
                <div className='flex column center gap1 '>
                    {services.map((s: IService) => (
                        <div key={s.id} className='flex between gap1 align-center'>
                            <Input
                                className='w70'
                                type='text'
                                labelText='Naziv usluge'
                                onChange={(e) => handleChange(e, s.id)}
                                name='name'
                                value={s.name}
                            />
                            <Input
                                className='w30'
                                type='number'
                                labelText='Cena'
                                onChange={(e) => handleChange(e, s.id)}
                                name='price'
                                value={s.price}
                            />
                            <FontAwesomeIcon
                                icon={faClose as IconProp}
                                size='xl'
                                className='cursor-pointer'
                                onClick={() => removeService(s.id)}
                            />
                        </div>
                    ))}
                    <Button text='Dodaj uslugu' onClick={handleAdd} />
                </div>
            </div>
        </div>
    )
}

interface IServiceModal {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setState: React.Dispatch<React.SetStateAction<IWorkshopState>>
    services: IService[]
}
