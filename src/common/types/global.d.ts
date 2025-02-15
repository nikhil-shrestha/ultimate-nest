import { User } from "@entities";
import { I18nTranslations as I18nTranslationTypes } from "@generated";

declare global {
	namespace Express {
		export interface Request {
			user?: User;
			realIp: string;
		}
	}
	export type I18nTranslations = I18nTranslationTypes;
}
