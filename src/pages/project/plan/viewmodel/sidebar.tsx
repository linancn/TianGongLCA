import type { Dispatch, FC } from 'react';
import React, { useState, useCallback } from 'react';
import type { Elements } from 'react-flow-renderer';
import { useStoreState, isEdge, isNode } from 'react-flow-renderer';

type SidebarProps = {
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
};

let preid = '';

const Sidebar: FC<SidebarProps> = ({ setElements }) => {
  const selectedElements = useStoreState((store) => store.selectedElements);
  const [elementName, setElementName] = useState<string>('');
  if (selectedElements != null) {
    if (preid !== selectedElements[0].id) {
      preid = selectedElements[0].id;
      if (isNode(selectedElements[0])) {
        setElementName(selectedElements[0].data.label);
      }
    }
  } else {
    preid = '';
  }

  const onOK = useCallback(() => {
    setElements((els) =>
      els.map((el) => {
        if (selectedElements != null) {
          if (preid === selectedElements[0].id) {
            if (el.id === preid) {
              if (isNode(selectedElements[0])) {
                // eslint-disable-next-line no-param-reassign
                el.data = {
                  ...el.data,
                  label: elementName,
                };
                setElementName(elementName);
              } else if (isEdge(el)) {
                // eslint-disable-next-line no-param-reassign
                el = {
                  ...el,
                  label: elementName,
                };
              }
            }
          }
        }
        return el;
      }),
    );
  }, [setElements, selectedElements, elementName]);

  let rthtml = <aside></aside>;
  if (selectedElements != null) {
    rthtml = (
      <aside>
        <div>{selectedElements[0].id}</div>
        <div>
          <label>label:</label>
          <input value={elementName} onChange={(evt) => setElementName(evt.target.value)} />
          <button onClick={onOK}>OK</button>
        </div>
      </aside>
    );
  }
  return rthtml;
};

export default Sidebar;
