import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import type { Dispatch, FC } from 'react';
import { useCallback } from 'react';
import type { Elements } from 'react-flow-renderer';
import { removeElements } from 'react-flow-renderer';

type removeProps = {
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
  selectedElements: Elements<any> | null;
};
const Remove: FC<removeProps> = ({ setElements, selectedElements }) => {
  const onRemove = useCallback(() => {
    if (selectedElements) {
      Modal.confirm({
        title: 'Do you Want to remove this element?',
        icon: <ExclamationCircleOutlined />,
        content: '',
        onOk() {
          setElements((els) => removeElements(selectedElements, els));
        },
        onCancel() {},
      });
    }
  }, [setElements, selectedElements]);
  if (!selectedElements) {
    return (
      <Button key="Remove" block disabled={true}>
        Remove
      </Button>
    );
  }
  return (
    <Button key="Remove" onClick={onRemove} block>
      Remove
    </Button>
  );
};
export default Remove;
