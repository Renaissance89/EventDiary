import { FeedbackService } from './../feedback.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {

  feedbacks = []

  constructor(
    private feedbackservice:FeedbackService
  ) { }

  ngOnInit(): void {
    this.loadfeedback()
  }

  loadfeedback() {
    this.feedbackservice
    .getAllfeedbacks()
    .subscribe(response=>
    {
      if(response['status']=='success')
      {
        this.feedbacks = response['data']
      }
    })
  }
}