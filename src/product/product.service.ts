import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(input: CreateProductInput): Promise<Product> {
    const product = this.productRepo.create(input);
    return this.productRepo.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepo.find();
  }
}
