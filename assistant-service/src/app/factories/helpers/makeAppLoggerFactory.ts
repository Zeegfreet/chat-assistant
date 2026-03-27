import { AppLogger } from "@data/useCases";
import { PinoAdapter } from "@db/logging/pinoAdapter";

export const makeAppLoggerFactory = () => {

    const pinoAdapter = new PinoAdapter();

    return new AppLogger(
        pinoAdapter
    );
};