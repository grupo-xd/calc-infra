import type { InfraFormProps } from "../../types/InfraFormProps";
import type { InfraForm } from "../../hooks/useInfraForm";
import SelectWithLabel from "../SelectWithLabel";

export default function ScopeSelector({ setField }: InfraFormProps) {
    return (
        <section>
            <h2>Escopo do Projeto</h2>

            <SelectWithLabel
                id="escopo"
                label="Selecione o escopo do projeto"
                options={[
                    { value: "backbone", label: "Apenas Backbone" },
                    { value: "horizontalMesh", label: "Apenas Malha Horizontal" },
                    { value: "ambos", label: "Backbone + Malha Horizontal" },
                ]}
                onChange={(e) =>
                    setField("escopo", e.target.value as InfraForm["escopo"])
                }
            />
        </section>
    );
}
