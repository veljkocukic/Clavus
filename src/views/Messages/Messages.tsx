/*eslint-disable*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchBox } from 'components/SearchBox/SearchBox'
import { faWarning, faPhotoVideo, faCheckCircle, faClose } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { getConversations, getMessages, removeJobOffer, sendMessage } from 'feautures/messages/messagesSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from 'context/WebSocketContext'
import { acceptJobOffer } from 'feautures/jobOffer/jobOfferSlice'

const SingleMessage = ({ text, sender }) => {

    const style = { justifyContent: sender ? 'flex-end' : 'flex-start' }
    const contentStyle = { backgroundColor: sender ? '#f1f5fe' : '#dee0ea2f' }

    return <div className='single-message' style={style}>
        <div className='single-message__content' style={contentStyle}  >
            <p>{text}</p>
        </div>
    </div>
}


const SingleConversation = ({ conversationId, receiver, setCurrentChat, jobOffers }) => {
    const navigate = useNavigate()
    const { name, lastName } = receiver

    const handleClick = () => {
        navigate('/messages/' + conversationId)
        setCurrentChat({ ...receiver, jobOffers, receiverId: receiver.id })
    }

    let cName = 'single-message-list-item'

    return <div className={cName}
        onClick={handleClick} >
        <img src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' alt='user-image' />
        <div>
            <h4>{name + ' ' + lastName}</h4>
            <p>Tekst poslate poruke u chatu nekom pre</p>
        </div>
    </div>
}

const OffersModal = ({ setModalOpen, currentChat, setCurrentChat }) => {

    const dispatch = useDispatch<AppDispatch>()

    const handleAccept = async (id: number) => {
        const resp = await dispatch(acceptJobOffer(id))
        if (resp.meta.requestStatus = 'fulfilled') {
            setModalOpen(false)
            dispatch(removeJobOffer({ cId: currentChat.id, oId: id }))
            setCurrentChat(prev => {
                const copy = structuredClone(prev)
                copy.jobOffers = []
                return copy
            })
        }
    }

    return <div className='offers-modal' >
        <div className='offers-content' >
            <div className='offers-content__close'  >
                <FontAwesomeIcon icon={faClose} onClick={() => setModalOpen(false)} />
            </div>
            <div className='offers-content__scroll' >
                {currentChat.jobOffers.map(o =>
                    <div className='offers-content__single-offer' key={o.id} >
                        <h3>{o.job.name}</h3>
                        <div className='accept-offer-chat' onClick={() => handleAccept(o.id)} >
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <p>Prihvati ponudu</p>
                        </div>
                    </div>)}
            </div>

        </div>
    </div>
}

export const Messages = () => {
    const mediaInputRef = useRef(null)
    const dispatch = useDispatch<AppDispatch>()
    const { conversations, messages } = useSelector((state: RootState) => state.messages)
    const [localMessages, setLocalMessages] = useState([])
    const { conversationId } = useParams()
    const [params, setParams] = useState({ page: 1, limit: 20 })
    const [messageContent, setMessageContent] = useState('')
    const [currentChat, setCurrentChat] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const scrollRef = useRef(null)

    console.log(currentChat)

    useEffect(() => {
        socket.on('message', data => {
            if (Number(conversationId) == data.conversationId && !localMessages.some(m => m == data.id)) {
                setLocalMessages(prev => {
                    const copy = [...prev]
                    copy.unshift(data)
                    return copy
                })
            }
        })
        return () => {
            socket.off('message')
        }
    }, [])

    useEffect(() => {
        if (scrollRef?.current) {
            scrollRef.current.scrollTop = scrollRef?.current.scrollHeight;
        }
    }, [localMessages])

    useEffect(() => {
        dispatch(getConversations(null))
    }, [])

    useEffect(() => {
        dispatch(getMessages(params))
    }, [params])

    useEffect(() => {
        setParams({ page: 1, limit: 20 })
        if (conversationId && conversations.length > 0) {
            const c = conversations.find(c => c.id == conversationId)
            const obj = {
                id: c.id,
                receiverId: c.participants[0].id,
                name: c.participants[0].name,
                lastName: c.participants[0].lastName,
                jobOffers: c.jobOffers
            }
            setCurrentChat(obj)
        }
        if (localMessages.length > 1) {
            setLocalMessages([])
        }
    }, [conversationId, conversations])

    useEffect(() => {
        if (messages && conversationId) {
            setLocalMessages(prev => {
                const newMessages = messages.filter(message =>
                    !prev.some(prevMessage => prevMessage.id === message.id)
                );

                return [...prev, ...newMessages]
            })
        }
    }, [messages])

    const user = JSON.parse(localStorage.getItem('user'))

    const handleEnter = async (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            await dispatch(sendMessage({
                conversationId: Number(conversationId),
                receiverId: currentChat.receiverId,
                userId: user.id,
                content: messageContent
            }))
            setMessageContent('')
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }

    const handleAcceptOffer = async () => {
        if (currentChat?.jobOffers.length > 1) {
            setModalOpen(true)
        } else {
            const resp = await dispatch(acceptJobOffer(currentChat?.jobOffers[0].id))
            if (resp.meta.requestStatus = 'fulfilled') {
                setModalOpen(false)
                dispatch(removeJobOffer({ cId: currentChat.id, oId: currentChat?.jobOffers[0].id }))
                setCurrentChat(prev => {
                    const copy = structuredClone(prev)
                    copy.jobOffers = []
                    return copy
                })
            }
        }
    }

    return <div className='page-content-static' >
        <div className='content-title-bar'>
            <p>Poruke</p>
        </div>
        <div className='flex w100 center h100 mt1 overflow-hidden messages-container'>
            <div className="messages-list" >
                <SearchBox className='w100' placeholder='Pretrazite poruke' />
                <div className='conversations-container' >
                    {conversations.map(c => <SingleConversation
                        receiver={c?.participants[0]}
                        key={c.id}
                        jobOffers={c.jobOffers}
                        conversationId={c.id}
                        setCurrentChat={setCurrentChat}
                    />
                    )}
                </div>
            </div>
            <div className="messages-chat" >
                {currentChat && <> <div className="messages-chat__top" >
                    <div className="messages-chat__top-name" >
                        <img src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' alt='user-image' />
                        <div className='flex gap5' >
                            <h4>{currentChat.name + ' ' + currentChat.lastName}</h4>
                        </div>
                    </div>
                    <div className='flex gap1 h100 align-center' >
                        {currentChat?.jobOffers?.length > 0 && <div className='accept-offer-chat' onClick={handleAcceptOffer} >
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <p>Prihvati ponudu</p>
                        </div>}
                        <FontAwesomeIcon icon={faWarning} />
                    </div>
                </div>
                    <div className='messages-chat__list' >
                        <div className='messages-chat__list-scroll' ref={scrollRef} >
                            {localMessages.map(m => <SingleMessage text={m.content} sender={m.senderId == user.id} />)}
                        </div>
                    </div>
                    <div className='messages-chat__input' >
                        <div className='media-input' onClick={() => mediaInputRef.current.click()} >
                            <FontAwesomeIcon icon={faPhotoVideo} />
                            <input ref={mediaInputRef} type='file' />
                        </div>
                        <input onChange={e => setMessageContent(e.target.value)} value={messageContent}
                            type='text' placeholder='Unesite poruku...' onKeyDown={handleEnter} />
                    </div></>}
            </div>
        </div>
        {modalOpen && <OffersModal currentChat={currentChat} setModalOpen={setModalOpen} setCurrentChat={setCurrentChat} />}
    </div>
}