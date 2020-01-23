import { Component, OnInit, OnChanges } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ConsoleReporter } from "jasmine";
import { UserService } from "../shared/user.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent implements OnInit {
  constructor(private service: UserService) {}
  searchForm: FormGroup;
  searchQuery: string;
  search() {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchInput: new FormControl()
    });

    console.log(this.service.isUserLoggedIn);
  }

  updateSearchQuery(): void {
    this.searchQuery = this.searchForm.get("searchInput").value;
  }

  onSubmit(): void {
    localStorage.setItem("searchQuery", JSON.stringify(this.searchQuery));
    window.location.reload();
  }

  onLogout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}
