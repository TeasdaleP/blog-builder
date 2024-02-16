import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { CommentService } from "../../services/comment.service";
import { catchError, combineLatest, exhaustMap, map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectUser } from "../user/user.selectors";
import { selectUserToken } from "../auth/auth.selectors";

import * as CommentAction from './comments.actions';
import { Comment } from "../../interface/comment.data";

@Injectable()
export class CommentsEffects {

    getComments$ = createEffect(() => this.actions$.pipe(
        ofType(CommentAction.getComments),
        exhaustMap((action) => this.commentService.getPosts$(action.postId).pipe(
            map((response) => CommentAction.getCommentsSuccess({ payload: response })),
            catchError((error) => of(CommentAction.getCommentsFailed(error)))
        ))
    ));

    /** Requires Auth Token */
    addComment$ = createEffect(() => this.actions$.pipe(
        ofType(CommentAction.addComment),
        withLatestFrom(combineLatest([this.store.select(selectUser), this.store.select(selectUserToken)])),
        switchMap(([action, state]) => {
            const payload: Comment = {
                date: new Date(),
                author: `${state[0].firstname} ${state[0].lastname}`,
                comment: action.comment,
                blogId: action.postId
            }
            return this.commentService.addComment$(payload, state[1]).pipe(
                mergeMap((response) => {
                    return [
                        CommentAction.addCommentSuccess(response),
                        CommentAction.getComments({ postId: action.postId })
                    ]
                }),
                catchError((error) => of(CommentAction.addCommentFailed(error)))
            )
        })
    ));

    constructor(private commentService: CommentService, private actions$: Actions, private store: Store) {}
}