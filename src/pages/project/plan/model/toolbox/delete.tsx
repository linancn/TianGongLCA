import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import type { Dispatch, FC } from 'react';
import { useCallback } from 'react';
import type { Elements } from 'react-flow-renderer';
import { removeElements } from 'react-flow-renderer';

type deleteProps = {
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
  deleteElement: Elements<any> | null;
};
const Delete: FC<deleteProps> = ({ setElements, deleteElement }) => {
  const onDelete = useCallback(() => {
    if (deleteElement != null) {
      Modal.confirm({
        title: 'Do you Want to delete this element?',
        icon: <ExclamationCircleOutlined />,
        content: '',
        onOk() {
          setElements((els) => removeElements(deleteElement, els));
        },
        onCancel() {},
      });
    }
  }, [setElements, deleteElement]);
  return (
    <Button key="Delete" onClick={onDelete} block>
      Delete
    </Button>
  );
};
export default Delete;
