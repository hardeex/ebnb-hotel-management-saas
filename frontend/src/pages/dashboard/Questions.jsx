import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config.json";
import { useAuth } from "../../contexts/AuthContext";

export default function Question() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/hotels-by/${user?.id}`
        );
        setHotels(data);
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching hotels:", error);
      }
    }

    if (user?.id) {
      fetchHotel();
    }
  }, [user]);

  useEffect(() => {
    async function fetchQuestionsByHotel(hotelId) {
      try {
        const { data } = await axios.get(
          `${config.apiUrl}/question/by-hotel/${hotelId}`
        );
        return data.questions;
      } catch (error) {
        // Handle errors if needed
        console.error(`Error fetching questions for hotel ${hotelId}:`, error);
        return []; // Return an empty array in case of an error
      }
    }

    async function fetchQuestionsForAllHotels() {
      const allQuestions = [];

      try {
        for (const hotel of hotels) {
          const hotelQuestions = await fetchQuestionsByHotel(hotel.id);
          allQuestions.push(...hotelQuestions);
        }
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching questions for all hotels:", error);
      } finally {
        setQuestions(allQuestions);
        setIsLoading(false);
      }
    }

    if (hotels.length > 0) {
      fetchQuestionsForAllHotels();
    } else {
      setIsLoading(false); // If there are no hotels, set isLoading to false immediately
    }
  }, [hotels]);

  return (
    <>
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <h2>Questions Table</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Question</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id}>
                  <td>{q.id}</td>
                  <td>{q.name}</td>
                  <td>{q.email}</td>
                  <td>{q.phone_number}</td>
                  <td>{q.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
