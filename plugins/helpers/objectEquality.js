const animationPropertyList = ['id', 'title', 'shortDescription', 'longDescription', 'publicationDate', 'programs', 'status', 'image', 'theme', 'tags', 'type', 'topType', 'dates', 'dateStart', 'dateEnd', 'hosts', 'partners', 'cycles', 'createdAt', 'updatedAt']

export default () => ({
  isAnimationsEquals (animationOne, animationTwo) {
    if (!this.checkAnimationHaveProperties(animationOne)) { return false }
    if (!this.checkAnimationHaveProperties(animationTwo)) { return false }
    if (!this.checkTwoAnimationPropertiesAreEquals(animationOne, animationTwo)) { return false }
    return true
  },
  checkAnimationHaveProperties (animationObject) {
    return this.checkObjectHasProperties(animationObject, animationPropertyList)
  },
  checkObjectHasProperties (object, propertyList) {
    let response = true
    if (propertyList !== undefined) {
      propertyList.forEach((property) => {
        if (object[property] === undefined) {
          response = false
        }
      })
    }
    return response
  },
  checkTwoAnimationPropertiesAreEquals (animationOne, animationTwo) {
    return this.checkTwoObjectPropertiesAreEquals(animationOne, animationTwo, animationPropertyList)
  },
  checkTwoObjectPropertiesAreEquals (objectOne, objectTwo, propertyList) {
    let response = true
    if (propertyList !== undefined) {
      propertyList.forEach((property) => {
        if (objectOne[property] !== objectTwo[property]) {
          response = false
        }
      })
    }
    return response
  }
})
