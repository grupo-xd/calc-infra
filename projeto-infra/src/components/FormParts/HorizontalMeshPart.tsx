import type { InfraForm } from "../../hooks/useInfraForm";
import type { InfraFormProps } from "../../types/InfraFormProps";
import InputWithLabel from "../InputWithLabel";
import SelectWithLabel from "../SelectWithLabel";

export default function HorizontalMeshPart({form, setField}: InfraFormProps){
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
                setField("numPavimentosMH", Number(e.target.value))
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
                id="quantidadePontos"
                label="Quantidade total de pontos de telecomunicações/redes"
                type="number"
                min={1}
                onChange={(e) =>
                setField("quantidadePontos", Number(e.target.value))
                }        
            />

            <InputWithLabel
                id="servicoAtendido"
                label="Serviço atendido pelos pontos"
            />
            <InputWithLabel
                id="materialSEQSET"
                label="Material para atendimento da SEQ e SET"
            />
        </section>
    )
}