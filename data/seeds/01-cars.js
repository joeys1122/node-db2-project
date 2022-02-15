exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function() {
      return knex('cars').insert([
        { vin: '3C4FY58B95T580963', make: 'Nissan', model: 'Sentra', mileage: 12000, title: 'Test Title' },
        { vin: '2CNALFEC6B6392134', make: 'Toyoda', model: 'Takoma', mileage: 12000, transmission: 'Test Transmission' },
        { vin: '3D7KS28C86G285957', make: 'Audi', model: 'A3', mileage: 12000 }
      ]);
    });
};