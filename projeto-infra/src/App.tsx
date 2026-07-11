import { useState } from "react";
import "./App.css";
import MainForm from "./components/MainForm";
import ResultsComponent from "./components/ResultsComponent";
import type { ProjectResult } from "./services/ObjectInstantiation";

function App() {
    const [results, setResults] = useState<ProjectResult | null>(null);

    const handleFormResults = (data: ProjectResult) => {
        setResults(data);
    };

    const handleReset = () => {
        setResults(null);
    };

    return (
        <>
            <h1>Calculadora de Infraestrutura de Rede</h1>

            {!results ? (
                <MainForm onResults={handleFormResults} />
            ) : (
                <>
                    <ResultsComponent data={results} />
                    <button onClick={handleReset} className="btn-reset">
                        Calcular Novo Projeto
                    </button>
                </>
            )}
        </>
    );
}

export default App;