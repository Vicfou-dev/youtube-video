import YtdVideo from '../src';
import { test } from '@jest/globals';

test('test if server launch', async () => {
    const port = 8060;

    YtdVideo.Server.default.listen(port);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(`http://localhost:${port}`);

    expect(response.status).toBe(200);
    YtdVideo.Server.default.close();
});
