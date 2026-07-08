import type { InfraForm } from "../hooks/useInfraForm";

export type InfraFormProps = {
  form: InfraForm;
  setField: <K extends keyof InfraForm>(
    field: K,
    value: InfraForm[K]
  ) => void;
};