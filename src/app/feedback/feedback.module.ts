import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeedbackRoutingModule } from "./feedback-routing.module";
import { FeedbackComponent } from "./feedback.component";
import { UserFeedbackComponent } from "./user-feedback/user-feedback.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [FeedbackComponent, UserFeedbackComponent],
  imports: [CommonModule, FeedbackRoutingModule, FormsModule],
})
export class FeedbackModule {}
