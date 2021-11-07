import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

const Reload = () => {
  const onReload = () => {
    Modal.confirm({
      title: 'Do you Want to reload this page?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        window.location.reload();
      },
      onCancel() {},
    });
  };
  return (
    <Button key="Reload" onClick={onReload} block>
      Reload
    </Button>
  );
};
export default Reload;
