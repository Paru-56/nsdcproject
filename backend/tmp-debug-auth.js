const connectDB = require('./config/db');
const { registerUser } = require('./controllers/authController');

(async () => {
  try {
    await connectDB();
    const req = {
      body: {
        name: 'DirectTest',
        email: 'directtest@example.com',
        password: 'pass123',
        phone: '1234567890',
      },
    };
    const res = {
      status(code) {
        this.code = code;
        return this;
      },
      json(payload) {
        console.log('RES', this.code, payload);
        return this;
      },
    };
    await registerUser(req, res);
  } catch (error) {
    console.error('DIRECT ERROR', error);
  }
})();