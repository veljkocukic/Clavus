import googleLogo from '../../assets/icons/googleLogo.png'
import appleLogo from '../../assets/icons/appleLogo.png'
import { Button } from 'components/Button'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
    const navigate = useNavigate()
    return <div className='auth-screen'>
        <div className='auth-options'>
            <h1>Clavus</h1>
            <p>Mesto za obavljanje vaših poslova</p>
            <div className='auth-button w20 mt4' >
                <img src={googleLogo} alt='google-logo' />
                Continue with Google
            </div>
            <div className='auth-button w20 mt1 ' >
                <img src={appleLogo} alt='apple-logo' />
                Log in with Apple
            </div>
            <div className='or-container' >
                <div className='line' ></div>
                <p>ili</p>
                <div className='line' ></div>
            </div>
            <Button text='Nastavi mejlom' onClick={() => navigate('login')} className='w20 mt1' />
        </div>
    </div>
}