import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');

const testURL = '/api/test';
const mockData = { data: 'mocked data' };

describe('throttledGetDataFromApi', () => {
  let fakeClient: { get: jest.Mock };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    fakeClient = {
      get: jest.fn().mockResolvedValue({ data: mockData }),
    };
    (axios.create as jest.Mock).mockReturnValue(fakeClient);
  });

  afterEach(() => {
    jest.advanceTimersByTime(THROTTLE_TIME);
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    throttledGetDataFromApi(testURL);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    throttledGetDataFromApi(testURL);
    expect(fakeClient.get).toHaveBeenCalledWith(testURL);
  });

  test('should return response data', async () => {
    const resultPromise = throttledGetDataFromApi(testURL);
    const result = await resultPromise;

    expect(result).toEqual(mockData);
  });
});
