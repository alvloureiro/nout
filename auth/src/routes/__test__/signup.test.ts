import request from 'supertest';
import { app } from '../../app';

it('return 201 when register a new user', async () => {
  const newUser = {
    username: 'foobar',
    email: 'foobar@test.com',
    password: 'password',
  };
  const result = await request(app).post('/api/users/signup').send(newUser).expect(201);
  expect(result).toBeDefined();
  expect(result.body).toBeDefined();
  expect(result.body.username).toEqual(newUser.username);
  expect(result.body.email).toEqual(newUser.email);
  expect(result.body.password).not.toBeDefined();
});

it('return 400 with invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      username: 'foorbar',
      email: 'fhdskfhskdf',
      password: 'password',
    })
    .expect(400);
});

it('return 400 with no email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      username: 'foorbar',
      password: 'password',
    })
    .expect(400);
});

it('return 400 with invalid username', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      username: '',
      email: 'foobar@test.com',
      password: 'password',
    })
    .expect(400);
});

it('return 400 with no username', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'foobar@test.com',
      password: 'password',
    })
    .expect(400);
});

it('return 400 with no password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      username: 'foobar',
      email: 'foobar@test.com',
    })
    .expect(400);
});
