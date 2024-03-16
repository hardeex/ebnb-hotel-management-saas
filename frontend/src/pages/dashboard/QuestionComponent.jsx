import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config.json";

export default function QuestionComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const { data } = await axios.get(`${config.apiUrl}/questions`);
        setQuestions(data.questions);
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching questions:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuestions();
  }, []);

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
