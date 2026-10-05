import Header from "./componets/Header";
import logo from "../src/assets/investLogo.png";
import UserInput from "./componets/UserInput";
function App() {
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
        <UserInput />
      </main>
    </div>
  );
}

export default App;
