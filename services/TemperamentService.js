class TemperamentService {
  constructor(db) {
    this.client = db.sequelize;
    this.Temperament = db.Temperament;
    this.Animal = db.Animal;
    this.AnimalTemperament = db.AnimalTemperament;
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
    try {
      const animalTemperamentCount = await this.AnimalTemperament.count({
        where: { TemperamentId: id },
      });

      if (animalTemperamentCount > 0) {
        return { message: 'Cannot delete a temperament that is currently being used by animals' };
      }

      await this.Temperament.destroy({
        where: { id },
      });

      return { message: 'Temperament deleted successfully' };
    } catch (error) {
      console.error(error);
      return { message: 'An error occurred while deleting the temperament' };
    }
  }

  async getAll() {
    return this.Temperament.findAll();
  }
}

module.exports = TemperamentService;