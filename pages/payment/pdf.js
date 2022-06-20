/** @format */

import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import exportItems from "../../components/config";
import autoTable from "jspdf-autotable";
import Head from "next/head";

// Default export is a4 paper, portrait, using millimeters for units

export default function PDF() {
  const router = useRouter();
  const { id } = router.query;
  let hospitalID = "8pVP37SYs6rXeZPLpExt";

  const { FetchConfirmedAppointmentData } = exportItems;

  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const docSnap = FetchConfirmedAppointmentData(hospitalID, id);
    docSnap.then((snapshot) => {
      setName(snapshot.data().patient);
      setDoctor(snapshot.data().doctor);
      setDate(snapshot.data().date);
      setAge(snapshot.data().age);
      setGender(snapshot.data().gender);
    });
  }, []);

  const docs = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
  });
  docs.setFontSize(24);
  docs.text("Dr. Ashish Soy", 10, 10);
  docs.setFontSize(12);
  // var splitAddress = docs.splitTextToSize(
  //   "Lake Avenue, Kanke Road, Ranchi - 834008, Near Realince Mart",
  //   20
  // );
  docs.text(
    "Lake Avenue, Kanke Road, Ranchi - 834008, Near Realince Mart",
    10,
    20
  );
  docs.text("9204752383, 9835513100", 10, 30);
  docs.line(10, 40, 200, 40);

  docs.text(`Your appointment with ${doctor} is confirmed.`, 10, 50);

  autoTable(docs, {
    margin: { top: 60, left: 10, right: 10, bottom: 10 },
    body: [
      [`Name`, `${name}`],
      [`Age`, `${age}`],
      [`Gender`, `${gender}`],
      [`Date`, `${date}`],
      [`Appointment ID`, `${id}`],
    ],
  });
  docs.line(10, 270, 200, 270);
  docs.text("Appointment enabled by MedAana", 105, 280, "center");
  docs.setFontSize(10);
  docs.text("--- Making healthcare hassle free ---", 105, 285, "center");

  const downloadPDF = () => {
    docs.save(`${id}.pdf`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Download</title>
      </Head>
      <main className={styles.main}>
        <h2>Your appointment slip &darr;</h2>
        <div className={styles.grid}>
          <button className={styles.button} onClick={downloadPDF}>
            Download
          </button>
        </div>
      </main>
    </div>
  );
}
