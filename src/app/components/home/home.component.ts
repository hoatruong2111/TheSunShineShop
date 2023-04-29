import { Component, OnInit } from '@angular/core';
import { HandleImagesService } from 'src/app/services/handle-images.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imagesList: any[];
  isLoading = true;
  myOptions = {
    // gutter: 10
  };
  constructor(private handleImangeService: HandleImagesService) { }
  ngOnInit(): void {

    this.handleImangeService.getImageDetailList().then((val) => {
      this.imagesList = val
      console.log(val)

    }).then(() => {
      this.isLoading = false
      console.log(this.imagesList)

    });
  }

}
