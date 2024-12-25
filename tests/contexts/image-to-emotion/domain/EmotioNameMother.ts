import * as faker from 'faker';

type EmotioName = string;
const EMOTIONS = ['happiness', 'contentment', 'anger', 'joy'];
export class EmotioNameMother {
	static random(): EmotioName {
		return faker.random.arrayElement(EMOTIONS);
	}
}
