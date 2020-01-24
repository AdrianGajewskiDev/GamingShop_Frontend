import { Component, OnInit, OnChanges } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent implements OnInit {
  constructor(private service: UserService, private router: Router) {}
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
    if (this.router.url == "/games" || this.router.url == "/") {
      localStorage.setItem("searchQuery", JSON.stringify(this.searchQuery));
      window.location.reload();
    } else {
      localStorage.setItem("searchQuery", JSON.stringify(this.searchQuery));
      this.router.navigateByUrl("/games");
    }
  }

  onLogout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}
