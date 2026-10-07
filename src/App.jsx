import Header from "./componets/Header";
import logo from "../src/assets/investLogo.png";
import UserInput from "./componets/UserInput";
import Output from "./componets/Output";
import { calculateInvestmentResults } from "./util/inv";
import { useState } from "react";
function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [submittedCurrency, setSubmittedCurrency] = useState("USD");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      +userInput.initialInvestment <= 0 ||
      +userInput.annualInvestment <= 0 ||
      +userInput.expectedReturn <= 0 ||
      +userInput.duration <= 0
    ) {
      setError("Please enter valid positive values for all fields.");
      return;
    }
    if (+userInput.duration > 100) {
      setError("Duration should not exceed 100 years.");
      return;
    }
    const result = calculateInvestmentResults({
      initialInvestment: +userInput.initialInvestment,
      annualInvestment: +userInput.annualInvestment,
      expectedReturn: +userInput.expectedReturn,
      duration: +userInput.duration,
    });
    setError(null);
    setResultData(result);
    setSubmittedCurrency(currency);
  };
  /*const [userInput, setUserInput] = useState(() => {
      const storedUserInput = localStorage.getItem("userInput");
      return storedUserInput
        ? JSON.parse(storedUserInput)
        : {
            initialInvestment: 10000,
            annualInvestment: 1200,
            expectedReturn: 6,
            duration: 10,
          };
    });
    useEffect(() => {
      localStorage.setItem("userInput", JSON.stringify(userInput));
    }, [userInput]); */
  const handleChange = (inputIdentifier, newValue) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      //"+newValue" to ensure it's treated as a number
      [inputIdentifier]: newValue,
    }));
  };
  const handleReset = () => {
    if (confirm("Are you sure you want to reset the form?")) {
      setUserInput({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
      });
      setCurrency("USD");
      setError(null);
      setResultData([]);
    }
  };
  return (
    <div>
      <Header
        logoSrc={logo}
        title="Investment Calculator"
        alt="Investment Calculator Logo"
        id="header"
      >
        <p>Welcome to the Investment Calculator!</p>
      </Header>
      <main>
        <UserInput
          onSubmit={handleSubmit}
          userInput={userInput}
          onUserInputChange={handleChange}
          onReset={handleReset}
          currency={currency}
          setCurrency={setCurrency}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {resultData.length > 0 && (
          <Output resultData={resultData} currency={submittedCurrency} />
        )}
      </main>
    </div>
  );
}

export default App;
