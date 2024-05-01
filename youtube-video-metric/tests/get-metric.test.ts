import Inspector from '../src';
import { test } from '@jest/globals';

test('test if transcription is retrieve', async () => {
  const transcript = await Inspector.getMetric('https://www.youtube.com/watch?v=0SItu2xPx-4')
});