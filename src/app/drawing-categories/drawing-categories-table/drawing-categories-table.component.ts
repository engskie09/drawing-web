import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { DrawingCategoryService } from 'src/app/core/services/drawing-category.service';
import { DrawingCategory } from 'src/app/core/models/drawing-category';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MatTable } from '@angular/material/table';
import { ProjectCategoryService } from 'src/app/core/services/project-category.service';
import { ProjectCategory } from 'src/app/core/models/project-category';

@Component({
  selector: 'app-drawing-categories-table',
  templateUrl: './drawing-categories-table.component.html',
  styleUrls: ['./drawing-categories-table.component.scss']
})
export class DrawingCategoriesTableComponent implements OnInit, OnDestroy {
  @ViewChild('deleteConfirmation') deleteConfirmation: SwalComponent;
  @ViewChild('table') table: MatTable<any>;

  _projectId;
  @Input() set projectId(id) {
    this._projectId = id;

    this.getProjectCategories();
  }

  get projectId() {
    return this._projectId;
  }

  loading: boolean = false;
  isDataSubmitting: boolean = false;
  categories: DrawingCategory[] = [];
  columnsToDisplay: string[] = ['name', 'actions'];
  selectedDeleteCategory: ProjectCategory;
  selectedEditCategory: ProjectCategory;
  editCategoryName: String;
  
  projectCategories: ProjectCategory[] = [];

  @Output() onDeleteSuccess: EventEmitter<any> = new EventEmitter();
  @Output() onEditSuccess: EventEmitter<any> = new EventEmitter();

  constructor(
    private drawingCategoryService: DrawingCategoryService,
    private projectCategoryService: ProjectCategoryService,
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnInit(): void {
    this.getProjectCategories();
  }

  ngOnDestroy() {}

  getProjectCategories() {
    this.loading = true;

    this.projectCategoryService.getCategories(this.projectId).subscribe(res => {
      this.projectCategories = res;  

      this.loading = false;
    });
  }

  getCategories() {
    this.loading = true;

    this.drawingCategoryService.getCategories().subscribe(res => {
      this.categories = res;
      this.loading = false;
    });
  }

  confirmDelete(category: ProjectCategory) {
    this.deleteConfirmation.fire();

    this.selectedDeleteCategory = category;
  }

  deleteCategory() {
    this.projectCategoryService.deleteCategory(this.projectId, this.selectedDeleteCategory.id).subscribe(res => {
      this.selectedDeleteCategory = null;

      this.onDeleteSuccess.emit();
    });
  }

  editCategory(category: ProjectCategory) {
    this.editCategoryName = category.categoryName;
    this.selectedEditCategory = category;

    setTimeout(() => {
      this.elementRef.nativeElement.querySelector(`#table-row-${category.id}`).querySelector('input').focus();
    }, 100)
  }

  isBeingEdited(category): boolean {
    return this.selectedEditCategory && this.selectedEditCategory.id === category.id;
  }

  saveCategory() {
    this.isDataSubmitting = true;

    const body = {
      category_name: this.editCategoryName
    };

    this.projectCategoryService.editCategory(this.projectId, this.selectedEditCategory.id, body).subscribe(res => {
      this.isDataSubmitting = false;

      this.onEditSuccess.emit();
    });
  }

  resetEdit() {
    this.selectedEditCategory = null;
  }
}
