import fetch from 'node-fetch';

const url = process.env.TEST_URL;

describe('should retun error in login', () => {
  it('should get user token', async () => {
    const resposne = await fetch(`${url}/login`, {
      method: 'POST',
      body: { username: 'raghuk46', password: 'test@123456' },
    });
    const resposnedata = await resposne.json();
    expect(resposnedata.status).toEqual('error');
    expect(resposnedata.data[0].message).toEqual('username is required');
    expect(resposnedata.data[1].message).toEqual('password is required');
  });
});
