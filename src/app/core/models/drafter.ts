import { environment } from 'src/environments/environment';

export class Drafter {
  public firstName: string;
  public lastName: string;
  public drawingRequests: Array<any>;
  public status: string;
  public id: string;
  public avatar;

  get completedTasks(): Array<any> {
    return this.drawingRequests.filter(request => {
      return request.status === 'Completed' || request.status === 'Approved'
    })
  }

  get fullname(): string {
    return `${this.firstName} ${this.lastName}`
  }


  get avatarLink(): string {
    if(this.avatar) {
      return `${environment.s3_url}${this.avatar.image}`;
    }

    return `${environment.s3_url}Employee/Avatar/_1551750608118_1184684_log_in_sign_up_upload_clipart_man_avatar.png`
  }


  constructor(
    public drafterDetails: DrafterDetails,
  ) {
    const {
      id,
      firstName,
      lastName,
      status,
      drawingRequests = [],
      avatar = '',
    } = drafterDetails;

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.drawingRequests = drawingRequests;
    this.status = status;
    this.avatar = avatar;
  }
}

interface TaskOverview {
  assigned: number;
  completed: number;
}

interface DrafterDetails {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
  drawingRequests: Array<any>;
  avatar: String;
}
