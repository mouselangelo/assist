import DataStore, { Cursor } from "nedb";
import path from "path";

import { applicatonDir } from "../helpers/file";

const getDataStoreFile = (collection: string) => {
  const file = path.join(applicatonDir, `${collection}.collection`);
  console.log("data: file", file);
  return file;
};

type Projection<T> = Partial<{ readonly [key in keyof T]: 1 | 0 }>;

const promisify = <T>(db: DataStore<T>) => {
  const wrapCursor = (cursor: Cursor<T>) => ({
    sort: (sort: any) => cursor.sort(sort) && wrapCursor(cursor),
    skip: (skip: number) => cursor.skip(skip) && wrapCursor(cursor),
    limit: (limit: number) => cursor.limit(limit) && wrapCursor(cursor),
    then: (
      onFulfilled: (value?: [T[]]) => [T[]],
      onRejected: (error?: Error) => [T[]]
    ) => {
      let promise = new Promise<[T[]]>((resolve, reject) => {
        cursor.exec((err, ...results) =>
          err ? reject(err) : resolve(results)
        );
      });
      promise = promise.then((results) => onFulfilled(results));
      if (onRejected) promise = promise.catch(onRejected);

      return promise;
    },
  });

  const wrapDataStore = (db: DataStore<T>) => ({
    insert: (doc: T) => {
      console.log("insert");
      return new Promise<T | T[]>((resolve, reject) => {
        console.log("call insert");

        db.insert(doc, (err, ...results) => {
          console.log({ err, results });
          err ? reject(err) : resolve(results);
        });
      });
    },
    update: (query: Partial<T>, update: Partial<T>, options?: any) =>
      new Promise((resolve, reject) => {
        db.update(query, update, options, (err, ...results) =>
          err ? reject(err) : resolve(results)
        );
      }),
    remove: (query: Partial<T>, options?: any) =>
      new Promise((resolve, reject) => {
        db.remove(query, (options = {}), (err, ...results) =>
          err ? reject(err) : resolve(results)
        );
      }),
    find: (query: Partial<T>, options: { projection?: Projection<T> }) =>
      wrapCursor(db.find(query, options.projection as any)),
    findOne: (query: Partial<T>, options: { projection?: Projection<T> }) =>
      new Promise<T>((resolve, reject) => {
        db.findOne<T>(query, options.projection as any, (err, result) =>
          err ? reject(err) : resolve(result)
        );
      }),
    count: (query: Partial<T>) =>
      new Promise<number>((resolve, reject) => {
        db.count(query, (err, count) => (err ? reject(err) : resolve(count)));
      }),
  });

  return wrapDataStore(db);
};

export const createDataStore = <T>(name: string) =>
  promisify<T>(
    new DataStore({ filename: getDataStoreFile(name), autoload: true })
  );
