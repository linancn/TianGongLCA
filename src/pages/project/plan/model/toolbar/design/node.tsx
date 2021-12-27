import { Button, Drawer, Form, Input, InputNumber, Popover, Space } from 'antd';
import type { Dispatch, FC } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import { CloseOutlined } from '@ant-design/icons';
import type { NsNodeCmd } from '@antv/xflow';
import { MODELS } from '@antv/xflow';
import { useXFlowApp, XFlowNodeCommands } from '@antv/xflow';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

type Props = {
  label: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  config: any;
};

const DesignNode: FC<Props> = ({ label, drawerVisible, setDrawerVisible }) => {
  const app = useXFlowApp();
  const formRef = useRef<ProFormInstance>();
  const [isPopoverVisibleBGC, setIsPopoverVisibleBGC] = useState(false);
  const [colorBGC, setColorBGC] = useState('#000000');
  const [isPopoverVisibleBDC, setIsPopoverVisibleBDC] = useState(false);
  const [colorBDC, setColorBDC] = useState('#000000');
  const [isPopoverVisibleFC, setIsPopoverVisibleFC] = useState(false);
  const [colorFC, setColorFC] = useState('#000000');
  const rStyles = reactCSS({
    default: {
      fontColor: {
        background: `${colorFC}`,
        width: '100px',
        height: '10px',
      },
      backgroundColor: {
        background: `${colorBGC}`,
        width: '100px',
        height: '10px',
      },
      borderColor: {
        background: `${colorBDC}`,
        width: '100px',
        height: '10px',
      },
    },
  });
  const onFocusBGC = () => {
    setIsPopoverVisibleBDC(false);
    setIsPopoverVisibleFC(false);
    setIsPopoverVisibleBGC(true);
  };
  const onFocusBDC = () => {
    setIsPopoverVisibleBGC(false);
    setIsPopoverVisibleFC(false);
    setIsPopoverVisibleBDC(true);
  };
  const onFocusFC = () => {
    setIsPopoverVisibleBGC(false);
    setIsPopoverVisibleBDC(false);
    setIsPopoverVisibleFC(true);
  };
  const onSketchPickerChangeBGC = (color: any) => {
    setColorBGC(color.hex);
    formRef?.current?.setFieldsValue({
      ...formRef?.current?.getFieldsValue(),
      background: color.hex,
    });
  };
  const onSketchPickerChangeBDC = (color: any) => {
    setColorBDC(color.hex);
    formRef?.current?.setFieldsValue({
      ...formRef?.current?.getFieldsValue(),
      borderColor: color.hex,
    });
  };
  const onSketchPickerChangeFC = (color: any) => {
    setColorFC(color.hex);
    formRef?.current?.setFieldsValue({
      ...formRef?.current?.getFieldsValue(),
      fontColor: color.hex,
    });
  };
  const onPopoverCloseBGC = () => {
    setIsPopoverVisibleBGC(false);
  };
  const onPopoverCloseBDC = () => {
    setIsPopoverVisibleBDC(false);
  };
  const onPopoverCloseFC = () => {
    setIsPopoverVisibleFC(false);
  };

  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  const getNode = async () => {
    const cell = await (await MODELS.SELECTED_CELL.useValue(app.modelService)).data;
    formRef.current?.setFieldsValue({
      label: cell.label,
      width: cell.width,
      height: cell.height,
      background: cell.attrs.body.fill,
      borderColor: cell.attrs.body.stroke,
      borderWidth: cell.attrs.body.strokeWidth,
      fontSize: cell.attrs.label.fontSize,
      fontColor: cell.attrs.label.fill,
    });
    setColorBGC(cell.attrs.body.fill);
    setColorBDC(cell.attrs.body.stroke);
    setColorFC(cell.attrs.label.fill);
  };

  const updateNode = async (values: any) => {
    const cell = await (await MODELS.SELECTED_CELL.useValue(app.modelService)).data;
    const config = {
      ...cell,
      label: values.label,
      width: values.width,
      height: values.height,
      attrs: {
        ...cell.attrs,
        body: {
          ...cell.body,
          fill: values.background,
          stroke: values.borderColor,
          strokeWidth: values.borderWidth,
        },
        label: {
          ...cell.label,
          text: values.label,
          fontSize: values.fontSize,
          fill: values.fontColor,
        },
      },
    };
    app.commandService.executeCommand<NsNodeCmd.UpdateNode.IArgs>(
      XFlowNodeCommands.UPDATE_NODE.id,
      {
        nodeConfig: config,
      },
    );
  };

  useEffect(() => {
    getNode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer
      closable={false}
      extra={
        <Button icon={<CloseOutlined />} style={{ border: 0 }} onClick={callbackDrawerVisible} />
      }
      visible={drawerVisible}
      maskClosable={false}
      title={`Design (${label})`}
      width="400px"
      onClose={callbackDrawerVisible}
      footer={
        <Space size={'middle'} className={styles.footer_right}>
          <Button onClick={() => formRef.current?.submit()} type="primary">
            Submit
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
          updateNode(values);
          callbackDrawerVisible();
        }}
      >
        <ProFormText width="md" name="label" label="Label" />
        <ProFormText width="md" name="width" label="Width" />
        <ProFormText width="md" name="height" label="Height" />
        <Popover
          title={
            <>
              Color Picker
              <CloseOutlined style={{ marginLeft: '160px' }} onClick={onPopoverCloseBGC} />
            </>
          }
          placement="bottomLeft"
          content={
            <SketchPicker width={'230px'} color={colorBGC} onChange={onSketchPickerChangeBGC} />
          }
          visible={isPopoverVisibleBGC}
        >
          <Form.Item name="background" label="Background Color">
            <Input
              style={{ width: '328px' }}
              addonAfter={<div style={rStyles.backgroundColor} />}
              onFocus={onFocusBGC}
            />
          </Form.Item>
        </Popover>
        <Form.Item name="borderWidth" label="Border Width">
          <InputNumber style={{ width: '328px' }} />
        </Form.Item>
        <Popover
          title={
            <>
              Color Picker
              <CloseOutlined style={{ marginLeft: '160px' }} onClick={onPopoverCloseBDC} />
            </>
          }
          placement="bottomLeft"
          content={
            <SketchPicker width={'230px'} color={colorBDC} onChange={onSketchPickerChangeBDC} />
          }
          visible={isPopoverVisibleBDC}
        >
          <Form.Item name="borderColor" label="Border Color">
            <Input
              style={{ width: '328px' }}
              addonAfter={<div style={rStyles.borderColor} />}
              onFocus={onFocusBDC}
            />
          </Form.Item>
        </Popover>
        <Form.Item name="fontSize" label="Font Size">
          <InputNumber style={{ width: '328px' }} />
        </Form.Item>
        <Popover
          title={
            <>
              Color Picker
              <CloseOutlined style={{ marginLeft: '160px' }} onClick={onPopoverCloseFC} />
            </>
          }
          placement="bottomLeft"
          content={
            <SketchPicker width={'230px'} color={colorBDC} onChange={onSketchPickerChangeFC} />
          }
          visible={isPopoverVisibleFC}
        >
          <Form.Item name="fontColor" label="Font Color">
            <Input
              style={{ width: '328px' }}
              addonAfter={<div style={rStyles.fontColor} />}
              onFocus={onFocusFC}
            />
          </Form.Item>
        </Popover>
      </ProForm>
    </Drawer>
  );
};
export default DesignNode;
