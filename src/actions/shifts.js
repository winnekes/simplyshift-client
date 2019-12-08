import { actionCreator } from './dispatchHandler';

export const SHIFT_ENTRIES_FETCHED = 'SHIFTS_ENTRIES_FETCHED';
export const SHIFT_MODELS_FETCHED = 'SHIFTS_MODELS_FETCHED';
export const SHIFT_MODEL_EDITED = 'SHIFT_MODEL_EDITED';
export const SHIFT_MODEL_CREATED = 'SHIFT_MODEL_CREATED';
export const SHIFT_MODEL_DELETED = 'SHIFT_MODEL_DELETED';

export const shiftEntriesFetched = actionCreator(SHIFT_ENTRIES_FETCHED);
export const shiftModelsFetched = actionCreator(SHIFT_MODELS_FETCHED);
export const shiftModelEdited = actionCreator(SHIFT_MODEL_EDITED);
export const shiftModelCreated = actionCreator(SHIFT_MODEL_CREATED);
export const shiftModelDeleted = actionCreator(SHIFT_MODEL_DELETED);
