import type { InfraForm } from "../../hooks/useInfraForm";
import InputWithLabel from "../InputWithLabel";
import SelectWithLabel from "../SelectWithLabel";

type HorizontalMeshPartProps = {
  setField: <K extends keyof InfraForm>(
    field: K,
    value: InfraForm[K]
  ) => void;
};

export default function HorizontalMeshPart({ setField }: HorizontalMeshPartProps) {
    return(
        <section>
            <h2>Malha Horizontal</h2>

            <InputWithLabel
                id="numPavimentosMH"
                label="Número de pavimentos da edificação"
                onChange={(e) =>
                setField("numPavimentosMH", Number(e.target.value))
                }
            />

            <InputWithLabel
                id="pontosPorPavimento"
                label="Número de pontos por pavimento"
                type="number"
                min={1}
                onChange={(e) =>
                    setField("pontosPorPavimento", Number(e.target.value))
                }
            />

            <InputWithLabel
                id="medidaMH"
                label="Medida básica para cálculo da distância da malha horizontal (m)"
                type="number"
                min={1}
                onChange={(e) =>
                setField("medidaMH", Number(e.target.value))
                }
            />

            <SelectWithLabel
                id="categoriaCabo"
                label="Categoria do cabo"
                options={[
                { value: "cat5e", label: "Categoria 5e" },
                { value: "cat6", label: "Categoria 6" },
                { value: "cat6a", label: "Categoria 6A" },
                { value: "cat7", label: "Categoria 7" },
                { value: "cat8", label: "Categoria 8" },
                ]}
                onChange={(e) =>
                setField("categoriaCabo", e.target.value as InfraForm["categoriaCabo"])
                }
            />

            <InputWithLabel
                id="pontosData"
                label="Pontos de telecomunicações/redes de Dados"
                type="number"
                min={1}
                onChange={(e) =>
                setField("pontosData", Number(e.target.value))
                }        
            />

            <InputWithLabel
                id="pontosVoice"
                label="Pontos de telecomunicações/redes de Voz"
                type="number"
                min={1}
                onChange={(e) =>
                setField("pontosVoice", Number(e.target.value))
                }        
            />

            <InputWithLabel
                id="pontosSecurity"
                label="Pontos de telecomunicações/redes de Segurança"
                type="number"
                min={1}
                onChange={(e) =>
                setField("pontosSecurity", Number(e.target.value))
                }        
            />

            <InputWithLabel
                id="materialSEQSET"
                label="Material para atendimento da SEQ e SET"
                onChange={(e) =>
                    setField("materialSEQSET", e.target.value)
                }
            />
        </section>
    )
}