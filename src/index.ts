import getUid from "./utils";

/* eslint-disable no-unused-vars */
type CallbackType<T> = (param: T) => void;

type CallBackStack<T> = {
  [k: string]: CallbackType<T>;
};

/**
 * Allows you to manage the subscription
 * to an event and to trigger the event.
 * With it, you can listen to any event from anywhere.
 * Inspired from RXJS Subject
 */

class Subject<T> {
  #stack: CallBackStack<T> = {};

  // subscribe to event
  suscribe(callback: CallbackType<T>): Function {
    let uid = getUid();
    while (this.#stack[uid]) {
      uid = getUid();
    }
    this.#stack[uid] = callback;
    return () => {
      delete this.#stack[uid];
    };
  }

  // emit event
  emit(param: T) {
    const callbackKeys = Object.keys(this.#stack);
    for (let index = 0; index < callbackKeys.length; index += 1) {
      const element = this.#stack[callbackKeys[index]];
      element(param);
    }
  }
}

export default Subject;
