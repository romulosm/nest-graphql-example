import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { Customer } from '../customer/customer.entity';
import { Product } from 'src/product/product.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(input: CreateOrderInput): Promise<Order> {
    if (!isUUID(input.customerId)) {
      throw new BadRequestException({
        message: `Invalid UUID format for customerId: ${input.customerId}`,
      });
    }

    for (const productId of input.productIds) {
      if (!isUUID(productId)) {
        throw new BadRequestException({
          message: `Invalid UUID format for productId: ${productId}`,
        });
      }
    }

    const customer = await this.customerRepo.findOneByOrFail({
      id: input.customerId,
    });

    const products = await this.productRepo.findByIds(input.productIds);

    const total = products.reduce((acc, item) => acc + Number(item.price), 0);

    const order = this.orderRepo.create({
      customer,
      products,
      total,
    });

    return this.orderRepo.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepo.find({
      relations: ['customer', 'products'],
    });
  }
}
