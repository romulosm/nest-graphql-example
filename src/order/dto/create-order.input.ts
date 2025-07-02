import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => ID)
  customerId: string;

  @Field(() => [ID])
  productIds: string[];
}
