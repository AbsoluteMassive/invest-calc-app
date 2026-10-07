import Header from "./componets/Header";
import logo from "../src/assets/investLogo.png";
import UserInput from "./componets/UserInput";
import Output from "./componets/Output";
import { calculateInvestmentResults } from "./util/inv";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
  const [resultData, setResultData] = useState(() => {
    const storedResultData = localStorage.getItem("resultData");
    return storedResultData ? JSON.parse(storedResultData) : [];
  });
  useEffect(() => {
    localStorage.setItem("resultData", JSON.stringify(resultData));
  }, [resultData]);

  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [submittedCurrency, setSubmittedCurrency] = useState("USD");

  const handleSubmit = (e) => {
    e.preventDefault();
    const initial = +userInput.initialInvestment;
    const annual = +userInput.annualInvestment;
    const expectedReturn = +userInput.expectedReturn;
    const duration = +userInput.duration;

    if (initial < 0 || annual < 0 || expectedReturn < 0 || duration < 0) {
      setError("Values cannot be negative.");
      return;
    }
    if (initial === 0 && annual === 0) {
      setError("Enter an initial investment or an annual investment.");
      return;
    }
    if (expectedReturn <= 0 || duration <= 0) {
      setError("Expected return and duration must be greater than 0.");
      return;
    }
    if (duration > 100) {
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
      <button id="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode === true ? "Light Mode" : "Dark Mode"}
      </button>
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
          error={error}
        />
        {resultData.length > 0 && (
          <Output
            userInput={userInput}
            resultData={resultData}
            currency={submittedCurrency}
          />
        )}
      </main>
    </div>
  );
}

export default App;
