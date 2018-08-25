const uuidv4 = require('uuid/v4')

const createId = () => uuidv4()

const dbInMemory =[]

export const createItem = async (item) => {
    const resultPostPromise = fetch('http://192.168.0.127:3000/api/product',{
    method: 'POST',
    body: JSON.stringify({
        ...item,  
        id: createId(),
      }),
    headers:{
    'Content-Type': 'application/json'
    }
  })

  return resultPostPromise
 //const newItem = {
 //  ...item,  
 //  id: createId(),
 //}
//
  //dbInMemory.push(newItem)
//
  //return newItem
}

export const findItems = async () => {

  const resultPromise = fetch('http://192.168.0.127:3000/api/product',{
    method: 'GET',
  }).then(response => {
    return response.json();
  })

  return resultPromise
}


export const updateItemById = async (id, changes) => {
  const item = dbInMemory.find((item) => item.id === id)

  Object.assign(item, changes)

  return item
}

export const deleteItemById = async (id) => {
  const index = dbInMemory.findIndex((item) => (item || {}).id === id)

  if (index < 0) {
    return false
  }

  // dbInMemory[index] = undefined
  delete dbInMemory[index]

  return true
}
