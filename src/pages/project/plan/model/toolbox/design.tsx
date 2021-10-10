import { Button, Drawer, Space } from 'antd';
import type { Dispatch, FC } from 'react';
import { useRef, useState } from 'react';
import type { Elements } from 'react-flow-renderer';
import { isNode } from 'react-flow-renderer';
import styles from '../index.less';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { getOK } from '@/services/home/api';

type designProps = {
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
  elements: Elements<any>;
  selectedElements: Elements<any> | null;
};

let preid = '';

const Design: FC<designProps> = ({ setElements, elements, selectedElements }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const formRef = useRef<ProFormInstance>();
  const onDesign = () => {
    setIsDrawerVisible(true);
  };
  const handleDrawerCancel = () => {
    setIsDrawerVisible(false);
  };
  const onOK = () => {
    formRef.current?.submit();
    setIsDrawerVisible(false);
  };

  if (!selectedElements) {
    preid = '';
    return (
      <Button key="Design" block disabled={true}>
        Design
      </Button>
    );
  }
  if (isDrawerVisible) {
    if (preid !== selectedElements[0].id) {
      preid = selectedElements[0].id;
      if (isNode(selectedElements[0])) {
        getOK().then(async () => {
          elements.map((el) => {
            if (el.id === preid) {
              formRef?.current?.setFieldsValue({
                label: el.data.label,
                type: el.type,
                background: el.style?.background,
                color: el.style?.color,
                border: el.style?.border,
                // width: el.style?.width,
              });
            }
            return '';
          });
        });
      }
    }
  }

  return (
    <>
      <Button key="Design" onClick={onDesign} block>
        Design
      </Button>
      <Drawer
        visible={isDrawerVisible}
        title="Design"
        width="400px"
        onClose={handleDrawerCancel}
        footer={
          <Space size={'middle'} className={styles.footer_space}>
            <Button onClick={handleDrawerCancel}>Cancel</Button>
            <Button onClick={onOK} type="primary">
              OK
            </Button>
          </Space>
        }
      >
        <ProForm
          formRef={formRef}
          submitter={{
            render: () => {
              return [];
            },
          }}
          onFinish={async (values) => {
            setElements((els) =>
              els.map((el) => {
                if (el.id === preid) {
                  if (isNode(selectedElements[0])) {
                    // eslint-disable-next-line no-param-reassign
                    el = {
                      ...el,
                      data: {
                        ...el.data,
                        label: values.label,
                      },
                      type: values.type,
                      style: {
                        ...el.style,
                        background: values.background,
                        color: values.color,
                        border: values.border,
                        // width: +values.width
                      },
                    };
                  }
                  //  else if (isEdge(el)) {
                  //   el = {
                  //     ...el,
                  //     label: elementName,
                  //   };
                  // }
                }
                return el;
              }),
            );
            return true;
          }}
        >
          <ProFormText width="md" name="label" label="Label" />
          <ProFormText width="md" name="type" label="Type" />
          <ProFormText width="md" name="background" label="Background" />
          <ProFormText width="md" name="color" label="Color" />
          <ProFormText width="md" name="border" label="Border" />
          {/* <ProFormText width="md" name="width" label="Width" /> */}
        </ProForm>
      </Drawer>
    </>
  );
};
export default Design;
