import LoginBtn from "../components/loginBtn";

const Header = () => {
  return (
    <header>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">ペン回し練習室</h1>
        <LoginBtn />
      </div>
    </header>
  );
};

export default Header;
