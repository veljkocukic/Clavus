
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../feautures/user/userSlice';
import { AppDispatch, RootState } from '../../store';
import { Button } from '../../components/Button';
import { standardFieldValidation } from '../../utils/validationUtils';
import { Input } from 'components/Input';
import { toast } from 'react-toastify';

export const Login = () => {
  const [invalidFields, setInvalidFields] = useState([])
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState<any>({
    email: '',
    password: '',
  });

  const { user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (user) { navigate('/') }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (e.target.type !== 'password') {
      standardFieldValidation(e, setInvalidFields)
    }
    setInputValues((prev: any) => {
      const copy = { ...prev };
      copy[name] = value
      return copy
    });
  };

  const handleSubmit = () => {
    if (invalidFields.length > 0) {
      toast.warn('Email mora biti validan.')
      return
    }
    dispatch(loginUser(inputValues));
  };


  return (
    <div className='auth-wrapper' >
      <div className='auth-form' >
        <div className='login-form w25'>
          <div className='login-title mb3'>
            <h1>Dobrodošli</h1>
            <p>Prijavite se za nastavak</p>
          </div>
          <Input
            type='email'
            className='w100 mb1'
            name='email'
            labelText='Email'
            value={inputValues.email}
            onChange={handleChange}
            invalid={invalidFields.includes('email')}
          />
          <Input
            className='w100'
            type='password'
            name='password'
            labelText='Password'
            value={inputValues.password}
            onChange={handleChange}
          />
          <Button text='PRIJAVA' className='mt2 w100' onClick={handleSubmit} />
          <p className='small-text' ><span >Zaboravljena lozinka</span></p>
          <p className='small-text' >Nemate nalog? <span onClick={() => navigate('/auth/register')} >Registracija</span></p>
        </div>
      </div>
      <div className='auth-side' >
        Clavus
      </div>
    </div>
  );
};
