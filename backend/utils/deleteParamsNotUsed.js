export default (prop) => {
    for (const property in prop) {
      if (!prop[property] && prop[property] !== 0) {
          delete prop[property]
      }
    }
    return prop
}