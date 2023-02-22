class SpeciesService {
    constructor(db) {
      this.client = db.sequelize;
      this.Species = db.Species;
    }
  
    async create(name) {
      const maxId = await this.Species.max('id');
      const newId = maxId ? maxId + 1 : 1;
      return this.Species.create({
        id: newId,
        Name: name,
      });
    }
  
    async update(id, name) {
      return this.Species.update(
        {
          Name: name,
        },
        {
          where: { id },
        }
      );
    }
  
    async delete(id) {
      return this.Species.destroy({
        where: { id },
      });
    }
  
    async getAll() {
      return this.Species.findAll();
    }
  }
  
  module.exports = SpeciesService;