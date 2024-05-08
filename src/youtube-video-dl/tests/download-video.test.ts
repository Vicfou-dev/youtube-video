import Downloader from '../src';
import { test } from '@jest/globals';
const SECONDS = 1000;
jest.setTimeout(120 * SECONDS)

test('test if video if download', async () => {
  await Downloader.download('https://www.youtube.com/watch?v=et9gw5xbtoY', '720p', 'toto.mp4')
});