'use strict';

import { DateTime } from 'luxon';
import t from 'tap';
import { isEmptyObject, isTimeToRefreshToken } from '../utils.js';

t.test('isEmptyObject function', (t) => {
  t.test('should return true when object is null', (t) => {
    let data = null;
    let result = isEmptyObject(data);
    t.equal(result, true);
    t.end();
  });
  t.test('should return true when object is undefined', (t) => {
    let data = undefined;
    let result = isEmptyObject(data);
    t.equal(result, true);
    t.end();
  });
  t.test('should return true when object is empty', (t) => {
    let data = {};
    let result = isEmptyObject(data);
    t.equal(result, true);
    t.end();
  });
  t.test('should return false when object is not empty', (t) => {
    let data = { test: '' };
    let result = isEmptyObject(data);
    t.equal(result, false);
    t.end();
  });

  t.end();
});
t.test(
  'isTimeToRefreshToken return true when current date is not in interval ',
  async (t) => {
    let lastFetchDate = DateTime.fromHTTP('Mon, 12 Jul 2021 19:21:44 GMT', {
      zone: 'GMT',
    });
    const currentDate = DateTime.now().toHTTP();
    let expires_in = -1;
    let shouldIRefresh = isTimeToRefreshToken(
      expires_in,
      currentDate,
      lastFetchDate
    );
    t.equal(shouldIRefresh, true);
  }
);
t.test(
  'isTimeToRefreshToken return false when current date is in interval ',
  async (t) => {
    let lastFetchDate = DateTime.fromHTTP('Mon, 17 May 2021 18:01:38 GMT', {
      zone: 'GMT',
    });
    let currentDate = DateTime.fromHTTP('Mon, 17 May 2021 18:02:38 GMT', {
      zone: 'GMT',
    });
    let expires_in = 3600 * 1000;
    let shouldIRefresh = isTimeToRefreshToken(
      expires_in,
      currentDate,
      lastFetchDate
    );
    t.equal(shouldIRefresh, false);
  }
);
t.test('isTimeToRefreshToken  params null should return false ', async (t) => {
  let shouldIRefresh = isTimeToRefreshToken(null, undefined, null);
  t.equal(shouldIRefresh, false);
});
