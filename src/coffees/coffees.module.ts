import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from '../coffees/coffees.controller';
import { CoffeesService } from '../coffees/coffees.service';
import { Event } from '../events/entities/event.entity';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// class MockCoffeeService {}

class ConfigService {}
class DevelopmentConfigService {}
class ProductConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    // do work...
    return ['nescafe', 'brew'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  // providers: [CoffeesService],
  // providers: [{ provide: CoffeesService, useValue: new MockCoffeeService() }],
  // providers: [
  //   CoffeesService,
  //   { provide: COFFEE_BRANDS, useValue: ['nescafe', 'brew'] },
  //   {
  //     provide: ConfigService,
  //     useClass:
  //       process.env.NODE_ENV === 'development'
  //         ? DevelopmentConfigService
  //         : ProductConfigService,
  //   },
  // ],
  // providers: [
  //   CoffeesService,
  //   CoffeeBrandsFactory,
  //   {
  //     provide: COFFEE_BRANDS,
  //     useFactory: (brandsFactory: CoffeeBrandsFactory) =>
  //       brandsFactory.create(),
  //     inject: [CoffeeBrandsFactory],
  //   },
  // ],
  // providers: [
  //   CoffeesService,
  //   {
  //     provide: COFFEE_BRANDS,
  //     // Note "async" here, and Promise/Async event inside the Factory function
  //     // Could be a database connection / API call / etc
  //     // In our case we're just "mocking" this type of event with a Promise
  //     useFactory: async (connection: Connection): Promise<string[]> => {
  //       // const coffeeBrands = await connection.query('SELECT * ...');
  //       const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
  //       console.log('async!');
  //       return coffeeBrands;
  //     },
  //     inject: [Connection],
  //   },
  // ],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useValue: ['nescafe', 'brew'],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
