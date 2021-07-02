import { strict as assert } from 'assert';
import { itWithClient, TestRedisServers } from '../test-utils';
import { transformArguments } from './ACL_GETUSER';

describe('ACL GETUSER', () => {
    it('transformArguments', () => {
        assert.deepEqual(
            transformArguments('username'),
            ['ACL', 'GETUSER', 'username']
        );
    });

    itWithClient(TestRedisServers.OPEN, 'client.aclGetUser', async client => {
        assert.deepEqual(
            await client.aclGetUser('default'),
            {
                flags: ['on', 'allkeys', 'allchannels', 'allcommands', 'nopass'],
                passwords: [],
                commands: '+@all',
                keys: ['*'],
                channels: ['*']
            }
        );
    });
});
