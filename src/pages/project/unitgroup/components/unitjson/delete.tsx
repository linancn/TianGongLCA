import type { FC } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { Button, message, Modal, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-table';
import { deleteUnitJson } from '@/services/unitgroup/api';
import { FormattedMessage } from 'umi';

type Props = {
  unitGroupPkid: number;
  id: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};
const UnitJsonDelete: FC<Props> = ({ unitGroupPkid, id, actionRef }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    deleteUnitJson(unitGroupPkid, id).then(async (result) => {
      if (result === 'ok') {
        message.success(
          <FormattedMessage
            id="unitgroup.deletesuccess"
            defaultMessage="Selected unitgroup has been deleted."
          />,
        );
        setIsModalVisible(false);
        actionRef.current?.reload();
      } else {
        message.error(result);
      }
    });
  }, [actionRef, id, unitGroupPkid]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <Tooltip title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}>
        <Button shape="circle" icon={<DeleteOutlined />} size="small" onClick={showModal} />
        <Modal
          title={<FormattedMessage id="options.delete" defaultMessage="Delete" />}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <FormattedMessage
            id="unitgroup.delete"
            defaultMessage="Are you sure you want to delete this unitgroup?"
          />
        </Modal>
      </Tooltip>
    </>
  );
};

export default UnitJsonDelete;
