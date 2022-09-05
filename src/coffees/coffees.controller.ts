import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';
import { Protocol } from 'src/common/decoratos/protocol.decorator';
import { Public } from 'src/common/decoratos/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';

// @UsePipes(ValidationPipe) - Controller-scoped
// @UsePipes(new CustomValidationPipe())
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService, // @Inject(REQUEST) private readonly request: Request, // Can slow performance
  ) {
    console.log('CoffeesController created');
  }

  // @UsePipes(ValidationPipe) - Method-scoped
  // @SetMetadata('isPublick', true)
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public()
  @Get()
  async findAll(
    @Protocol('https') protocol: string,
    @Query() pagginationQuery: PaginationQueryDto,
  ) {
    console.log(protocol);
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // findAll(@Res() response) {
    // const { limit, offset } = pagginationQuery;
    // return `This return all coffees. Limit: ${limit}, offset: ${offset}`;
    // response.status(200).send('This return all coffees');
    return this.coffeesService.findAll(pagginationQuery);
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
    // update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) { - Param-scoped
    // return `This action updates ${id} coffee`;
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    // return `This action removes ${id} coffee`;
    return this.coffeesService.remove(id.toString());
  }
}
