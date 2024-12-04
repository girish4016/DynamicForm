export interface iFormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

export interface iFormStructure {
  fields: iFormField[];
}
