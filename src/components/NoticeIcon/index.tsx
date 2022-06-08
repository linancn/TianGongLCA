import { useEffect, useState } from 'react';
import { Tag, message } from 'antd';
import { groupBy } from 'lodash';
import moment from 'moment';
// import { useModel } from 'umi';
// import { getNotices } from '@/services/ant-design-pro/api';

import NoticeIcon from './NoticeIcon';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
};

const getNoticeData = (notices: API.NoticeIconItem[]): Record<string, API.NoticeIconItem[]> => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };

    if (newNotice.datetime) {
      newNotice.datetime = moment(notice.datetime as string).fromNow();
    }

    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }

    if (newNotice.extra && newNotice.status) {
      const color = {
        todo: '',
        processing: 'blue',
        urgent: 'red',
        doing: 'gold',
      }[newNotice.status];
      newNotice.extra = (
        <Tag
          color={color}
          style={{
            marginRight: 0,
          }}
        >
          {newNotice.extra}
        </Tag>
      ) as any;
    }

    return newNotice;
  });
  return groupBy(newNotices, 'type');
};

const getUnreadData = (noticeData: Record<string, API.NoticeIconItem[]>) => {
  const unreadMsg: Record<string, number> = {};
  Object.keys(noticeData).forEach((key) => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) => !item.read).length;
    }
  });
  return unreadMsg;
};

const NoticeIconView = () => {
  // const { initialState } = useModel('@@initialState');
  // const { currentUser } = initialState || {};
  const [notices, setNotices] = useState<API.NoticeIconItem[]>([]);

  useEffect(() => {
    // getNotices().then(({ data }) => setNotices(data || []));
    setNotices([
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'TianGongLCA 2022 峰会即将开幕',
        datetime: '2021-12-09',
        type: 'notification',
      },
      {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '本月数据库在线讲座',
        datetime: '2021-08-08',
        type: 'notification',
      },
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '已更新 USLCI 2021 Q3 数据库',
        datetime: '2021-08-07',
        read: true,
        type: 'notification',
      },
      {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '数据库委员会加入了新的成员',
        datetime: '2021-08-07',
        type: 'notification',
      },
      // {
      //   id: '000000006',
      //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      //   title: '曲丽丽 评论了你',
      //   description: '描述信息描述信息描述信息',
      //   datetime: '2017-08-07',
      //   type: 'message',
      //   clickClose: true,
      // },
      // {
      //   id: '000000007',
      //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      //   title: '朱偏右 回复了你',
      //   description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      //   datetime: '2017-08-07',
      //   type: 'message',
      //   clickClose: true,
      // },
      // {
      //   id: '000000008',
      //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
      //   title: '标题',
      //   description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
      //   datetime: '2017-08-07',
      //   type: 'message',
      //   clickClose: true,
      // },
      // {
      //   id: '000000009',
      //   title: '任务名称',
      //   description: '任务需要在 2017-01-12 20:00 前启动',
      //   extra: '未开始',
      //   status: 'todo',
      //   type: 'update',
      // },
      {
        id: '000000010',
        title: '数据库更新',
        description: 'TianGongLCA Database 2021 Q4 版本更新',
        extra: '数据更新',
        status: 'urgent',
        type: 'update',
      },
      {
        id: '000000011',
        title: 'TianGongLCA 1.0.1 正式版',
        description: 'TianGongLCA 1.0.1 正式版于 2021-12-09 发布',
        extra: '程序更新',
        status: 'doing',
        type: 'update',
      },
      {
        id: '000000012',
        title: 'TianGongLCA 内部版本发布',
        description: '邀请您体验 TianGongLCA 最新内部版本',
        extra: '内测版本',
        status: 'processing',
        type: 'update',
      },
    ]);
  }, []);

  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData || {});

  const changeReadState = (id: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.id === id) {
          notice.read = true;
        }
        return notice;
      }),
    );
  };

  const clearReadState = (title: string, key: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.type === key) {
          notice.read = true;
        }
        return notice;
      }),
    );
    message.success(`${'清空了'} ${title}`);
  };

  return (
    <NoticeIcon
      className={styles.action}
      // count={currentUser && currentUser.unreadCount}
      count={6}
      onItemClick={(item) => {
        changeReadState(item.id!);
      }}
      onClear={(title: string, key: string) => clearReadState(title, key)}
      loading={false}
      clearText="清空"
      viewMoreText="查看更多"
      onViewMore={() => message.info('Click on view more')}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="notification"
        count={unreadMsg.notification}
        list={noticeData.notification}
        title="通知"
        emptyText="你已查看所有通知"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="update"
        title="更新"
        emptyText="您已拥有最新数据和程序"
        count={unreadMsg.update}
        list={noticeData.update}
        showViewMore
      />
    </NoticeIcon>
  );
};

export default NoticeIconView;
