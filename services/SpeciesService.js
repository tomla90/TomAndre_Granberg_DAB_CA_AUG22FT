class SpeciesService {
  constructor(db) {
    this.client = db.sequelize;
    this.Species = db.Species;
    this.Animal = db.Animal;
    this.AnimalSpecies = db.AnimalSpecies;
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
    try {
      const animalSpeciesCount = await this.Animal.count({
        where: { SpeciesId: id },
      });
  
      if (animalSpeciesCount > 0) {
        return { message: 'Cannot delete a species that is currently being used by animals' };
      }
  
      await this.Species.destroy({
        where: { id },
      });
  
      return { message: 'Species deleted successfully' };
    } catch (error) {
      console.error(error);
      return { message: 'An error occurred while deleting the species' };
    }
  }

  async getAll() {
    return this.Species.findAll();
  }
}

module.exports = SpeciesService;