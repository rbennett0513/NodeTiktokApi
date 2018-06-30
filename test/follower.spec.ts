import MockAdapter from 'axios-mock-adapter';
import { assert } from 'chai';
import { describe, it } from 'mocha';

import MusicallyAPI from '../src';
import {
  loadTestData,
  mockConfig,
  mockParams,
} from './util';
import { ListFollowerRequest, ListFollowerResponse } from '../src/types';

describe('#listFollowers()', () => {
  it('a successful response should match the interface', async () => {
    const api = new MusicallyAPI(mockParams, mockConfig);
    const mock = new MockAdapter(api.request);
    mock
      .onGet(new RegExp('aweme/v1/user/follower/list/\?.*'))
      .reply(200, loadTestData('listFollowers.json'), {});

    const res = await api.listFollowers({ user_id: '9999999999999999999' } as ListFollowerRequest);
    const expected: ListFollowerResponse = {
      extra: {
        fatal_item_ids: [],
        logid: '20180101000000000000000000000000',
        now: 1000000000000,
      },
      followers: [
        {
          avatar_larger: {
            url_list: [
              'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_1080x1080.jpeg',
            ],
          },
          avatar_medium: {
            url_list: [
              'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_720x720.jpeg',
            ],
          },
          avatar_thumb: {
            url_list: [
              'http://p16.muscdn.com/img/musically-maliva-obj/1000000000000000~c5_100x100.jpeg',
            ],
          },
          create_time: 1000000000,
          custom_verify: 'style guru',
          follow_status: 0,
          follower_status: 0,
          ins_id: '',
          is_verified: false,
          nickname: 'example nickname',
          secret: 0,
          signature: 'example signature',
          twitter_id: '',
          uid: '9999999999999999999',
          unique_id: 'example',
          verification_type: 0,
        },
      ],
      has_more: false,
      max_time: 1000000000,
      min_time: 1000000001,
      status_code: 0,
      total: 1,
    };
    assert.deepStrictEqual(res.data, expected);
  });
});
