import { useInfraForm } from "../hooks/useInfraForm";
import Button from "./Button";
import BackbonePart from "./FormParts/BackbonePart";
import HorizontalMeshPart from "./FormParts/HorizontalMeshPart";

export default function MainForm(){
    const {form, setField, validate, submit} = useInfraForm();

    return(
        <form>
            <BackbonePart form={form} setField={setField} />
            <HorizontalMeshPart form={form} setField={setField} />
            <Button 
                type="submit" 
                disabled={!validate()}
                onSubmit={submit}
            >
                Concluir
            </Button>
        </form>
    )
}