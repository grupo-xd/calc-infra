import { useState } from "react";
import { objectInstantiation, type ProjectResult } from "../services/ObjectInstantiation";

export type InfraForm = {
  escopo: "backbone" | "horizontalMesh" | "ambos";

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

  pontosData: number;
  pontosVoice: number;
  pontosSecurity: number;

  materialSEQSET: string;
};

const initialState: InfraForm = {
  escopo: "ambos",

  numPavimentosBackbone: 0,
  paresFibras: 0,
  medidaBackbone: 0,

  tipoFibra: "MM",
  caracteristicaFibra: "OM3",

  backbonesPorAndar: 0,
  tipoBackbone: "primario",

  acessoriosBackbone: "",

  numPavimentosMH: 0,
  pontosPorPavimento: 0,
  medidaMH: 0,

  categoriaCabo: "cat6",

  pontosData: 0,
  pontosVoice: 0,
  pontosSecurity: 0,

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

  function validate(): boolean {
    const { escopo } = form;

    const isPositiveNumber = (value: number) => Number.isFinite(value) && value > 0;

    if (form.pontosData < 0 || form.pontosVoice < 0 || form.pontosSecurity < 0) {
      return false;
    }

    if (escopo === "backbone" || escopo === "ambos") {
      if (
        !isPositiveNumber(form.numPavimentosBackbone) ||
        !isPositiveNumber(form.paresFibras) ||
        !isPositiveNumber(form.medidaBackbone) ||
        !isPositiveNumber(form.backbonesPorAndar)
      ) {
        return false;
      }
    }

    if (escopo === "horizontalMesh" || escopo === "ambos") {
      if (
        !isPositiveNumber(form.numPavimentosMH) ||
        !isPositiveNumber(form.pontosPorPavimento) ||
        !isPositiveNumber(form.medidaMH) ||
        (!isPositiveNumber(form.pontosData) && !isPositiveNumber(form.pontosVoice) && !isPositiveNumber(form.pontosSecurity))
      ) {
        return false;
      }
    }

    return true;
  }

  function submit(): ProjectResult | null {
    if (!validate()) {
      return null;
    }

    return objectInstantiation(form);
  }

  return {
    form,
    setField,
    validate,
    submit,
  };
}