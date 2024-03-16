import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config.json";
import axios from "axios";
import "./successfuly.css";

export default function Successfuly() {
  const [result, setResult] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("reference")) {
      async function verifyPayment() {
        const reference = searchParams.get("reference");
        try {
          const { data } = await axios.post(`${config.apiUrl}/verify-payment`, {
            reference,
          });
          setResult(data);
        } catch (error) {
          console.error("Error verifying payment:", error);
        }
      }

      verifyPayment();
    }
  }, [searchParams]);

  return (
    <div className="successfuly d-flex flex-column justify-content-center align-items-center">
      <p style={{ fontFamily: "bold", fontSize: 30, marginBottom: 10 }}>
        {result?.message}
      </p>
      <p style={{ fontFamily: "bold", fontSize: 30, marginBottom: 20 }}>
        We have sent you an email confirmation.
      </p>
    </div>
  );
}
