export type FormFieldInput = {
  as: string;
  label: string;
  placeholder?: string;
  initialValue: number | string;
  type?: string;
  validate?: (value: string) => string | null;
};
