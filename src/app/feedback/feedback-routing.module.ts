import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserFeedbackComponent } from "./user-feedback/user-feedback.component";

const appRoutes: Routes = [
  {
    path: "user-feedback",
    component: UserFeedbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class FeedbackRoutingModule {}
