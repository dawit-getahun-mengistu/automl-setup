export interface RandomNumberServiceOptions {
  min: number;
  max: number;
}

export const defaultRandomNumberServiceOptions: RandomNumberServiceOptions = {
  min: 0,
  max: 1000,
};
