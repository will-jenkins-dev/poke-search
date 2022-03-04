import { InsuranceStatus, PetType } from "../../common/types/Policy";

export type FormFieldSelect = {
  as: string;
  label: string;
  options: Array<InsuranceStatus | PetType>;
  initialValue: string | number;
  validate?: (value: number) => string | null;
};
