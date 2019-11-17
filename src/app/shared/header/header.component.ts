import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppSearchService } from '../app-search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>()

  constructor(private appSearchService: AppSearchService) { }

  ngOnInit() {
  }

  searchFilter(event: KeyboardEvent) {
    this.onSearch.emit((<HTMLInputElement>event.target).value);
  }

}
