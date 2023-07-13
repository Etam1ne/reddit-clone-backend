import { PipeTransform } from '@nestjs/common';

export class OptionalParseIntPipe implements PipeTransform<string | undefined> {
  transform(value: string | undefined): number | undefined {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      return undefined;
    }
    return val;
  }
}
