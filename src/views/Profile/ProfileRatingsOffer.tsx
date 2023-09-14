import { Button } from 'components/Button'
import { clearRatings, getUserRatings } from 'feautures/user/userSlice'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { useOnClickOutside } from 'utils/hooks/useClickOutside'
export const ProfileRatingsOffer = ({ setOpenModal, id }: IProfileRatingsOffer) => {

    const [params, setParams] = useState({ page: 1, limit: 5 })
    const { data, pageCount } = useSelector((state: RootState) => state.user.userRatings)
    const dispatch = useDispatch<AppDispatch>()
    const ref = useRef(null)


    useOnClickOutside(ref, () => setOpenModal(false))

    useEffect(() => {
        dispatch(getUserRatings({ id, params }))
        return () => {
            dispatch(clearRatings())
        }
    }, [params])

    const handleLoadMore = () => {
        setParams(prev => {
            const copy = structuredClone(prev)
            copy.page = copy.page + 1
            return copy
        })
    }
    return <div className="modal-wrapper" >
        <div className="ratings-modal" ref={ref} >
            <div className="ratings-modal__list" >
                {data && data.map((r, i) => <SingleReview
                    name={r.ratingGiverUser.name}
                    lastName={r.ratingGiverUser.lastName}
                    rating={r.rating}
                    date={r.date}
                    description={r.description}
                    key={i}
                />)}
                {pageCount > params.page && <div className="flex just-center w100" >
                    <Button onClick={() => handleLoadMore()} text="Učitaj više" />
                </div>}
            </div>
        </div>
    </div>
}


const SingleReview = ({ name, lastName, description, rating, date }) => {
    return <div className="single-modal-rating" >
        <div className="single-modal-rating__top" >
            <div className='single-modal-rating__top--img' >
                <img src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" alt='reviewer-image' />
                <div>
                    <h3>{name + ' ' + lastName}</h3>
                    <p>{date}</p>
                </div>
            </div>
            <h1 style={{ color: '#0050d0' }} className="rate-number" >{rating}</h1>
        </div>
        <div className="single-modal-rating__review" >
            <p>{description}</p>
        </div>
    </div>
}

interface IProfileRatingsOffer {
    setOpenModal: React.Dispatch<any>
    id: number
}