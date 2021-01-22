import { ShopDrawingComponent } from './shop-drawing.component';
import { TypeDrawingComponent as TypeDrawingHistoryComponent } from '../history/type-drawing/type-drawing.component';


export const SHOP_DRAWING_ROUTES = {
  path: 'shop-drawing',
  data: {
    type: 'shop'
  },
  children: [
    {
      path: ':drawingId',
      component: ShopDrawingComponent,
      children: [
        {
          path: 'history',
          component: TypeDrawingHistoryComponent,
          data: {
            type: 'shop'
          },
        }
      ]
    }
  ]
}
