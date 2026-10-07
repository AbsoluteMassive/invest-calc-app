const UserInput = ({
  userInput,
  onUserInputChange,
  onSubmit,
  onReset,
  currency,
  setCurrency,
}) => {
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const handleChange = (inputIdentifier, newValue) => {
    onUserInputChange(inputIdentifier, newValue);
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

      <form onSubmit={onSubmit}>
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
          <button className="btn" type="button" onClick={onReset}>
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
