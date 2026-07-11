import { useInfraForm } from "../hooks/useInfraForm";
import Button from "./Button";
import ScopeSelector from "./FormParts/ScopeSelector";
import BackbonePart from "./FormParts/BackbonePart";
import HorizontalMeshPart from "./FormParts/HorizontalMeshPart";

export default function MainForm({ onResults }: { onResults: (data: any) => void }) {
    const { form, setField, validate, submit } = useInfraForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const results = submit();
        if (results) {
            onResults(results);
        }
    };

    const mostrarBackbone = form.escopo === "backbone" || form.escopo === "ambos";
    const mostrarMalhaHorizontal = form.escopo === "horizontalMesh" || form.escopo === "ambos";

    return (
        <form onSubmit={handleSubmit}>
            <ScopeSelector form={form} setField={setField} />
            {mostrarBackbone && <BackbonePart setField={setField} />}
            {mostrarMalhaHorizontal && <HorizontalMeshPart setField={setField} />}
            <Button
                type="submit"
                disabled={!validate()}
            >
                Concluir
            </Button>
        </form>
    );
}