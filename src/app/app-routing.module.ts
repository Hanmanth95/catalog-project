import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthService } from "./auth/auth.service";

const appRoutes: Routes = [
  {
    path: "login",
    component: AuthComponent,
    canActivate: [AuthService],
  },
  {
    path: "catalog",
    loadChildren: () =>
      import("./catalog/catalog.module").then((m) => m.CatalogModule),
  },
  {
    path: "feedback",
    loadChildren: () =>
      import("./feedback/feedback.module").then((m) => m.FeedbackModule),
  },
  {
    path: "**",
    component: AuthComponent,
    canActivate: [AuthService],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
