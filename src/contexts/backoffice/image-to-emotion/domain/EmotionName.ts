import { StringValueObject } from '../../../shared/domain/value-object/StringValueObject';

export default class EmotionName extends StringValueObject {
	public static create(name: string): EmotionName {
		return new EmotionName(name);
	}
}
