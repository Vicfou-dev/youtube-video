import Inspector from '../src';
import { test } from '@jest/globals';

test('test if metric is retrieve', async () => {
  const metric = await Inspector.getMetric('https://www.youtube.com/watch?v=EWLnHwaZNPA')
});