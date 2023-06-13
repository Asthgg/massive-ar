import {Viro3DPoint} from '@viro-community/react-viro/dist/components/Types/ViroUtils';
import React, {createContext, useState} from 'react';

export type ArObject = null | {
  id: string;
  uri: string;
  preview: string;
};

export type ArSceneObject = ArObject & {
  rotationAngle: number;
  position: Viro3DPoint;
  anchorId: string | undefined;
  rotation: [number, number, number];
  scale: [number, number, number];
};

export interface ArContextProps {
  rotationAngle: number;
  setRotationAngle: (angle: number) => void;
  sceneObjects: ArSceneObject[];
  setSceneObjects: (objects: ArSceneObject[]) => void;
  currentObject: ArObject;
  setCurrentObject: (object: ArObject) => void;
  objectOnEdit: string | null;
  setObjectOnEdit: (onEdit: string | null) => void;
}

export const ArDefaultState = {
  rotationAngle: 0,
  setRotationAngle: () => {},
  sceneObjects: [],
  setSceneObjects: () => {},
  currentObject: null,
  setCurrentObject: () => {},
  objectOnEdit: null,
  setObjectOnEdit: () => {},
};

export const ArContext = createContext<ArContextProps>(ArDefaultState);

export const ArContextProvider = ({children}: any) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [sceneObjects, setSceneObjects] = useState<ArSceneObject[]>([]);
  const [currentObject, setCurrentObject] = useState<ArObject>(null);
  const [objectOnEdit, setObjectOnEdit] = useState<string | null>(null);

  const value = {
    rotationAngle,
    setRotationAngle,
    sceneObjects,
    setSceneObjects,
    currentObject,
    setCurrentObject,
    objectOnEdit,
    setObjectOnEdit,
  };

  return <ArContext.Provider value={value}>{children}</ArContext.Provider>;
};
