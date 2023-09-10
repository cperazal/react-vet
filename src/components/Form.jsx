import React, { useEffect } from 'react';
import { useState } from 'react';
import MessageError from './MessageError';

const Form = ({setPatients, patients, patient, setPatient}) => {

  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(patient).length > 0){
      setName(patient.name);
      setOwner(patient.owner);
      setEmail(patient.email);
      setDate(patient.date);
      setSymptoms(patient.symptoms);
    }else{

    }
  }, [patient])

  const generateId = () => {
    const random = Math.random().toString(36).substr(2);
    const date = Date.now().toString(36);
    return random + date;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if([name, owner, email, date, symptoms].includes('')){
      setError(true);
    }else{
      setError(false);
      const objectPatient = {
        name,
        owner,
        email,
        date,
        symptoms
      }

      if(patient.id){
        // editar paciente
        objectPatient.id = patient.id;
        const updatedPatients = patients.map(patientState => 
          patientState.id === patient.id ? objectPatient : patientState);
        setPatients(updatedPatients);
        setPatient({});
      }else{
        // nuevo paciente
        objectPatient.id = generateId();
        setPatients([...patients, objectPatient]);
      }

      setName('');
      setOwner('');
      setEmail('');
      setDate('');
      setSymptoms('');
  
    }
    

  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>
        Seguimiento pacientes
      </h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Agrega pacientes y {""}
        <span className='text-indigo-600 font-bold'>administralos</span>
      </p>

      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
        {
          error && (
            <MessageError>
              <p>Todos los campos son obligatorios</p>
            </MessageError>
          )
        }
        <div>
          <label htmlFor='pet' className='block text-gray-700 uppercase font-bold'>Nombre mascota</label>
          <input
            id='pet'
            type='text'
            placeholder='Nombre de la mascota'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mt-5'>
          <label htmlFor='owner' className='block text-gray-700 uppercase font-bold'>Nombre propietario</label>
          <input
            id='owner'
            type='text'
            placeholder='Nombre del propietario'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className='mt-5'>
          <label htmlFor='email' className='block text-gray-700 uppercase font-bold'>Email propietario</label>
          <input
            id='email'
            type='text'
            placeholder='Email'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mt-5'>
          <label htmlFor='date' className='block text-gray-700 uppercase font-bold'>Fecha de alta</label>
          <input
            id='date'
            type='date'
            placeholder='Alta'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className='mt-5'>
          <label htmlFor='symptoms' className='block text-gray-700 uppercase font-bold'>Fecha de alta</label>
          <textarea 
            id='symptoms'
            placeholder='Describe los sintomas'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>
        <input 
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors mt-2 rounded-md'
          value={(patient.id ? 'Editar paciente' : 'Agregar paciente')}
        />
      </form>

    </div>
  )
}

export default Form