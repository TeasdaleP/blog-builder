import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { exhaustMap, map, catchError, of, mergeMap, withLatestFrom, switchMap } from "rxjs";
import { PostService } from "../../services/post.service";
import { Post } from "../../interface/post.data";
import { selectUserToken } from "../auth";
import { Store } from "@ngrx/store";

import * as PostAction from './post.actions';

@Injectable()
export class PostEffects {

    getPosts$ = createEffect(() => this.actions$.pipe(
        ofType(PostAction.getAllPosts),
        exhaustMap(() => this.postService.getAllPosts$().pipe(
            map((payload) => PostAction.getAllPostsSuccess({ payload: payload })),
            catchError((error) => of(PostAction.getAllPostsFailed(error)))
        ))
    ));

    /** Requires Auth Token */
    addPost$ = createEffect(() => this.actions$.pipe(
        ofType(PostAction.addPost),
        withLatestFrom(this.store.select(selectUserToken)),
        switchMap(([action, state]) => {
            let payload: Post = {
                ...action.payload,
                date: new Date
            }
            return this.postService.addPost$(payload, state).pipe(
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

    /** Requires Auth Token */
    deletePost$ = createEffect(() => this.actions$.pipe(
        ofType(PostAction.deletePost),
        withLatestFrom(this.store.select(selectUserToken)),
        switchMap(([action, state]) => this.postService.deletePost$(action.id, state).pipe(
            mergeMap((response) => {
                return [
                    PostAction.deletePostSuccess({ payload: response }),
                    PostAction.getAllPosts()
                ]
            }),
            catchError((error) => of(PostAction.deletePostFailed(error)))
        ))
    ));
    
    constructor(private postService: PostService, private actions$: Actions, private store: Store) {}
}