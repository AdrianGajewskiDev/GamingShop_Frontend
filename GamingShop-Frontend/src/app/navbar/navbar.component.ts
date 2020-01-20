import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent implements OnInit {
  constructor() {}
  searchForm: FormGroup;
  searchQuery: string;
  search() {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl()
    });
  }

  updateSearchQuery(): void {
    this.searchQuery = this.searchForm.get("searchInput").value;
  }

  onSubmit(): void {
    localStorage.setItem("searchQuery", JSON.stringify(this.searchQuery));
    window.location.reload();
  }
}
