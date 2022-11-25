import correlationId from "../correlation-id";
import { createLogger } from "../core/logger";

const logger = createLogger({
  getCorrelationId: correlationId.getId,
});

export default logger;
