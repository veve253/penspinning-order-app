import LogInOutBtn from "../components/LogInOutBtn";

const Header = () => {
  return (
    <header>
      <div className="border-b py-3 flex items-center">
        <h1 className="flex-grow flex-shrink w-4/6 text-center text-2xl font-bold">
          ペン回し練習室
        </h1>
        <div className="flex-grow flex-shrink w-2/6 text-center">
          <LogInOutBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
