/** @format */
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import exportItems from "../components/config";
import { useState } from "react";

export default function Doctor() {
  const router = useRouter();
  const { doctor } = router.query;
  const spec = router.query.specialization;
  const { CreateAppointments } = exportItems;
  let id = "8pVP37SYs6rXeZPLpExt";
  const date = new Date();
  const time =
    date.getHours() + ":" + date.getMinutes() + ": " + date.getSeconds();

  const initialData = Object.freeze({
    doctor: doctor,
    patient: "",
    date: date.toLocaleDateString(),
    mobile: "",
    age: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);

  const [appointmentData, setAppointmentData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (appointmentData.patient === "" || appointmentData.mobile === "") {
      alert("Please fill all the fields");
    } else {
      setLoading(!loading);
      CreateAppointments(id, appointmentData).then((res) => {
        //Refresh bug in the qr page
        router.push({
          pathname: `/payment/viaqr`,
          query: { id: res },
        });
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dr. Ashish Soy Clinic</title>
        <meta
          name="Book apointments at Devkamal Hospital."
          content="Easy appointments at Devkamal hospital."
        />
      </Head>
      <main className={styles.main}>
        <h4>Book appointment with </h4>
        <h1 className={styles.title}>
          <em>{doctor}</em>
          <br />
          <small
            style={{
              color: "grey",
              fontSize: "1.8rem",
            }}
          >
            {spec}
          </small>
        </h1>
        <div className={styles.grid}>
          <input
            className={styles.input}
            type="text"
            placeholder="???????????? ?????? ?????????"
            name="patient"
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="?????????????????? ????????????"
            name="mobile"
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="text"
            placeholder="???????????? ?????? ????????????"
            name="age"
            onChange={handleChange}
          />

          <div
            style={{
              display: "flex",
              paddingTop: "10px",
              paddingBottom: "4px",
            }}
          >
            <label
              style={{
                fontSize: "1.2rem",
              }}
            >
              Gender (????????????)
            </label>
          </div>
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <div>
              <input
                name="gender"
                type="radio"
                onChange={handleChange}
                value="Male"
              />
              <label
                htmlFor="Male"
                style={{
                  fontSize: "1.2rem",
                }}
              >
                ???????????????
              </label>
            </div>

            <div>
              <input
                name="gender"
                type="radio"
                onChange={handleChange}
                value="Female"
              ></input>
              <label
                htmlFor="Female"
                style={{
                  fontSize: "1.2rem",
                }}
              >
                ???????????????
              </label>
            </div>
          </div>
        </div>
        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : `Book Appointment`}
        </button>
      </main>
      <footer className={styles.footer}>
        Superfast Healthcare {"-"}
        <span className={styles.logo}>
          <Image src="/MedAana.svg" alt="MedAana Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  );
}
