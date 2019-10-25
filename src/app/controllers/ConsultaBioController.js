import * as Yup from 'yup';

import Pessoas from '../models/Pessoas';

class ConsultaBioController {
  async index(req, res) {
    const schema = Yup.object().shape({
      template1: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }
    const { template1 } = req.body;
    const pessoas = await Pessoas.findOne({
      where: { template1 },
      attributes: [
        'name',
        'cpf',
        'uf_origem',
        'pendencia',
        'uf_pendencia',
        // 'avatar_id',
      ],
      // include: [
      //   {
      //     model: File,
      //     as: 'avatar',
      //     attributes: ['name', 'path', 'url'],
      //   },
      // ],
    });
    return res.json(pessoas);
  }
}

export default new ConsultaBioController();
