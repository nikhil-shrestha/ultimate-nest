import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";
import { isMatch } from "date-fns";

/* It validates that a date is in a given format */

@ValidatorConstraint({ async: true })
class IsDateInFormatConstraint implements ValidatorConstraintInterface {
	async validate(value: string | Array<string>, arguments_: ValidationArguments) {
		const [format] = arguments_.constraints;

		if (Array.isArray(value)) {
			return value.some(v => isMatch(v, format));
		}

		return isMatch(value, format);
	}

	defaultMessage(arguments_: ValidationArguments) {
		const property = arguments_.property;
		const [format] = arguments_.constraints;

		return `${property} should be in ${format} format`;
	}
}

export const IsDateInFormat = (format: string, validationOptions?: ValidationOptions) => {
	return function (object: Record<string, any>, propertyName: string): void {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [format],
			validator: IsDateInFormatConstraint,
		});
	};
};
