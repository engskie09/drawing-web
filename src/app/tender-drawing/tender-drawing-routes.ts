import { TenderDrawingComponent } from './tender-drawing.component';
import { TenderDrawingComponent as TenderDrawingHistory } from '../history/tender-drawing/tender-drawing.component';


export const TENDER_DRAWING_ROUTES = {
  path: 'tender-drawing',
  children: [
    {
      path: ':drawingId',
      component: TenderDrawingComponent,
      children: [
        {
          path: 'history',
          component: TenderDrawingHistory,
        }
      ]
    }
  ]
}
