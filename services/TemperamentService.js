class TemperamentService {
    constructor(db) {
      this.client = db.sequelize;
      this.Temperament = db.Temperament;
      this.Animal = db.Animal;
    }
  
    async create(name) {
      const maxId = await this.Temperament.max('id');
      const newId = maxId ? maxId + 1 : 1;
      return this.Temperament.create({
        id: newId,
        Name: name,
      });
    }
  
    async update(id, name) {
      return this.Temperament.update(
        {
          Name: name,
        },
        {
          where: { id },
        }
      );
    }
  
    async delete(id) {
      return this.Temperament.destroy({
        where: { id },
      });
    }
  
    async getAll() {
      return this.Temperament.findAll();
    }
  

  }
  
  module.exports = TemperamentService;