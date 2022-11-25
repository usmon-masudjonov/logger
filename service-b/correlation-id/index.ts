import cls from "cls-hooked";
import * as uuid from "uuid";

const store = cls.createNamespace("correlation-id-namespace");

const CORRELATION_ID_KEY = `correlation-id`;

function withId(fn: Function, id: string) {
  store.run(() => {
    store.set(CORRELATION_ID_KEY, id || uuid.v4());
    fn();
  });
}

function getId() {
  return store.get(CORRELATION_ID_KEY);
}

const correlator = {
  withId,
  getId,
  bindEmitter: store.bindEmitter.bind(store),
  bind: store.bind.bind(store),
};

export default correlator;
