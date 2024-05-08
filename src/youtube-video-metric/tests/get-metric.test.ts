import Inspector from '../src';
import { test } from '@jest/globals';

test('test if metric is retrieve', async () => {
  const metric = await Inspector.getMetric('https://www.youtube.com/shorts/gd6PWtUCPCk')
  console.dir(metric, { depth: null });
});