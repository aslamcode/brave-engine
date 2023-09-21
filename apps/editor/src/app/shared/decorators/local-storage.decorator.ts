import { environment } from 'apps/editor/src/environments/environment';

/**
 * Decorator utlizado para fazer bind de uma propriedade no LocalStorage ou no SessionStorage dependendo do keepConnected
 * @param customName nome customizado, por padrão o nome ultilizado é o mesmo da propriedade
 * @param isPrefixed Argumento opcional que indica se sera utilizado o prefixo padrão
 */
export function Storage(customName = '', isPrefixed = true) {
  return (
    target: any, // The prototype of the class
    decoratedPropertyName: string // The name of the property
  ) => {
    // get and set methods
    Object.defineProperty(target, decoratedPropertyName, {
      get: () => {
        const keepConnected: boolean = JSON.parse(
          localStorage.getItem(getKeyName('keepConnected', decoratedPropertyName)) as string
        );

        const storage = keepConnected == false ? sessionStorage : localStorage;
        return JSON.parse(storage.getItem(getKeyName(customName, decoratedPropertyName, isPrefixed)) as string);
      },
      set: (newValue) => {
        const keepConnected: boolean = JSON.parse(
          localStorage.getItem(getKeyName('keepConnected', decoratedPropertyName)) as string
        );

        const storage = keepConnected == false ? sessionStorage : localStorage;

        if (newValue === undefined) {
          storage.removeItem(getKeyName(customName, decoratedPropertyName, isPrefixed));
        } else {
          storage.setItem(getKeyName(customName, decoratedPropertyName, isPrefixed), JSON.stringify(newValue));
        }
      }
    });
  };
}

/**
 * Decorator utlizado para fazer bind de uma propriedade no LocalStorage
 * @param customName nome customizado, por padrão o nome ultilizado é o mesmo da propriedade
 * @param isPrefixed Argumento opcional que indica se sera utilizado o prefixo padrão
 */
export function LocalStorage(customName = '', isPrefixed = true) {
  return (
    target: any, // The prototype of the class
    decoratedPropertyName: string // The name of the property
  ) => {

    // get and set methods
    Object.defineProperty(target, decoratedPropertyName, {
      get: () => {
        return JSON.parse(localStorage.getItem(getKeyName(customName, decoratedPropertyName, isPrefixed)) as string);
      },
      set: (newValue) => {
        localStorage.setItem(getKeyName(customName, decoratedPropertyName, isPrefixed), JSON.stringify(newValue));
      }
    });
  };
}

/**
 * Decorator utlizado para fazer bind de uma propriedade no SessionStorage
 * @param customName nome customizado, por padrão o nome ultilizado é o mesmo da propriedade
 * @param isPrefixed Argumento opcional que indica se sera utilizado o prefixo padrão
 */
export function SessionStorage(customName = '', isPrefixed = true) {
  return (
    target: any, // The prototype of the class
    decoratedPropertyName: string // The name of the property
  ) => {

    // get and set methods
    Object.defineProperty(target, decoratedPropertyName, {
      get: () => {
        return JSON.parse(sessionStorage.getItem(getKeyName(customName, decoratedPropertyName, isPrefixed)) as string);
      },
      set: (newValue) => {
        sessionStorage.setItem(getKeyName(customName, decoratedPropertyName, isPrefixed), JSON.stringify(newValue));
      }
    });
  };
}

/**
 * "Calcula" o nome da key usado pelos decorators
 * @param customName nome customizado, por padrão o nome ultilizado é o mesmo da propriedade
 * @param decoratedPropertyName nome da propriedade decorada
 * @param isPrefixed determina se deve ultilizar o prefixo
 * @description este é um método auxiliar, a lógica deste método é usada tanto no decorator de local storage quanto no de session storage
 */
function getKeyName(customName: string, decoratedPropertyName: string, isPrefixed = true) {
  let keyName = customName || decoratedPropertyName;
  if (isPrefixed && environment.localStoragePrefix) {
    keyName = `${environment.localStoragePrefix}_${keyName}`;
  }

  return keyName;
}

export function setLocalStorage(key: string, value: any) {
  const keyName = `${environment.localStoragePrefix}_${key}`;
  localStorage.setItem(keyName, JSON.stringify(value));
}

export function getLocalStorage(key: string) {
  const keyName = `${environment.localStoragePrefix}_${key}`;
  return JSON.parse(localStorage.getItem(keyName) as string);
}
