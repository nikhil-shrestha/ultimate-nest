import { IsEnumFieldOptions } from "@common/types";
import { applyDecorators } from "@nestjs/common";
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { enumToString } from "helper-fns";
import { i18nValidationMessage } from "nestjs-i18n";

/**
 * It's a decorator that validates that the field is an enum value
 * @param {object} entity - object - The enum object to validate against.
 * @param {IsEnumFieldOptions} [ops] - IsEnumFieldOptions
 * @returns A decorator function that takes in a target, propertyKey, and descriptor.
 */
export const IsEnumField = (entity: object, ops?: IsEnumFieldOptions) => {
	const options: IsEnumFieldOptions = { each: false, required: true, ...ops };
	const decoratorsToApply = [
		IsEnum(entity, {
			each: options.each,
			message: `must be a valid enum value,${enumToString(entity)}`,
		}),
	];

	if (options.required) {
		decoratorsToApply.push(
			IsNotEmpty({
				message: i18nValidationMessage("validation.isNotEmpty"),
				each: options.each,
			}),
		);

		if (options.each) {
			decoratorsToApply.push(
				ArrayNotEmpty({
					message: i18nValidationMessage("validation.isNotEmpty"),
				}),
			);
		}
	} else {
		decoratorsToApply.push(IsOptional());
	}

	if (options.each) {
		decoratorsToApply.push(
			IsArray({
				message: i18nValidationMessage("validation.isDataType", {
					type: "array",
				}),
			}),
		);
	}

	return applyDecorators(...decoratorsToApply);
};
