import {
  RecordMutateOptions,
  AbstractCqrsCommandInput,
  AbstractCqrsQueryInput,
  RecordQueryOptions,
} from 'nestjs-typed-cqrs';
import { TwoFactorInfoDto } from '../dto/two-factor.dto';
import {
  GenerateTwoFactorInput,
  VerifyTwoFactorInput,
} from '../dto/two-factor.input';

/**
 * ---------------------------
 * QUERY
 * ---------------------------
 */
export class VerifyTwoFactorQuery extends AbstractCqrsQueryInput<
  null,
  VerifyTwoFactorInput,
  RecordQueryOptions,
  boolean
> {}

/**
 * ---------------------------
 * COMMAND
 * ---------------------------
 */
export class GenerateTwoFactorCommand extends AbstractCqrsCommandInput<
  null,
  GenerateTwoFactorInput,
  false,
  RecordMutateOptions,
  TwoFactorInfoDto
> {}

// ---------------------------
// EVENT
// ---------------------------
