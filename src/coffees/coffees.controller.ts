import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateCoffeeDto } from 'src/coffee/dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffee/dto/update-coffee.dto';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() pagginationQuery) {
    // findAll(@Res() response) {
    // const { limit, offset } = pagginationQuery;
    // return `This return all coffees. Limit: ${limit}, offset: ${offset}`;
    // response.status(200).send('This return all coffees');
    return this.coffeesService.findAll();
  }

  @Get(':id')
  // findOne(@Param('id') id: string) {
  findOne(@Param('id') id: number) {
    // return `This returns #${id} coffee`;
    console.log(typeof id);
    return this.coffeesService.findOne('' + id);
  }

  @Post()
  // @HttpCode(HttpStatus.GONE)
  // create(@Body() body) {
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // create(@Body('name') body) {
    // return body;
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    // return `This action updates ${id} coffee`;
    this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return `This action removes ${id} coffee`;
    this.coffeesService.remove(id);
  }
}
