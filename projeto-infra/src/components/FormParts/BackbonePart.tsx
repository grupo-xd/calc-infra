import type { InfraForm } from "../../hooks/useInfraForm";
import InputWithLabel from "../InputWithLabel";
import SelectWithLabel from "../SelectWithLabel";

type BackbonePartProps = {
  setField: <K extends keyof InfraForm>(
    field: K,
    value: InfraForm[K]
  ) => void;
};

export default function BackbonePart({setField}: BackbonePartProps){
    return(
        <section>
            <h2>Backbone</h2>

            <InputWithLabel
                id="numPavimentosBackbone"
                label="Número de pavimentos da edificação"
                type="number"
                min={1}
                onChange={(e) =>
                setField("numPavimentosBackbone", Number(e.target.value))
                }
            />

            <InputWithLabel
                id="paresFibras"
                label="Número de pares de fibras disponíveis"
                type="number" 
                min={1}
                onChange={(e) =>
                setField("paresFibras", Number(e.target.value))
                }
            />

            <InputWithLabel
                id="medidaBackbone"
                label="Medida básica para cálculo dos lances de cabo (m)"
                type="number"
                min={1}
                onChange={(e) =>
                setField("medidaBackbone", Number(e.target.value))
                }
            />

            <SelectWithLabel
                id="tipoFibra"
                label="Especificação do cabo de fibra óptica"
                options={[
                { value: "MM", label: "Multimodo (MM)" },
                { value: "SM", label: "Monomodo (SM)" },
                ]}
                onChange={(e) =>
                setField("tipoFibra", e.target.value as InfraForm["tipoFibra"])
                }
            />

            <SelectWithLabel
                id="caracteristicaFibra"
                label="Característica da fibra óptica"
                options={[
                { value: "OM1", label: "OM1" },
                { value: "OM2", label: "OM2" },
                { value: "OM3", label: "OM3" },
                { value: "OM4", label: "OM4" },
                { value: "OM5", label: "OM5" },
                { value: "OS1", label: "OS1" },
                { value: "OS2", label: "OS2" },
                ]}
                onChange={(e) =>
                setField("caracteristicaFibra", e.target.value as InfraForm["caracteristicaFibra"])
                }
            />

            <InputWithLabel
                id="backbonesPorAndar"
                label="Quantidade de backbones por andar"
                type="number"
                min={1}
                onChange={(e) =>
                setField("backbonesPorAndar", Number(e.target.value))
                }
            />

            <SelectWithLabel
                id="tipoBackbone"
                label="Backbone existente"
                options={[
                { value: "primario", label: "Primário" },
                { value: "secundario", label: "Secundário" },
                { value: "ambos", label: "Primário e Secundário" },
                ]}
                onChange={(e) =>
                setField("tipoBackbone", e.target.value as InfraForm["tipoBackbone"])
                }
            />

            <InputWithLabel
                id="acessoriosBackbone"
                label="Elementos acessórios da interligação ponto a ponto"
                onChange={(e) =>
                setField("acessoriosBackbone", e.target.value)
                }
            />
        </section>
    )
}