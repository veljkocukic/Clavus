import React from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export const LoginCard = ({ inputValues, handleChange, handleSubmit }: any) => {
  return (
    <section className='register-card'>
      <div className='login-title'>
        <h1>Dobrodošli</h1>
        <p>Prijavite se za nastavak</p>
      </div>
      <Input
        type='email'
        className='w100'
        name='email'
        labelText='Email'
        value={inputValues.email}
        onChange={handleChange}
      />
      <Input
        className='w100'
        type='password'
        name='password'
        labelText='Password'
        value={inputValues.password}
        onChange={handleChange}
      />
      <Button text='PRIJAVA' className='mt5' onClick={() => handleSubmit('login')} />
    </section>
  );
};
