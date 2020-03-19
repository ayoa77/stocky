const expect = require("expect");
const app = require("../app");
const { User } = require("../models/userModel");
const request = require("supertest");
const http = require("http");

const { users, seedDummyUsers } = require("./seed/seed");

beforeEach(seedDummyUsers);

describe("POST /users", () => {
  it("should create a user", done => {
    let email = "mailer@bmail.com";
    let password = "123password";
    let confirmPassword = "123password";

    request(app)
      .post("/users")
      .send({ email, password, confirmPassword })
      .expect(res => {
        expect(res.body.redirect).toBe("/stocks");
      })
      .end(err => {
        if (err) return done(err);

        User.findOne({ email }).then(user => {
          expect(user).not.toBeNull();
          expect(user.password).not.toBe(password);
          done();
        });
      });
  });

  it("should return validation errors if request is invaild", done => {
    request(app)
      .post("/users")
      .send({
        email: "taco@noemail",
        password: "tacos",
        confirmPassword: "tacos"
      })
      .expect(400)
      .end(done);
  });

  it("should not create user if email in use", done => {
    request(app)
      .post("/users")
      .send({
        email: users[0].email,
        password: "asdfsdf1234",
        confirmPassword: "asdfsdf1234"
      })
      .expect(422)
      .end(done);
  });
});

describe("POST /stocks", () => {
  it("Should find a stock", done => {
    var stockSymbol = "CRS";

    request(app)
      .post("/stocks")
      .send({ stockSymbol })
      .expect(200)
      .expect(res => {
        expect(res.body.response.o).toBeGreaterThan(0);
        expect(res.body.response.s).toBe(stockSymbol);
      })
      .end((err, res) => {
        if (err) return done(err);
        else done();
      });
  });

  it("Should return 404 if stock not found", done => {
    var stockSymbol = "nostocky";
    request(app)
      .post("/stocks")
      .send({ stockSymbol })
      .expect(404)
      .end(done);
  });
});

describe("POST /users/login", () => {
  it("Should login user", done => {
    request(app)
      .post("/users/login")
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect(res => {
        expect(res.body.redirect).toBe("/stocks");
      })
      .end((err, res) => {
        if (err) return done(err);
        else done();
      });
  });

  it("Should reject invalid login", done => {
    request(app)
      .post("/users/login")
      .send({
        email: users[1].email,
        password: users[1].password + "1"
      })
      .expect(400)
      .expect(res => {
        expect(res.body.redirect).toBe(false);
      })
      .end((err, res) => {
        if (err) return done(err);
        else done();
      });
  });
});
