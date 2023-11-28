import { useState } from "react";
import "./App.css";
import Header from "./containers/Header";
import MainPart from "./containers/MainPart";
import { AuthProvider } from "./contexts/AuthContexts";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <AuthProvider>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <MainPart isOpen={isOpen} setIsOpen={setIsOpen} />
    </AuthProvider>
  );
}

export default App;
