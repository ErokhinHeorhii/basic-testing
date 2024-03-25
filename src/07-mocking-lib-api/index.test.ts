// Uncomment the code below and write your tests
import axios from 'axios';
import {throttledGetDataFromApi} from './index';


describe('throttledGetDataFromApi', () => {
    test('should create instance with provided base url', async () => {
        const baseURL = 'https://jsonplaceholder.typicode.com';
        const createSpy = jest.spyOn(axios, 'create');
        await throttledGetDataFromApi('/posts');
        expect(createSpy).toHaveBeenCalledWith(expect.objectContaining({baseURL}))
        createSpy.mockRestore();
    });

    test('should perform request to correct provided url', async () => {
        const createData = {baseURL: 'https://jsonplaceholder.typicode.com'};

        const axiosInstance = axios.create(createData);
        const axiosInstanceGetSpy = jest.spyOn(axiosInstance, 'get');
        const axiosCreateSpy = jest.spyOn(axios, 'create');
        axiosCreateSpy.mockReturnValue(axiosInstance);

        await throttledGetDataFromApi('posts');
        expect(axiosInstanceGetSpy).toHaveBeenCalledWith('posts');
    });

    test('should return response data', async () => {
        const createValue = {baseURL: 'https://jsonplaceholder.typicode.com'};
        const responseData = {data: 'I hate tests'};

        const axiosInstance = axios.create(createValue);
        const axiosInstanceGetSpy = jest.spyOn(axiosInstance, 'get');
        const axiosCreateSpy = jest.spyOn(axios, 'create');
        axiosCreateSpy.mockReturnValue(axiosInstance);
        axiosInstanceGetSpy.mockReturnValue(Promise.resolve(responseData));

        expect(await throttledGetDataFromApi('posts')).toBe(responseData.data);
        expect(axiosInstanceGetSpy).toHaveBeenCalled();
    });
});
