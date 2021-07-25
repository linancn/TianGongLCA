// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';
import type { ListItemDataType } from './card.d';

const titles = [
  'Project A',
  'Project B',
  'Project C',
  'Project D',
  'Project E',
  'Project F',
  'Project G',
  'Project H',
];
const avatars = ['', '', '', '', '', '', '', ''];

const covers = ['', '', '', ''];
const desc = ['desc1', 'desc2', 'desc3', 'desc4', 'desc5'];
const user = [
  'user1',
  'user2',
  'user3',
  'user4',
  'user5',
  'user6',
  'user7',
  'user8',
  'user9',
  'user10',
];

function fakeList(count: number): ListItemDataType[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3] as
        | 'normal'
        | 'exception'
        | 'active'
        | 'success',
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: '',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      subDescription: desc[i % 5],
      description: '说明内容',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content: '说明内容',
      members: [
        {
          avatar: '',
          name: 'user1',
          id: 'member1',
        },
        {
          avatar: '',
          name: 'user2',
          id: 'member2',
        },
        {
          avatar: '',
          name: 'user3',
          id: 'member3',
        },
      ],
    });
  }

  return list;
}

function getFakeList(req: Request, res: Response) {
  const params: any = req.query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  return res.json({
    data: {
      list: result,
    },
  });
}

export default {
  'GET  /api/fake_list': getFakeList,
};
