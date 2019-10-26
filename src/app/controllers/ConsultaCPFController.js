import * as Yup from 'yup';

import Pessoas from '../models/Pessoas';

class ConsultaCPFController {
  async index(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string()
        .required()
        .min(11),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }
    const { cpf } = req.body;
    const pessoas = await Pessoas.findOne({
      where: { cpf },
      attributes: [
        'id',
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

    if (!pessoas) {
      return res
        .status(400)
        .json({ error: 'Cpf não cadastrado na base de dados!' });
    }

    return res.json(pessoas);
  }
}

export default new ConsultaCPFController();
