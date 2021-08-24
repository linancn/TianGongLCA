// eslint-disable-next-line import/no-extraneous-dependencies
import type { Request, Response } from 'express';
import { parse } from 'url';
import type { ProjectListItem, ProjectListParams } from './list.d';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const projectListDataSource: ProjectListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    projectListDataSource.push({
      id: index,
      flag: i % 6 === 0,
      name: `TradeCode ${index}`,
      comment: '这是一段描述',
      lastUpdate: new Date(),
      createdAt: new Date(),
    });
  }
  projectListDataSource.reverse();
  return projectListDataSource;
};

let projectListDataSource = genList(1, 100);

function getProjectList(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as ProjectListParams;
  let dataSource = [...projectListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.searchvalue) {
    dataSource = dataSource.filter((data) => data.name.includes(params.searchvalue || ''));
  }
  if (params.sort) {
    const sorter = JSON.parse(params.sort as any);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  // if (params.filter) {
  //   const filter = JSON.parse(params.filter as any) as Record<string, string[]>;
  //   if (Object.keys(filter).length > 0) {
  //     dataSource = dataSource.filter((item) => {
  //       return Object.keys(filter).some((key) => {
  //         if (!filter[key]) {
  //           return true;
  //         }
  //         if (filter[key].includes(`${item[key]}`)) {
  //           return true;
  //         }
  //         return false;
  //       });
  //     });
  //   }
  // }

  let finalPageSize = 10;
  if (params.pageSize) {
    finalPageSize = parseInt(`${params.pageSize}`, 10);
  }

  const result = {
    data: dataSource,
    total: projectListDataSource.length,
    success: true,
    pageSize: finalPageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postProjectList(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, comment, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      projectListDataSource = projectListDataSource.filter((item) => key.indexOf(item.id) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule = {
          id: projectListDataSource.length,
          name,
          comment,
          lastUpdate: new Date(),
          createdAt: new Date(),
          flag: false,
        };
        projectListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        projectListDataSource = projectListDataSource.map((item) => {
          if (item.id === key) {
            newRule = { ...item, comment, name };
            return { ...item, comment, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: projectListDataSource,
    pagination: {
      total: projectListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/projectlist': getProjectList,
  'POST /api/projectlist': postProjectList,
};
