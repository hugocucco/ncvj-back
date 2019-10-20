import Pessoas from '../models/Pessoas';
import File from '../models/File';

class CondenadoController {
  async index(req, res) {
    const condenados = await Pessoas.findAll({
      where: { pendencia: true },
      attributes: [
        'id',
        'name',
        'cpf',
        'uf_origem',
        'uf_pendencia',
        'avatar_id',
      ],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(condenados);
  }
}

export default new CondenadoController();
