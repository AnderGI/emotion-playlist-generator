export interface EnvironmentArranger {
	clean(): Promise<void>;
	close(): Promise<void>;
}
