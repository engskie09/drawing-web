import { TypeDrawingComponent as TypeDrawingHistoryComponent } from '../history/type-drawing/type-drawing.component';
import { AsBuiltDrawingComponent } from './as-built-drawing.component';


export const AS_BUILT_DRAWINGS_ROUTES = {
  path: 'as-built-drawings',
  data: {
    type: 'as-built'
  },
  children: [
    {
      path: ':drawingId',
      component: AsBuiltDrawingComponent,
      children: [
        {
          path: 'history',
          component: TypeDrawingHistoryComponent,
          data: {
            type: 'as-built'
          },
        }
      ]
    }
  ]
}
