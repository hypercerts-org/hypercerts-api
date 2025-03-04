import { IocContainer } from "@tsoa/runtime";
import { container } from "tsyringe";

export const iocContainer: IocContainer = {
  get: <T>(controller: { prototype: T }): T => {
    try {
      return container.resolve<T>(controller as never);
    } catch (err) {
      throw new Error(
        `Error resolving controller: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  },
};
