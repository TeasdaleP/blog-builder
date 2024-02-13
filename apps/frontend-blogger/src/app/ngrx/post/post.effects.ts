import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { exhaustMap, map, catchError, of, mergeMap } from "rxjs";
import { PostService } from "../../services/post.service";

import * as PostAction from './post.actions';
import { Post } from "../../interface/post.data";

@Injectable()
export class PostEffects {

    getPosts$ = createEffect(() => this.actions$.pipe(
        ofType(PostAction.getAllPosts),
        exhaustMap(() => this.postService.getAllPosts$().pipe(
            map((payload) => PostAction.getAllPostsSuccess({ payload: payload })),
            catchError((error) => of(PostAction.getAllPostsFailed(error)))
        ))
    ));

    addPost$ = createEffect(() => this.actions$.pipe(
        ofType(PostAction.addPost),
        exhaustMap((action) => {
            let payload: Post = {
                ...action.payload,
                date: new Date
            }
            return this.postService.addPost$(payload).pipe(
                mergeMap((payload) => {
                    return [
                        PostAction.addPostSuccess({ payload: payload }),
                        PostAction.getAllPosts()
                    ]
                }),
                catchError((error) => of(PostAction.addPostFailed(error)))
            )
        })
    ));

    deletePost$ = createEffect(() => this.actions$.pipe(
        ofType(PostAction.deletePost),
        exhaustMap((action) => this.postService.deletePost$(action.id).pipe(
            mergeMap((response) => {
                return [
                    PostAction.deletePostSuccess({ payload: response }),
                    PostAction.getAllPosts()
                ]
            }),
            catchError((error) => of(PostAction.deletePostFailed(error)))
        ))
    ));
    
    constructor(private postService: PostService, private actions$: Actions) {}
}