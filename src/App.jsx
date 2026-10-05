import Header from "./componets/Header";
import logo from "../src/assets/investLogo.png";
import UserInput from "./componets/UserInput";
import { useState } from "react";
function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });
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
        <UserInput userInput={userInput} onUserInputChange={handleChange} />
      </main>
    </div>
  );
}

export default App;
