import {useContext} from 'react';

import {ArContext} from './ArContext';

export const useArContext = () => useContext(ArContext);

export type {ArContextProps, ArObject, ArSceneObject} from './ArContext';
