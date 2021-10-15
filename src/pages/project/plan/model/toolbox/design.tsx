import { Button, Drawer, Form, Input, Popover, Space } from 'antd';
import type { Dispatch, FC } from 'react';
import { useRef, useState } from 'react';
import type { Elements } from 'react-flow-renderer';
import { isNode } from 'react-flow-renderer';
import styles from '../index.less';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormSelect } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { getOK } from '@/services/home/api';
import { SketchPicker } from 'react-color';
import { CloseOutlined } from '@ant-design/icons';
import reactCSS from 'reactcss';
// import { generate, presetPalettes } from '@ant-design/colors';

type designProps = {
  setElements: Dispatch<React.SetStateAction<Elements<any>>>;
  elements: Elements<any>;
  selectedElements: Elements<any> | null;
};

let preid = '';

const Design: FC<designProps> = ({ setElements, elements, selectedElements }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  // const [isPopoverVisibleFC, setIsPopoverVisibleFC] = useState(false);
  // const [colorFC, setColorFC] = useState('#000000');
  const [isPopoverVisibleBGC, setIsPopoverVisibleBGC] = useState(false);
  const [colorBGC, setColorBGC] = useState('#000000');
  const [isPopoverVisibleBDC, setIsPopoverVisibleBDC] = useState(false);
  const [colorBDC, setColorBDC] = useState('#000000');
  const formRef = useRef<ProFormInstance>();

  const rStyles = reactCSS({
    default: {
      // fontColor: {
      //   background: `${colorFC}`,
      //   width: '100px',
      //   height: '10px'
      // },
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

  const onDesign = () => {
    setIsDrawerVisible(true);
  };
  const onDrawerCancel = () => {
    setIsPopoverVisibleBDC(false);
    setIsPopoverVisibleBGC(false);
    // setIsPopoverVisibleFC(false);
    setIsDrawerVisible(false);
  };
  const onOK = () => {
    formRef.current?.submit();
    setIsPopoverVisibleBDC(false);
    setIsPopoverVisibleBGC(false);
    // setIsPopoverVisibleFC(false);
    setIsDrawerVisible(false);
  };
  // const onFocusFC = () => {
  //   setIsPopoverVisibleFC(true);
  // }
  // const onSketchPickerChangeFC = (color: any) => {
  //   setColorFC(color.hex);
  //   formRef?.current?.setFieldsValue({
  //     ...formRef?.current?.getFieldsValue(),
  //     color: color.hex
  //   });
  // };
  // const onPopoverCloseFC = () => {
  //   setIsPopoverVisibleFC(false);
  // }
  const onFocusBGC = () => {
    setIsPopoverVisibleBDC(false);
    setIsPopoverVisibleBGC(true);
  };
  const onSketchPickerChangeBGC = (color: any) => {
    setColorBGC(color.hex);
    formRef?.current?.setFieldsValue({
      ...formRef?.current?.getFieldsValue(),
      background: color.hex,
    });
  };
  const onPopoverCloseBGC = () => {
    setIsPopoverVisibleBGC(false);
  };
  const onFocusBDC = () => {
    setIsPopoverVisibleBGC(false);
    setIsPopoverVisibleBDC(true);
  };
  const onSketchPickerChangeBDC = (color: any) => {
    setColorBDC(color.hex);
    formRef?.current?.setFieldsValue({
      ...formRef?.current?.getFieldsValue(),
      borderColor: color.hex,
    });
  };
  const onPopoverCloseBDC = () => {
    setIsPopoverVisibleBDC(false);
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
              if (el.style) {
                const bordersettings = String(el.style.border).split(' ');
                console.log();
                formRef?.current?.setFieldsValue({
                  label: el.data.label,
                  type: el.type,
                  background: el.style.background,
                  // fontColor: el.style.color,
                  borderWidth: bordersettings[0].replace('px', ''),
                  borderStyle: bordersettings[1],
                  borderColor: bordersettings[2],
                });
                // if (el.style.width) {
                //   formRef?.current?.setFieldsValue({
                //     ...formRef?.current?.getFieldsValue(),
                //     width: String(el.style.width).replace('px', ''),
                //   });
                // }
                // else {
                //   formRef?.current?.setFieldsValue({
                //     width: '',
                //   });
                // }
                // if (el.style.height) {
                //   formRef?.current?.setFieldsValue({
                //     ...formRef?.current?.getFieldsValue(),
                //     height: String(el.style.height).replace('px', ''),
                //   });
                // }
                // else {
                //   formRef?.current?.setFieldsValue({
                //     height: '',
                //   });
                // }
                setColorBDC(bordersettings[2]);
                if (el.style.background && typeof el.style.background === 'string')
                  setColorBGC(el.style.background);
                // if (el.style.color && typeof el.style.color === 'string')
                //   setColorFC(el.style.color);
              }
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
        onClose={onDrawerCancel}
        footer={
          <>
            <Space size={'middle'} className={styles.footer_left}>
              <Button>More</Button>
            </Space>
            <Space size={'middle'} className={styles.footer_right}>
              <Button onClick={onDrawerCancel}>Cancel</Button>
              <Button onClick={onOK} type="primary">
                OK
              </Button>
            </Space>
          </>
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
                        background: values.background,
                        // color: values.fontColor,
                        border: `${values.borderWidth}px ${values.borderStyle} ${values.borderColor}`,
                      },
                    };
                    //   if(String(values.width).trim() !== ''){
                    //     // eslint-disable-next-line no-param-reassign
                    //     el = {
                    //       ...el,
                    //       style: {
                    //         width: `${values.width}px`,
                    //       },
                    //     };
                    //   }
                    //   if(String(values.height).trim() !== ''){
                    //     // eslint-disable-next-line no-param-reassign
                    //     el = {
                    //       ...el,
                    //       style: {
                    //         height: `${values.width}px`,
                    //       },
                    //     };
                    //   }
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
          <ProFormSelect
            options={[
              {
                value: 'dafault',
                label: 'dafault',
              },
              {
                value: 'input',
                label: 'input',
              },
              {
                value: 'output',
                label: 'output',
              },
            ]}
            width="md"
            name="type"
            label="Type"
          />
          {/* <Form.Item name="width" label="Width">
            <Input
              style={{ width: '328px' }}
              addonAfter='px'
            />
          </Form.Item>
          <Form.Item name="height" label="Height">
            <Input
              style={{ width: '328px' }}
              addonAfter='px'
            />
          </Form.Item> */}
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
            // trigger="click"
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
          {/* <Popover
            title={<>Color Picker<CloseOutlined style={{ marginLeft: '160px' }} onClick={onPopoverCloseFC} /></>}
            placement="bottomLeft"
            content={
              <SketchPicker
                width={'230px'}
                color={colorFC}
                onChange={onSketchPickerChangeFC}
              />}
            // trigger="click"
            visible={isPopoverVisibleFC}
          >
            <Form.Item name="fontColor" label="Font Color">
              <Input
                style={{ width: '328px' }}
                addonAfter={<div style={rStyles.fontColor} />}
                onFocus={onFocusFC}
              />
            </Form.Item>
          </Popover> */}
          <ProFormSelect
            options={[
              {
                value: 'solid',
                label: 'solid',
              },
              {
                value: 'none',
                label: 'none',
              },
              {
                value: 'dotted',
                label: 'dotted',
              },
              {
                value: 'dashed',
                label: 'dashed',
              },
              {
                value: 'double',
                label: 'double',
              },
            ]}
            width="md"
            name="borderStyle"
            label="Border Style"
          />
          <Form.Item name="borderWidth" label="Border Width">
            <Input style={{ width: '328px' }} addonAfter="px" />
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
            // trigger="click"
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
        </ProForm>
      </Drawer>
    </>
  );
};
export default Design;
