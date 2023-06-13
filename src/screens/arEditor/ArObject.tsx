import React, {useState} from 'react';

import {Viro3DObject} from '@viro-community/react-viro';
import {Viro3DPoint} from '@viro-community/react-viro/dist/components/Types/ViroUtils';
import {ArContextProps, useArContext, ArSceneObject} from '../../context';

const ArObject = ({id, uri, position, rotation, scale}: ArSceneObject) => {
  const {setObjectOnEdit}: ArContextProps = useArContext();
  const [objectPosition, setObjectPosition] = useState<number[]>(position);

  const handleObjectDrag = (dragToPos: Viro3DPoint) => {
    const x = dragToPos[0];
    const z = dragToPos[2];
    setObjectPosition([x, objectPosition[1], z]);
  };

  const onClick = () => {
    setObjectOnEdit(id);
  };

  return (
    <Viro3DObject
      source={{
        uri,
      }}
      type="GLB"
      scale={scale}
      // dragType="FixedToPlane"
      position={position}
      rotation={rotation}
      onLoadStart={() => console.log('OnLoadStart 3D object: ')}
      onDrag={handleObjectDrag}
      onClick={onClick}
      onPinch={() => console.log('Item was pinched: ')}
      onError={err => console.log('Error 3D object: ', err)}
    />
  );
};

export default ArObject;
