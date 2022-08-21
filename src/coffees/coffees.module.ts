import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from 'src/coffees/coffees.controller';
import { CoffeesService } from 'src/coffees/coffees.service';
import { Event } from 'src/events/entities/event.entity';
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
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create(),
      inject: [CoffeeBrandsFactory],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
