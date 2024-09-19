export function clone(data: any, ...typeExceptions: any[]) {
  return cloneInstance(data, typeExceptions);
}

function cloneInstance(data: any, typeExceptions: any[] = [], clonedMap = new Map<any, any>()) {
  // Check data is not instance of an exception, if is, cancel clone
  const index = typeExceptions.findIndex(type => data instanceof type);
  if (index != -1) {
    return data;
  }

  if (Array.isArray(data)) {
    const cloned = data.map(elem => cloneInstance(elem, typeExceptions, clonedMap));
    clonedMap.set(data, cloned);

    return cloned;
  } else if (typeof data === 'object' && data != undefined) {
    let cloned = clonedMap.get(data);

    if (cloned === undefined) {
      cloned = Object.assign(Object.create(Object.getPrototypeOf(data)), data);
      clonedMap.set(data, cloned);
    }

    // Clone each propertie of the object
    Object.keys(cloned).forEach(key => {
      const prop = cloned[key];

      // Check propertie is not instance of an exception, if is, cancel clone
      const index = typeExceptions.findIndex(type => prop instanceof type);
      if (index != -1) {
        return;
      }

      // Check propertie was cloned, if was cloned, don't clone again just use the cloned that was created previously
      let clonedProp = clonedMap.get(prop);
      if (clonedProp === undefined) {
        clonedProp = cloneInstance(prop, typeExceptions, clonedMap);
      }

      cloned[key] = clonedProp;
    });

    return cloned;
  }

  return data;
}