import "./App.css";
import Header from "./containers/Header";
import MainPart from "./containers/MainPart";
import { AuthProvider } from "./contexts/AuthContexts";

function App() {
  return (
    <AuthProvider>
      <Header />
      <MainPart />
    </AuthProvider>
  );
}

export default App;
