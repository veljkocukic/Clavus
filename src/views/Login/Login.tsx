
import React, { useEffect, useState } from 'react';
import '../../sass/layouts/_login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginUser,
  registerUser,
} from '../../feautures/user/userSlice';
import { AppDispatch, RootState } from '../../store';
import { LoginCard } from './LoginCard';
import { RegisterCard } from './RegisterCard';
import { Button } from '../../components/Button';
import { standardFieldValidation } from '../../utils/validationUtils';

export const Login = () => {
  const [invalidRegisterFields, setInvalidRegisterFields] = useState([])
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(false);
  const [inputValues, setInputValues] = useState<any>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    role: 'ADMIN',
    phoneNumber: ''
  });

  const { logged } = useSelector((state: RootState) => state.user)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    standardFieldValidation(e, setInvalidRegisterFields)
    setInputValues((prev: any) => {
      const copy = { ...prev };
      copy[name] = value
      return copy
    });
  };


  const handleSubmit = (type: string) => {

    const { email, password } = inputValues;
    //  REGISTER
    if (type === 'register') {
      dispatch(registerUser(inputValues));
    } else {
      const loginValues = { email, password };
      dispatch(loginUser(loginValues));
    }
    //  LOGIN

  };

  const changeSlide = () => {
    setInputValues({
      name: '',
      lastName: '',
      email: '',
      password: '',
      role: 'ADMIN',
      phoneNumber: ''
    });
    setIsMember(!isMember);
  };

  const handleRoles = (name: string) => {
    setInputValues((prev: any) => {
      const copy = structuredClone(prev)
      copy.role = name
      return copy

    })
  }

  useEffect(() => {
    if (logged) navigate('/');
  }, [logged]);

  return (
    <div className={'login-wrapper'}>
      <div className='login-container'>
        <div
          className={
            isMember ? 'absolute-background isMember' : 'absolute-background'
          }
        >
          <span>{!isMember ? 'Nemate nalog?' : 'Već imate nalog?'}</span>
          <Button
            className='btn btn-border-1'
            onClick={changeSlide}
            text={!isMember ? 'Registracija' : 'Prijava'}
          />
        </div>
        <RegisterCard
          inputValues={inputValues}
          handleChange={handleChange}
          isMember={isMember}
          handleSubmit={handleSubmit}
          handleRoles={handleRoles}
          invalidRegisterFields={invalidRegisterFields}
        />
        <LoginCard
          inputValues={inputValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
