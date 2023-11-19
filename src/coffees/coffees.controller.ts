import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';
import { PaginationQueryDto } from './dtos/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Post()
  createACoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.createCoffee(createCoffeeDto);
    //console.log(createCoffeeDto instanceof CreateCoffeeDto);    after TRANSFORMATION = true, then it becomes the instance.
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
    return this.coffeeService.findOneCoffee('' + id);
  }

  // @SetMetadata('isPublic', true)
  @ApiForbiddenResponse({ description: 'forbidden' })
  @Public()
  @Get()
  async findAll(
    @Protocol() protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log(protocol);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.coffeeService.findAllCoffee(paginationQuery);
  }

  @Patch(':id')
  updateACoffee(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeeService.updateCoffee(id, updateCoffeeDto);
  }

  @Delete(':id')
  removeACoffee(@Param('id') id: string) {
    return this.coffeeService.removeCoffee(id);
  }
}
