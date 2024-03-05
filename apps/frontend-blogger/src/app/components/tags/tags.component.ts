import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Tag } from "../../interface/tag.data";
import { Observable, map } from "rxjs";

@Component({
    selector: 'blog-builder-tags',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tags.component.html',
    styleUrl: './tags.component.scss',
  })
  export class TagsComponent implements OnInit {
    @Input() public id: string | undefined;
    @Input() public tags$: Observable<Tag[]> | undefined;

    public tag$: Observable<Tag | undefined> | undefined;

    constructor() {
      this.tag$ = this.tags$?.pipe(map((tags) => tags.find((tag) => tag.id === this.id)));
    }

    ngOnInit(): void {}
  }