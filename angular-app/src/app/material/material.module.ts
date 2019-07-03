import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTabsModule, MatSelectModule, MatIconModule, MatToolbarModule, MatMenuModule, MatListModule, MatSidenavModule } from "@angular/material";
const material = [MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTabsModule, MatSelectModule, MatIconModule, MatToolbarModule, MatMenuModule, MatListModule, MatSidenavModule]
@NgModule({
  exports: [material],
  imports: [material]
})
export class MaterialModule { }
