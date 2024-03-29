const AccountRepository = require('../../repositories/accounts/AccountRepository');

class AccountController {
  async signup(req, res) {
    const {
      name, email, password, confirmPassword,
    } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'empty fields' });
    }

    const userExists = await AccountRepository.userExists(email);

    if (userExists) {
      return res.status(400).json({ error: 'user already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'passwors do not match' });
    }

    await AccountRepository.signup(name, email, password);

    return res.status(201).end();
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'empty fields' });
    }

    const user = await AccountRepository.login(email);

    if (!user) {
      return res.status(400).json({ error: 'email or password invalid' });
    }

    if (user.password !== password || user.email !== email) {
      return res.status(400).json({ error: 'email or password invalids' });
    }

    return res.status(200).end();
  }
}

module.exports = new AccountController();
