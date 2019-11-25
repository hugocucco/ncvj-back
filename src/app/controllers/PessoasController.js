import * as Yup from 'yup';

import Pessoas from '../models/Pessoas';
// import File from '../models/File';

class PessoasController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string()
        .required()
        .min(11),
      uf_origem: Yup.string().required(),
      template1: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    // novo
    // const { cpf } = req.body;

    // const cpfExists = await Pessoas.findOne({
    //   where: { cpf },
    //   include: [
    //     {
    //       model: File,
    //       as: 'avatar',
    //       attributes: ['id', 'path', 'url'],
    //     },
    //   ],
    // });
    // old
    const cpfExists = await Pessoas.findOne({ where: { cpf: req.body.cpf } });

    if (cpfExists) {
      return res.status(400).json({ error: 'Cpf já cadastrado' });
    }

    const template1Exists = await Pessoas.findOne({
      where: { template1: req.body.template1 },
    });

    if (template1Exists) {
      return res.status(400).json({ error: 'Digital 1 já cadastrada' });
    }

    // const template2Exists = await Pessoas.findOne({
    //   where: { template2: req.body.template2 },
    // });

    // if (template2Exists) {
    //   return res.status(400).json({ error: 'Digital 2 já cadastrada' });
    // }

    const {
      id,
      name,
      cpf,
      uf_origem,
      template1,
      pendencia,
      uf_pendencia,
    } = await Pessoas.create(req.body);

    return res.json({
      id,
      name,
      cpf,
      uf_origem,
      template1,
      pendencia,
      uf_pendencia,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string()
        .required()
        .min(11),
      pendencia: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de validação' });
    }

    const { cpf, pendencia, uf_pendencia } = req.body;

    const pessoas = await Pessoas.findOne({ where: { cpf: req.body.cpf } });

    // if (pendencia === pessoas.pendencia) {
    //   return res
    //     .status(400)
    //     .json({ error: 'Status de pendencia igual ao anterior' });
    // }

    const { id, name, uf_origem } = await pessoas.update(req.body);

    return res.json({
      id,
      name,
      cpf,
      uf_origem,
      pendencia,
      uf_pendencia,
    });
  }

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
    return res.json(pessoas);
  }
}

export default new PessoasController();
