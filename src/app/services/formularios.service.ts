import { Injectable } from '@angular/core';

interface ModifiedFields {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class FormulariosService {

  compareAndGeneratePatch(jsonPatch: any[], formValue: any, originalFormValues: any) {
    for (const key in formValue) {
      if (formValue[key] !== originalFormValues[key]) {
        jsonPatch.push({ op: 'replace', path: `/${key}`, value: formValue[key] });
      }
    }
  }

  generateModifiedFields(formValue: any, originalFormValues: any): ModifiedFields {
    const modifiedFields: ModifiedFields = {};
    for (const key in formValue) {
      if (formValue[key] !== originalFormValues[key]) {
        modifiedFields[key] = formValue[key];
      }
    }
    return modifiedFields;
  }
}
