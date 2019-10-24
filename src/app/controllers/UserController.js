import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const userExists = await User.findOne({
      where: { username: req.body.username },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário ja existe.' });
    }

    const { id, username, is_admin } = await User.create(req.body);

    return res.json({
      id,
      username,
      is_admin,
    });
  }

  // async update(req, res) {
  //   const { oldPassword } = req.body;

  //   const user = await User.findByPk(req.userId);

  //   if (!(await user.checkPassword(oldPassword))) {
  //     return res.status(401).json({ error: 'A senha antiga está errada' });
  //   }

  //   const { id, username } = await user.update(req.body);

  //   return res.json({
  //     id,
  //     username,
  //   });
  // }
}

export default new UserController();
