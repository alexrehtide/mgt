import { actions as crudActions } from 'src/store/mixins/crud'
import driverApi from 'src/api/driver'

export default {
  ...crudActions(driverApi, {
    num: [required, minLength(4), maxLength(6)],
    name: [required, maxLength(20)],
    bus: [required]
  })
}

function required (value) {
  return !value && 'Поле обязательно'
}

function minLength (num) {
  return function (value) {
    return value.length < num && `Минимальная длина строки: ${num}`
  }
}

function maxLength (num) {
  return function (value) {
    return value.length > num && `Максимальная длина строки: ${num}`
  }
}
