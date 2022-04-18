import { Component, OnInit, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'a[gp-link]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() size: 'micro' | 'small' | 'default' | 'large' = 'default';
  @Input() iconVariations?: 'iconleft' | 'iconright';
  @Input() iconId?: 'gp-icon-edit' | 'gp-icon-language' | 'gp-icon-external-link' | 'gp-icon-north' = 'gp-icon-edit';

  @HostBinding('class') get class() { return this.classSetter; }

  public get classSetter(): string[] {
    const classesArray = ['gp-link', `gp-link-${this.size}`];
    if (this.iconVariations) {
      classesArray.push(`gp-link-${this.iconVariations}`);
    }
    return classesArray;
  }

}
