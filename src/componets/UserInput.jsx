const UserInput = ({
  userInput,
  onUserInputChange,
  onSubmit,
  onReset,
  currency,
  setCurrency,
  error,
  setIsDisabled,
  setButtonError,
}) => {
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const handleChange = (inputIdentifier, newValue) => {
    onUserInputChange(inputIdentifier, newValue);
    setIsDisabled(true);
    setButtonError("Please re-submit to download ");
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
            onWheel={(e) => e.currentTarget.blur()}
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
            onWheel={(e) => e.currentTarget.blur()}
            type="number"
            id="annualInvestment"
            value={userInput.annualInvestment}
            onChange={(e) => handleChange("annualInvestment", e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="expectedReturn">Expected Return (%)</label>
          <input
            onWheel={(e) => e.currentTarget.blur()}
            type="number"
            id="expectedReturn"
            value={userInput.expectedReturn}
            onChange={(e) => handleChange("expectedReturn", e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="duration">Duration (years)</label>
          <input
            onWheel={(e) => e.currentTarget.blur()}
            type="number"
            id="duration"
            value={userInput.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
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
