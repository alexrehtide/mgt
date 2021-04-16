import { actions as crudActions } from 'src/store/mixins/crud'
import busApi from 'src/api/bus'

export default {
  ...crudActions(busApi)
}
