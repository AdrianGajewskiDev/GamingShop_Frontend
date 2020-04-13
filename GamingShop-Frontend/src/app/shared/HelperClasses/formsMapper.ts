import { FormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";

class MapperValue {
  constructor(public name: string, public value: string) {}
}

@Injectable()
export class FormsMapper {
  private newValues: { [k: string]: any } = {};
  private values: MapperValue[] = [];
  private form: FormGroup;

  constructor() {}

  map<T>(obj: T, form: FormGroup): T {
    this.form = form;

    let objPropertyNames = Object.getOwnPropertyNames(obj);

    Object.keys(form.controls).forEach((el) => {
      this.values.push(new MapperValue(el, this.form.get(el).value));
    });

    for (let i = 0; i <= objPropertyNames.length; i++) {
      var object = objPropertyNames[i];
      this.values.forEach((element) => {
        if (element.name != null && element.name == object) {
          let propName = element.name;
          this.newValues[propName] = element.value;
        }
      });
    }

    let result = Object.assign(obj, this.newValues);
    return result;
  }

  getObjectProperties<T>(obj: T) {
    return Object.getOwnPropertyNames(obj);
  }
}
