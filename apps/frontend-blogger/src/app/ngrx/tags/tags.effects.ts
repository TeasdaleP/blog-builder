import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TagService } from "../../services/tag.service";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { selectUserToken } from "../auth";

import * as TagAction from './tags.actions';

@Injectable()
export class TagEffects {

    getTags$ = createEffect(() => this.actions$.pipe(
        ofType(TagAction.getAllTags),
        exhaustMap(() => this.tagService.getAllTags$().pipe(
            map((payload) => TagAction.getAllTagsSuccess({ payload: payload })),
            catchError((error) => of(TagAction.getAllTagsFailed(error)))
        ))
    ));

    /** Requires Auth Token */
    addTag$ = createEffect(() => this.actions$.pipe(
        ofType(TagAction.addTag),
        withLatestFrom(this.store.select(selectUserToken)),
        switchMap(([action, state]) => {
            return this.tagService.addTag$(action.payload, state).pipe(
                mergeMap((payload) => [
                    TagAction.addTagSuccess({ payload: payload }),
                    TagAction.getAllTags()
                ]),
                catchError((error) => of(TagAction.addTagFailed(error)))
            )
        })
    ));

    constructor(private tagService: TagService, private actions$: Actions, private store: Store) {}
}