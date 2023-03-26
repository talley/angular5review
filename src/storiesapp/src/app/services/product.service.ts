import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { tap, catchError, map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Story } from '../stories/story';



@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnInit {

  private service_url: string = 'https://localhost:7076/api/Stories/';//
  public story!: Story;
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }
  constructor(private http: HttpClient) {

  }
  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(this.service_url);

  }
  deleteStory(story: Story): void {
    console.log('story id to be deleted is:'+story.id);
    this.http.delete(this.service_url + story.id).subscribe(
      (val) => {
        console.log("DELETE call successful value returned in body",
          val);
      },
      response => {
        console.log("DELETE call in error", response);
      },
      () => {
        console.log("The DELETE observable is now completed.");
      }
    );
  }
  updateStory(story: Story): void {
    this.http.put(this.service_url + story.id, story).subscribe(val => {
      console.log("PUT call successful value returned in body",
        val);
    },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The PUT observable is now completed.");
      })

    story.editing = false;
  }
  patchStory(story: Story): void {
    this.http.patch(this.service_url + story.id, story)
      .subscribe((val) => {
        console.log("PATCH call successful value returned in body",
          val);
      },
        response => {
          console.log("PATCH call in error", response);
        },
        () => {
          console.log("The PATCH observable is now completed.");
        });
    console.log('----patched----');
    story.editing = false;
  }
  editStory = function (story: Story) {
    story.editing = true;
  }
  upvoteStory(story: Story): void {
    story.upvotes++;
    this.http.patch(this.service_url + story.id, story);
  }
  storeStory(story: Story) {
    console.log('story to post:'+JSON.stringify(story));
    this.http.post(this.service_url, story).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );
    story.editing = false;
  }
}
