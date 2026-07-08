import { useState } from "react";

export type InfraForm = {
  numPavimentosBackbone: number;
  paresFibras: number;
  medidaBackbone: number;

  tipoFibra: "MM" | "SM";

  caracteristicaFibra:
    | "OM1"
    | "OM2"
    | "OM3"
    | "OM4"
    | "OM5"
    | "OS1"
    | "OS2";

  backbonesPorAndar: number;

  tipoBackbone:
    | "primario"
    | "secundario"
    | "ambos";

  acessoriosBackbone: string;

  numPavimentosMH: number;
  pontosPorPavimento: number;
  medidaMH: number;

  categoriaCabo:
    | "cat5e"
    | "cat6"
    | "cat6a"
    | "cat7"
    | "cat8";

  quantidadePontos: number;

  servicoAtendido: string;
  materialSEQSET: string;
};

const initialState: InfraForm = {
  numPavimentosBackbone: 1,
  paresFibras: 1,
  medidaBackbone: 1,

  tipoFibra: "MM",
  caracteristicaFibra: "OM3",

  backbonesPorAndar: 1,
  tipoBackbone: "primario",

  acessoriosBackbone: "",

  numPavimentosMH: 1,
  pontosPorPavimento: 1,
  medidaMH: 1,

  categoriaCabo: "cat6",

  quantidadePontos: 1,

  servicoAtendido: "",
  materialSEQSET: "",
};

export function useInfraForm() {
  const [form, setForm] = useState(initialState);

  function setField<K extends keyof InfraForm>(
    field: K,
    value: InfraForm[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function validate() : boolean { return false};

  function submit() : void{
    if (!validate()){
      return;
    }
  };

  return {
    form,
    setField,
    validate,
    submit,
  };
}