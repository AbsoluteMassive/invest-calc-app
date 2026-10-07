const Output = ({ resultData, currency }) => {
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  const displayedResults = resultData.filter(
    (yearData) =>
      yearData.year <= 10 ||
      yearData.year % 10 === 0 ||
      yearData.year === resultData.length,
  );

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {displayedResults.map((yearData, index) => (
            <tr
              key={index}
              className={
                yearData.year === resultData.length ? "total-interest" : ""
              }
            >
              <td>{yearData.year}</td>
              <td>
                {currencySymbols[currency]}
                {yearData.investmentValue.toFixed(2)}
              </td>
              <td>
                {currencySymbols[currency]}
                {yearData.interest.toFixed(2)}
              </td>
              <td>
                {currencySymbols[currency]}
                {yearData.totalInterest.toFixed(2)}
              </td>
              <td>
                {currencySymbols[currency]}
                {yearData.investedCapital.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className="summary">
        <h3>Summary</h3>
        <p>
          Total Investment Value: {currencySymbols[currency]}
          {resultData[resultData.length - 1].investmentValue.toFixed(2)}
        </p>
        <p>
          Total Interest Earned: {currencySymbols[currency]}
          {resultData[resultData.length - 1].totalInterest.toFixed(2)}
        </p>
        <p>
          Total Invested Capital: {currencySymbols[currency]}
          {resultData[resultData.length - 1].investedCapital.toFixed(2)}
        </p>
      </section>
      <button
        style={{ margin: "1rem auto", display: "block" }}
        className="btn"
        onClick={() => generatepdf({ ...resultData[0], results: resultData })}
      >
        Download Report
      </button>
    </div>
  );
};

export default Output;
