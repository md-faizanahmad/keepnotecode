import { useCookies } from "react-cookie";
// import { Sidenav } from "../sidebar/sidenav";
import { TodoPage } from "../todopage/todopage";
import { useEffect, useState } from "react";
import { AppointmentContract } from "../../contracts/AppointmentContract";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AddAppointment } from "../add-appointment/add-appointment";
import "./appointpage.css";

export function AppointmentsHomePage() {
  const [cookies, setCookie, removeCookie] = useCookies(["Fname", "Lname"]);
  const [appointments, setAppointments] = useState<AppointmentContract[]>([]);
  let navigate = useNavigate();
  function handleDeleteClick(e: any) {
    axios.delete(`http://127.0.0.1:4700/deletetask/${e.target.value}`);
    window.location.reload();
  }

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:4700/userappointments/${cookies["Fname"]}`)
      .then((res) => {
        setAppointments(res.data);
      });
  }, [cookies]);
  return (
    <div>
      <div>
        <TodoPage />
      </div>
      <section
        className="appoint_page"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 6fr",
          backgroundColor: "white",
        }}
      >
        {/* <div>
          <Sidenav />
        </div> */}
        <div className="appointment-container">
          <div className="appointment-form mt-4">
            <form
              className="w-50 "
              style={{ display: "block", margin: "auto", marginTop: "7%" }}
            >
              <div className="input-group">
                <input
                  name="takeNote"
                  type="text"
                  className="form-control  border-end-0"
                  placeholder="Take a note.."
                />
                <span className="input-group-text bg-white">
                  <span
                    title="New List"
                    className="bi bi-check2-square  ms-1 me-4"
                  ></span>
                  <span
                    title="New Note with Drawing"
                    className="bi bi-brush me-4 ms-1 "
                  ></span>
                  <span
                    title="New Note with Image"
                    className="bi bi-image me-4 ms-1 "
                  ></span>
                </span>
              </div>
            </form>
            {/* <AddAppointment /> */}
          </div>
          {/* Appointments Card */}
          <div className="appointments-cards mt-4">
            <h4>
              Here Your Appointments{" "}
              <span className="text-success">
                {cookies.Fname} {cookies.Lname}
              </span>
            </h4>
            {appointments.map((appointment) => (
              <div className="card bg-warning text-white  w-25">
                <div className="card-header d-flex justify-content-between">
                  <div>
                    <h4>{appointment.Title}</h4>
                  </div>
                  <button
                    value={appointment.Id}
                    onClick={handleDeleteClick}
                    className="btn btn-outline-danger"
                  >
                    <span className="bi bi-trash"></span>
                  </button>
                </div>
                <div className="card-body">
                  <p>{appointment.Description}</p>
                  <p className="text-end  ">
                    <span className="bi bi-calendar me-2"></span>
                    {appointment.Date.toString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
