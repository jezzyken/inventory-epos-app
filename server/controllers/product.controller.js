const get = async (req, res) => {
  const data = {
    msg: "get all products",
    success: true
  }
  return res.status(200).send(data)
} 

const getById = async (req, res) => {
  const data = {
    msg: `get product with id of ${req.params.id}`,
    success: true
  }
  return res.status(200).send(data)
} 

const add = async (req, res) => {
  const data = {
    msg: `add product`,
    success: true
  }
  return res.status(200).send(data)
} 

const update = async (req, res) => {
  const data = {
    msg: `update product with id of ${req.params.id}`,
    success: true
  }
  return res.status(200).send(data)
} 

const remove = async (req, res) => {
  const data = {
    msg: `delete product with id of ${req.params.id}`,
    success: true
  }
  return res.status(200).send(data)
} 

module.exports = {
  get,
  getById,
  add,
  update,
  remove
}