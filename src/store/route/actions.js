import { actions as crudActions } from 'src/store/mixins/crud'
import routeApi from 'src/api/route'

export default {
  ...crudActions(routeApi)
}
