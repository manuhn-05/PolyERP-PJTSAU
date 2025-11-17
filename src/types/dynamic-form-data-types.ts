// Supported field types
type FieldType = "text" | "date" | "time" | "select" | "object" | "auto" | "number" | "email";

// Base field
interface BaseField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  editable?: boolean;
  value?: string | number | boolean;
}

// Select field
interface SelectField extends BaseField {
  type: "select";
  options: string[];
}

// Object field (nested schema)
interface ObjectField extends BaseField {
  type: "object";
  fields: FormField[];
}

// Auto field (pre-filled, usually from session/user)
interface AutoField extends BaseField {
  type: "auto";
  editable?: boolean; // default false
}

// Text, Date, Time fields
interface TextField extends BaseField {
  type: "text" | "date" | "time" | "number" | "email";
}

// Union of all possible fields
type FormField = TextField | SelectField | ObjectField | AutoField;

// Schema type
interface FormSchema {
  fields: FormField[];
}
