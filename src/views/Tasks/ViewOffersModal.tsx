/*eslint-disable*/
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faClose, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePaginate from 'utils/hooks/usePaginate'


const SingleOffer = ({ id, user, description }: IJobOffersList) => {
    const navigate = useNavigate()

    return <div className='view-offers-modal__content__single-offer' >
        <div>
            <div className='view-offers-modal__content__single-offer--name-image' >
                <img alt='profile pic' src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' />
                <h4>{user.name + ' ' + user.lastName}</h4>
            </div>

            <div className='view-offers-modal__content__single-offer--ratings' >
                <div className='view-offers-modal__content__single-offer--ratings__container' >
                    <h4>Poslova odradjeno: {user.jobsDone ?? '/'}</h4>
                    <h4>Prosecna ocena: {user.ratings ?? '/'}</h4>
                </div>

                <div onClick={() => navigate('/job-offer/' + id)} className='view-offers-modal__content__single-offer--arrow' >
                    <FontAwesomeIcon icon={faArrowRight as IconProp} />
                </div>
            </div>


        </div>
        <p>
            {description}
        </p>
    </div>
}

export const ViewOffersModal = ({ setOpenModal }) => {

    const [params, setParams] = useState({ page: 1, limit: 10 })
    const [list, setList] = useState<IJobOffersList[]>([])
    const { id } = useParams()

    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget
        const bottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 400 // DEBOUNCE
        if (bottom) {
            setParams((prev: any) => {
                const copy = { ...prev }
                copy.page = copy.page + 1
                return copy
            })
        }
    }

    usePaginate('job-offer/all/' + id, params, null, null, setList)

    return <div className='modal-wrapper' >
        <div className='view-offers-modal' onScroll={handleScroll} >
            <div className=' modal-top' >
                <h3>Ponude za posao</h3>
                <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faClose as IconProp} fontSize='1.3rem' onClick={() => setOpenModal(false)} />
            </div>
            <div className='view-offers-modal__content'  >
                {list.map(jo => <SingleOffer id={jo.id} description={jo.description} user={jo.user} key={id} />)}
            </div>
        </div>
    </div>
}

interface IJobOffersList {
    id: number,
    user: {
        name: string
        lastName: string
        ratings: number
        jobsDone: number
    },
    description: string
}