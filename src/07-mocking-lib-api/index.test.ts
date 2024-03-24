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
        // Write your test here
    });

    test('should return response data', async () => {
        // Write your test here
    });
});
