import { TypeDrawingComponent } from './type-drawing.component';
import { TypeDrawingComponent as TypeDrawingHistoryComponent } from '../history/type-drawing/type-drawing.component';


export const TYPE_DRAWING_ROUTES = {
  path: 'type-drawing',
  children: [
    {
      path: ':drawingId',
      component: TypeDrawingComponent,
      children: [
        {
          path: 'history',
          component: TypeDrawingHistoryComponent,
        }
      ]
    }
  ]
}
