import { Label as LabelInterface } from "../../types";

export class Label implements LabelInterface {
  readonly value: string;
  public static of(value: string): Label {
    if (Label.isValidLabel(value)) {
        return new Label(value);
    }
    throw new LabelNotValidException();
  }
  constructor(value: string) {
    this.value = value;
  }
  
  public static isValidLabel(value: string) {
    return value.length > 0;
  }

  public getValue() {
    return this.value;
  }
}

export class LabelNotValidException extends Error {
  constructor() {
    super("Todo label not valid");
  }
}