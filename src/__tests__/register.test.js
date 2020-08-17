import fetch from 'node-fetch';

const url = process.env.TEST_URL;

describe('user registration', () => {
  it('should validate user details', async () => {
    const endpoint = `${url}/register`;
    const registerRes = await fetch(endpoint, {
      method: 'POST',
      body: { username: '', password: '' },
    });
    const registerdata = await registerRes.json();
    expect(registerdata.status).toEqual('error');
    expect(registerdata.data[0].message).toEqual('username is required');
    expect(registerdata.data[1].message).toEqual('password is required');
  });
});
