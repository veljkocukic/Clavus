
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../feautures/user/userSlice';
import { AppDispatch, RootState } from '../../store';
import { Button } from '../../components/Button';
import { standardFieldValidation } from '../../utils/validationUtils';
import { Input } from 'components/Input';
import { CheckBox } from 'components/TopBar/CheckBox';
import { toast } from 'react-toastify';

export const Register = () => {
    const [invalidFields, setInvalidFields] = useState([])
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState<any>({
        name: '',
        lastName: '',
        email: '',
        password: '',
        role: 'ADMIN',
        phoneNumber: ''
    });

    const { user } = useSelector((state: RootState) => state.user)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        standardFieldValidation(e, setInvalidFields)
        setInputValues((prev: any) => {
            const copy = { ...prev };
            copy[name] = value
            return copy
        });
    };


    const handleSubmit = () => {
        if (invalidFields.length > 0) {
            toast.warn('Sva polja moraju biti validna.')
        }
        dispatch(registerUser(inputValues));
    };


    const handleRoles = (name: string) => {
        setInputValues((prev: any) => {
            const copy = structuredClone(prev)
            copy.role = name
            return copy
        })
    }

    useEffect(() => {
        if (user) { navigate('/') }
    }, [user]);

    return (
        <div className='auth-wrapper' >
            <div className='auth-form' >
                <section className='register-form w25 '>
                    <div className='login-title mb3'>
                        <h1>Registracija</h1>
                    </div>

                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: '1rem' }} >
                        <Input
                            type='text'
                            name='name'
                            labelText='Ime'
                            value={inputValues.name}
                            onChange={handleChange}
                            invalid={invalidFields.includes('name')}
                            className='w100'
                        />
                        <Input
                            type='text'
                            name='lastName'
                            labelText='Prezime'
                            value={inputValues.lastName}
                            onChange={handleChange}
                            invalid={invalidFields.includes('lastName')}
                            className='w100'
                        />
                    </div>

                    <Input
                        type='email'
                        className='w100'
                        name='email'
                        labelText='Email'
                        value={inputValues.email}
                        onChange={handleChange}
                        invalid={invalidFields.includes('email')}
                    />

                    <Input
                        type='password'
                        className='w100'
                        name='password'
                        labelText='Lozinka'
                        value={inputValues.password}
                        onChange={handleChange}
                        invalid={invalidFields.includes('password')}
                        customInvalidMessage={'Lozinka mora biti duža od 5 karaktera'}
                    />

                    <Input
                        type='tel'
                        name='phoneNumber'
                        className='w100'
                        labelText='Broj telefona'
                        value={inputValues.phoneNumber}
                        onChange={handleChange}
                        invalid={invalidFields.includes('phoneNumber')}

                    />
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', width: '100%' }} className='mt1' >
                        <CheckBox onChange={handleRoles} name='WORKER' active={inputValues.role === 'WORKER'} text={'Radnik'} />
                        <CheckBox onChange={handleRoles} name='ADMIN' active={inputValues.role === 'ADMIN'} text={'Oglasnik'} />
                    </div>
                    <Button
                        onClick={handleSubmit}
                        className={'mt3 w100'}
                        text='Registracija'
                    />
                    <p className='small-text' >Već imate nalog? <span onClick={() => navigate('/auth/login')} >Prijava</span></p>

                </section>
            </div>
            <div className='auth-side' >
                Clavus
            </div>
        </div>
    );
};
