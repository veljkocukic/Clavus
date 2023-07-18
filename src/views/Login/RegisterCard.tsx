import { Formik } from "formik";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { CheckBox } from "../../components/TopBar/CheckBox";

export const RegisterCard = ({
  inputValues,
  handleChange,
  handleRoles,
  handleSubmit,
  invalidRegisterFields
}: any) => {

  return (
    <section className="register-card">

      <div className="login-title">
        <h1>Registracija</h1>
      </div>


      <div style={{display:'flex', width:'100%',justifyContent:'space-between'}} >
      <Input
        type="text"
        name="name"
        labelText="Ime"
        value={inputValues.name}
        onChange={handleChange}
        invalid={invalidRegisterFields.includes('name')}
      />
      <Input
        type="text"
        name="lastName"
        labelText="Prezime"
        value={inputValues.lastName}
        onChange={handleChange}
        invalid={invalidRegisterFields.includes('lastName')}
      />
      </div>

      <Input
        type="email"
        className="w100"
        name="email"
        labelText="Email"
        value={inputValues.email}
        onChange={handleChange}
        invalid={invalidRegisterFields.includes('email')}
      />

      <Input
        type="password"
        className="w100"
        name="password"
        labelText="Lozinka"
        value={inputValues.password}
        onChange={handleChange}
        invalid={invalidRegisterFields.includes('password')}
        customInvalidMessage={'Lozinka mora biti duža od 5 karaktera'}
      />
     
      <Input
        type="tel"
        name="phoneNumber"
        className="w100"
        labelText="Broj telefona"
        value={inputValues.phoneNumber}
        onChange={handleChange}
        invalid={invalidRegisterFields.includes('phoneNumber')}

      />
      <div style={{display:'flex',gap:'1rem', justifyContent:'space-between', width:'100%'}} className='mt1' >
        <CheckBox onChange={handleRoles} name='WORKER' active={inputValues.role === 'WORKER'} text={'Radnik'}/>
        <CheckBox onChange={handleRoles} name="ADMIN" active={inputValues.role === 'ADMIN'} text={'Oglasnik'}/>
      </div>
      <Button
        onClick={()=>handleSubmit('register')}
        className={'mt5'}
        text="REGISTRACIJA"
      />
    </section>
  );
};
