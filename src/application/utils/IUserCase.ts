/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUseCase<K = any> {
  execute: () => K;
}
