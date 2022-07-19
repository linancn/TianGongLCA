import type { FC } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { FormattedMessage } from 'umi';
import { deleteUser } from '@/services/user/api';

type Props = {
  id: number;
  buttonType: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  setViewDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const UserDelete: FC<Props> = ({ id, buttonType, actionRef, setViewDrawerVisible }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    deleteUser(id).then(async (result) => {
      if (result === 'ok') {
        message.success(
          <FormattedMessage
            id="flow.deletesuccess"
            defaultMessage="Selected flow has been deleted."
          />,
        );
        setViewDrawerVisible(false);
        setIsModalVisible(false);
        actionRef.current?.reload();
      } else {
        message.error(result);
      }
    });
  }, [actionRef, id, setViewDrawerVisible]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <Tooltip title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}>
        {buttonType === 'icon' ? (
          <>
            <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={showModal} />
            <Modal
              title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <FormattedMessage
                id="flow.delete"
                defaultMessage="Are you sure you want to delete this flow?"
              />
            </Modal>
          </>
        ) : (
          <>
            <Button size="small" onClick={showModal}>
              <FormattedMessage id="options.delete" defaultMessage="Delete" />
            </Button>
            <Modal
              title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <FormattedMessage
                id="flow.delete"
                defaultMessage="Are you sure you want to delete this flow?"
              />
            </Modal>
          </>
        )}
      </Tooltip>
    </>
  );
};

export default UserDelete;
