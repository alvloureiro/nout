import request from 'supertest';
import { app } from '../../app';

it('return 200 when user logs in', async () => {
  const newUser = {
    username: 'foobar',
    email: 'foobar@test.com',
    password: 'password',
  };
  const createdUser = await request(app).post('/api/users/signup').send(newUser).expect(201);
  expect(createdUser).toBeDefined();
  expect(createdUser.body).toBeDefined();
  expect(createdUser.body.username).toEqual(newUser.username);
  expect(createdUser.body.email).toEqual(newUser.email);
  expect(createdUser.body.password).not.toBeDefined();

  await request(app)
    .post('/api/users/login')
    .send({
      username: 'foobar',
      password: 'password',
    })
    .expect(201);
});

it('return 400 with no password', async () => {
  await request(app)
    .post('/api/users/login')
    .send({
      username: 'foobar',
    })
    .expect(400);
});

it('return 400 with no username', async () => {
  await request(app)
    .post('/api/users/login')
    .send({
      password: 'password',
    })
    .expect(400);
});

it('return 400 with invalid password', async () => {
  const newUser = {
    username: 'foobar',
    email: 'foobar@test.com',
    password: 'password',
  };
  await request(app).post('/api/users/signup').send(newUser).expect(201);

  await request(app)
    .post('/api/users/login')
    .send({
      username: 'foobar',
      password: 'hksjglfkd',
    })
    .expect(400);
});

it('return 404 with user not registered', async () => {
  await request(app)
    .post('/api/users/login')
    .send({
      username: 'foobar2',
      password: 'password',
    })
    .expect(404);
});
