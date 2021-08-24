export const STATUS = {
  NOT_STARTED: '시작안함',
  ONGOING: '진행중',
  FINISHED: '완료',
};

export const TODO_ITEM_LIST = [
  {
    id: 1,
    taskName: '자소서 쓰기',
    status: STATUS.NOT_STARTED,
    createdAt: '2021-02-03',
    updatedAt: '2021-07-08',
  },
  {
    id: 2,
    taskName: '할일2',
    status: STATUS.NOT_STARTED,
    createdAt: '2021-03-03',
    updatedAt: '2021-07-17',
  },
  {
    id: 3,
    taskName: '할일3',
    status: STATUS.ONGOING,
    createdAt: '2021-04-03',
    updatedAt: '2021-07-27',
  },
  {
    id: 4,
    taskName: '할일4',
    status: STATUS.FINISHED,
    createdAt: '2021-05-03',
    updatedAt: '2021-08-07',
  },
];
