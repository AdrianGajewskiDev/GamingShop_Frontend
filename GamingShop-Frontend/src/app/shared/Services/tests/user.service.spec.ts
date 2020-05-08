import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { UserService } from "../user.service";
import { UserModel } from "../../Models/user.model";

describe("StudentsService", () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  const user: UserModel = {
    Username: "",
    ID: "fc55ce6c-0d24-4985-97ec-aff40b2ae396",
    UserName: "AdrianDev",
    Email: "adrian.gajewski001@gmail.com",
    PhoneNumber: "507339145",
    Password: "Lakiernik2345",
    EmailConfirmed: true,
    ImageUrl: "fc55ce6c-0d24-4985-97ec-aff40b2ae396_single_user.png",
  };

  it("Should return user profile details", () => {
    localStorage.setItem("UserID", "fc55ce6c-0d24-4985-97ec-aff40b2ae396");
    service.getUserProfile().subscribe((res) => {
      expect(res).toEqual(user);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
