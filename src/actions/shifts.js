import { actionCreator } from './dispatchHandler';

export const SHIFT_ENTRIES_FETCHED = 'SHIFTS_ENTRIES_FETCHED';
export const SHIFT_MODELS_FETCHED = 'SHIFTS_MODELS_FETCHED';

export const shiftEntriesFetched = actionCreator(SHIFT_ENTRIES_FETCHED);
export const shiftModelsFetched = actionCreator(SHIFT_MODELS_FETCHED);
