import logo from "../assets/investLogo.png";
const Header = ({ title, alt, id, children }) => {
  return (
    <header id={id}>
      <img src={logo} alt={alt} />
      <h1>{title}</h1>
      {children}
    </header>
  );
};

export default Header;
