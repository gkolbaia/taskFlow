import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTabsModule, MatSelectModule } from "@angular/material";
const material = [MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTabsModule, MatSelectModule]
@NgModule({
  exports: [material],
  imports: [material]
})
export class MaterialModule { }
