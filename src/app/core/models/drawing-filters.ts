export interface DrawingFilters {
  drawingNo?: string;
  searchQuery?: string;
  category?: string;
  uploadedBy?: string;
  typeDrawingStatus?: Array<TypeDrawingStatusFilter>;
}

export interface TypeDrawingStatusFilter {
  type: String | Number;
  value: String | Number;
  label: String | Number;
}