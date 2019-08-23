import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CommentsService } from '../comments.service';
import { Comment } from '../comment.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit, OnDestroy {

  enteredTitle = '';
  enteredContent = '';
  comment: Comment;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private commentId: string;
  private authStatusSub: Subscription;

  constructor(
    public commentsService: CommentsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('commentId')) {
        this.mode = 'edit';
        this.commentId = paramMap.get('commentId');
        this.isLoading = true;
        this.commentsService.getComment(this.commentId).subscribe(commentData => {
          this.isLoading = false;
          this.comment = {
            id: commentData._id,
            title: commentData.title,
            content: commentData.content,
            imagePath: commentData.imagePath,
            creator: commentData.creator
          };
          console.log('the creator is ' + this.comment.creator);

          this.form.setValue({
            title: this.comment.title,
            content: this.comment.content,
            image: this.comment.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.commentId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveComment() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.commentsService.addComment(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.commentsService.updateComment(
        this.commentId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
