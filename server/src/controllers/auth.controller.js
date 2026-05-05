import { prisma } from '../lib/prisma.lib.js';
import bcrypt from 'bcryptjs';
import * as utils from '../utils/validators.utils.js';

// POST /auth/register
const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // validations
    const nameError = utils.isEmpty(name, 'Name');
    if (nameError) {
      return res.status(400).json({ success: false, message: nameError });
    }

    const passwordError = utils.isEmpty(password, 'Password');
    if (passwordError) {
      return res.status(400).json({ success: false, message: passwordError });
    }

    const emailError = utils.isEmpty(email, 'E-mail');
    if (emailError) {
      return res.status(400).json({ success: false, message: emailError });
    }

    if (!utils.isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        password: hashedPassword,
        email: email,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(200).json({ success: true, data: userWithoutPassword });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to register' });
  }
};

export { register };
