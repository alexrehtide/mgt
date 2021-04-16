import { state as crudState } from 'src/store/mixins/crud'

export default () => ({
  ...crudState()
})
