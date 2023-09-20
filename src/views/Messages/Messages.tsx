/*eslint-disable*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchBox } from 'components/SearchBox/SearchBox'
import { faWarning, faPhotoVideo } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'store'
import { getConversations, getMessages, sendMessage } from 'feautures/messages/messagesSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from 'context/WebSocketContext'
import { Button } from 'components/Button'

const SingleMessage = ({ text, sender }) => {

    const style = { justifyContent: sender ? 'flex-end' : 'flex-start' }
    const contentStyle = { backgroundColor: sender ? '#f1f5fe' : '#dee0ea2f' }

    return <div className='single-message' style={style}>
        <div className='single-message__content' style={contentStyle}  >
            <p>{text}</p>
        </div>
    </div>
}

const SingleConversation = ({ conversationId, receiver, setCurrentChat }) => {
    const navigate = useNavigate()
    const { name, lastName } = receiver

    const handleClick = () => {
        navigate('/messages/' + conversationId)
        setCurrentChat(receiver)
    }

    return <div className='single-message-list-item'
        onClick={handleClick} >
        <img src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' alt='user-image' />
        <div>
            <h4>{name + ' ' + lastName}</h4>
            <p>Tekst poslate poruke u chatu nekom pre</p>
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

    useEffect(() => {
        socket.on('message', data => {
            if (Number(conversationId) == data.conversationId && !localMessages.some(m => m == data.id)) {
                setLocalMessages(prev => [...prev, data])
            }
        })
        return () => {
            socket.off('message')
        }
    }, [])

    useEffect(() => {
        dispatch(getConversations(null))
    }, [])

    useEffect(() => {
        dispatch(getMessages(params))
    }, [params])

    useEffect(() => {
        setParams({ page: 1, limit: 20 })
        const c = conversations.find(c => c.id == conversationId)
        const obj = {
            id: c.id,
            name: c.participants[0].name,
            lastName: c.participants[0].lastName
        }
        setCurrentChat(obj)
        if (localMessages.length > 1) {
            setLocalMessages([])
        }
    }, [conversationId])

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
        }
    }

    return <div className='page-content' >
        <div className='content-title-bar'>
            <p>Poruke</p>
        </div>
        <div className='flex w100 center h100 mt1' >
            <div className="messages-list" >
                <SearchBox className='w100' placeholder='Pretrazite poruke' />
                {conversations.map(c => <SingleConversation
                    receiver={c?.participants[0]}
                    key={c.id}
                    conversationId={c.id}
                    setCurrentChat={setCurrentChat}
                />
                )}
            </div>
            <div className="messages-chat" >
                {currentChat && <> <div className="messages-chat__top" >
                    <div className="messages-chat__top-name" >
                        <img src='https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' alt='user-image' />
                        <div className='flex gap5' >
                            <h4>{currentChat.name + ' ' + currentChat.lastName}</h4>
                        </div>
                    </div>
                    <div className='flex gap1 center' >
                        <Button text='Prihvati ponudu' className='h1' />
                        <FontAwesomeIcon icon={faWarning} />
                    </div>
                </div>
                    <div className='messages-chat__list' >
                        <div className='messages-chat__list-scroll' >
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
    </div>
}