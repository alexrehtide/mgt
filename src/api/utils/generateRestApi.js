import axios from 'axios'

export default function (endpoint = '') {
  const findAll = () => axios.get(endpoint).then(res => res.data)

  const create = (data) => axios.post(`${endpoint}`, data).then(res => res.data)

  const update = (id, data) => axios.put(`${endpoint}/${id}`, data).then(res => res.data)

  const remove = (id) => axios.delete(`${endpoint}/${id}`).then(res => res.data)

  return {
    findAll,
    create,
    update,
    remove
  }
}