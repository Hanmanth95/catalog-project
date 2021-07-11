import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CatalogRoutingModule } from "./catalog-routing.module";
import { CatalogComponent } from "./catalog.component";
import { ListComponent } from "./list/list.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [CatalogComponent, ListComponent],
  imports: [CommonModule, CatalogRoutingModule, FormsModule],
})
export class CatalogModule {}
