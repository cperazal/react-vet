import React from 'react'
import Patient from './Patient'

const PatientsList = ({patients, setPatient, deletePatient}) => {

  return (
    <div className='md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll'>
      
      {
        (patients && patients.length) ? (
            <>
              <h2 className='font-black text-3xl text-center'>Lista de pacientes</h2>
                <p className='text-xl mt-5 mb-10 text-center'>
                  Administra tus {""}
                  <span className='text-indigo-600 font-bold'>Pacientes</span>
                </p>
                {
                  patients.map(patient => (
                    <Patient
                      key={patient.id}
                      patient={patient}
                      setPatient={setPatient}
                      deletePatient={deletePatient}
                    />
                  ))
                }
            </>
        ):(
          <>
            <h2 className='font-black text-3xl text-center'>No hay pacientes</h2>
            <p className='text-xl mt-5 mb-10 text-center'>
              Agrega tus {""}
              <span className='text-indigo-600 font-bold'>pacientes</span>
            </p>
          </>
        )
      }
      
    </div>
  )
}

export default PatientsList