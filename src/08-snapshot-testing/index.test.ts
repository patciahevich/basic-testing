import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const testElements = [1];
    const expectedLinkedList = {
      value: 1,
      next: { value: null, next: null },
    };

    const result = generateLinkedList(testElements);

    expect(result).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const testElements = [1, 2, 3];
    const result = generateLinkedList(testElements);
    expect(result).toMatchSnapshot();
  });
});
