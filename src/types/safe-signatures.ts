export interface ISafeApiCommand {
  execute(): Promise<void>;
  getId(): string;
}
