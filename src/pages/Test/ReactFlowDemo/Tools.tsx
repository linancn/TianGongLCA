import type { Dispatch, FC } from 'react';
import React, { memo, useState, useCallback } from 'react';
import type { OnLoadParams, Elements, FlowExportObject } from 'react-flow-renderer';
import {
  useZoomPanHelper,
  useStoreState,
  removeElements,
  isNode,
  isEdge,
  useStoreActions,
} from 'react-flow-renderer';
import localforage from 'localforage';
import styles from './index.less';

localforage.config({
  name: 'react-flow',
  storeName: 'flows',
});

const flowKey = 'flow';

const getTimeId = () => new Date().getTime() - 1577836800000;

type ToolsProps = {
  rfInstance?: OnLoadParams;
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
};

const Tools: FC<ToolsProps> = ({ rfInstance, setElements }) => {
  const { transform } = useZoomPanHelper();
  const selectedElements = useStoreState((store) => store.selectedElements);
  const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);
  const [copyElements, setCopyElements] = useState<Elements>();

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localforage.setItem(flowKey, flow);
      // console.log(flow.elements);
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow: FlowExportObject | null = await localforage.getItem(flowKey);
      if (flow) {
        const [x = 0, y = 0] = flow.position;
        setElements(flow.elements || []);
        transform({ x, y, zoom: flow.zoom || 0 });
      }
    };

    restoreFlow();
  }, [setElements, transform]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: `n_${getTimeId()}`,
      data: { label: 'Added node' },
      position: {
        x: 0,
        y: 0,
      },
    };
    setElements((els) => els.concat(newNode));
    setSelectedElements(newNode);
  }, [setElements, setSelectedElements]);

  const onCopy = useCallback(() => {
    if (selectedElements != null) {
      setCopyElements(selectedElements);
    }
  }, [selectedElements]);

  const onPaste = useCallback(() => {
    if (copyElements != null) {
      const copyid = getTimeId();
      let i = 0;
      copyElements.map((el) => {
        if (isNode(el)) {
          const newNode = {
            ...el,
            id: `n_${copyid + i}`,
            position: {
              x: el.position.x + 10,
              y: el.position.y + 10,
            },
          };
          setElements((els) => els.concat(newNode));
        } else if (isEdge(el)) {
          const newEdge = {
            ...el,
            id: `e_${copyid + i}`,
          };
          setElements((els) => els.concat(newEdge));
        }
        i += 1;
        return '';
      });
    }
  }, [copyElements, setElements]);

  const onDelete = useCallback(() => {
    if (selectedElements != null) {
      setElements((els) => removeElements(selectedElements, els));
    }
  }, [setElements, selectedElements]);

  return (
    <div className={styles.save_controls}>
      <button onClick={onSave}>Save</button>
      <button onClick={onRestore}>Restore</button>
      <button onClick={onAdd}>Add</button>
      <button onClick={onCopy}>Copy</button>
      <button onClick={onPaste}>Paste</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default memo(Tools);
