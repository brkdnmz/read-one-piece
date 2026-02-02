import { a as React, r as reactExports } from "../_chunks/_libs/react.mjs";
const __vite_import_meta_env__$2 = { "BASE_URL": "/read-one-piece/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "TSS_CLIENT_OUTPUT_DIR": "dist/client", "TSS_DEV_SERVER": "false", "TSS_ROUTER_BASEPATH": "read-one-piece", "TSS_SERVER_FN_BASE": "/read-one-piece/_serverFn/", "VITE_CDN_BASE_URL": "https://straw-hat.brkdnmz99.workers.dev" };
function hasInitialValue(atom2) {
  return "init" in atom2;
}
function isActuallyWritableAtom(atom2) {
  return !!atom2.write;
}
function isAtomStateInitialized(atomState) {
  return "v" in atomState || "e" in atomState;
}
function returnAtomValue(atomState) {
  if ("e" in atomState) {
    throw atomState.e;
  }
  if ((__vite_import_meta_env__$2 ? "production" : void 0) !== "production" && !("v" in atomState)) {
    throw new Error("[Bug] atom state is not initialized");
  }
  return atomState.v;
}
const promiseStateMap = /* @__PURE__ */ new WeakMap();
function isPendingPromise(value) {
  var _a;
  return isPromiseLike$1(value) && !!((_a = promiseStateMap.get(value)) == null ? void 0 : _a[0]);
}
function abortPromise(promise) {
  const promiseState = promiseStateMap.get(promise);
  if (promiseState == null ? void 0 : promiseState[0]) {
    promiseState[0] = false;
    promiseState[1].forEach((fn) => fn());
  }
}
function registerAbortHandler(promise, abortHandler) {
  let promiseState = promiseStateMap.get(promise);
  if (!promiseState) {
    promiseState = [true, /* @__PURE__ */ new Set()];
    promiseStateMap.set(promise, promiseState);
    const settle = () => {
      promiseState[0] = false;
    };
    promise.then(settle, settle);
  }
  promiseState[1].add(abortHandler);
}
function isPromiseLike$1(p) {
  return typeof (p == null ? void 0 : p.then) === "function";
}
function addPendingPromiseToDependency(atom2, promise, dependencyAtomState) {
  if (!dependencyAtomState.p.has(atom2)) {
    dependencyAtomState.p.add(atom2);
    const cleanup = () => dependencyAtomState.p.delete(atom2);
    promise.then(cleanup, cleanup);
  }
}
function getMountedOrPendingDependents(atom2, atomState, mountedMap) {
  var _a;
  const dependents = /* @__PURE__ */ new Set();
  for (const a of ((_a = mountedMap.get(atom2)) == null ? void 0 : _a.t) || []) {
    dependents.add(a);
  }
  for (const atomWithPendingPromise of atomState.p) {
    dependents.add(atomWithPendingPromise);
  }
  return dependents;
}
const BUILDING_BLOCK_atomRead = (_store, atom2, ...params) => atom2.read(...params);
const BUILDING_BLOCK_atomWrite = (_store, atom2, ...params) => atom2.write(...params);
const BUILDING_BLOCK_atomOnInit = (store, atom2) => {
  if (atom2.INTERNAL_onInit) {
    return atom2.INTERNAL_onInit(store);
  }
};
const BUILDING_BLOCK_atomOnMount = (_store, atom2, setAtom) => {
  var _a;
  return (_a = atom2.onMount) == null ? void 0 : _a.call(atom2, setAtom);
};
const BUILDING_BLOCK_ensureAtomState = (store, atom2) => {
  var _a;
  const buildingBlocks = getInternalBuildingBlocks(store);
  const atomStateMap = buildingBlocks[0];
  const storeHooks = buildingBlocks[6];
  const atomOnInit = buildingBlocks[9];
  if ((__vite_import_meta_env__$2 ? "production" : void 0) !== "production" && !atom2) {
    throw new Error("Atom is undefined or null");
  }
  let atomState = atomStateMap.get(atom2);
  if (!atomState) {
    atomState = { d: /* @__PURE__ */ new Map(), p: /* @__PURE__ */ new Set(), n: 0 };
    atomStateMap.set(atom2, atomState);
    (_a = storeHooks.i) == null ? void 0 : _a.call(storeHooks, atom2);
    atomOnInit == null ? void 0 : atomOnInit(store, atom2);
  }
  return atomState;
};
const BUILDING_BLOCK_flushCallbacks = (store) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const changedAtoms = buildingBlocks[3];
  const mountCallbacks = buildingBlocks[4];
  const unmountCallbacks = buildingBlocks[5];
  const storeHooks = buildingBlocks[6];
  const recomputeInvalidatedAtoms = buildingBlocks[13];
  const errors = [];
  const call = (fn) => {
    try {
      fn();
    } catch (e) {
      errors.push(e);
    }
  };
  do {
    if (storeHooks.f) {
      call(storeHooks.f);
    }
    const callbacks = /* @__PURE__ */ new Set();
    const add = callbacks.add.bind(callbacks);
    changedAtoms.forEach((atom2) => {
      var _a;
      return (_a = mountedMap.get(atom2)) == null ? void 0 : _a.l.forEach(add);
    });
    changedAtoms.clear();
    unmountCallbacks.forEach(add);
    unmountCallbacks.clear();
    mountCallbacks.forEach(add);
    mountCallbacks.clear();
    callbacks.forEach(call);
    if (changedAtoms.size) {
      recomputeInvalidatedAtoms(store);
    }
  } while (changedAtoms.size || unmountCallbacks.size || mountCallbacks.size);
  if (errors.length) {
    throw new AggregateError(errors);
  }
};
const BUILDING_BLOCK_recomputeInvalidatedAtoms = (store) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const invalidatedAtoms = buildingBlocks[2];
  const changedAtoms = buildingBlocks[3];
  const ensureAtomState = buildingBlocks[11];
  const readAtomState = buildingBlocks[14];
  const mountDependencies = buildingBlocks[17];
  const topSortedReversed = [];
  const visiting = /* @__PURE__ */ new WeakSet();
  const visited = /* @__PURE__ */ new WeakSet();
  const stack = Array.from(changedAtoms);
  while (stack.length) {
    const a = stack[stack.length - 1];
    const aState = ensureAtomState(store, a);
    if (visited.has(a)) {
      stack.pop();
      continue;
    }
    if (visiting.has(a)) {
      if (invalidatedAtoms.get(a) === aState.n) {
        topSortedReversed.push([a, aState]);
      } else if ((__vite_import_meta_env__$2 ? "production" : void 0) !== "production" && invalidatedAtoms.has(a)) {
        throw new Error("[Bug] invalidated atom exists");
      }
      visited.add(a);
      stack.pop();
      continue;
    }
    visiting.add(a);
    for (const d of getMountedOrPendingDependents(a, aState, mountedMap)) {
      if (!visiting.has(d)) {
        stack.push(d);
      }
    }
  }
  for (let i = topSortedReversed.length - 1; i >= 0; --i) {
    const [a, aState] = topSortedReversed[i];
    let hasChangedDeps = false;
    for (const dep of aState.d.keys()) {
      if (dep !== a && changedAtoms.has(dep)) {
        hasChangedDeps = true;
        break;
      }
    }
    if (hasChangedDeps) {
      readAtomState(store, a);
      mountDependencies(store, a);
    }
    invalidatedAtoms.delete(a);
  }
};
const storeMutationSet = /* @__PURE__ */ new WeakSet();
const BUILDING_BLOCK_readAtomState = (store, atom2) => {
  var _a, _b;
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const invalidatedAtoms = buildingBlocks[2];
  const changedAtoms = buildingBlocks[3];
  const storeHooks = buildingBlocks[6];
  const atomRead = buildingBlocks[7];
  const ensureAtomState = buildingBlocks[11];
  const flushCallbacks = buildingBlocks[12];
  const recomputeInvalidatedAtoms = buildingBlocks[13];
  const readAtomState = buildingBlocks[14];
  const writeAtomState = buildingBlocks[16];
  const mountDependencies = buildingBlocks[17];
  const setAtomStateValueOrPromise = buildingBlocks[20];
  const atomState = ensureAtomState(store, atom2);
  if (isAtomStateInitialized(atomState)) {
    if (mountedMap.has(atom2) && invalidatedAtoms.get(atom2) !== atomState.n) {
      return atomState;
    }
    let hasChangedDeps = false;
    for (const [a, n] of atomState.d) {
      if (readAtomState(store, a).n !== n) {
        hasChangedDeps = true;
        break;
      }
    }
    if (!hasChangedDeps) {
      return atomState;
    }
  }
  atomState.d.clear();
  let isSync = true;
  function mountDependenciesIfAsync() {
    if (mountedMap.has(atom2)) {
      mountDependencies(store, atom2);
      recomputeInvalidatedAtoms(store);
      flushCallbacks(store);
    }
  }
  function getter(a) {
    var _a2;
    if (a === atom2) {
      const aState2 = ensureAtomState(store, a);
      if (!isAtomStateInitialized(aState2)) {
        if (hasInitialValue(a)) {
          setAtomStateValueOrPromise(store, a, a.init);
        } else {
          throw new Error("no atom init");
        }
      }
      return returnAtomValue(aState2);
    }
    const aState = readAtomState(store, a);
    try {
      return returnAtomValue(aState);
    } finally {
      atomState.d.set(a, aState.n);
      if (isPendingPromise(atomState.v)) {
        addPendingPromiseToDependency(atom2, atomState.v, aState);
      }
      if (mountedMap.has(atom2)) {
        (_a2 = mountedMap.get(a)) == null ? void 0 : _a2.t.add(atom2);
      }
      if (!isSync) {
        mountDependenciesIfAsync();
      }
    }
  }
  let controller;
  let setSelf;
  const options = {
    get signal() {
      if (!controller) {
        controller = new AbortController();
      }
      return controller.signal;
    },
    get setSelf() {
      if ((__vite_import_meta_env__$2 ? "production" : void 0) !== "production") {
        console.warn(
          "[DEPRECATED] setSelf is deprecated and will be removed in v3."
        );
      }
      if ((__vite_import_meta_env__$2 ? "production" : void 0) !== "production" && !isActuallyWritableAtom(atom2)) {
        console.warn("setSelf function cannot be used with read-only atom");
      }
      if (!setSelf && isActuallyWritableAtom(atom2)) {
        setSelf = (...args) => {
          if ((__vite_import_meta_env__$2 ? "production" : void 0) !== "production" && isSync) {
            console.warn("setSelf function cannot be called in sync");
          }
          if (!isSync) {
            try {
              return writeAtomState(store, atom2, ...args);
            } finally {
              recomputeInvalidatedAtoms(store);
              flushCallbacks(store);
            }
          }
        };
      }
      return setSelf;
    }
  };
  const prevEpochNumber = atomState.n;
  try {
    if ((__vite_import_meta_env__$2 ? "production" : void 0) !== "production") {
      storeMutationSet.delete(store);
    }
    const valueOrPromise = atomRead(store, atom2, getter, options);
    if ((__vite_import_meta_env__$2 ? "production" : void 0) !== "production" && storeMutationSet.has(store)) {
      console.warn(
        "Detected store mutation during atom read. This is not supported."
      );
    }
    setAtomStateValueOrPromise(store, atom2, valueOrPromise);
    if (isPromiseLike$1(valueOrPromise)) {
      registerAbortHandler(valueOrPromise, () => controller == null ? void 0 : controller.abort());
      valueOrPromise.then(mountDependenciesIfAsync, mountDependenciesIfAsync);
    }
    (_a = storeHooks.r) == null ? void 0 : _a.call(storeHooks, atom2);
    return atomState;
  } catch (error) {
    delete atomState.v;
    atomState.e = error;
    ++atomState.n;
    return atomState;
  } finally {
    isSync = false;
    if (prevEpochNumber !== atomState.n && invalidatedAtoms.get(atom2) === prevEpochNumber) {
      invalidatedAtoms.set(atom2, atomState.n);
      changedAtoms.add(atom2);
      (_b = storeHooks.c) == null ? void 0 : _b.call(storeHooks, atom2);
    }
  }
};
const BUILDING_BLOCK_invalidateDependents = (store, atom2) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const invalidatedAtoms = buildingBlocks[2];
  const ensureAtomState = buildingBlocks[11];
  const stack = [atom2];
  while (stack.length) {
    const a = stack.pop();
    const aState = ensureAtomState(store, a);
    for (const d of getMountedOrPendingDependents(a, aState, mountedMap)) {
      const dState = ensureAtomState(store, d);
      invalidatedAtoms.set(d, dState.n);
      stack.push(d);
    }
  }
};
const BUILDING_BLOCK_writeAtomState = (store, atom2, ...args) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const changedAtoms = buildingBlocks[3];
  const storeHooks = buildingBlocks[6];
  const atomWrite = buildingBlocks[8];
  const ensureAtomState = buildingBlocks[11];
  const flushCallbacks = buildingBlocks[12];
  const recomputeInvalidatedAtoms = buildingBlocks[13];
  const readAtomState = buildingBlocks[14];
  const invalidateDependents = buildingBlocks[15];
  const writeAtomState = buildingBlocks[16];
  const mountDependencies = buildingBlocks[17];
  const setAtomStateValueOrPromise = buildingBlocks[20];
  let isSync = true;
  const getter = (a) => returnAtomValue(readAtomState(store, a));
  const setter = (a, ...args2) => {
    var _a;
    const aState = ensureAtomState(store, a);
    try {
      if (a === atom2) {
        if (!hasInitialValue(a)) {
          throw new Error("atom not writable");
        }
        if ((__vite_import_meta_env__$2 ? "production" : void 0) !== "production") {
          storeMutationSet.add(store);
        }
        const prevEpochNumber = aState.n;
        const v = args2[0];
        setAtomStateValueOrPromise(store, a, v);
        mountDependencies(store, a);
        if (prevEpochNumber !== aState.n) {
          changedAtoms.add(a);
          invalidateDependents(store, a);
          (_a = storeHooks.c) == null ? void 0 : _a.call(storeHooks, a);
        }
        return void 0;
      } else {
        return writeAtomState(store, a, ...args2);
      }
    } finally {
      if (!isSync) {
        recomputeInvalidatedAtoms(store);
        flushCallbacks(store);
      }
    }
  };
  try {
    return atomWrite(store, atom2, getter, setter, ...args);
  } finally {
    isSync = false;
  }
};
const BUILDING_BLOCK_mountDependencies = (store, atom2) => {
  var _a;
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const changedAtoms = buildingBlocks[3];
  const storeHooks = buildingBlocks[6];
  const ensureAtomState = buildingBlocks[11];
  const invalidateDependents = buildingBlocks[15];
  const mountAtom = buildingBlocks[18];
  const unmountAtom = buildingBlocks[19];
  const atomState = ensureAtomState(store, atom2);
  const mounted = mountedMap.get(atom2);
  if (mounted && !isPendingPromise(atomState.v)) {
    for (const [a, n] of atomState.d) {
      if (!mounted.d.has(a)) {
        const aState = ensureAtomState(store, a);
        const aMounted = mountAtom(store, a);
        aMounted.t.add(atom2);
        mounted.d.add(a);
        if (n !== aState.n) {
          changedAtoms.add(a);
          invalidateDependents(store, a);
          (_a = storeHooks.c) == null ? void 0 : _a.call(storeHooks, a);
        }
      }
    }
    for (const a of mounted.d) {
      if (!atomState.d.has(a)) {
        mounted.d.delete(a);
        const aMounted = unmountAtom(store, a);
        aMounted == null ? void 0 : aMounted.t.delete(atom2);
      }
    }
  }
};
const BUILDING_BLOCK_mountAtom = (store, atom2) => {
  var _a;
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const mountCallbacks = buildingBlocks[4];
  const storeHooks = buildingBlocks[6];
  const atomOnMount = buildingBlocks[10];
  const ensureAtomState = buildingBlocks[11];
  const flushCallbacks = buildingBlocks[12];
  const recomputeInvalidatedAtoms = buildingBlocks[13];
  const readAtomState = buildingBlocks[14];
  const writeAtomState = buildingBlocks[16];
  const mountAtom = buildingBlocks[18];
  const atomState = ensureAtomState(store, atom2);
  let mounted = mountedMap.get(atom2);
  if (!mounted) {
    readAtomState(store, atom2);
    for (const a of atomState.d.keys()) {
      const aMounted = mountAtom(store, a);
      aMounted.t.add(atom2);
    }
    mounted = {
      l: /* @__PURE__ */ new Set(),
      d: new Set(atomState.d.keys()),
      t: /* @__PURE__ */ new Set()
    };
    mountedMap.set(atom2, mounted);
    if (isActuallyWritableAtom(atom2)) {
      const processOnMount = () => {
        let isSync = true;
        const setAtom = (...args) => {
          try {
            return writeAtomState(store, atom2, ...args);
          } finally {
            if (!isSync) {
              recomputeInvalidatedAtoms(store);
              flushCallbacks(store);
            }
          }
        };
        try {
          const onUnmount = atomOnMount(store, atom2, setAtom);
          if (onUnmount) {
            mounted.u = () => {
              isSync = true;
              try {
                onUnmount();
              } finally {
                isSync = false;
              }
            };
          }
        } finally {
          isSync = false;
        }
      };
      mountCallbacks.add(processOnMount);
    }
    (_a = storeHooks.m) == null ? void 0 : _a.call(storeHooks, atom2);
  }
  return mounted;
};
const BUILDING_BLOCK_unmountAtom = (store, atom2) => {
  var _a, _b;
  const buildingBlocks = getInternalBuildingBlocks(store);
  const mountedMap = buildingBlocks[1];
  const unmountCallbacks = buildingBlocks[5];
  const storeHooks = buildingBlocks[6];
  const ensureAtomState = buildingBlocks[11];
  const unmountAtom = buildingBlocks[19];
  const atomState = ensureAtomState(store, atom2);
  let mounted = mountedMap.get(atom2);
  if (!mounted || mounted.l.size) {
    return mounted;
  }
  let isDependent = false;
  for (const a of mounted.t) {
    if ((_a = mountedMap.get(a)) == null ? void 0 : _a.d.has(atom2)) {
      isDependent = true;
      break;
    }
  }
  if (!isDependent) {
    if (mounted.u) {
      unmountCallbacks.add(mounted.u);
    }
    mounted = void 0;
    mountedMap.delete(atom2);
    for (const a of atomState.d.keys()) {
      const aMounted = unmountAtom(store, a);
      aMounted == null ? void 0 : aMounted.t.delete(atom2);
    }
    (_b = storeHooks.u) == null ? void 0 : _b.call(storeHooks, atom2);
    return void 0;
  }
  return mounted;
};
const BUILDING_BLOCK_setAtomStateValueOrPromise = (store, atom2, valueOrPromise) => {
  const ensureAtomState = getInternalBuildingBlocks(store)[11];
  const atomState = ensureAtomState(store, atom2);
  const hasPrevValue = "v" in atomState;
  const prevValue = atomState.v;
  if (isPromiseLike$1(valueOrPromise)) {
    for (const a of atomState.d.keys()) {
      addPendingPromiseToDependency(
        atom2,
        valueOrPromise,
        ensureAtomState(store, a)
      );
    }
  }
  atomState.v = valueOrPromise;
  delete atomState.e;
  if (!hasPrevValue || !Object.is(prevValue, atomState.v)) {
    ++atomState.n;
    if (isPromiseLike$1(prevValue)) {
      abortPromise(prevValue);
    }
  }
};
const BUILDING_BLOCK_storeGet = (store, atom2) => {
  const readAtomState = getInternalBuildingBlocks(store)[14];
  return returnAtomValue(readAtomState(store, atom2));
};
const BUILDING_BLOCK_storeSet = (store, atom2, ...args) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const flushCallbacks = buildingBlocks[12];
  const recomputeInvalidatedAtoms = buildingBlocks[13];
  const writeAtomState = buildingBlocks[16];
  try {
    return writeAtomState(store, atom2, ...args);
  } finally {
    recomputeInvalidatedAtoms(store);
    flushCallbacks(store);
  }
};
const BUILDING_BLOCK_storeSub = (store, atom2, listener) => {
  const buildingBlocks = getInternalBuildingBlocks(store);
  const flushCallbacks = buildingBlocks[12];
  const mountAtom = buildingBlocks[18];
  const unmountAtom = buildingBlocks[19];
  const mounted = mountAtom(store, atom2);
  const listeners = mounted.l;
  listeners.add(listener);
  flushCallbacks(store);
  return () => {
    listeners.delete(listener);
    unmountAtom(store, atom2);
    flushCallbacks(store);
  };
};
const buildingBlockMap = /* @__PURE__ */ new WeakMap();
const getInternalBuildingBlocks = (store) => {
  const buildingBlocks = buildingBlockMap.get(store);
  if ((__vite_import_meta_env__$2 ? "production" : void 0) !== "production" && !buildingBlocks) {
    throw new Error(
      "Store must be created by buildStore to read its building blocks"
    );
  }
  return buildingBlocks;
};
function buildStore(...buildArgs) {
  const store = {
    get(atom2) {
      const storeGet = getInternalBuildingBlocks(store)[21];
      return storeGet(store, atom2);
    },
    set(atom2, ...args) {
      const storeSet = getInternalBuildingBlocks(store)[22];
      return storeSet(store, atom2, ...args);
    },
    sub(atom2, listener) {
      const storeSub = getInternalBuildingBlocks(store)[23];
      return storeSub(store, atom2, listener);
    }
  };
  const buildingBlocks = [
    // store state
    /* @__PURE__ */ new WeakMap(),
    // atomStateMap
    /* @__PURE__ */ new WeakMap(),
    // mountedMap
    /* @__PURE__ */ new WeakMap(),
    // invalidatedAtoms
    /* @__PURE__ */ new Set(),
    // changedAtoms
    /* @__PURE__ */ new Set(),
    // mountCallbacks
    /* @__PURE__ */ new Set(),
    // unmountCallbacks
    {},
    // storeHooks
    // atom interceptors
    BUILDING_BLOCK_atomRead,
    BUILDING_BLOCK_atomWrite,
    BUILDING_BLOCK_atomOnInit,
    BUILDING_BLOCK_atomOnMount,
    // building-block functions
    BUILDING_BLOCK_ensureAtomState,
    BUILDING_BLOCK_flushCallbacks,
    BUILDING_BLOCK_recomputeInvalidatedAtoms,
    BUILDING_BLOCK_readAtomState,
    BUILDING_BLOCK_invalidateDependents,
    BUILDING_BLOCK_writeAtomState,
    BUILDING_BLOCK_mountDependencies,
    BUILDING_BLOCK_mountAtom,
    BUILDING_BLOCK_unmountAtom,
    BUILDING_BLOCK_setAtomStateValueOrPromise,
    BUILDING_BLOCK_storeGet,
    BUILDING_BLOCK_storeSet,
    BUILDING_BLOCK_storeSub,
    void 0
  ].map((fn, i) => buildArgs[i] || fn);
  buildingBlockMap.set(store, Object.freeze(buildingBlocks));
  return store;
}
const __vite_import_meta_env__$1 = {};
let keyCount = 0;
function atom(read, write) {
  const key = `atom${++keyCount}`;
  const config = {
    toString() {
      return (__vite_import_meta_env__$1 ? "production" : void 0) !== "production" && this.debugLabel ? key + ":" + this.debugLabel : key;
    }
  };
  {
    config.init = read;
    config.read = defaultRead;
    config.write = defaultWrite;
  }
  return config;
}
function defaultRead(get) {
  return get(this);
}
function defaultWrite(get, set, arg) {
  return set(
    this,
    typeof arg === "function" ? arg(get(this)) : arg
  );
}
function createStore() {
  return buildStore();
}
let defaultStore;
function getDefaultStore() {
  if (!defaultStore) {
    defaultStore = createStore();
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      globalThis.__JOTAI_DEFAULT_STORE__ || (globalThis.__JOTAI_DEFAULT_STORE__ = defaultStore);
      if (globalThis.__JOTAI_DEFAULT_STORE__ !== defaultStore) {
        console.warn(
          "Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"
        );
      }
    }
  }
  return defaultStore;
}
const __vite_import_meta_env__ = {};
const StoreContext = reactExports.createContext(
  void 0
);
function useStore(options) {
  const store = reactExports.useContext(StoreContext);
  return store || getDefaultStore();
}
const isPromiseLike = (x) => typeof (x == null ? void 0 : x.then) === "function";
const attachPromiseStatus = (promise) => {
  if (!promise.status) {
    promise.status = "pending";
    promise.then(
      (v) => {
        promise.status = "fulfilled";
        promise.value = v;
      },
      (e) => {
        promise.status = "rejected";
        promise.reason = e;
      }
    );
  }
};
const use = React.use || // A shim for older React versions
((promise) => {
  if (promise.status === "pending") {
    throw promise;
  } else if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else {
    attachPromiseStatus(promise);
    throw promise;
  }
});
const continuablePromiseMap = /* @__PURE__ */ new WeakMap();
const createContinuablePromise = (promise, getValue) => {
  let continuablePromise = continuablePromiseMap.get(promise);
  if (!continuablePromise) {
    continuablePromise = new Promise((resolve, reject) => {
      let curr = promise;
      const onFulfilled = (me) => (v) => {
        if (curr === me) {
          resolve(v);
        }
      };
      const onRejected = (me) => (e) => {
        if (curr === me) {
          reject(e);
        }
      };
      const onAbort = () => {
        try {
          const nextValue = getValue();
          if (isPromiseLike(nextValue)) {
            continuablePromiseMap.set(nextValue, continuablePromise);
            curr = nextValue;
            nextValue.then(onFulfilled(nextValue), onRejected(nextValue));
            registerAbortHandler(nextValue, onAbort);
          } else {
            resolve(nextValue);
          }
        } catch (e) {
          reject(e);
        }
      };
      promise.then(onFulfilled(promise), onRejected(promise));
      registerAbortHandler(promise, onAbort);
    });
    continuablePromiseMap.set(promise, continuablePromise);
  }
  return continuablePromise;
};
function useAtomValue(atom2, options) {
  const { delay, unstable_promiseStatus: promiseStatus = !React.use } = {};
  const store = useStore();
  const [[valueFromReducer, storeFromReducer, atomFromReducer], rerender] = reactExports.useReducer(
    (prev) => {
      const nextValue = store.get(atom2);
      if (Object.is(prev[0], nextValue) && prev[1] === store && prev[2] === atom2) {
        return prev;
      }
      return [nextValue, store, atom2];
    },
    void 0,
    () => [store.get(atom2), store, atom2]
  );
  let value = valueFromReducer;
  if (storeFromReducer !== store || atomFromReducer !== atom2) {
    rerender();
    value = store.get(atom2);
  }
  reactExports.useEffect(() => {
    const unsub = store.sub(atom2, () => {
      if (promiseStatus) {
        try {
          const value2 = store.get(atom2);
          if (isPromiseLike(value2)) {
            attachPromiseStatus(
              createContinuablePromise(value2, () => store.get(atom2))
            );
          }
        } catch (e) {
        }
      }
      if (typeof delay === "number") {
        setTimeout(rerender, delay);
        return;
      }
      rerender();
    });
    rerender();
    return unsub;
  }, [store, atom2, delay, promiseStatus]);
  reactExports.useDebugValue(value);
  if (isPromiseLike(value)) {
    const promise = createContinuablePromise(value, () => store.get(atom2));
    if (promiseStatus) {
      attachPromiseStatus(promise);
    }
    return use(promise);
  }
  return value;
}
function useSetAtom(atom2, options) {
  const store = useStore();
  const setAtom = reactExports.useCallback(
    (...args) => {
      if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && !("write" in atom2)) {
        throw new Error("not writable atom");
      }
      return store.set(atom2, ...args);
    },
    [store, atom2]
  );
  return setAtom;
}
function useAtom(atom2, options) {
  return [
    useAtomValue(atom2),
    // We do wrong type assertion here, which results in throwing an error.
    useSetAtom(atom2)
  ];
}
export {
  atom as a,
  useAtom as u
};
