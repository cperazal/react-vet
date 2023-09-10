import Header from "./components/Header";
import Form from "./components/Form";
import PatientsList from "./components/PatientsList";
import { useEffect, useState } from "react";

function App() {

  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});


  useEffect(() => {
    const getPatientsFromLocalStorage = () => {
      const patientsLocalStorage = JSON.parse(localStorage.getItem('patients')) ?? [];
      patientsLocalStorage?.length > 0 && setPatients(patientsLocalStorage);
    }
    getPatientsFromLocalStorage();
  }, [])

  useEffect(()=>{
    localStorage.setItem('patients', JSON.stringify(patients));
  },[patients])

  

  const deletePatient = id => {
    const patientsUpdate = patients.filter(x => x.id !== id);
    setPatients(patientsUpdate);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
        <PatientsList
          patients={patients}
          setPatient={setPatient}
          deletePatient={deletePatient}
        />
      </div>
    </div>
  )
}

export default App
