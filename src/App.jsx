import Header from "./componets/Header";
import logo from "../src/assets/investLogo.png";
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
    </div>
  );
}

export default App;
