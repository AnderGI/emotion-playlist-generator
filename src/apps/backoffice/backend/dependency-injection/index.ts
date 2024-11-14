import { ContainerBuilder, JsonFileLoader } from 'node-dependency-injection';

const container = new ContainerBuilder();
const loader = new JsonFileLoader(container);
const env = process.env.NODE_ENV ?? 'dev';

loader.load(`${__dirname}/application_${env}.json`);

export default container;
