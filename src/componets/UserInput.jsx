import { useState } from "react";

const UserInput = () => {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
  const [currency, setCurrency] = useState("USD");
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
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
      [inputIdentifier]: +newValue,
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
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      userInput.initialInvestment <= 0 ||
      userInput.annualInvestment <= 0 ||
      userInput.expectedReturn <= 0 ||
      userInput.duration <= 0
    ) {
      alert("Please enter valid positive values for all fields.");
      return;
    }
    console.log("Form submitted", userInput, currency);
  };
  return (
    <section id="user-input">
      <select
        className="currency-select"
        value={currency}
        onChange={(event) => setCurrency(event.target.value)}
      >
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
      </select>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="initialInvestment">
            Initial Investment ({currencySymbols[currency]})
          </label>
          <input
            type="number"
            id="initialInvestment"
            value={userInput.initialInvestment}
            onChange={(e) => handleChange("initialInvestment", e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="annualInvestment">
            Annual Investment ({currencySymbols[currency]})
          </label>
          <input
            type="number"
            id="annualInvestment"
            value={userInput.annualInvestment}
            onChange={(e) => handleChange("annualInvestment", e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="expectedReturn">Expected Return (%)</label>
          <input
            type="number"
            id="expectedReturn"
            value={userInput.expectedReturn}
            onChange={(e) => handleChange("expectedReturn", e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="duration">Duration (years)</label>
          <input
            type="number"
            id="duration"
            value={userInput.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
        </div>
        <div className="btn-group">
          <button className="btn" type="button" onClick={handleReset}>
            Reset
          </button>
          <button className="btn" type="submit">
            Calculate
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserInput;
