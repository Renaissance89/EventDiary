import { Component, OnInit } from '@angular/core';
import { EventService } from './../../../organizer/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  selectedFile= null;

  constructor(    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  onImageSelect(event) {
    this.selectedFile = event.target.files[0]
  }
  onUploadImage() {
    const id = this.activatedRoute.snapshot.queryParams['id']
    this.eventService
      .uploadImage(id, this.selectedFile)
      .subscribe(response => {
        if (response['status'] == 'success') {

         this.toastr.success("added image")
          this.router.navigate(['/dashboard/event/add-event'])
        } else {
          console.log(response['error'])
        }
      })
  }

}
