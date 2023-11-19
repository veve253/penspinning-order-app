import "./App.css";
import Header from "./containers/Header";
import TrickList from "./containers/TrickList";
import { AuthProvider } from "./contexts/AuthContexts";

function App() {
  return (
    <AuthProvider>
      <Header />
      <TrickList />
    </AuthProvider>
  );
}

export default App;
