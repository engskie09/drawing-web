import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, filter } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { JwtService } from './jwt.service';
import { environment } from 'src/environments/environment';
import { UserTypes } from '../enums/usertypes.enum';

export class User {
  id: string 
  employeeId: string
  avatar: string | null
  roleId: number
  companyId: string
  firstName: string
  lastName: string
  tokenExpiration: number
  signature: string;

  get isAdmin(): Boolean {
    const adminUserTypes: Array<number> = [
      UserTypes.Superadmin,
      UserTypes.Director,
      UserTypes.Engineer,
      UserTypes.Supervisor,
      UserTypes.ProjectManager,
      UserTypes.AssistantProjectManager,
      UserTypes.Coordinator,
    ];

    return adminUserTypes.indexOf(this.roleId) !== -1;
  }

  get isSuperadmin(): Boolean {
    return this.roleId === UserTypes.Superadmin;
  }

  get isDrafter(): Boolean {
    return this.roleId === UserTypes.Drafter;
  }

  get signatureLink(): string | null {
    if(this.signature) {
      return `${environment.s3_url}${this.signature}`;
    }

    return null;
  }

  constructor(userDetails) {
    this.id = userDetails.id
    this.employeeId = userDetails.employeeId
    this.avatar = userDetails.avatar ? this.generateAvatarLink(userDetails.avatar) : this.generateDefaultAvatarLink();
    this.roleId = userDetails.roleId
    this.companyId = userDetails.companyId
    this.firstName = userDetails.firstName
    this.lastName = userDetails.lastName
    this.tokenExpiration = userDetails.tokenExpiration ? userDetails.tokenExpiration * 1000 : null;
    this.signature = userDetails.signaturePath;
  }

  private generateAvatarLink(avatarLink): string {
    return `${environment.s3_url}${avatarLink}`
  }

  private generateDefaultAvatarLink(): string {
    const defaultAvatarPath = 'Employee/Avatar/_1551750608118_1184684_log_in_sign_up_upload_clipart_man_avatar.png'

    return this.generateAvatarLink(defaultAvatarPath)
  }

  public getUserFullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(null);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged(), filter(user => user !== null));

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private api: ApiService,
    private tokenService: JwtService,
  ) {}

  async checkUser(){
    const token = this.tokenService.getToken()

    if(token) {
      this.api.get('/check-token').subscribe(
        res => {
          const user = this.generateUserDetails({
            ...res.data.user,
            token_expiration: res.data.token_expiration,
          });

          this.setAuth(user, token);
        },
        err => {this.purgeAuth()}
      );
    } else {
      this.purgeAuth();
    }
  }

  generateUserDetails(userData): User {
    const userDetails = {
      id: userData.id,
      employeeId: userData.employee_id,
      avatar: userData.employee.avatar ? userData.employee.avatar.image : '',
      roleId: userData.employee.role.id,
      companyId: userData.employee.company.id,
      firstName: userData.employee.first_name,
      lastName: userData.employee.last_name,
      tokenExpiration: userData.token_expiration,
      signaturePath: userData.employee.signature_path,
    }

    const user = new User(userDetails);

    return user
  }

  attemptLogin(credentials): Observable<User> {
    return this.api.post('/login', {...credentials})
      .pipe(
        map(
          data => {
            // This is too long
            const userData = data.data.user
            const token = data.data.token
            const tokenExpiration = data.data.token_expiration

            const userDetails = {
              id: userData.id,
              employeeId: userData.employee_id,
              avatar: userData.employee.avatar ? userData.employee.avatar.image : null,
              roleId: userData.employee.role.id,
              companyId: userData.employee.company.id,
              firstName: userData.employee.first_name,
              lastName: userData.employee.last_name,
              signaturePath: userData.employee.signature_path,
              tokenExpiration,
            }
            const user = new User(userDetails)

            this.setAuth(user, token)
            return data
          }
        )
      )
  }

  setAuth(user: User, token: string, tokenExpiration = null) {
    this.currentUserSubject.next(user)
    this.tokenService.saveToken(token)
    this.isAuthenticatedSubject.next(true)
  }

  logout() {
    this.purgeAuth();
  }

  purgeAuth() {
    this.tokenService.removeToken();
    this.currentUserSubject.next(null as User);
    this.isAuthenticatedSubject.next(false);
  }
}