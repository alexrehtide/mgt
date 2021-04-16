import { actions as crudActions } from 'src/store/mixins/crud'
import wayApi from 'src/api/way'

export default {
  ...crudActions(wayApi)
}
