import type { IOption } from 'types/option';

const dishes: string[] = [
  '原味汤粉',
  '粥瓜婆',
  '重庆小面',
  '螺蛳粉',
  '炒粉',
  '番茄炒蛋',
  '粿条',
  '饺子',
  '西安面食',
  '葱油饼 & 酱香饼'
];

const foodData: IOption[] = dishes.map(d => ({ name: d }));

export default foodData;
