class AnimalService {
    constructor(db) {
      this.client = db.sequelize;
      this.Animal = db.Animal;
      this.Species = db.Species;
      this.Size = db.Size;
      this.Temperament = db.Temperament;
    }
  
    async createAnimal(name, speciesId, birthday, temperamentIds, sizeId, adopted) {
      return this.Animal.create({
        Name: name,
        SpeciesId: speciesId,
        Birthday: birthday,
        Adopted: adopted,
        SizeId: sizeId,
        Temperaments: temperamentIds.map((id) => ({ TemperamentId: id })),
      }, {
        include: [
          this.Temperament,
        ]
      });
    }
  
    async getAll() {
        return this.Animal.findAll({
          include: [
            {
              model: this.Species,
              attributes: ['Name'],
            },
            {
              model: this.Size,
              attributes: ['Name'],
            },
            {
              model: this.Temperament,
              attributes: ['Name'],
              through: { attributes: [] },
            },
          ],
          attributes: ['id', 'Name', 'Birthday', 'Adopted'],
        });
      }
  
    async deleteAnimal(id) {
      return this.Animal.destroy({
        where: { id: id },
      });
    }
  }

  
  
  module.exports = AnimalService;






