import requestPromise from "request-promise-native";
import correlator from "../correlation-id";

const correlatedRequest = {
  requestPromise: requestPromise.defaults({
    headers: {
      get "x-correlation-id"() {
        return correlator.getId();
      },
    },
  }),
};

export default correlatedRequest;
