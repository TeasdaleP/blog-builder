import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { CommentService } from "../../services/comment.service";

import * as CommentAction from './comments.actions';
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class CommentsEffects {

    getComments$ = createEffect(() => this.actions$.pipe(
        ofType(CommentAction.getComments),
        exhaustMap((action) => this.commentService.getPosts$(action.postId).pipe(
            map((response) => CommentAction.getCommentsSuccess({ payload: response })),
            catchError((error) => of(CommentAction.getCommentsFailed(error)))
        ))
    ));
    
    constructor(private commentService: CommentService, private actions$: Actions) {}
}