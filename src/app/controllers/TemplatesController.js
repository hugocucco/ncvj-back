/* eslint-disable no-plusplus */
import Pessoas from '../models/Pessoas';

class TemplatesController {
  async index(req, res) {
    const templates = await Pessoas.findAll({
      attributes: ['template1'],
    });

    const digitais = [];

    for (let i = 0; i < templates.length; i++) {
      // console.log(templates[i].template1);
      digitais.push(templates[i].template1);
    }

    // console.log(digitais);
    return res.json(digitais);
  }
}

export default new TemplatesController();
