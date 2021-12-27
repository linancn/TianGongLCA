import { Button, Drawer, Form, Input, InputNumber, Popover, Space } from 'antd';
import type { Dispatch, FC } from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm from '@ant-design/pro-form';
import styles from '@/style/custom.less';
import { CloseOutlined } from '@ant-design/icons';
import type { NsEdgeCmd } from '@antv/xflow';
import { XFlowEdgeCommands } from '@antv/xflow';
import { MODELS } from '@antv/xflow';
import { useXFlowApp } from '@antv/xflow';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

type Props = {
  label: string;
  drawerVisible: boolean;
  setDrawerVisible: Dispatch<React.SetStateAction<boolean>>;
  config: any;
};

const DesignEdge: FC<Props> = ({ label, drawerVisible, setDrawerVisible }) => {
  const app = useXFlowApp();
  const formRef = useRef<ProFormInstance>();
  const [isPopoverVisibleLC, setIsPopoverVisibleLC] = useState(false);
  const [colorLC, setColorLC] = useState('#000000');
  const rStyles = reactCSS({
    default: {
      lineColor: {
        background: `${colorLC}`,
        width: '100px',
        height: '10px',
      },
    },
  });
  const onFocusLC = () => {
    setIsPopoverVisibleLC(true);
  };
  const onSketchPickerChangeLC = (color: any) => {
    setColorLC(color.hex);
    formRef?.current?.setFieldsValue({
      ...formRef?.current?.getFieldsValue(),
      lineColor: color.hex,
    });
  };
  const onPopoverCloseLC = () => {
    setIsPopoverVisibleLC(false);
  };

  const callbackDrawerVisible = useCallback(() => {
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  const getNode = async () => {
    const cell = await (await MODELS.SELECTED_CELL.useValue(app.modelService)).data;
    console.log(cell);
    formRef.current?.setFieldsValue({
      lineColor: cell.attrs.line.stroke,
      lineWidth: cell.attrs.line.strokeWidth,
      // label: node.label,
      // width: node.width,
      // height: node.height,
      // background: node.attrs.body.fill,
      // borderColor: node.attrs.body.stroke,
      // borderWidth: node.attrs.body.strokeWidth,
      // fontSize: node.attrs.text.fontSize,
      // fontColor: node.attrs.text.fill,
    });
    // setColorBGC(node.attrs.body.fill);
    // setColorBDC(node.attrs.body.stroke);
    setColorLC(cell.attrs.line.stroke);
  };

  const updateNode = async (values: any) => {
    const cell = await (await MODELS.SELECTED_CELL.useValue(app.modelService)).data;
    console.log(cell);
    const config = {
      ...cell,
      attrs: {
        ...cell.attrs,
        line: {
          ...cell.line,
          stroke: values.lineColor,
          strokeWidth: values.lineWidth,
        },
      },
    };
    app.commandService.executeCommand<NsEdgeCmd.UpdateEdge.IArgs>(
      XFlowEdgeCommands.UPDATE_EDGE.id,
      {
        edgeConfig: config,
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
        <Form.Item name="lineWidth" label="Line Width">
          <InputNumber style={{ width: '328px' }} />
        </Form.Item>
        <Popover
          title={
            <>
              Color Picker
              <CloseOutlined style={{ marginLeft: '160px' }} onClick={onPopoverCloseLC} />
            </>
          }
          placement="bottomLeft"
          content={
            <SketchPicker width={'230px'} color={colorLC} onChange={onSketchPickerChangeLC} />
          }
          visible={isPopoverVisibleLC}
        >
          <Form.Item name="lineColor" label="Line Color">
            <Input
              style={{ width: '328px' }}
              addonAfter={<div style={rStyles.lineColor} />}
              onFocus={onFocusLC}
            />
          </Form.Item>
        </Popover>
      </ProForm>
    </Drawer>
  );
};
export default DesignEdge;
