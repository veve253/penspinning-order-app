import { useState } from "react";
import "./App.css";
import Header from "./containers/Header";
import MainPart from "./containers/MainPart";
import { AuthProvider } from "./contexts/AuthContexts";
import { FSProvider } from "./contexts/FSContexts";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <AuthProvider>
      <FSProvider>
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        <MainPart isOpen={isOpen} setIsOpen={setIsOpen} />
      </FSProvider>
    </AuthProvider>
  );
}

export default App;
