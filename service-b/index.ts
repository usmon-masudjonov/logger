import { startApp } from "./core/app";
import logger from "./logger";

startApp().listen(3001, () => {
  logger.info("App is running on port: 3001");
});
