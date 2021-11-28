export function sendSuccessNotification (store, message) {
  store.commit('sendNotification', {
    status: 'success',
    message
  })
}

export function clearObjectProperties (object, specialPropertyToDelete, propertyToReplaceByUri, propertyToTransformIntoInt) {
  delete object['@id']
  delete object['@type']
  delete object['@context']
  delete object.updatedAt
  delete object.createdAt
  if (specialPropertyToDelete !== undefined) {
    specialPropertyToDelete.forEach(property => delete object[property])
  }
  if (propertyToReplaceByUri !== undefined) {
    propertyToReplaceByUri.forEach((property) => { object = replacePropertyByUri(object, property) })
  }
  if (propertyToTransformIntoInt !== undefined) {
    propertyToTransformIntoInt.forEach((property) => { object[property] = parseInt(object[property]) })
  }
  return object
}

function replacePropertyByUri (object, property) {
  if (object[property] === null || object[property] === undefined) {
    delete object[property]
    return object
  }
  if (Array.isArray(object[property])) {
    return replaceArrayByUri(object, property)
  }
  if (typeof object[property] === 'object') {
    return replaceObjectByUri(object, property)
  }
}
function replaceObjectByUri (object, property) {
  object[property] = object[property]['@id']
  return object
}
function replaceArrayByUri (object, property) {
  const tempTable = []
  object[property].forEach((element) => {
    tempTable.push(element['@id'])
  })
  object[property] = tempTable
  return object
}
