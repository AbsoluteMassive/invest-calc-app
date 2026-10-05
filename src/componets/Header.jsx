const Header = ({ logoSrc, title, alt, id, children }) => {
  return (
    <header id={id}>
      <img src={logoSrc} alt={alt} />
      <h1>{title}</h1>
      {children}
    </header>
  );
};

export default Header;
