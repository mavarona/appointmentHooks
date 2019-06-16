import React, { useState, useEffect, Fragment } from "react";

const Form = ({ createAppointment }) => {
  const initialState = {
    pet: "",
    owner: "",
    date: "",
    hour: "",
    symptoms: ""
  };

  const [appointment, updateAppointment] = useState(initialState);

  const updateForm = e => {
    updateAppointment({
      ...appointment,
      [e.target.name]: e.target.value
    });
  };

  const sendAppointment = e => {
    e.preventDefault();
    createAppointment(appointment);
    updateAppointment(initialState);
  };

  return (
    <Fragment>
      <h2>Create Appointment</h2>

      <form onSubmit={sendAppointment}>
        <label>Name of the pet</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="Name of the pet"
          onChange={updateForm}
          value={appointment.pet}
        />

        <label>Name of the owner</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="Name of the owner"
          onChange={updateForm}
          value={appointment.owner}
        />

        <label>Date</label>
        <input
          type="date"
          className="u-full-width"
          name="date"
          onChange={updateForm}
          value={appointment.date}
        />

        <label>Hour</label>
        <input
          type="time"
          className="u-full-width"
          name="hour"
          onChange={updateForm}
          value={appointment.hour}
        />

        <label>Symptoms</label>
        <textarea
          className="u-full-width"
          name="symptoms"
          onChange={updateForm}
          value={appointment.symptoms}
        />

        <button type="submit" className="button-primary u-full-width">
          Add Appointment
        </button>
      </form>
    </Fragment>
  );
};

const Appointment = ({ appointment, index, deleteAppointment }) => {
  return (
    <div className="cita">
      <p>
        Pet: <span>{appointment.pet}</span>
      </p>
      <p>
        Owner: <span>{appointment.owner}</span>
      </p>
      <p>
        Date: <span>{appointment.date}</span>
      </p>
      <p>
        Hour: <span>{appointment.hour}</span>
      </p>
      <p>
        Symptoms: <span>{appointment.symptoms}</span>
      </p>
      <button
        onClick={() => deleteAppointment(index)}
        type="button"
        className="button eliminar u-full-width"
      >
        Delete X
      </button>
    </div>
  );
};

const App = () => {
  let initialAppointments = JSON.parse(localStorage.getItem("appointments"));
  if (!initialAppointments) {
    initialAppointments = [];
  }
  const [appointments, saveAppointment] = useState(initialAppointments);
  const createAppointment = appointment => {
    const newAppointments = [...appointments, appointment];
    saveAppointment(newAppointments);
  };
  const deleteAppointment = index => {
    const newAppointments = [...appointments];
    newAppointments.splice(index, 1);
    saveAppointment(newAppointments);
  };
  useEffect(() => {
    let initialAppointments = JSON.parse(localStorage.getItem("appointments"));
    console.log(initialAppointments);
    if (initialAppointments) {
      localStorage.setItem("appointments", JSON.stringify(appointments));
    } else {
      localStorage.setItem("appointments", JSON.stringify([]));
    }
  }, [appointments]);
  const title =
    Object.keys(appointments).length === 0
      ? "There are not appointments"
      : "Appointment Manage";
  return (
    <Fragment>
      <h1>Patient Manage</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form createAppointment={createAppointment} />
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {appointments.map((appointment, index) => (
              <Appointment
                key={index}
                index={index}
                appointment={appointment}
                deleteAppointment={deleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
