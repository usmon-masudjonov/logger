import { startApp } from "./core/app";
import logger from "./logger";

startApp().listen(3000, () => {
  logger.info("App is running on port: 3000");
});
