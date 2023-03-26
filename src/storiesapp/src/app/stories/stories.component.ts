import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Story } from './story';


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  public story: Story;
  public stories: Story[] = [];
  public data: any;
  public errorclss:string='';

  constructor(private storyService: ProductService) {
    var s1 = new Story(0, '', '', 0,true);
    this.story = s1;
    this.fetchStories();
  }

  ngOnInit() {

  }
  upvoteStory(story: Story): void {
    story.upvotes++;
    this.storyService.patchStory(story);
    console.log(story);

  }
  editStory(story: Story) {
    if(story.id>0)
    {
      story.editing = true;
      console.log('Can edit:' + story.editing);
    }
   
  }

  deleteStory(story: Story) {
    var confirmed=window.confirm('Are you sure you want to delete this story?');
    if(confirmed)
    {
     
     
      this.storyService.deleteStory(story);
      let currentstory = this.stories.find(x => x.id == story.id);
      if(currentstory!=null)
      {
        this.stories[0] = currentstory;
        this.stories.shift();
      }
     
    }
    else
    {
      alert('Delete transaction has been cancelled');
    }
  
  }
  cancel(story:Story)
  {
    story.editing=false;
    if(story.id==0)
    {
      this.stories.pop();
    }
    
  }
  updateStory(story: Story) {
    this.storyService.updateStory(story);
    console.log('edited:'+ JSON.stringify(story));
    story.editing = false;
  }
  storeStory(story: Story) {
    //this.$http.post('https://localhost:44324/api/stories/', story).then(function (response) {
                /*
                After the the new story is stored in the database fetch again all stories with
                vm.fetchStories();
                Or Better, update the id of the created story
                */
    
    this.storyService.storeStory(story);
    //Set editing to false to show actions again and hide the inputs
    if(story.id>0)
    {
      this.stories.push(story);
      story.editing = false;
    }
    story.editing = false;
  }

  createStory() {
    var newstory = new Story(0, "", "", 0,true);
    this.stories.push(newstory);
  }
  fetchStories() {
      this.storyService.getStories().subscribe(response => {
      this.stories = response as Story[];
      this.stories.forEach(x => console.log(x));
      this.story.editing = false;

    })
  }
}
