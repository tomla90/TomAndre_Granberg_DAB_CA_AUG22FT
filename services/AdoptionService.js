class AdoptionService {
  constructor(db) {
    this.client = db.sequelize;
    this.Adoption = db.Adoption;
    this.Animal = db.Animal;
    this.User = db.User;
  }

  async adoptAnimal(animalId, userId, adoptionDate) {
    const animal = await this.Animal.findOne({ where: { id: animalId } });
    if (!animal) {
      throw new Error(`Animal with ID ${animalId} not found`);
    }
  
    const maxId = await this.Adoption.max('id');
    const newId = maxId ? maxId + 1 : 1;

    return this.client.transaction(async (transaction) => {
      await this.Adoption.create({
        id: newId,
        AnimalId: animal.id,
        UserId: userId,
        date: adoptionDate,
      }, { transaction });
  
      await this.Animal.update({
        Adopted: true,
      }, {
        where: { id: animalId },
        transaction,
      });
    });
  }

  async deleteAnimalAdoption(animalId) {
    return this.client.transaction(async (transaction) => {
      await this.Adoption.destroy({
        where: { AnimalId: animalId },
        transaction,
      });

      await this.Animal.update({
        Adopted: false,
      }, {
        where: { id: animalId },
        transaction,
      });
    });
  }
}

module.exports = AdoptionService;