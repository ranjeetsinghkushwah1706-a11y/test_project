import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { BlueprintProvider } from "./context/BlueprintContext";
import { ContractProvider } from "./context/ContractContext";
import { ContractsDashboard } from "./pages/ContractsDashboard";
import { Blueprints } from "./pages/Blueprints";
import { CreateContract } from "./pages/CreateContract";
import { ContractDetails } from "./pages/ContractDetails";
import "./App.css";

function App() {
  return (
    <BlueprintProvider>
      <ContractProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ContractsDashboard />} />
            <Route path="/blueprints" element={<Blueprints />} />
            <Route path="/contracts/create" element={<CreateContract />} />
            <Route path="/contracts/:id" element={<ContractDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ContractProvider>
    </BlueprintProvider>
  );
}

export default App;
