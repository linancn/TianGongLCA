import { Request, Response } from 'express';

const getNotices = (req: Request, res: Response) => {
  res.json({
    data: [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: 'CrystaLCA 2022 峰会即将开幕',
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
        description: 'CrystaLCA Database 2021 Q4 版本更新',
        extra: '数据更新',
        status: 'urgent',
        type: 'update',
      },
      {
        id: '000000011',
        title: 'CrystaLCA 1.0.1 正式版',
        description: 'CrystaLCA 1.0.1 正式版于 2021-12-09 发布',
        extra: '程序更新',
        status: 'doing',
        type: 'update',
      },
      {
        id: '000000012',
        title: 'CrystaLCA 内部版本发布',
        description: '邀请您体验 CrystaLCA 最新内部版本',
        extra: '内测版本',
        status: 'processing',
        type: 'update',
      },
    ],
  });
};

export default {
  'GET /api/notices': getNotices,
};
