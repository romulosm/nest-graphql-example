import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCustomerInput } from './dto/update-costumer.input';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepo: Repository<Customer>,
  ) {}

  async create(input: CreateCustomerInput): Promise<Customer> {
    const customer = this.customerRepo.create(input);
    return this.customerRepo.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepo.find({ relations: ['orders'] });
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepo.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async updateOne(id: string, input: UpdateCustomerInput): Promise<Customer> {
    const existingCustomer = await this.customerRepo.findOneOrFail({
      where: { id },
    });

    const updated = Object.assign(existingCustomer, input);
    await this.customerRepo.save(updated);

    return updated;
  }

  async deleteOne(id: string): Promise<Customer> {
    const customer = await this.customerRepo.findOneOrFail({ where: { id } });
    await this.customerRepo.delete(id);
    return customer;
  }
}
