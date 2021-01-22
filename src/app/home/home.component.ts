import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from '../core/services/projects.service';
import { Router } from '@angular/router';
import { UserService, User } from '../core/services/user.service';
import { Breadcrumb } from '../layout/breadcrumbs/breadcrumbs.component';
import _ from 'lodash';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects: Array<any> = [];
  loading: Boolean = false;
  isAuthenticated: boolean;
  user: User = null;
  projectsDataSource = new MatTableDataSource([]);
  currentSort: Sort = {active: '', direction: ''};

  columnsToDisplay = ['projectTitle', 'startDate', 'endDate', 'status', 'progress'];

  get projectsSorted(): Array<any> {
    let _sortKey = 'id';
    
    if(this.currentSort.direction) {
      switch(this.currentSort.active) {
        case('projectTitle'):
          _sortKey = 'title';
          break;
        case('startDate'):
          _sortKey = 'startDate';
          break;
        case('endDate'):
          _sortKey = 'endDate';
          break;
        case('status'):
          _sortKey = 'status';
          break;
        case('progress'):
          _sortKey = 'progress';
          break;
      }

      return _.orderBy(this.projects, [_sortKey], [this.currentSort.direction]);
    }
    return this.projects;
  }


  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.currentUser.subscribe(user => {
      this.user = user;

      this.loading = false;
    });
  }

  getData(): void {
    this.loading = true

    this.userService.currentUser
      .subscribe()
  }

  onProjectClick(project) {
    this.router.navigateByUrl(`/dashboard/project/${project.id}`);
    
    return false;
  }

  goToDrawingRequests() {
    this.router.navigate([`drawing-requests`])
  }

  generateStatusClass(status: String) {
    return `projects__status projects__status--${_.kebabCase(status)}`;
  }

  onTableSortChange($event: Sort) {
    this.currentSort = $event;
  }
}

